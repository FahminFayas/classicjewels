/**
 * Renders the favicon set, the PWA icons, the web manifest and the default Open Graph image
 * from the traced brand mark in scripts/_lib.mjs and the facts in src/data/site.ts.
 *
 *   npm run assets:brand              write everything to public/
 *   npm run assets:brand -- --compare only rasterise the traced mark at 200 x 200 and report
 *                                     how far it is from src/assets/brand/monogram.png
 *   npm run assets:brand -- --proofs  also write size proofs (16/32/48 px on light and dark
 *                                     strips) to .shots/brand/ for a look
 *
 * Every raster starts from the same geometry, so a change to the mark is a one-place edit.
 * Small sizes are drawn with heavier strokes (the mark is a hairline ring at 16 px otherwise)
 * and the mark fills more of the square than it does in the company's own 200 px PNG.
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { BRAND, ROOT, ensureDir, icoFromPngs, loadSite, markSvg, typeset } from './_lib.mjs';

const out = (rel) => fileURLToPath(new URL(rel, ROOT));
const args = new Set(process.argv.slice(2));

const FG = BRAND.champagne;
const GROUND = BRAND.stage;

/** Rasterises the mark at `px` square. `scale` and `weight` as in markSvg. */
async function raster(px, { scale, weight, ground = GROUND, fg = FG }) {
  const svg = markSvg({ size: px, fg, ground, scale, weight });
  // librsvg renders the 200-unit frame at 72 dpi for the given width; sharpen nothing.
  return sharp(Buffer.from(svg), { density: 72 })
    .resize(px, px)
    .png({ compressionLevel: 9 })
    .toBuffer();
}

// --- Fidelity check against the source PNG -----------------------------------------------
if (args.has('--compare')) {
  const src = out('src/assets/brand/monogram.png');
  const ref = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const bg = [ref.data[0], ref.data[1], ref.data[2]];
  // The monogram file's own colours, so only geometry is compared.
  const svg = markSvg({ size: 200, fg: '#bdaa67', ground: '#4b2849' });
  const test = await sharp(Buffer.from(svg), { density: 72 })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const coverage = ({ data, info }) => {
    const n = info.width * info.height;
    const cov = new Float32Array(n);
    let max = 0;
    for (let i = 0; i < n; i++) {
      const o = i * info.channels;
      cov[i] = Math.hypot(data[o] - bg[0], data[o + 1] - bg[1], data[o + 2] - bg[2]);
      max = Math.max(max, cov[i]);
    }
    return cov.map((v) => Math.min(1, v / max));
  };
  const a = coverage(ref);
  const b = coverage(test);
  let union = 0;
  let inter = 0;
  for (let i = 0; i < a.length; i++) {
    const pa = a[i] >= 0.5;
    const pb = b[i] >= 0.5;
    if (pa || pb) union++;
    if (pa && pb) inter++;
  }
  console.log(
    `mark vs monogram.png at 200 x 200: ${inter} of ${union} ink pixels agree, ` +
      `mismatch ${((100 * (union - inter)) / union).toFixed(2)}% of the ink, ` +
      `${((100 * (union - inter)) / a.length).toFixed(2)}% of the frame`,
  );
  process.exit(0);
}

const { site } = await loadSite();

// --- favicon.svg: the mark filling the square, strokes half as heavy again for tab sizes ------
// (browsers draw the SVG at 16 px on 1x screens, where the measured ring would be 0.6 px).
const FAVICON = { scale: 1.4, weight: 1.5 };
await writeFile(
  out('public/favicon.svg'),
  markSvg({ size: 64, fg: FG, ground: GROUND, ...FAVICON, title: site.name }) + '\n',
);

// --- favicon.ico: 16, 32 and 48 px, each drawn for its size ----------------------------------
const ICO_SIZES = [
  [16, { scale: 1.45, weight: 2 }],
  [32, { scale: 1.4, weight: 1.5 }],
  [48, { scale: 1.4, weight: 1.25 }],
];
const icoEntries = [];
for (const [size, opts] of ICO_SIZES) icoEntries.push({ size, png: await raster(size, opts) });
await writeFile(out('public/favicon.ico'), icoFromPngs(icoEntries));

// --- Touch and PWA icons ---------------------------------------------------------------------
// iOS masks its own corners; the ring keeps a 7% margin. The maskable icon keeps the whole ring
// inside the 80% safe circle (ring outer edge at 76 of the 100-unit half-frame).
const ICONS = [
  ['public/apple-touch-icon.png', 180, { scale: 1.25, weight: 1 }],
  ['public/icons/icon-192.png', 192, { scale: 1.3, weight: 1 }],
  ['public/icons/icon-512.png', 512, { scale: 1.3, weight: 1 }],
  ['public/icons/icon-512-maskable.png', 512, { scale: 1.1, weight: 1 }],
];
for (const [rel, size, opts] of ICONS) {
  await ensureDir(out(rel));
  await writeFile(out(rel), await raster(size, opts));
}

// --- site.webmanifest from src/data/site.ts ----------------------------------------------------
const manifest = {
  id: '/',
  name: site.name,
  short_name: site.shortName,
  description: site.tagline,
  lang: 'en',
  start_url: '/',
  display: 'browser',
  background_color: BRAND.stage,
  theme_color: BRAND.stage,
  icons: [
    { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    {
      src: '/icons/icon-512-maskable.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    },
  ],
};
await writeFile(out('public/site.webmanifest'), JSON.stringify(manifest, null, 2) + '\n');

// --- Default Open Graph image (1200 x 630): the mark and the name typeset in the site's faces --
const fonts = {
  display: out('src/assets/fonts/cormorant-garamond-wght-normal.woff2'),
  text: out('src/assets/fonts/ibm-plex-sans-wght-normal.woff2'),
};
/**
 * Wraps a line by measured width: one line when it fits, otherwise the most even two-line break
 * that fits (so the second line is never a single word). Returns the typeset lines.
 */
async function wrap(fontFile, text, opts, maxWidth) {
  const measure = (s) => typeset(fontFile, s, opts);
  const whole = await measure(text);
  if (whole.width <= maxWidth) return [whole];
  const words = text.split(' ');
  let best;
  for (let i = 1; i < words.length; i++) {
    const a = await measure(words.slice(0, i).join(' '));
    const b = await measure(words.slice(i).join(' '));
    if (a.width > maxWidth || b.width > maxWidth) continue;
    const spread = Math.abs(a.width - b.width);
    if (!best || spread < best.spread) best = { spread, lines: [a, b] };
  }
  if (!best) throw new Error(`"${text}" does not fit in two lines of ${maxWidth} px`);
  return best.lines;
}

const textX = 500;
const column = 1200 - textX - 60;
const name = await typeset(fonts.display, 'Classic', { size: 176, weight: 300 });
const sub = await typeset(fonts.text, 'JEWELS & DIAMONDS', {
  size: 26,
  weight: 500,
  letterSpacing: 7,
});
const tagline = await wrap(fonts.text, site.tagline, { size: 30, weight: 400 }, column);
const domain = await typeset(fonts.text, new URL(site.url).host, { size: 26, weight: 500 });

const markSize = 400;
const mark = markSvg({ size: markSize, fg: FG, ground: GROUND, scale: 1.35, weight: 1 });
const markInner = mark
  .replace(/^<svg[^>]*>/, '')
  .replace(/<\/svg>$/, '')
  .replace(/<rect[^>]*\/>/, '');
const taglineTop = 424;
const lineHeight = 44;
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${GROUND}"/>
  <g transform="translate(88 122) scale(${markSize / 200})">${markInner}</g>
  <g fill="${BRAND.onStage}" transform="translate(${textX} 262)">${name.markup}</g>
  <g fill="${BRAND.bronze}" transform="translate(${textX + 6} 318)">${sub.markup}</g>
  <line x1="${textX}" y1="368" x2="${textX + 120}" y2="368" stroke="${BRAND.bronze}" stroke-width="1"/>
  ${tagline.map((line, i) => `<g fill="${BRAND.onStageBody}" transform="translate(${textX} ${taglineTop + i * lineHeight})">${line.markup}</g>`).join('\n  ')}
  <g fill="${BRAND.champagne}" transform="translate(${textX} ${taglineTop + tagline.length * lineHeight + 30})">${domain.markup}</g>
</svg>`;
await ensureDir(out('public/og/default.png'));
await sharp(Buffer.from(og), { density: 72 })
  .png({ compressionLevel: 9 })
  .toFile(out('public/og/default.png'));

// --- Size proofs for the eye -------------------------------------------------------------------
if (args.has('--proofs')) {
  const dir = out('.shots/brand/');
  await ensureDir(`${dir}favicon-16-light.png`);
  for (const [size, opts] of ICO_SIZES) {
    const png = await raster(size, opts);
    const svgPng = await sharp(Buffer.from(markSvg({ size, fg: FG, ground: GROUND, ...FAVICON })), {
      density: 72,
    })
      .resize(size, size)
      .png()
      .toBuffer();
    for (const [strip, bgc] of [
      ['light', '#f1f3f4'],
      ['dark', '#202124'],
    ]) {
      // The icon as it sits in a tab strip at 1x, enlarged 8x for a look (nearest neighbour).
      const canvas = sharp({
        create: { width: size * 2 + 24, height: size + 16, channels: 3, background: bgc },
      })
        .composite([
          { input: png, left: 8, top: 8 },
          { input: svgPng, left: size + 16, top: 8 },
        ])
        .png();
      await canvas.toBuffer().then((b) =>
        sharp(b)
          .resize((size * 2 + 24) * 8, (size + 16) * 8, { kernel: 'nearest' })
          .toFile(`${dir}favicon-${size}-${strip}.png`),
      );
    }
  }
  console.log(`proofs written to ${dir}`);
}

console.log(
  'favicon.svg, favicon.ico, apple-touch-icon.png, icons/, site.webmanifest and og/default.png written to public/',
);
