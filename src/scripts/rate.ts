/**
 * The live rate (docs/design-system-v2.md §1.2 rule 6, §5.4, §7). Loaded on every page by
 * BaseLayout. Once the page is idle it reads the same-origin feed (PUBLIC_GOLD_RATE_ENDPOINT),
 * keeps it for 30 minutes in sessionStorage, and writes a posting into the page only when it is
 * not older than the one baked at build. Production never simulates a refresh: every figure comes
 * from the feed. If the feed is unreachable the baked rate, correct for its time, stands.
 *
 * Hooks (any component may carry them):
 *   [data-rate="22k"]                  a rate, "468.25"; with data-roll the changed digits roll
 *                                      (roll.ts), otherwise the text swaps
 *   [data-rate-calc="22k"][data-grams] a derived amount, rate × grams to the dirham
 *   [data-rate-date="2026-10-13"]      the baked posting date (the first one on the page is the
 *                                      reference); a [data-rate-date-text] child is rewritten
 *   [data-rate-time]                   the source time: "checked 15:40" (Dubai time of the fetch)
 *   [data-rate-lead][data-fresh]       text that changes when a stale page gets a fresh posting
 *   [data-stale]                       removed when a fresh posting arrives (the hollow marker)
 *   [data-rate-delta="22k"]            "Down AED 3.00 since 12:02", only when that value changed
 *   [data-sheen]                       set to "again" on a real change: the rule's sheen re-runs
 * and dispatches cj:rates on document with the new perGram (the estimator listens).
 *
 * A stale posting (more than two days old) is written without rolling or the sheen.
 */
import { PUBLIC_GOLD_RATE_ENDPOINT } from 'astro:env/client';

import { formatAed, formatRateDate, formatRateTime } from '@/lib/format';
import { KARATS, fetchGoldRate, parseGoldRate, type GoldRate, type Karat } from '@/lib/gold-rate';
import { roll } from '@/lib/roll';
import { DEFAULT_KARAT } from '@/lib/tones';

const CACHE_KEY = 'cj:rate';
const CACHE_TTL_MS = 30 * 60 * 1000;

interface Fetched {
  rate: GoldRate;
  /** When it was fetched (ms). */
  at: number;
}

const all = (selector: string) => document.querySelectorAll<HTMLElement>(selector);

// The instrument's karat keys: CSS shows the chosen figure at once; here its digits roll in from
// the figure it replaces, so a switch reads as the board changing, never as two figures mixing.
addEventListener('change', ({ target }) => {
  const input = target as HTMLInputElement;
  const board = input.closest<HTMLElement>('[data-rate-board]');
  if (!board || !input.matches('[data-karat-input]')) return;
  const figure = (k: string) => board.querySelector<HTMLElement>(`[data-k="${k}"] [data-roll]`);
  const from = figure(board.dataset.shown ?? DEFAULT_KARAT);
  const to = figure(input.value);
  board.dataset.shown = input.value;
  if (!from || !to || from == to) return;
  const next = to.dataset.rollTo ?? to.textContent!.trim();
  delete to.dataset.rollTo;
  to.textContent = from.dataset.rollTo ?? from.textContent!.trim();
  roll(to, next);
});
/** "2026-10-15": a moment's calendar day in Dubai. */
const dubaiDay = (t: number) => new Date(t).toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' });

function readCache(): Fetched | null {
  try {
    const { at, rate } = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? 'null');
    const parsed = Date.now() - at < CACHE_TTL_MS ? parseGoldRate(rate) : null;
    return parsed ? { rate: parsed, at } : null;
  } catch {
    return null;
  }
}

function writeCache({ rate, at }: Fetched) {
  // The feed's own shape, so parseGoldRate() validates it again on read.
  const feed: Record<string, string> = { gold_rate_date: rate.date };
  for (const k of KARATS) feed[`gold_rate_${k}`] = String(rate.perGram[k]);
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at, rate: feed }));
  } catch {
    /* storage unavailable: nothing to keep */
  }
}

function apply({ rate, at }: Fetched) {
  // What the page was built with: its posting date, source time and figures.
  const bakedAt = document.querySelector<HTMLTimeElement>('time[data-rate-time]')?.dateTime ?? '';
  const date =
    document.querySelector<HTMLElement>('[data-rate-date]')?.dataset.rateDate ??
    (bakedAt.includes('T') ? dubaiDay(Date.parse(bakedAt)) : bakedAt || null);
  if (date && rate.date < date) return; // never an older posting

  const baked: Partial<Record<Karat, number>> = {};
  for (const k of KARATS) {
    const text = document.querySelector(`[data-rate="${k}"]`)?.textContent;
    if (text) baked[k] = parseFloat(text);
  }
  const newer = !date || rate.date > date;
  const changed = KARATS.some((k) => baked[k] !== undefined && baked[k] !== rate.perGram[k]);
  const today = dubaiDay(Date.now());
  const stale = (Date.parse(today) - Date.parse(rate.date)) / 86_400_000 > 2;

  if (changed || newer) {
    for (const k of KARATS) {
      const value = rate.perGram[k].toFixed(2);
      for (const el of all(`[data-rate="${k}"]`)) {
        if (stale) el.textContent = value;
        else roll(el, value);
      }
    }
    for (const el of all('[data-rate-calc]')) {
      const k = el.dataset.rateCalc as Karat;
      const grams = parseFloat(el.dataset.grams ?? '');
      if (KARATS.includes(k) && grams > 0) roll(el, formatAed(Math.round(rate.perGram[k] * grams)));
    }
    // "since 12:02" within the same posting day, "since 13 October" across days.
    const since =
      !newer && bakedAt.includes('T') ? formatRateTime(bakedAt) : formatRateDate(date ?? rate.date);
    for (const el of all('[data-rate-delta]')) {
      const k = (el.dataset.rateDelta || '22k') as Karat;
      const was = baked[k];
      if (was === undefined) continue;
      const d = Math.round((rate.perGram[k] - was) * 100) / 100;
      if (d)
        el.textContent = `${d > 0 ? 'Up' : 'Down'} AED ${Math.abs(d).toFixed(2)} since ${since}`;
      else if (newer) el.textContent = `Unchanged since ${since}`;
    }
    document.dispatchEvent(new CustomEvent('cj:rates', { detail: rate.perGram }));
  }

  if (newer) {
    for (const el of all('[data-rate-date]')) {
      el.dataset.rateDate = rate.date;
      if (el instanceof HTMLTimeElement) el.dateTime = rate.date;
      const text = el.querySelector<HTMLElement>('[data-rate-date-text]');
      // "15 October", or with data-format="full" "15 October 2026".
      if (text)
        text.textContent =
          formatRateDate(rate.date) +
          (text.dataset.format == 'full' ? ` ${rate.date.slice(0, 4)}` : '');
    }
  }

  for (const el of all('time[data-rate-time]') as NodeListOf<HTMLTimeElement>) {
    if (stale) {
      el.dateTime = rate.date;
      el.textContent = formatRateDate(rate.date);
    } else {
      el.dateTime = new Date(at).toISOString();
      el.textContent = `${rate.date == today ? '' : `${formatRateDate(rate.date)}, `}checked ${formatRateTime(new Date(at))}`;
    }
  }

  if (!stale) {
    for (const el of all('[data-rate-lead][data-fresh]')) el.textContent = el.dataset.fresh!;
    for (const el of all('[data-stale]')) el.removeAttribute('data-stale');
    if (changed)
      for (const el of all('[data-sheen]'))
        el.dataset.sheen = el.dataset.sheen == 'again' ? '' : 'again';
  }
}

async function refresh() {
  if (!document.querySelector('[data-rate]')) return;
  const cached = readCache();
  if (cached) return apply(cached);
  const rate = await fetchGoldRate(PUBLIC_GOLD_RATE_ENDPOINT, { timeoutMs: 6000 });
  if (!rate) return;
  const fetched = { rate, at: Date.now() };
  writeCache(fetched);
  apply(fetched);
}

if ('requestIdleCallback' in window) {
  requestIdleCallback(() => void refresh(), { timeout: 4000 });
} else {
  setTimeout(() => void refresh(), 2000);
}
