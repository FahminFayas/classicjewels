/** Formatting helpers shared by templates and the gold-rate widget. Keep framework-free. */

const number2dp = new Intl.NumberFormat('en-GB', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** 468.25 -> "AED 468.25" (plain space, so it never wraps oddly or needs unescaping). */
export function formatAed(value: number): string {
  return `AED ${number2dp.format(value)}`;
}

/** 22 -> "22K" */
export function formatKarat(karat: number): string {
  return `${karat}K`;
}

/** 22 -> "916", 18 -> "750" (fineness in parts per thousand). */
export function karatToFineness(karat: number): string {
  const map: Record<number, string> = { 24: '999', 22: '916', 21: '875', 18: '750', 14: '585' };
  return map[karat] ?? String(Math.round((karat / 24) * 1000));
}

/** 12.5 -> "12.5 g" */
export function formatGrams(grams: number): string {
  return `${grams.toLocaleString('en-GB', { maximumFractionDigits: 2 })} g`;
}

/** "2026-10-13" -> "13 October 2026" (Dubai time). */
export function formatDate(date: Date | string, opts: Intl.DateTimeFormatOptions = {}): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Dubai',
    ...opts,
  });
}

/** "gold-coins-bars" -> "Gold Coins Bars" (fallback for breadcrumb labels). */
export function humanize(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

const WORDS = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
];

/** 6 -> "Six"; numbers above twelve stay as digits. Used in headings that count content. */
export function countWord(n: number): string {
  const w = WORDS[n];
  return w ? w.charAt(0).toUpperCase() + w.slice(1) : String(n);
}

const list = new Intl.ListFormat('en-GB', { style: 'long', type: 'conjunction' });

/** ["Dubai", "Sharjah", "Abu Dhabi"] -> "Dubai, Sharjah and Abu Dhabi". */
export function listWords(items: readonly string[]): string {
  return list.format(items);
}
