/**
 * Generates placeholder images for every image path referenced by the content, so the site builds
 * before the real photography is in place. Existing files are never overwritten.
 *
 *   npm run assets:placeholders
 *
 * Replace a placeholder by dropping the real file at the same path (or run assets:fetch-legacy).
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { BRAND, ROOT, ensureDir, exists } from './_lib.mjs';

const COLLECTIONS = [
  'kolkata',
  'antique',
  'rajkot',
  'gemstone',
  'singapore',
  'turkish',
  'italian',
  'kids',
  'customised',
  'temple',
  'kuwait',
  'diamonds',
];
const CATEGORIES = [
  'necklaces',
  'earrings',
  'rings',
  'pendants',
  'bangles',
  'bracelets',
  'chains',
  'anklets',
  'gold-coins-bars',
];

/** [relative path, width, height, label] */
const PLACEHOLDERS = [
  ...Array.from({ length: 9 }, (_, i) => [
    `src/assets/products/p0${i + 1}.jpg`,
    1200,
    1200,
    `Product ${i + 1}`,
  ]),
  ...['earrings', 'ring', 'pendant', 'bangles', 'bracelet', 'chain', 'anklet'].map((c) => [
    `src/assets/products/${c}.jpg`,
    1200,
    1200,
    c,
  ]),
  ...CATEGORIES.map((c) => [`src/assets/categories/${c}.png`, 1200, 900, c]),
  ...['wedding', 'anniversary', 'birthday', 'festivals'].map((o) => [
    `src/assets/occasions/${o}.jpg`,
    1000,
    1500,
    o,
  ]),
  ...COLLECTIONS.map((c) => [`src/assets/collections/${c}.jpg`, 1200, 1500, `${c} collection`]),
  ['src/assets/story/store-lifestyle.jpg', 1600, 1000, 'Store'],
  ['src/assets/story/workshop.jpg', 1600, 1000, 'Workshop'],
  ['src/assets/story/hero.jpg', 1800, 2200, 'Hero'],
  ['src/assets/journal/gold-rate-explained.jpg', 1600, 900, 'Journal'],
  ['src/assets/journal/22k-vs-18k.jpg', 1600, 900, 'Journal'],
  ['src/assets/journal/gold-souq-extension-guide.jpg', 1600, 900, 'Journal'],
  ['src/assets/brand/logo-white.png', 1060, 264, 'logo'],
  ['src/assets/brand/logo-dark.png', 1000, 264, 'logo'],
];

function svg(width, height, label) {
  const fs = Math.round(Math.min(width, height) / 14);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${BRAND.ivory}"/>
  <rect x="${fs}" y="${fs}" width="${width - fs * 2}" height="${height - fs * 2}" fill="none" stroke="${BRAND.gold}" stroke-width="2"/>
  <circle cx="${width / 2}" cy="${height / 2 - fs}" r="${fs * 1.4}" fill="none" stroke="${BRAND.plum}" stroke-width="${Math.max(2, fs / 8)}"/>
  <text x="50%" y="${height / 2 + fs * 2.2}" text-anchor="middle" font-family="Georgia, serif" font-size="${fs}" fill="${BRAND.plum}">${label}</text>
  <text x="50%" y="${height / 2 + fs * 3.4}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.round(fs * 0.55)}" fill="${BRAND.plum}" opacity="0.7">placeholder - replace with photography</text>
</svg>`;
}

let created = 0;
for (const [rel, width, height, label] of PLACEHOLDERS) {
  const file = fileURLToPath(new URL(rel, ROOT));
  if (await exists(file)) continue;
  await ensureDir(file);
  const pipeline = sharp(Buffer.from(svg(width, height, label)));
  const buffer = rel.endsWith('.png')
    ? await pipeline.png({ compressionLevel: 9 }).toBuffer()
    : await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  await writeFile(file, buffer);
  created += 1;
}
console.log(`${created} placeholder(s) created; ${PLACEHOLDERS.length - created} already existed.`);
