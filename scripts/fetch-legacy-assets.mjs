/**
 * Pulls the brand's own photography and logos from the previous website into src/assets so the
 * new site ships with real imagery. Run once, review the output, commit the files.
 *
 *   npm run assets:fetch-legacy            # replaces placeholders, keeps real files
 *   npm run assets:fetch-legacy -- --force # overwrite everything in the map
 *   npm run assets:fetch-legacy -- --only=products/   # refresh only paths containing a string
 *
 * The MAP below is the only thing to edit when a path changes.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { ROOT, ensureDir, exists } from './_lib.mjs';

const ORIGIN = 'https://classicjewels.ae/';
const FORCE = process.argv.includes('--force');
const ONLY = process.argv.find((a) => a.startsWith('--only='))?.slice(7);
const UA = 'Mozilla/5.0 (compatible; classicjewels-asset-migration/1.0)';

const product = (n) => `assets/images/product/${n}.jpg`;
const category = (n) => `assets/images/category/${n}`;

/**
 * [remote path on the old site, local path in this repo, options?]
 * options.square: pad a wide cut-out to a square with its own background colour, so it can sit
 * in a square product plate edge to edge instead of floating as a strip.
 * options.extract: { left, top, width, height } in source pixels. Crops the photo before it is
 * saved, so a wide banner can give a 3:2 journal cover framed on the piece rather than on
 * whatever the CSS centre crop happens to leave.
 */
const MAP = [
  ...Array.from({ length: 9 }, (_, i) => [product(i + 1), `src/assets/products/p0${i + 1}.jpg`]),
  [category('necklace.png'), 'src/assets/categories/necklaces.png'],
  [category('earrings.png'), 'src/assets/categories/earrings.png'],
  [category('ring.png'), 'src/assets/categories/rings.png'],
  [category('pendant.png'), 'src/assets/categories/pendants.png'],
  [category('bangles.png'), 'src/assets/categories/bangles.png'],
  [category('bracelet.png'), 'src/assets/categories/bracelets.png'],
  [category('chain.png'), 'src/assets/categories/chains.png'],
  [category('anklet.png'), 'src/assets/categories/anklets.png'],
  // The same cut-outs, squared, double as the starter product photos for non-necklace pieces.
  ...['earrings', 'ring', 'pendant', 'bangles', 'bracelet', 'chain', 'anklet'].map((n) => [
    category(`${n}.png`),
    `src/assets/products/${n}.jpg`,
    { square: true },
  ]),
  [category('wedding.jpg'), 'src/assets/occasions/wedding.jpg'],
  [category('annivesary.jpg'), 'src/assets/occasions/anniversary.jpg'],
  [category('birthday.jpg'), 'src/assets/occasions/birthday.jpg'],
  [category('festivels.jpg'), 'src/assets/occasions/festivals.jpg'],
  ['assets/images/about-us/wedding.jpg', 'src/assets/story/store-lifestyle.jpg'],
  ['assets/images/menu/logo/logo.png', 'src/assets/brand/logo-white.png'],
  ['assets/images/menu/logo/1.png', 'src/assets/brand/logo-dark.png'],
  ['classic.png', 'src/assets/brand/monogram.png'],
  // Collection covers: the old site only had small wordmarks, so reuse the closest product photo
  // until the store photographs each collection.
  [product(1), 'src/assets/collections/kolkata.jpg'],
  [product(3), 'src/assets/collections/antique.jpg'],
  [product(2), 'src/assets/collections/rajkot.jpg'],
  [product(6), 'src/assets/collections/gemstone.jpg'],
  [category('chain.png'), 'src/assets/collections/singapore.jpg', { square: true }],
  [product(5), 'src/assets/collections/turkish.jpg'],
  [product(4), 'src/assets/collections/italian.jpg'],
  [category('pendant.png'), 'src/assets/collections/kids.jpg', { square: true }],
  [product(7), 'src/assets/collections/customised.jpg'],
  [product(8), 'src/assets/collections/temple.jpg'],
  [product(9), 'src/assets/collections/kuwait.jpg'],
  [category('ring.png'), 'src/assets/collections/diamonds.jpg', { square: true }],
  [product(9), 'src/assets/story/hero.jpg'],
  [product(8), 'src/assets/story/workshop.jpg'],
  // About-page photography and page banners from the old site.
  ['assets/images/about-us/1.jpg', 'src/assets/story/about-1.jpg'],
  ['assets/images/about-us/2.jpg', 'src/assets/story/about-2.jpg'],
  ['assets/images/about-us/3.jpg', 'src/assets/story/about-3.jpg'],
  ['assets/images/breadcrumb/about.jpg', 'src/assets/story/banner-about.jpg'],
  ['assets/images/breadcrumb/contact.jpg', 'src/assets/story/banner-contact.jpg'],
  // Collection wordmarks (small PNGs). The old "antique" file is misspelt "Anitique" in the artwork
  // itself, so it is not imported; the pages set the name in type until a corrected file exists.
  ...[
    'kolkata',
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
  ].map((n) => [`assets/images/brand/${n}.png`, `src/assets/collections/wordmarks/${n}.png`]),
  // Journal covers: one photograph per article, none shared with another article, the home page
  // hero or story, or a product plate. Each is cropped to the 3:2 frame the cover and card use.
  [
    'assets/images/about-us/3.jpg',
    'src/assets/journal/two-tone-oval-pendant-set.jpg',
    { extract: { left: 0, top: 125, width: 750, height: 500 } },
  ],
  [
    'assets/images/breadcrumb/about.jpg',
    'src/assets/journal/gold-sun-pendant.jpg',
    { extract: { left: 864, top: 0, width: 717, height: 478 } },
  ],
  [
    'assets/images/breadcrumb/contact.jpg',
    'src/assets/journal/chain-tassel-earrings.jpg',
    { extract: { left: 700, top: 0, width: 717, height: 478 } },
  ],
  [
    'assets/images/about-us/2.jpg',
    'src/assets/journal/diamond-rings-in-a-row.jpg',
    { extract: { left: 717, top: 0, width: 732, height: 488 } },
  ],
];

/** Placeholders from make-placeholders.mjs are flat ivory images; real photos have far more detail. */
async function isPlaceholder(file) {
  try {
    // Read into memory first: sharp holding the file open would block the overwrite on Windows.
    const { entropy } = await sharp(await readFile(file)).stats();
    return entropy < 2.5;
  } catch {
    return true;
  }
}

const cache = new Map();
async function download(remote) {
  if (cache.has(remote)) return cache.get(remote);
  const res = await fetch(new URL(remote, ORIGIN), { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${remote}: HTTP ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  cache.set(remote, buffer);
  return buffer;
}

let written = 0;
/**
 * Turns a wide cut-out into a centred square: trims the flat background around the piece, then
 * pads it back to a square with a 20% margin in the same background colour (its top-left pixel).
 */
async function squareUp(buffer) {
  const flat = await sharp(buffer).flatten({ background: '#ffffff' }).toBuffer();
  const { data } = await sharp(flat)
    .extract({ left: 0, top: 0, width: 1, height: 1 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const background = { r: data[0], g: data[1], b: data[2] };
  const trimmed = await sharp(flat).trim({ background, threshold: 12 }).toBuffer();
  const { width = 0, height = 0 } = await sharp(trimmed).metadata();
  const side = Math.round(Math.max(width, height) * 1.4);
  const padX = side - width;
  const padY = side - height;
  return sharp(trimmed)
    .extend({
      top: Math.floor(padY / 2),
      bottom: Math.ceil(padY / 2),
      left: Math.floor(padX / 2),
      right: Math.ceil(padX / 2),
      background,
    })
    .toBuffer();
}

for (const [remote, local, options = {}] of MAP) {
  if (ONLY && !local.includes(ONLY)) continue;
  const file = fileURLToPath(new URL(local, ROOT));
  if (!FORCE && !ONLY && (await exists(file)) && !(await isPlaceholder(file))) {
    console.log(`keep    ${local}`);
    continue;
  }
  const original = await download(remote);
  const buffer = options.square ? await squareUp(original) : original;
  await ensureDir(file);
  // Normalise: JPG targets become progressive JPEGs, PNG targets stay PNG. Astro optimises at build.
  const image = options.extract ? sharp(buffer).extract(options.extract) : sharp(buffer);
  const out = local.endsWith('.png')
    ? await image.png({ compressionLevel: 9 }).toBuffer()
    : await image
        .flatten({ background: '#ffffff' })
        .jpeg({ quality: 90, mozjpeg: true, progressive: true })
        .toBuffer();
  await writeFile(file, out);
  written += 1;
  console.log(`fetched ${remote} -> ${local} (${(out.length / 1024).toFixed(0)} KB)`);
}
console.log(`${written} file(s) written.`);
