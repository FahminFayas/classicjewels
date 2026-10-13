/**
 * Renders the favicon set, PWA icons and the default Open Graph image from SVG sources.
 *
 *   npm run assets:brand
 *
 * Re-run after changing public/favicon.svg or the OG template below.
 */
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { BRAND, ROOT, ensureDir } from './_lib.mjs';

const out = (rel) => fileURLToPath(new URL(rel, ROOT));

// --- Icons from the favicon SVG --------------------------------------------
const favicon = await readFile(out('public/favicon.svg'));
for (const [size, rel] of [
  [180, 'public/apple-touch-icon.png'],
  [192, 'public/icons/icon-192.png'],
  [512, 'public/icons/icon-512.png'],
]) {
  await ensureDir(out(rel));
  await sharp(favicon, { density: 384 }).resize(size, size).png().toFile(out(rel));
}
// Maskable icon: same mark with safe-zone padding.
await sharp(favicon, { density: 384 })
  .resize(400, 400)
  .extend({ top: 56, bottom: 56, left: 56, right: 56, background: BRAND.plum })
  .png()
  .toFile(out('public/icons/icon-512-maskable.png'));

// --- Default Open Graph image (1200x630) ------------------------------------
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BRAND.plum}"/>
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="${BRAND.goldSoft}" stroke-width="2"/>
  <path d="M248 232 A68 68 0 1 0 248 318" fill="none" stroke="${BRAND.goldSoft}" stroke-width="16" stroke-linecap="round"/>
  <circle cx="252" cy="318" r="13" fill="${BRAND.goldSoft}"/>
  <text x="360" y="268" font-family="Georgia, 'Times New Roman', serif" font-size="88" fill="#FFFFFF" letter-spacing="2">Classic</text>
  <text x="362" y="322" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="${BRAND.goldSoft}" letter-spacing="9">JEWELS &amp; DIAMONDS</text>
  <text x="80" y="500" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#FFFFFF" opacity="0.9">Gold &amp; diamond jewellers, Gold Souq Extension, Deira, Dubai</text>
  <text x="80" y="546" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="${BRAND.goldSoft}">classicjewels.ae</text>
</svg>`;
await ensureDir(out('public/og/default.png'));
await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(out('public/og/default.png'));

console.log('icons and OG image written to public/');
