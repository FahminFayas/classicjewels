// Shared helpers for the maintenance scripts in this folder.
import { mkdir, readFile, stat } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const ROOT = new URL('../', import.meta.url);

export async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

export async function ensureDir(filePath) {
  await mkdir(dirname(filePath), { recursive: true });
}

/**
 * Brand colours as hex, for scripts that draw outside the CSS token system. They mirror
 * src/styles/tokens.css (stage-0, bronze, champagne, plum-700, ivory); change them together.
 */
export const BRAND = {
  stage: '#0b0918',
  stageRaised: '#110e24',
  bronze: '#be8658',
  champagne: '#dcc29a',
  plum: '#4b2849',
  ivory: '#faf7f2',
  onStage: '#faf7f2',
  onStageBody: '#ddd5df',
  onStageMuted: '#a99fb5',
};

/**
 * Loads src/data/site.ts in a plain Node script. The file is TypeScript with a type-only import,
 * so it is transpiled with the project's own `typescript` and evaluated as a data: module.
 */
export async function loadSite() {
  const ts = (await import('typescript')).default;
  const source = await readFile(new URL('src/data/site.ts', ROOT), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  const url = `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`;
  return import(url);
}

// --- The brand mark ----------------------------------------------------------------------
//
// The company's monogram (src/assets/brand/monogram.png, 200 x 200) traced as geometry in the
// same 200-unit frame: a thin ring, the C set inside it on the same centre, and a figure-of-
// eight knot tied in the C's own stroke at nine o'clock. The C's stroke enters the knot from
// the top, passes over the top of the upper loop, dives under the centre crossing, swings out as
// the right side of the lower loop, comes round the bottom and up the left side, crosses the
// centre again, over the top of the upper loop and down its left side, then leaves the centre
// crossing on top and continues as the lower half of the C. Crossings are drawn with a short
// gap in the strand underneath, as the original has.
//
// Measured from the PNG (coverage threshold 0.5) and then fitted to it by coordinate descent
// (scripts/generate-brand-assets.mjs --compare reports the remaining mismatch): ring stroke
// from r 62.6 to 68.1; C stroke from r 45.1 to 50.6, ends cut at 31 deg and 323 deg (screen
// angles, clockwise from three o'clock); knot strands 5.5 wide with 1 px gaps at the crossings.

const MARK = {
  ring: { r: 65.35, w: 5.425 },
  c: { r: 47.83, w: 5.5, start: 30.7, end: 323.3 },
  knot: { w: 5.5, gap: 0.95 },
};

/** Screen angles on the C's circle where the stroke leaves it into the knot and rejoins it. */
const ENTRY_DEG = 184;
const EXIT_DEG = 141;

const rad = (deg) => (deg * Math.PI) / 180;
const onCircle = (r, deg) => [100 + r * Math.cos(rad(deg)), 100 + r * Math.sin(rad(deg))];
const fmt = (n) => (Math.round(n * 100) / 100).toString();

/**
 * The knot's centreline as one polyline from where the stroke leaves the circle (first three
 * points on it, going down the left side) to where it rejoins it (last three points on it). It
 * is drawn in three overlapping pieces, lowest first, so that each piece cuts a gap in the one
 * beneath where it crosses:
 *
 *   under  [0, UNDER_END]   down under the centre, out as the lower loop's right side, round the
 *                           bottom and up its left side into the centre
 *   loop   [UNDER_END, LOOP_END]   up the upper loop's right side, over its top, down its left
 *   over   [LOOP_END, end]  through the centre on top, down the lower loop's diagonal, over the
 *                           bottom and back onto the circle
 *
 * The upper half of the C (the "entry" arc) is drawn last and lies over the upper loop's top.
 */
const KNOT_PATH = [
  ...[190, 187, ENTRY_DEG].map((deg) => onCircle(MARK.c.r, deg).map((v) => +v.toFixed(2))),
  [52.23, 98.16],
  [55.15, 101.47],
  [58.72, 102.82],
  [60.63, 104.78],
  [62.3, 107.07],
  [63.1, 108.5],
  [64.5, 111.97],
  [64.58, 116.34],
  [62.46, 119.8],
  [59.06, 121.74],
  [53.94, 121.8],
  [49.84, 119.22],
  [47.72, 115.5],
  [47.5, 112.37],
  [48.0, 110.07],
  [49.35, 107.43],
  [52.18, 105.18],
  [53.53, 103.17],
  [55.98, 102.28],
  [57.52, 100.49],
  [59.3, 98.15],
  [60.52, 95.73],
  [61.0, 94.35],
  [61.55, 91.8],
  [61.5, 89.2],
  [61.08, 87.5],
  [59.35, 84.8],
  [57.8, 83.83],
  [55.84, 82.99],
  [51.52, 82.67],
  [48.12, 84.5],
  [46.52, 86.15],
  [45.4, 88.35],
  [45.02, 89.96],
  [45.1, 91.81],
  [45.3, 93.88],
  [45.5, 94.44],
  [47.28, 98.33],
  [48.0, 99.3],
  [49.35, 101.23],
  [51.13, 103.58],
  [52.36, 105.23],
  [53.54, 106.84],
  [54.72, 108.5],
  [56.15, 110.85],
  [57.2, 113.19],
  [57.65, 115.34],
  [57.85, 118.44],
  [58.62, 122.51],
  [60.2, 125.53],
  ...[145, 143, EXIT_DEG].map((deg) => onCircle(MARK.c.r, deg).map((v) => +v.toFixed(2))),
];
const UNDER_END = 18; // index of the hidden point under the centre where "under" hands over
const LOOP_END = 38; // index on the left side where "loop" hands over to "over"

/** Arc of a circle about the centre from one screen angle to another, the short way round. */
function arcTo(r, fromDeg, toDeg) {
  const [x1, y1] = onCircle(r, toDeg);
  const sweep = toDeg > fromDeg ? 1 : 0;
  const large = Math.abs(toDeg - fromDeg) > 180 ? 1 : 0;
  return `A${r} ${r} 0 ${large} ${sweep} ${fmt(x1)} ${fmt(y1)}`;
}

/**
 * Catmull-Rom spline through points[from..to] as cubic Beziers. Tangents use the neighbours in
 * the full array, so pieces of one polyline join without a seam.
 */
function splinePath(points, from = 0, to = points.length - 1) {
  const at = (i) => points[Math.max(0, Math.min(points.length - 1, i))];
  let d = `M${fmt(points[from][0])} ${fmt(points[from][1])}`;
  for (let i = from; i < to; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${fmt(c1[0])} ${fmt(c1[1])} ${fmt(c2[0])} ${fmt(c2[1])} ${fmt(p2[0])} ${fmt(p2[1])}`;
  }
  return d;
}

/** The measured and fitted geometry, exported so the fitting script can start from it. */
export const MARK_GEOMETRY = {
  mark: MARK,
  path: KNOT_PATH,
  splits: { under: UNDER_END, loop: LOOP_END },
};

/**
 * The mark as SVG markup (a 200-unit frame centred on 100,100).
 *
 * @param {object} o
 * @param {string} o.fg      stroke colour of the mark
 * @param {string} o.ground  colour behind the mark; needed for the gaps at the knot's crossings
 * @param {number} [o.weight=1]  stroke multiplier for small renderings (1 = as measured)
 * @param {object} [o.geometry]  override of MARK_GEOMETRY (used by the fitting script)
 */
export function markBody({ fg, ground, weight = 1, geometry = MARK_GEOMETRY }) {
  const { mark, path, splits } = geometry;
  const wRing = mark.ring.w * weight;
  const wC = mark.c.w * weight;
  const wK = mark.knot.w * weight;
  // The gap grows a little slower than the stroke so bold small renderings keep their eyes.
  const gap = mark.knot.gap * (0.5 + weight / 2);
  const stroke = (d, w) =>
    `<path d="${d}" fill="none" stroke="${fg}" stroke-width="${fmt(w)}" stroke-linejoin="round"/>`;
  // The gap stroke starts one point into its piece, so its end sits inside the piece's own
  // stroke instead of across the piece before it (which would leave a hairline seam).
  const cut = (d, w) =>
    `<path d="${d}" fill="none" stroke="${ground}" stroke-width="${fmt(w + 2 * gap)}" stroke-linejoin="round"/>`;

  // Each stroke runs one point into the next piece as well, so no two butt ends meet on a pixel
  // row (two half-covered ends over each other read as a hairline).
  const under = splinePath(path, 0, splits.under + 1);
  const loop = splinePath(path, splits.under, splits.loop + 1);
  const loopCut = splinePath(path, splits.under + 1, splits.loop);
  const exit = arcTo(mark.c.r, EXIT_DEG, mark.c.start);
  const over = splinePath(path, splits.loop) + exit;
  const overCut = splinePath(path, splits.loop + 1) + exit;
  const [ex, ey] = onCircle(mark.c.r, mark.c.end);
  const entry = `M${fmt(ex)} ${fmt(ey)}${arcTo(mark.c.r, mark.c.end, ENTRY_DEG)}`;
  const entryCut = `M${fmt(ex)} ${fmt(ey)}${arcTo(mark.c.r, mark.c.end, ENTRY_DEG + 6)}`;

  return [
    `<circle cx="100" cy="100" r="${mark.ring.r}" fill="none" stroke="${fg}" stroke-width="${fmt(wRing)}"/>`,
    stroke(under, wK),
    cut(loopCut, wK),
    stroke(loop, wK),
    cut(overCut, wK),
    stroke(over, wK),
    cut(entryCut, wC),
    stroke(entry, wC),
  ].join('');
}

/**
 * A complete SVG of the mark on a square ground.
 *
 * @param {object} o
 * @param {number} [o.size=200]  width and height attributes (the viewBox is always 0 0 200 200)
 * @param {string} o.fg
 * @param {string} o.ground      square ground colour
 * @param {number} [o.scale=1]   enlarges the mark about the centre (1 = the PNG's framing)
 * @param {number} [o.weight=1]  stroke multiplier
 * @param {string} [o.title]     accessible name; omit for a purely decorative render
 * @param {object} [o.geometry]
 */
export function markSvg({ size = 200, fg, ground, scale = 1, weight = 1, title, geometry }) {
  const t =
    scale === 1 ? '' : ` transform="translate(100 100) scale(${scale}) translate(-100 -100)"`;
  const escaped = title?.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const label = title ? ` role="img" aria-label="${escaped}"` : ' aria-hidden="true"';
  const body = markBody({ fg, ground, weight, ...(geometry ? { geometry } : {}) });
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="${size}" height="${size}"${label}>` +
    `<rect width="200" height="200" fill="${ground}"/>` +
    `<g${t}>${body}</g>` +
    `</svg>`
  );
}

// --- Favicon container -------------------------------------------------------------------

/**
 * Packs PNG images into a .ico container (PNG-in-ICO, read by every current browser and by
 * Windows since Vista). Each entry: { size, png: Buffer }.
 */
export function icoFromPngs(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(entries.length, 4);
  let offset = 6 + 16 * entries.length;
  const dirs = [];
  for (const { size, png } of entries) {
    const d = Buffer.alloc(16);
    d.writeUInt8(size >= 256 ? 0 : size, 0); // width
    d.writeUInt8(size >= 256 ? 0 : size, 1); // height
    d.writeUInt8(0, 2); // palette
    d.writeUInt8(0, 3); // reserved
    d.writeUInt16LE(1, 4); // colour planes
    d.writeUInt16LE(32, 6); // bits per pixel
    d.writeUInt32LE(png.length, 8);
    d.writeUInt32LE(offset, 12);
    offset += png.length;
    dirs.push(d);
  }
  return Buffer.concat([header, ...dirs, ...entries.map((e) => e.png)]);
}

// --- Type set as paths ---------------------------------------------------------------------

/**
 * Shapes a string in one of the self-hosted WOFF2 fonts (HarfBuzz, with kerning and the variable
 * weight instanced) and returns the glyph outlines as SVG `<path>` elements, so sharp renders
 * the real face without depending on system fonts. Coordinates are CSS pixels at `size`, origin
 * at the left end of the baseline, y down; wrap the result in a `<g fill transform>`.
 *
 * harfbuzzjs and wawoff2 are dependencies of subset-font, which the font pipeline already uses.
 *
 * @returns {Promise<{ markup: string, width: number }>}
 */
export async function typeset(fontFile, text, { size, weight, letterSpacing = 0 }) {
  const resolve = (pkg) => pathToFileURL(fileURLToPath(new URL(`node_modules/${pkg}`, ROOT))).href;
  const hb = await import(resolve('harfbuzzjs/dist/index.mjs'));
  const { default: decompress } = await import(resolve('wawoff2/decompress.js'));
  const ttf = await decompress(await readFile(fontFile));
  const face = new hb.Face(new hb.Blob(ttf));
  const font = new hb.Font(face);
  if (face.getAxisInfos?.()?.wght) font.setVariations([new hb.Variation('wght', weight)]);
  const buffer = new hb.Buffer();
  buffer.addText(text);
  buffer.guessSegmentProperties();
  hb.shape(font, buffer);
  const infos = buffer.getGlyphInfos();
  const positions = buffer.getGlyphPositions();
  const scale = size / face.upem;
  let x = 0;
  const parts = [];
  for (let i = 0; i < infos.length; i++) {
    const p = positions[i];
    const d = font.glyphToPath(infos[i].codepoint);
    if (d) {
      const dx = x + p.xOffset * scale;
      const dy = -p.yOffset * scale;
      parts.push(
        `<path transform="translate(${fmt(dx)} ${fmt(dy)}) scale(${scale.toFixed(5)} ${(-scale).toFixed(5)})" d="${d}"/>`,
      );
    }
    x += p.xAdvance * scale + letterSpacing;
  }
  buffer.destroy?.();
  font.destroy?.();
  face.destroy?.();
  return { markup: parts.join(''), width: x - letterSpacing };
}
