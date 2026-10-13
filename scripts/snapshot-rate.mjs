/**
 * Fetches today's gold rate from the store feed and writes src/content/rates/<date>.json.
 * Safe to run any number of times: a day's file is only rewritten when a value changed.
 *
 *   npm run rates:snapshot
 *
 * Runs on a schedule in .github/workflows/rates.yml. The build bakes the newest file into every
 * rate surface, so pages show a real number before any JavaScript runs.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { ROOT, ensureDir, exists } from './_lib.mjs';

const FEED = process.env.GOLD_RATE_FEED ?? 'https://classicjewels.ae/gold-rates.php';
const KARATS = ['24k', '22k', '21k', '18k', '14k'];

const res = await fetch(FEED, {
  headers: { 'User-Agent': 'Mozilla/5.0 (compatible; classicjewels-rate-snapshot/1.0)' },
});
if (!res.ok) throw new Error(`Rate feed returned HTTP ${res.status}`);
const raw = JSON.parse(await res.text());

const date = String(raw.gold_rate_date ?? '');
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`Unexpected gold_rate_date: ${date}`);
const perGram = {};
for (const k of KARATS) {
  const value = Number.parseFloat(raw[`gold_rate_${k}`]);
  if (!Number.isFinite(value) || value <= 0)
    throw new Error(`Bad value for ${k}: ${raw[`gold_rate_${k}`]}`);
  perGram[k] = value;
}

const snapshot = { date, perGram, currency: 'AED', fetchedAt: new Date().toISOString() };
const file = fileURLToPath(new URL(`src/content/rates/${date}.json`, ROOT));

if (await exists(file)) {
  const previous = JSON.parse(await readFile(file, 'utf8'));
  const same = KARATS.every((k) => previous.perGram?.[k] === perGram[k]);
  if (same) {
    console.log(`unchanged ${date}: 22K ${perGram['22k']} AED/g`);
    process.exit(0);
  }
}
await ensureDir(file);
await writeFile(file, JSON.stringify(snapshot, null, 2) + '\n');
console.log(
  `wrote ${date}: 24K ${perGram['24k']} · 22K ${perGram['22k']} · 21K ${perGram['21k']} · 18K ${perGram['18k']} AED/g`,
);
