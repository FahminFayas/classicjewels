/**
 * Refreshes every baked gold-rate figure on the page from the same-origin feed.
 * Runs once the page is idle; replaces text in place (cells are fixed width, so nothing moves).
 * If the feed is unreachable or cross-origin the baked values simply stand.
 */
import { PUBLIC_GOLD_RATE_ENDPOINT } from 'astro:env/client';

import { formatDate } from '@/lib/format';
import { KARATS, fetchGoldRate, parseGoldRate, type GoldRate } from '@/lib/gold-rate';

const CACHE_KEY = 'cj:rate';
const CACHE_TTL_MS = 30 * 60 * 1000;

function readCache(): GoldRate | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, rate } = JSON.parse(raw) as { at: number; rate: unknown };
    return Date.now() - at < CACHE_TTL_MS ? parseGoldRate(rate) : null;
  } catch {
    return null;
  }
}

function writeCache(rate: GoldRate) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), rate: toFeedShape(rate) }));
  } catch {
    /* storage unavailable: nothing to do */
  }
}

/** Store the feed's own shape so parseGoldRate() validates it again on read. */
function toFeedShape(rate: GoldRate) {
  const out: Record<string, string> = { gold_rate_date: rate.date };
  for (const k of KARATS) out[`gold_rate_${k}`] = String(rate.perGram[k]);
  return out;
}

function currentDate(): string | null {
  return document.querySelector<HTMLElement>('[data-rate-date]')?.dataset.rateDate ?? null;
}

function currentValue(karat: string): number | null {
  const el = document.querySelector<HTMLElement>(`[data-rate="${karat}"]`);
  return el ? Number.parseFloat(el.textContent ?? '') : null;
}

function apply(rate: GoldRate) {
  const date = currentDate();
  const changed =
    !date || rate.date > date || KARATS.some((k) => currentValue(k) !== rate.perGram[k]);
  if (!changed) return;

  for (const k of KARATS) {
    for (const el of document.querySelectorAll<HTMLElement>(`[data-rate="${k}"]`)) {
      el.textContent = rate.perGram[k].toFixed(2);
    }
  }
  for (const el of document.querySelectorAll<HTMLElement>('[data-rate-date]')) {
    el.dataset.rateDate = rate.date;
    if (el instanceof HTMLTimeElement) el.dateTime = rate.date;
    const text = el.querySelector<HTMLElement>('[data-rate-date-text]') ?? el;
    text.textContent = formatDate(rate.date, { year: undefined });
  }
  for (const el of document.querySelectorAll<HTMLElement>('[data-rate-board]')) {
    el.dataset.state = 'refreshed';
  }
}

async function refresh() {
  if (!document.querySelector('[data-rate]')) return;
  const cached = readCache();
  if (cached) {
    apply(cached);
    return;
  }
  const rate = await fetchGoldRate(PUBLIC_GOLD_RATE_ENDPOINT, { timeoutMs: 6000 });
  if (!rate) return;
  writeCache(rate);
  apply(rate);
}

if ('requestIdleCallback' in window) {
  requestIdleCallback(() => void refresh(), { timeout: 4000 });
} else {
  setTimeout(() => void refresh(), 2000);
}
