/**
 * Leaves the Apache-only files out of a Cloudflare Pages upload (docs/deployment.md A.3).
 *
 * `npm run build` writes everything under public/ into dist/, including `.htaccess` and
 * `api/contact.php`, which belong to the Apache host. On Pages the functions in functions/ answer
 * /api/contact.php and /gold-rates.php and `_headers` / `_redirects` apply, so the two files would
 * only be served as plain downloads (the live site served /.htaccess as a 6 KB octet-stream after
 * the first by-hand deploy). Run by `npm run pages:deploy` and by .github/workflows/deploy.yml
 * before `wrangler pages deploy`; a missing file is fine.
 *
 *   node scripts/prune-pages-dist.mjs [dist]
 */
import { existsSync, readdirSync, rmSync, rmdirSync } from 'node:fs';
import { join } from 'node:path';

const dist = process.argv[2] ?? 'dist';
if (!existsSync(dist)) {
  console.error(`prune-pages-dist: ${dist}/ does not exist; run npm run build first`);
  process.exit(1);
}

const APACHE_ONLY = ['.htaccess', join('api', 'contact.php')];
for (const file of APACHE_ONLY) {
  const path = join(dist, file);
  if (!existsSync(path)) continue;
  rmSync(path, { force: true });
  console.log(`prune-pages-dist: removed ${path}`);
}
// The api/ folder held only the PHP file; an empty folder would otherwise upload as nothing.
const api = join(dist, 'api');
if (existsSync(api) && readdirSync(api).length === 0) rmdirSync(api);
