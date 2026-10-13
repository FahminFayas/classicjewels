/**
 * Audits the built site in dist/ against the SEO and content contract in CLAUDE.md.
 * Run after a build; exits non-zero when any page fails, so CI can gate on it.
 *
 *   npm run build && npm run audit
 *
 * Checks per page: one <h1>; <title> and meta description present and within length; canonical
 * matches the page URL; no links to "#"; every internal link and asset resolves to a file in
 * dist/; every <img> has an alt attribute; every JSON-LD block parses; no banned phrases, em
 * dashes or leftover TODO / placeholder text in visible copy.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const ORIGIN = 'https://classicjewels.ae';
const TITLE_MAX = 60; // suffix included; Google shows roughly 60 characters
const DESC_MIN = 70;
const DESC_MAX = 160;

const BANNED = [
  /\bWelcome to\b/,
  /\bdiscover\b/i,
  /\belevate\b/i,
  /\bunleash\b/i,
  /\bexperience the\b/i,
  /\btimeless elegance\b/i,
  /\bexquisite\b/i,
  /\bstunning\b/i,
  /\bnestled\b/i,
  /\ba testament to\b/i,
  /\bcrafted with passion\b/i,
  /\blorem ipsum\b/i,
  /\bTODO\b/,
  /\bplaceholder\b/i,
  /\bHiraola\b/i,
];

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

/** Maps a root-relative URL path to the file Apache would serve from dist/. */
async function resolves(pathname) {
  const clean = decodeURIComponent(pathname.split('#')[0].split('?')[0]);
  if (clean === '' || clean === '/') return exists(join(DIST, 'index.html'));
  const target = join(DIST, clean);
  if (clean.endsWith('/')) return exists(join(target, 'index.html'));
  return (await exists(target)) || exists(join(target, 'index.html'));
}

/** Visible text: strip scripts, styles, SVG and tags, collapse whitespace. */
function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<head[\s\S]*?<\/head>/i, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ');
}

const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'i'))?.[1];

const files = (await walk(DIST)).filter((f) => f.endsWith('.html'));
const report = [];
let failures = 0;

for (const file of files.sort()) {
  const rel = relative(DIST, file).split(sep).join('/');
  const urlPath = '/' + rel.replace(/index\.html$/, '').replace(/\.html$/, '');
  const html = await readFile(file, 'utf8');
  const problems = [];
  const isUtility = rel === '404.html';

  const h1s = html.match(/<h1[\s>]/gi)?.length ?? 0;
  if (h1s !== 1) problems.push(`${h1s} <h1> elements`);

  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.replace(/&amp;/g, '&') ?? '';
  if (!title) problems.push('missing <title>');
  else if (title.length > TITLE_MAX) problems.push(`title ${title.length} chars: "${title}"`);

  const desc = attr(html.match(/<meta name="description"[^>]*>/i)?.[0] ?? '', 'content') ?? '';
  if (!desc) problems.push('missing meta description');
  else if (desc.length < DESC_MIN || desc.length > DESC_MAX + 1)
    problems.push(`description ${desc.length} chars`);

  const canonical = attr(html.match(/<link rel="canonical"[^>]*>/i)?.[0] ?? '', 'href');
  if (!isUtility && canonical !== ORIGIN + urlPath)
    problems.push(`canonical ${canonical} != ${ORIGIN + urlPath}`);

  for (const tag of html.match(/<a\s[^>]*>/gi) ?? []) {
    const href = attr(tag, 'href');
    if (href === undefined) continue;
    if (href === '#' || href === '') problems.push(`link to "${href}"`);
    else if (href.startsWith('/') && !href.startsWith('//') && !(await resolves(href)))
      problems.push(`broken link ${href}`);
  }

  for (const tag of html.match(/<(img|source|link|script)\s[^>]*>/gi) ?? []) {
    for (const name of ['src', 'href']) {
      const value = attr(tag, name);
      if (value?.startsWith('/') && !value.startsWith('//') && !(await resolves(value)))
        problems.push(`missing asset ${value}`);
    }
  }

  for (const tag of html.match(/<img\s[^>]*>/gi) ?? []) {
    // Astro renders an empty alt as the bare attribute `alt`, which HTML treats as alt="".
    if (!/\salt(=|\s|>|\/)/i.test(tag)) problems.push(`img without alt: ${attr(tag, 'src')}`);
  }

  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(json);
    } catch (e) {
      problems.push(`invalid JSON-LD: ${e.message}`);
    }
  }

  const text = visibleText(html);
  for (const re of BANNED) {
    const m = text.match(re);
    if (m) problems.push(`banned phrase "${m[0]}" near "…${text.slice(Math.max(0, m.index - 40), m.index + 40)}…"`);
  }
  if (text.includes('—')) {
    const i = text.indexOf('—');
    problems.push(`em dash near "…${text.slice(Math.max(0, i - 40), i + 40)}…"`);
  }

  const noindex = /<meta name="robots" content="noindex/i.test(html);
  report.push({ urlPath, title, problems, noindex });
  if (problems.length) failures += 1;
}

// Duplicate titles across indexable pages.
const indexable = report.filter((r) => !r.noindex);
const seen = new Map();
for (const r of indexable) {
  const prev = seen.get(r.title);
  if (prev) {
    r.problems.push(`duplicate title with ${prev}`);
    failures += 1;
  } else seen.set(r.title, r.urlPath);
}

for (const r of report) {
  if (!r.problems.length) continue;
  console.log(`\n${r.urlPath}`);
  for (const p of r.problems) console.log(`  - ${p}`);
}
console.log(
  `\n${report.length} pages audited, ${indexable.length} indexable, ${failures} with problems.`,
);
process.exit(failures ? 1 : 0);
