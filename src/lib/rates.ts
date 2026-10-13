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
  const history = (await getCollection('rates'))
    .map((entry) => entry.data as RateSnapshot)
    .sort((a, b) => b.date.localeCompare(a.date));

  const live = await fetchGoldRateAtBuild(site.url);
  let latest: GoldRate | null = history[0] ?? null;
  if (live && (!latest || live.date >= latest.date)) latest = live;

  return { latest, history, stale: latest ? isStale(latest.date) : false };
}

/** A rate is stale when its date is more than two calendar days before today (Dubai time). */
export function isStale(date: string, now: Date = new Date()): boolean {
  const today = new Date(now.toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' }));
  const posted = new Date(date);
  return (today.getTime() - posted.getTime()) / 86_400_000 > 2;
}

/** Change against the previous snapshot for one karat, or null when there is no previous day. */
export function rateDelta(history: RateSnapshot[], karat: Karat): number | null {
  const [latest, previous] = history;
  if (!latest || !previous) return null;
  return Math.round((latest.perGram[karat] - previous.perGram[karat]) * 100) / 100;
}
