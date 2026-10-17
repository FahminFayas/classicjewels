/**
 * Design audit (docs/design-system-v2.md Appendix B). Drives the installed Chrome, headless,
 * over the DevTools protocol (no extra dependencies: Node's built-in WebSocket) and checks each
 * page at 1440 x 900 (DPR 1) and 390 x 844 (DPR 3, mobile emulation):
 *
 *   - page height, words in <main> (visible text only), H1 count, horizontal overflow
 *   - every <img> drawn wider than its source (the largest srcset candidate, or the file itself)
 *   - number of fetchpriority="high" images, inline executable scripts
 *   - every element in the first viewport whose computed opacity is below 1 at load
 *   - every text node on a solid background with contrast below 4.5:1 (3:1 for large text)
 *
 * and saves screenshots to .shots/{path}/: one per 90 % of a screen (500 ms per step, so scroll
 * effects settle) as {width}-{nn}.jpg, plus the first viewport with reduced motion emulated
 * ({width}-reduced.jpg) and with JavaScript disabled ({width}-nojs.jpg). Exits 1 when a check fails.
 *
 *   npm run audit:design -- /                                 (dev server on localhost:4321)
 *   npm run audit:design -- --base http://localhost:4321 / /gold-rate/
 *   npm run audit:design -- --only phone --no-shots /jewellery/
 *
 * Chrome: CHROME_PATH, else the standard Windows, macOS or Linux install.
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve as resolvePath } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

// ---------- Arguments ----------
const args = process.argv.slice(2);
const opt = { base: 'http://localhost:4321', out: '.shots', shots: true, only: null, json: false };
const paths = [];
for (let i = 0; i < args.length; i += 1) {
  const a = args[i];
  if (a === '--base') opt.base = args[(i += 1)];
  else if (a === '--out') opt.out = args[(i += 1)];
  else if (a === '--only') opt.only = args[(i += 1)];
  else if (a === '--no-shots') opt.shots = false;
  else if (a === '--json') opt.json = true;
  else if (a === '--help' || a === '-h') {
    console.log(
      'Usage: npm run audit:design -- [--base URL] [--out DIR] [--only desktop|phone] [--no-shots] [--json] /path/ ...',
    );
    process.exit(0);
  } else {
    // Git Bash on Windows rewrites "/about/" to "C:/Program Files/Git/about/": undo that.
    paths.push(a.replace(/^[A-Za-z]:[\\/].*?[\\/]Git([\\/].*)?$/, (_, rest) => rest ?? '/'));
  }
}
if (paths.length === 0) paths.push('/');
opt.base = opt.base.replace(/\/$/, '');

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, dpr: 1, mobile: false },
  { name: 'phone', width: 390, height: 844, dpr: 3, mobile: true },
].filter((v) => !opt.only || v.name === opt.only);

const ROOT = fileURLToPath(new URL('../', import.meta.url));

// ---------- Chrome ----------
function chromePath() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.LOCALAPPDATA &&
      join(process.env.LOCALAPPDATA, 'Google\\Chrome\\Application\\chrome.exe'),
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean);
  const found = candidates.find((p) => existsSync(p));
  if (!found) throw new Error('Chrome not found. Set CHROME_PATH to the Chrome executable.');
  return found;
}

async function launchChrome() {
  const profile = await mkdtemp(join(tmpdir(), 'cj-audit-'));
  const child = spawn(
    chromePath(),
    [
      '--headless=new',
      '--remote-debugging-port=0',
      `--user-data-dir=${profile}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-extensions',
      '--disable-background-networking',
      '--disable-component-update',
      '--disable-sync',
      '--hide-scrollbars',
      '--mute-audio',
      '--force-color-profile=srgb',
      'about:blank',
    ],
    { stdio: 'ignore' },
  );
  const portFile = join(profile, 'DevToolsActivePort');
  for (let i = 0; i < 150 && !existsSync(portFile); i += 1) await sleep(100);
  if (!existsSync(portFile)) throw new Error('Chrome did not open a DevTools port.');
  const [port, path] = (await readFile(portFile, 'utf8')).trim().split('\n');
  return {
    url: `ws://127.0.0.1:${port}${path}`,
    async close() {
      child.kill();
      await sleep(300);
      await rm(profile, { recursive: true, force: true }).catch(() => {});
    },
  };
}

// ---------- Minimal DevTools protocol client ----------
class Cdp {
  static open(url) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(url);
      ws.addEventListener('open', () => resolve(new Cdp(ws)));
      ws.addEventListener('error', () => reject(new Error(`Cannot connect to ${url}`)));
    });
  }

  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.listeners = new Set();
    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(String(event.data));
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject, method } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(`${method}: ${msg.error.message}`));
        else resolve(msg.result);
      } else if (msg.method) {
        for (const fn of this.listeners) fn(msg);
      }
    });
  }

  send(method, params = {}, sessionId) {
    const id = (this.id += 1);
    this.ws.send(JSON.stringify({ id, method, params, sessionId }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject, method }));
  }

  waitFor(method, sessionId, timeout = 30_000, test = () => true) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.listeners.delete(fn);
        reject(new Error(`Timed out waiting for ${method}`));
      }, timeout);
      const fn = (msg) => {
        if (msg.method !== method || msg.sessionId !== sessionId || !test(msg.params)) return;
        clearTimeout(timer);
        this.listeners.delete(fn);
        resolve(msg.params);
      };
      this.listeners.add(fn);
    });
  }

  close() {
    this.ws.close();
  }
}

// ---------- In-page probes (run with Runtime.evaluate) ----------
// These probes run in the page (Runtime.evaluate), not in Node.
function probeLoad() {
  const vw = document.documentElement.clientWidth;
  const vh = innerHeight;
  const ignore = (el) => el.closest('astro-dev-toolbar, astro-dev-overlay, vite-error-overlay');
  const label = (el) => {
    const parts = [];
    for (let n = el; n && n !== document.body && parts.length < 3; n = n.parentElement) {
      let s = n.tagName.toLowerCase();
      if (n.id) s += `#${n.id}`;
      else if (n.classList.length) s += `.${[...n.classList].slice(0, 2).join('.')}`;
      parts.unshift(s);
    }
    return parts.join(' > ');
  };

  // Elements in the first viewport that are not fully opaque at load.
  const faded = [];
  for (const el of document.body.querySelectorAll('*')) {
    if (ignore(el)) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility !== 'visible' || cs.display === 'none') continue;
    const op = Number.parseFloat(cs.opacity);
    if (!(op < 1)) continue;
    // Native radios and checkboxes hidden inside styled chips are a technique, not a fade.
    if (el.matches('input[type="radio"], input[type="checkbox"]') && op === 0) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2 || r.bottom <= 0 || r.top >= vh || r.right <= 0 || r.left >= vw)
      continue;
    faded.push(`${label(el)} (opacity ${op.toFixed(2)})`);
  }
  return { faded };
}

function probePage() {
  const vw = document.documentElement.clientWidth;
  const ignore = (el) => el.closest('astro-dev-toolbar, astro-dev-overlay, vite-error-overlay');
  const label = (el) => {
    const parts = [];
    for (let n = el; n && n !== document.body && parts.length < 3; n = n.parentElement) {
      let s = n.tagName.toLowerCase();
      if (n.id) s += `#${n.id}`;
      else if (n.classList.length) s += `.${[...n.classList].slice(0, 2).join('.')}`;
      parts.unshift(s);
    }
    return parts.join(' > ');
  };

  const main = document.querySelector('main');
  const words = main
    ? main.innerText.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length
    : 0;
  const h1 = [...document.querySelectorAll('h1')].filter((h) => !ignore(h)).length;

  // Horizontal overflow, and the elements that stick out (outside any scrolling container).
  const overflowPx = document.documentElement.scrollWidth - vw;
  const overflowing = [];
  if (overflowPx > 1) {
    for (const el of document.body.querySelectorAll('*')) {
      if (ignore(el)) continue;
      const r = el.getBoundingClientRect();
      if (r.right <= vw + 1 || r.width === 0) continue;
      let clipped = false;
      for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
        if (getComputedStyle(p).overflowX !== 'visible') {
          clipped = true;
          break;
        }
      }
      if (!clipped) overflowing.push(`${label(el)} (right ${Math.round(r.right)})`);
      if (overflowing.length >= 8) break;
    }
  }

  // Images drawn wider than their source.
  const upscaled = [];
  for (const img of document.images) {
    if (ignore(img) || !img.complete || !img.naturalWidth) continue;
    const r = img.getBoundingClientRect();
    if (r.width < 2) continue;
    const ws = [...(img.getAttribute('srcset') ?? '').matchAll(/\s(\d+)w(?:,|$)/g)].map((m) =>
      Number(m[1]),
    );
    const pic = img.parentElement?.tagName === 'PICTURE' ? img.parentElement : null;
    if (pic) {
      for (const s of pic.querySelectorAll('source')) {
        for (const m of (s.getAttribute('srcset') ?? '').matchAll(/\s(\d+)w(?:,|$)/g))
          ws.push(Number(m[1]));
      }
    }
    // Without a srcset, naturalWidth is the file's own pixel width. Vector images scale freely.
    if (/\.svg(\?|$)/i.test(img.currentSrc)) continue;
    const src = ws.length ? Math.max(...ws) : img.naturalWidth;
    const cs = getComputedStyle(img);
    const ratio = img.naturalWidth / img.naturalHeight;
    const boxW = r.width;
    const boxH = r.height;
    let drawn = boxW;
    if (cs.objectFit === 'cover') drawn = Math.max(boxW, boxH * ratio);
    else if (cs.objectFit === 'contain') drawn = Math.min(boxW, boxH * ratio);
    else if (cs.objectFit === 'none') drawn = src;
    else if (cs.objectFit === 'scale-down') drawn = Math.min(src, Math.min(boxW, boxH * ratio));
    if (drawn > src + 1)
      upscaled.push(`${label(img)}: drawn ${Math.round(drawn)} px from a ${src} px source`);
  }

  const priority = document.querySelectorAll('img[fetchpriority="high"]').length;
  const dev = Boolean(document.querySelector('script[src*="/@vite/client"]'));
  const inline = [...document.querySelectorAll('script:not([src])')].filter((s) => {
    const type = (s.getAttribute('type') ?? '').trim().toLowerCase();
    if (type && !['module', 'text/javascript', 'application/javascript'].includes(type))
      return false;
    return !(dev && /^\s*window\.__astro_dev_toolbar__/.test(s.textContent ?? ''));
  }).length;

  return {
    height: document.documentElement.scrollHeight,
    words,
    h1,
    overflowPx: Math.max(0, overflowPx),
    overflowing,
    upscaled,
    priority,
    inline,
    dev,
  };
}

/** Contrast of every text node fully inside the current viewport (deduplicated across calls). */
function probeContrast() {
  const vh = innerHeight;
  const vw = document.documentElement.clientWidth;
  const seen = (window.__auditSeen ??= new WeakSet());
  const canvas = (window.__auditCanvas ??= Object.assign(document.createElement('canvas'), {
    width: 1,
    height: 1,
  }));
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const rgba = (css) => {
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#000';
    ctx.fillStyle = css;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    // getImageData un-premultiplies; transparent reads as alpha 0.
    return [r, g, b, a / 255];
  };
  const lum = ([r, g, b]) => {
    const f = (c) => {
      const s = c / 255;
      return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const over = (top, under) => {
    const a = top[3];
    return [0, 1, 2].map((i) => top[i] * a + under[i] * (1 - a)).concat(1);
  };
  const hex = (c) =>
    `#${c
      .slice(0, 3)
      .map((v) => Math.round(v).toString(16).padStart(2, '0'))
      .join('')}`;
  const label = (el) => {
    const parts = [];
    for (let n = el; n && n !== document.body && parts.length < 3; n = n.parentElement) {
      let s = n.tagName.toLowerCase();
      if (n.id) s += `#${n.id}`;
      else if (n.classList.length) s += `.${[...n.classList].slice(0, 2).join('.')}`;
      parts.unshift(s);
    }
    return parts.join(' > ');
  };

  const fails = [];
  let checked = 0;
  let skipped = 0;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node.textContent.trim();
    const el = node.parentElement;
    if (!text || !el || seen.has(node)) continue;
    // Separators and ornaments ("/", "·") carry no information: WCAG 1.4.3 exempts decoration.
    if (!/[\p{L}\p{N}]/u.test(text)) continue;
    if (el.closest('script, style, noscript, template, astro-dev-toolbar, svg')) continue;
    const range = document.createRange();
    range.selectNodeContents(node);
    const rect = range.getBoundingClientRect();
    const first = range.getClientRects()[0];
    if (!first || rect.width < 2 || rect.height < 2) continue;
    if (rect.top < 0 || rect.bottom > vh || rect.left < 0 || rect.right > vw) continue;
    seen.add(node);
    const cs = getComputedStyle(el);
    if (cs.visibility !== 'visible') continue;
    let opacity = 1;
    for (let n = el; n; n = n.parentElement)
      opacity *= Number.parseFloat(getComputedStyle(n).opacity);
    if (opacity < 0.99) {
      skipped += 1; // still fading or hidden by design: not a settled colour
      continue;
    }
    // Walk the paint stack under the text's centre: the first image or gradient means the
    // ground is not solid (not checked); solid colours composite until opaque.
    const x = first.left + Math.min(first.width / 2, 8);
    const y = first.top + first.height / 2;
    const stack = document.elementsFromPoint(x, y);
    const start = stack.findIndex((n) => n === el || el.contains(n) || n.contains(el));
    if (start < 0) continue;
    let bg = null;
    let layers = [];
    let solid = true;
    for (const n of stack.slice(start)) {
      if (n !== el && !n.contains(el) && el.contains(n)) continue;
      if (['IMG', 'VIDEO', 'CANVAS', 'PICTURE', 'IFRAME'].includes(n.tagName)) {
        solid = false;
        break;
      }
      const ns = getComputedStyle(n);
      if (ns.backgroundImage && ns.backgroundImage !== 'none') {
        solid = false;
        break;
      }
      const c = rgba(ns.backgroundColor);
      if (c[3] === 0) continue;
      layers.push(c);
      if (c[3] >= 1) {
        bg = c;
        break;
      }
    }
    if (!solid) continue;
    if (!bg) {
      bg = [255, 255, 255, 1];
      layers.push(bg);
    }
    // Composite translucent layers from the bottom up.
    let ground = layers.pop();
    while (layers.length) ground = over(layers.pop(), ground);
    const fg = over(rgba(cs.color), ground);
    const l1 = lum(fg);
    const l2 = lum(ground);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    const size = Number.parseFloat(cs.fontSize);
    const bold = Number.parseInt(cs.fontWeight, 10) >= 700;
    const large = size >= 24 || (bold && size >= 18.66);
    const need = large ? 3 : 4.5;
    checked += 1;
    if (ratio + 0.005 < need) {
      fails.push(
        `"${text.slice(0, 40)}" ${hex(fg)} on ${hex(ground)} = ${ratio.toFixed(2)}:1 (needs ${need}:1, ${size}px) at ${label(el)}`,
      );
    }
  }
  return { fails, checked, skipped };
}

// ---------- Page driver ----------
async function evaluate(cdp, session, fn) {
  const { result, exceptionDetails } = await cdp.send(
    'Runtime.evaluate',
    { expression: `(${fn.toString()})()`, returnByValue: true, awaitPromise: true },
    session,
  );
  if (exceptionDetails) throw new Error(exceptionDetails.exception?.description ?? 'Page error');
  return result.value;
}

async function load(cdp, session, url) {
  const loaded = cdp.waitFor('Page.loadEventFired', session, 60_000);
  const nav = await cdp.send('Page.navigate', { url }, session);
  if (nav.errorText) throw new Error(`${url}: ${nav.errorText}`);
  await loaded;
  // Wait for the fonts; drop the Astro dev toolbar so it is not in the screenshots.
  await evaluate(cdp, session, () =>
    document.fonts.ready.then(() => {
      // The toolbar may be created after load, so hide it with a rule rather than removing it.
      const hide = document.createElement('style');
      hide.textContent = 'astro-dev-toolbar { display: none !important; }';
      document.head.append(hide);
      return true;
    }),
  );
}

async function shot(cdp, session, file, vp) {
  // Phones are captured at 2x (sharp enough to judge, a third of the bytes of 3x).
  const scale = Math.min(1, 2 / vp.dpr);
  // The clip is in document coordinates, so it starts at the current scroll position.
  const y = await evaluate(cdp, session, () => window.scrollY);
  const { data } = await cdp.send(
    'Page.captureScreenshot',
    {
      format: 'jpeg',
      quality: 82,
      clip: { x: 0, y, width: vp.width, height: vp.height, scale },
      captureBeyondViewport: false,
    },
    session,
  );
  await mkdir(join(file, '..'), { recursive: true });
  await writeFile(file, Buffer.from(data, 'base64'));
}

async function newPage(cdp, vp) {
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  await cdp.send('Page.enable', {}, sessionId);
  await cdp.send('Runtime.enable', {}, sessionId);
  await cdp.send(
    'Emulation.setDeviceMetricsOverride',
    {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: vp.dpr,
      mobile: vp.mobile,
      screenWidth: vp.width,
      screenHeight: vp.height,
    },
    sessionId,
  );
  if (vp.mobile) {
    await cdp.send(
      'Emulation.setTouchEmulationEnabled',
      { enabled: true, maxTouchPoints: 5 },
      sessionId,
    );
  }
  return {
    sessionId,
    close: () => cdp.send('Target.closeTarget', { targetId }).catch(() => {}),
  };
}

const slug = (path) => path.replace(/[?#].*$/, '').replace(/^\/+|\/+$/g, '') || 'home';

async function auditPath(cdp, path, vp) {
  const url = `${opt.base}${path}`;
  // resolve, not join: an absolute --out stays absolute instead of being nested under ROOT.
  const dir = resolvePath(ROOT, opt.out, ...slug(path).split('/'));
  const result = { path, viewport: `${vp.width}x${vp.height}`, failures: [] };

  // 1. Normal run: first-viewport opacity at load, page metrics, scroll screenshots, contrast.
  const page = await newPage(cdp, vp);
  try {
    await load(cdp, page.sessionId, url);
    const { faded } = await evaluate(cdp, page.sessionId, probeLoad);
    await sleep(800);
    const metrics = await evaluate(cdp, page.sessionId, probePage);
    Object.assign(result, metrics, { faded });

    const contrast = { fails: [], checked: 0, skipped: 0 };
    const step = Math.round(vp.height * 0.9);
    let n = 0;
    for (let y = 0; n < 60; y += step) {
      await cdp.send(
        'Runtime.evaluate',
        { expression: `window.scrollTo({ top: ${y}, behavior: 'instant' })` },
        page.sessionId,
      );
      await sleep(500);
      const c = await evaluate(cdp, page.sessionId, probeContrast);
      contrast.fails.push(...c.fails);
      contrast.checked += c.checked;
      contrast.skipped += c.skipped;
      n += 1;
      if (opt.shots)
        await shot(
          cdp,
          page.sessionId,
          join(dir, `${vp.width}-${String(n).padStart(2, '0')}.jpg`),
          vp,
        );
      const { scrollY, innerHeight, height } = await evaluate(cdp, page.sessionId, () => ({
        scrollY: Math.round(window.scrollY),
        innerHeight: window.innerHeight,
        height: document.documentElement.scrollHeight,
      }));
      if (scrollY + innerHeight >= height - 2) break;
    }
    result.contrast = contrast;
    result.shots = opt.shots ? n : 0;
  } finally {
    await page.close();
  }

  // 2. Reduced motion, first viewport.
  if (opt.shots) {
    const reduced = await newPage(cdp, vp);
    try {
      await cdp.send(
        'Emulation.setEmulatedMedia',
        { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] },
        reduced.sessionId,
      );
      await load(cdp, reduced.sessionId, url);
      await sleep(800);
      await shot(cdp, reduced.sessionId, join(dir, `${vp.width}-reduced.jpg`), vp);
    } finally {
      await reduced.close();
    }

    // 3. JavaScript disabled, first viewport.
    const nojs = await newPage(cdp, vp);
    try {
      await cdp.send('Emulation.setScriptExecutionDisabled', { value: true }, nojs.sessionId);
      await load(cdp, nojs.sessionId, url);
      await sleep(800);
      await shot(cdp, nojs.sessionId, join(dir, `${vp.width}-nojs.jpg`), vp);
    } finally {
      await nojs.close();
    }
  }

  // Verdicts.
  const f = result.failures;
  if (result.h1 !== 1) f.push(`${result.h1} H1 elements (exactly one expected)`);
  if (result.overflowPx > 1) f.push(`horizontal overflow of ${result.overflowPx} px`);
  if (result.upscaled.length) f.push(`${result.upscaled.length} image(s) drawn wider than source`);
  if (result.priority > 1) f.push(`${result.priority} fetchpriority="high" images (at most 1)`);
  if (result.inline > 0) f.push(`${result.inline} inline script(s)`);
  if (result.faded.length)
    f.push(`${result.faded.length} element(s) below opacity 1 in the first viewport`);
  if (result.contrast.fails.length) f.push(`${result.contrast.fails.length} contrast failure(s)`);
  return result;
}

function report(r) {
  const ok = r.failures.length === 0;
  console.log(`\n${ok ? 'PASS' : 'FAIL'}  ${r.path}  @ ${r.viewport}`);
  console.log(
    `  height ${r.height} px · ${r.words} words in <main> · H1 ${r.h1} · overflow ${r.overflowPx} px · priority images ${r.priority} · inline scripts ${r.inline}${r.dev ? ' (dev server: the toolbar script is ignored; run npm run audit on a build)' : ''}`,
  );
  console.log(
    `  contrast: ${r.contrast.checked} text nodes checked, ${r.contrast.skipped} skipped (still fading), ${r.contrast.fails.length} failing`,
  );
  if (r.shots)
    console.log(`  ${r.shots} screenshots + reduced + nojs in ${join(opt.out, slug(r.path))}`);
  for (const line of r.failures) console.log(`  x ${line}`);
  for (const line of r.overflowing ?? []) console.log(`    overflow: ${line}`);
  for (const line of r.upscaled) console.log(`    upscaled: ${line}`);
  for (const line of r.faded) console.log(`    faded: ${line}`);
  for (const line of r.contrast.fails.slice(0, 25)) console.log(`    contrast: ${line}`);
  if (r.contrast.fails.length > 25) console.log(`    ... and ${r.contrast.fails.length - 25} more`);
}

// ---------- Main ----------
const chrome = await launchChrome();
let failed = false;
const results = [];
try {
  const cdp = await Cdp.open(chrome.url);
  try {
    for (const path of paths) {
      for (const vp of VIEWPORTS) {
        const r = await auditPath(cdp, path.startsWith('/') ? path : `/${path}`, vp);
        results.push(r);
        if (r.failures.length) failed = true;
        if (!opt.json) report(r);
      }
    }
  } finally {
    cdp.close();
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  failed = true;
} finally {
  await chrome.close();
}
if (opt.json) console.log(JSON.stringify(results, null, 2));
process.exitCode = failed ? 1 : 0;
