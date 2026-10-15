/**
 * The slice of the Cloudflare Pages Functions API these functions use, typed against the DOM lib
 * the root tsconfig already loads: Request, Response, Headers, FormData and fetch are the same
 * WHATWG interfaces in the Workers runtime. Kept local so the site needs no
 * @cloudflare/workers-types dependency and `astro check` type-checks functions/ with the rest of
 * the project. Reference: https://developers.cloudflare.com/pages/functions/api-reference/
 *
 * Files and folders that start with an underscore are bundled but never routed.
 */

export interface PagesContext<Env = unknown> {
  request: Request;
  /** Plain variables from wrangler.toml [vars] and the project's secrets, all strings. */
  env: Env;
  /** The request path, e.g. "/gold-rates.php". */
  functionPath: string;
  params: Record<string, string | string[]>;
  /** Keeps the function alive until the promise settles, after the response has gone out. */
  waitUntil(promise: Promise<unknown>): void;
  /** Hands the request on to the next function, or to the static asset server. */
  next(input?: Request | string, init?: RequestInit): Promise<Response>;
  passThroughOnException(): void;
}

export type PagesFunction<Env = unknown> = (
  context: PagesContext<Env>,
) => Response | Promise<Response>;

/**
 * The Workers Cache API (https://developers.cloudflare.com/workers/runtime-apis/cache/):
 * `caches.default` is a per-data-centre cache that the DOM typings do not know about.
 * Undefined where there is no such cache (a unit test, a plain Node process).
 */
export function edgeCache(): Cache | undefined {
  return (globalThis as unknown as { caches?: { default?: Cache } }).caches?.default;
}
