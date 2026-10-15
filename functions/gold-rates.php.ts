/**
 * The gold-rate feed, same-origin, on Cloudflare Pages (docs/deployment.md).
 *
 * The rate board, the build and the snapshot script all read /gold-rates.php on the site's own
 * origin: the feed sends no CORS headers (README, "The gold rate"). On the Apache host that path
 * is the store's PHP script itself. On Pages the script stays on the PHP host and this function
 * fetches it from ORIGIN_FEED_URL, checks the shape the site expects (src/lib/gold-rate.ts) and
 * serves it as JSON with a short edge cache, so the PHP host sees one request every few minutes
 * per data centre instead of one per visitor. A feed that is down or malformed answers 502; the
 * browser then keeps the rate baked at build (src/scripts/rate.ts treats any failure as "no
 * newer posting").
 *
 * Settings (wrangler.toml [vars], or the Pages project's variables):
 *   ORIGIN_FEED_URL      absolute URL of the PHP script on the old host; required, and never
 *                        this site's own host (that would loop)
 *   FEED_CACHE_SECONDS   edge cache lifetime, default 300
 */
import { edgeCache, type PagesFunction } from './_lib/types';

interface Env {
  ORIGIN_FEED_URL?: string;
  FEED_CACHE_SECONDS?: string;
}

const DEFAULT_CACHE_SECONDS = 300;
const ORIGIN_TIMEOUT_MS = 8000;
const KARATS = ['24k', '22k', '21k', '18k', '14k'];

function json(status: number, body: unknown, cacheControl: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': cacheControl,
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

/** The feed's own shape, with the fields the site reads checked; anything else is a bad feed. */
function isFeed(payload: unknown): payload is Record<string, unknown> {
  if (!payload || typeof payload !== 'object') return false;
  const data = payload as Record<string, unknown>;
  const date = data.gold_rate_date;
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  return KARATS.every((k) => {
    const value = Number.parseFloat(String(data[`gold_rate_${k}`] ?? ''));
    return Number.isFinite(value) && value > 0;
  });
}

function originUrl(setting: string | undefined, self: URL): URL | null {
  try {
    const url = new URL(setting ?? '');
    const web = url.protocol === 'https:' || url.protocol === 'http:';
    return web && url.host !== self.host ? url : null;
  } catch {
    return null;
  }
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env, waitUntil }) => {
  const self = new URL(request.url);
  const origin = originUrl(env.ORIGIN_FEED_URL, self);
  if (!origin) {
    console.error('gold-rates: ORIGIN_FEED_URL is missing, not a web URL, or points at this site');
    return json(503, { msg: 'Feed not configured' }, 'no-store');
  }
  const ttl = Number.parseInt(env.FEED_CACHE_SECONDS ?? '', 10) || DEFAULT_CACHE_SECONDS;

  // One cache entry per host, whatever query string a caller adds.
  const cache = edgeCache();
  const key = new Request(new URL('/gold-rates.php', self).toString());
  const cached = await cache?.match(key);
  if (cached) return cached;

  let payload: unknown;
  try {
    const upstream = await fetch(origin.toString(), {
      headers: {
        Accept: 'application/json, text/plain;q=0.9',
        // The PHP host answers only to a browser-like agent (astro.config.mjs, the dev proxy).
        'User-Agent': 'Mozilla/5.0 (classicjewels-pages-proxy)',
      },
      signal: AbortSignal.timeout(ORIGIN_TIMEOUT_MS),
    });
    if (!upstream.ok) throw new Error(`HTTP ${upstream.status}`);
    // The script sends text/html, so read the body as text before parsing (src/lib/gold-rate.ts).
    payload = JSON.parse(await upstream.text());
  } catch (error) {
    console.error(
      'gold-rates: origin feed failed:',
      error instanceof Error ? error.message : error,
    );
    return json(502, { msg: 'Feed unavailable' }, 'no-store');
  }
  if (!isFeed(payload)) {
    console.error('gold-rates: origin feed returned an unexpected shape');
    return json(502, { msg: 'Feed unavailable' }, 'no-store');
  }

  // max-age for the browser (rate.ts keeps its own 30-minute copy), s-maxage for the edge.
  const response = json(200, payload, `public, max-age=60, s-maxage=${ttl}`);
  if (cache) waitUntil(cache.put(key, response.clone()));
  return response;
};
