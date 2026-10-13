/**
 * Build-time access to the gold rate: the newest snapshot in src/content/rates/, or the live feed
 * when it is newer, plus the history for the rate page. Server-only (uses astro:content).
 */
import { getCollection } from 'astro:content';

import { site } from '@/data/site';
import { fetchGoldRateAtBuild, type GoldRate, type Karat } from '@/lib/gold-rate';

export interface RateSnapshot extends GoldRate {
  fetchedAt: string;
}

export interface RatesAtBuild {
  /** The rate every page bakes in. Null only when there is no snapshot and the feed is down. */
  latest: GoldRate | null;
  /** All snapshots, newest first. */
  history: RateSnapshot[];
  /** True when the latest rate is more than two calendar days old. */
  stale: boolean;
}

let cache: Promise<RatesAtBuild> | undefined;

export function getRates(): Promise<RatesAtBuild> {
  cache ??= load();
  return cache;
}

async function load(): Promise<RatesAtBuild> {
  const snapshots = (await getCollection('rates')).map((entry) => entry.data as RateSnapshot);

  // The live feed, when it is as new as the newest snapshot, replaces that day's snapshot, so the
  // board, the history table and the change column all describe the same figures.
  const live = await fetchGoldRateAtBuild(site.url);
  const newestSnapshot = snapshots.reduce<string>((max, s) => (s.date > max ? s.date : max), '');
  if (live && live.date >= newestSnapshot) {
    const merged: RateSnapshot = { ...live, fetchedAt: new Date().toISOString() };
    const i = snapshots.findIndex((s) => s.date === live.date);
    if (i >= 0) snapshots[i] = merged;
    else snapshots.push(merged);
  }

  const history = snapshots.sort((a, b) => b.date.localeCompare(a.date));
  const latest: GoldRate | null = history[0] ?? null;
  return { latest, history, stale: latest ? isStale(latest.date) : false };
}

/** A rate is stale when its date is more than two calendar days before today (Dubai time). */
export function isStale(date: string, now: Date = new Date()): boolean {
  const today = new Date(now.toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' }));
  const posted = new Date(date);
  return (today.getTime() - posted.getTime()) / 86_400_000 > 2;
}

/**
 * Change of the displayed rate against the newest posting from an earlier day, for one karat.
 * Null when no earlier day has been recorded.
 */
export function rateDelta(history: RateSnapshot[], karat: Karat): number | null {
  const [latest] = history;
  const previous = latest ? history.find((s) => s.date < latest.date) : undefined;
  if (!latest || !previous) return null;
  return Math.round((latest.perGram[karat] - previous.perGram[karat]) * 100) / 100;
}
