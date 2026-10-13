/**
 * Daily gold rate feed.
 *
 * The store subscribes to a rate service exposed at /gold-rates.php on the production host.
 * It returns a flat JSON object with string values, for example:
 *   { "msg": "Subscription Valid", "gold_rate_date": "2026-10-13",
 *     "gold_rate_24k": "505.75", "gold_rate_22k": "468.25", ..., "gold_rate_14k": "300.25" }
 * Values are AED per gram. This module is shared by the build (server) and the browser widget,
 * so it must stay free of DOM and Node-only APIs.
 */

export const KARATS = ['24k', '22k', '21k', '18k', '14k'] as const;
export type Karat = (typeof KARATS)[number];

export interface GoldRate {
  /** ISO date (YYYY-MM-DD) the rates were published for, Dubai time. */
  date: string;
  /** AED per gram, keyed by karat. */
  perGram: Record<Karat, number>;
  currency: 'AED';
}

export const KARAT_META: Record<Karat, { label: string; fineness: string; note: string }> = {
  '24k': { label: '24K', fineness: '999', note: 'Coins & bars' },
  '22k': { label: '22K', fineness: '916', note: 'Most of our jewellery' },
  '21k': { label: '21K', fineness: '875', note: 'Arabic & Turkish designs' },
  '18k': { label: '18K', fineness: '750', note: 'Diamond settings' },
  '14k': { label: '14K', fineness: '585', note: 'Light everyday pieces' },
};

/** Validates and normalises the feed payload. Returns null for anything unexpected. */
export function parseGoldRate(payload: unknown): GoldRate | null {
  if (!payload || typeof payload !== 'object') return null;
  const data = payload as Record<string, unknown>;
  const date = typeof data.gold_rate_date === 'string' ? data.gold_rate_date : null;
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;

  const perGram = {} as Record<Karat, number>;
  for (const k of KARATS) {
    const raw = data[`gold_rate_${k}`];
    const value = typeof raw === 'number' ? raw : Number.parseFloat(String(raw ?? ''));
    if (!Number.isFinite(value) || value <= 0) return null;
    perGram[k] = value;
  }
  return { date, perGram, currency: 'AED' };
}

/**
 * Fetches and parses the feed. Never throws: a network or shape problem yields null so the UI can
 * fall back to "call us for today's rate". `timeoutMs` keeps builds and page loads from hanging.
 */
export async function fetchGoldRate(
  endpoint: string,
  { timeoutMs = 5000, fetchImpl = fetch }: { timeoutMs?: number; fetchImpl?: typeof fetch } = {},
): Promise<GoldRate | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetchImpl(endpoint, {
      signal: controller.signal,
      headers: { Accept: 'application/json, text/plain;q=0.9' },
    });
    if (!res.ok) return null;
    // The PHP endpoint sends text/html, so read the body as text before parsing.
    const text = await res.text();
    return parseGoldRate(JSON.parse(text));
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Build-time snapshot from the production feed, fetched once per build so every page renders a
 * real number before any JavaScript runs. Cached in module scope for the length of the build.
 */
let buildSnapshot: Promise<GoldRate | null> | undefined;
export function fetchGoldRateAtBuild(origin: string): Promise<GoldRate | null> {
  buildSnapshot ??= fetchGoldRate(new URL('/gold-rates.php', origin).toString(), {
    timeoutMs: 8000,
  });
  return buildSnapshot;
}
