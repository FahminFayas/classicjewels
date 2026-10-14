// scripts/subset-fonts.mjs
// Subsets the self-hosted variable fonts to the glyphs the site uses and writes them to
// src/assets/fonts/. Run after updating a @fontsource-variable package:
//
//   npm run fonts:subset
//
// Stop the dev server first (it locks files under src/assets/), then commit the output.
// Spec: docs/design-system-v2.md §4. Budget: the three files together at most 90 KB.
//
// Every OpenType layout feature is kept (lining and tabular figures for the rate, kerning,
// ligatures). The weight axis is narrowed to the weights the design uses (Cormorant 300 to 500,
// Plex 400 to 600), which keeps every weight the CSS asks for and drops the unused masters' range.
import { mkdir, readFile, writeFile } from 'node:fs/promises';

import subsetFont from 'subset-font';

const GLYPHS = [
  ' !"#$%&\'()*+,-./0123456789:;<=>?@',
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
  // No-break space, then the typographic marks the copy uses (en dash, curly quotes, ellipsis,
  // multiplication sign, approximately, minus sign for the estimator steppers).
  ' ©®·×éü–‘’“”…≈−',
].join('');

/** [package file, output name, weight axis range kept] */
const FILES = [
  [
    '@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-normal.woff2',
    'cormorant-garamond-wght-normal.woff2',
    { min: 300, max: 500 },
  ],
  [
    '@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-italic.woff2',
    'cormorant-garamond-wght-italic.woff2',
    { min: 300, max: 500 },
  ],
  [
    '@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2',
    'ibm-plex-sans-wght-normal.woff2',
    { min: 400, max: 600 },
  ],
];

const BUDGET = 90 * 1024;

const out = new URL('../src/assets/fonts/', import.meta.url);
await mkdir(out, { recursive: true });
let total = 0;
for (const [src, name, wght] of FILES) {
  const input = await readFile(new URL(`../node_modules/${src}`, import.meta.url));
  const subset = await subsetFont(input, GLYPHS, {
    targetFormat: 'woff2',
    variationAxes: { wght },
  });
  await writeFile(new URL(name, out), subset);
  total += subset.length;
  console.log(
    `${name}: ${(input.length / 1024).toFixed(1)} KB -> ${(subset.length / 1024).toFixed(1)} KB (wght ${wght.min}-${wght.max})`,
  );
}
console.log(`total ${(total / 1024).toFixed(1)} KB (budget 90 KB)`);
if (total > BUDGET) process.exitCode = 1;
