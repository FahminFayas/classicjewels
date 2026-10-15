# Deployment

The build output is a folder of static files (`dist/`). Two hosts are supported from this repository, and every build contains the files for both; each host ignores the other's.

- **A. Cloudflare Pages** (recommended; the reasons and sources are in `docs/hosting-decision.md`). `functions/` answers `/gold-rates.php` and `/api/contact.php` on the site's own origin, `wrangler.toml` holds the project settings, and `.github/workflows/deploy.yml` builds and uploads on every push to `main` and after every gold-rate snapshot.
- **B. The existing Apache/PHP host.** Upload `dist/`, keep `gold-rates.php` in the web root, and `public/api/contact.php` takes the form.

Pick one for classicjewels.ae. The rest of this file assumes A; B is at the end and unchanged in substance.

## A. Cloudflare Pages

### A.1 What is where

| File                                   | Role                                                                                                                                                                                |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `functions/gold-rates.php.ts`          | Serves `/gold-rates.php`: fetches the PHP script at `ORIGIN_FEED_URL`, checks the JSON shape, caches it at the edge for `FEED_CACHE_SECONDS` (300), answers 502 if the feed is down |
| `functions/api/contact.ts`             | Serves `/api/contact`: the contract of `public/api/contact.php` (fields, validation, honeypot, fill time, JSON or 303), emailing through Resend                                     |
| `functions/api/contact.php.ts`         | Serves `/api/contact.php` with the same handlers, so the `PUBLIC_FORM_ENDPOINT` default needs no change                                                                             |
| `functions/_lib/types.ts`              | The few Pages types the functions use (no `@cloudflare/workers-types` dependency); underscore files are never routed                                                                |
| `functions/tsconfig.json`              | `npm run functions:check` type-checks the folder against the Workers surface; `astro check` covers it too                                                                           |
| `wrangler.toml`                        | Project name, output folder, compatibility date and the plain `[vars]` the functions read                                                                                           |
| `.github/workflows/deploy.yml`         | Build, `npm run audit`, drop the Apache-only files, `wrangler pages deploy`                                                                                                         |
| `public/_headers`, `public/_redirects` | Security headers, caching, the www redirect and the legacy redirects; Pages reads both files as they are                                                                            |
| `.env.example`                         | The function settings for local runs (`npm run pages:dev` reads `.env`)                                                                                                             |

### A.2 One-time setup

About an hour, in this order. Steps 1 to 3 can be done days before the switch; nothing changes for visitors until step 8.

1. **Cloudflare account and zone.** Create a free account, add the site `classicjewels.ae` (Free plan). Cloudflare scans the current DNS; compare its list with the registrar's or cPanel's zone and add anything missing, in particular MX and TXT (SPF, DKIM) records if mail is received on the domain. Then set the two Cloudflare nameservers at the .ae registrar. Wait until the zone shows Active (minutes to a day). The old host keeps serving the site through this, because the A record still points at it.
2. **Create the Pages project** (not connected to Git; the workflow uploads). On a machine with Node 22: `npx wrangler@4 login`, then `npx wrangler@4 pages project create classicjewels --production-branch main`. The name must match `name` in `wrangler.toml`.
3. **The feed subdomain.** The PHP rate script stays on the current host, but after step 8 that host no longer answers as classicjewels.ae, so it needs a name of its own. In cPanel create the subdomain `feed.classicjewels.ae` with the document root that contains `gold-rates.php` (the current `public_html` is fine). In Cloudflare DNS add an A record `feed` with the host's IP, **DNS only** (grey cloud), so cPanel's AutoSSL can issue a certificate for it. Test from a terminal: `curl -A "Mozilla/5.0" https://feed.classicjewels.ae/gold-rates.php` must return the JSON. If AutoSSL cannot issue a certificate, set the record to Proxied instead and SSL/TLS mode to Full (the function then reaches the host through Cloudflare's own certificate). As a last resort `ORIGIN_FEED_URL` may be `http://`: the call is server to server and never leaves a browser, but prefer https. If the value differs from the one in `wrangler.toml`, change it there and commit.
4. **GitHub secrets.** In Cloudflare: My Profile > API Tokens > Create Token > Custom token with the permission **Account, Cloudflare Pages, Edit**; copy it once. The Account ID is on the dashboard's account overview. In the repository: Settings > Secrets and variables > Actions, add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. Optional, under Variables: `PUBLIC_GTM_ID` (leave unset to keep tracking off).
5. **Resend.** Sign up at resend.com, Domains > Add domain > `classicjewels.ae`, choose the region, and add the DNS records it lists in Cloudflare DNS (a DKIM TXT, an SPF TXT and an MX for its return-path subdomain; they do not disturb the domain's own mail). Verify. Then API Keys > Create, sending access only, and copy it once. Set it as the project's secret: `npx wrangler@4 pages secret put RESEND_API_KEY --project-name classicjewels` and paste, or in the dashboard: the project > Settings > Variables and Secrets > Add, type **Secret**, for both Production and Preview. Check `CONTACT_TO` in `wrangler.toml` is the inbox that should receive enquiries (the same value as `RECIPIENT` in `public/api/contact.php`) and `CONTACT_FROM` is on the verified domain.
6. **First deployment.** Push the branch to `main`, or Actions > "Deploy to Cloudflare Pages" > Run workflow. The run takes about three minutes. Open `https://classicjewels.pages.dev/`: the site, the rate board (open the browser console: `/gold-rates.php` must return JSON), and the form (section A.6).
7. **Custom domain.** The project > Custom domains > Set up a domain > `classicjewels.ae` > Continue. Because the zone is on the same account, Cloudflare writes the CNAME itself (do not add it by hand first; that gives a 522). Repeat for `www.classicjewels.ae`. The `_redirects` rule sends www to the apex with a 301.
8. **Go live and TLS.** The custom domain is live as soon as the CNAME replaces the old A record (step 7 does that). Then SSL/TLS > Edge Certificates: **Always Use HTTPS** on, Minimum TLS Version 1.2. HSTS already comes from `_headers` (`max-age=31536000; includeSubDomains`, no preload), so leave the zone's HSTS toggle off; add `preload` only when every subdomain, the feed included, is HTTPS and meant to stay so. If the feed record is Proxied, set SSL/TLS mode to Full (strict) when the host has a valid certificate, otherwise Full.
9. **Rate limit the form** (optional, recommended). Security > WAF > Rate limiting rules: path starts with `/api/contact`, more than 5 requests in 1 minute from one IP, block for 10 minutes. The Free plan includes a rule for this.
10. **Clean up.** Delete the old site files from the Apache host except `gold-rates.php` (and anything else the subdomain still needs), so nobody finds the old pages at the host's direct address. Keep the hosting account; the feed depends on it. Work through `docs/launch-checklist.md`, section 3.

### A.3 How a deployment happens

| Trigger                                                   | What runs                                                                                                                                                                                                                                                                     |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A push to `main`                                          | `deploy.yml`: `npm ci`, `npm run build`, `npm run audit`, remove `dist/.htaccess` and `dist/api/contact.php`, `wrangler pages deploy --branch=main`                                                                                                                           |
| "Gold rate snapshot" (`rates.yml`) finishing successfully | The same, through `workflow_run`. The snapshot commits with `GITHUB_TOKEN`, and a push made with that token never starts a workflow by itself; a `workflow_run` event does. It runs after every snapshot, changed file or not, so each deploy bakes the current feed value in |
| Actions > Run workflow                                    | The same, by hand                                                                                                                                                                                                                                                             |

The build fetches the live feed once (`fetchGoldRateAtBuild` in `src/lib/gold-rate.ts`) from `https://classicjewels.ae/gold-rates.php`, which on Pages is the function, so the baked figure is the feed's at build time. `wrangler pages deploy` reads `wrangler.toml` for the project name and output folder, compiles `functions/` into the deployment and writes `_routes.json` so only the two function paths invoke a Worker; every other request is a static asset, free and unlimited. Deployments are one at a time, in order (`concurrency` in the workflow). `ci.yml` keeps running checks, lint, format, build, audit and Lighthouse on every push and pull request.

**Cloudflare's Git builds instead of the workflow.** Possible, but a project is either Git-connected or Direct Upload, never both. To use Git builds: create the project from Workers & Pages > Create > Pages > Connect to Git, build command `npm run build`, output `dist`, environment variable `NODE_VERSION=22`, and delete `deploy.yml`. The rates commit then builds automatically (the GitHub App sees every push). The downside is that `npm run audit` no longer gates a deploy and the build minutes count against the plan's 500.

### A.4 Settings reference

Plain values live in `wrangler.toml` under `[vars]`, are deployed with every build, and show read-only in the dashboard. The secret lives only in the project.

| Name                 | Where           | Default                                              | Purpose                                                               |
| -------------------- | --------------- | ---------------------------------------------------- | --------------------------------------------------------------------- |
| `ORIGIN_FEED_URL`    | `wrangler.toml` | `https://feed.classicjewels.ae/gold-rates.php`       | The PHP script, by a name that is not the site (step 3)               |
| `FEED_CACHE_SECONDS` | `wrangler.toml` | `300`                                                | Edge cache lifetime for the feed                                      |
| `CONTACT_TO`         | `wrangler.toml` | `hello@classicgroup.ae`                              | Inbox for enquiries; several addresses separated by commas            |
| `CONTACT_FROM`       | `wrangler.toml` | `Classic Jewels Website <no-reply@classicjewels.ae>` | Sender, on the Resend-verified domain                                 |
| `SITE_ORIGIN`        | `wrangler.toml` | `https://classicjewels.ae`                           | Origin the form may post from (the deployment's own is also accepted) |
| `RESEND_API_KEY`     | Pages secret    | none                                                 | Resend key; without it the form answers 500 and logs the reason       |
| `PUBLIC_GTM_ID`      | GitHub variable | none                                                 | Build-time: Google Tag Manager container                              |

### A.5 Testing the functions locally

```bash
npm run build                 # dist/ is what pages dev serves
cp .env.example .env          # fill in ORIGIN_FEED_URL (the live site's feed works) and RESEND_API_KEY
npm run pages:dev             # http://127.0.0.1:8788, with the functions, _headers and _redirects

curl -s http://127.0.0.1:8788/gold-rates.php
# {"msg":"Subscription Valid","gold_rate_date":"2026-10-15", ...}

# In-page submit (form.ts): JSON
curl -s -i -H 'Accept: application/json' \
  -d 'form=visit&name=Test&contact_method=email&email=test@example.com&fill_ms=9000' \
  http://127.0.0.1:8788/api/contact.php
# 200 {"ok":true,"message":"Thank you. We have your message and reply during shop hours."}

# No JavaScript: a 303 to /thank-you/
curl -s -i -d 'form=visit&name=Test&contact_method=email&email=test@example.com' \
  http://127.0.0.1:8788/api/contact.php | head -3

# Honeypot: success, nothing sent; a missing name: 422
curl -s -H 'Accept: application/json' -d 'name=Bot&website=x' http://127.0.0.1:8788/api/contact.php
curl -s -H 'Accept: application/json' -d 'form=visit' http://127.0.0.1:8788/api/contact.php
```

`pages dev` reads `.env` for the function settings (never create `.dev.vars` as well: it would take precedence). The functions log with `console.error`/`warn`; in production read them with `npx wrangler@4 pages deployment tail --project-name classicjewels`.

### A.6 After go-live

```bash
curl -sI https://classicjewels.ae/ | grep -iE "strict-transport|content-security|x-frame|x-content-type|referrer|cache-control|speculation"
curl -sI https://www.classicjewels.ae/ | grep -iE "^HTTP|location"     # 301 to the apex
curl -sI https://classicjewels.ae/about-us.html | grep -iE "^HTTP|location"   # 301 /about/
curl -sI https://classicjewels.ae/nothing-here/ | head -1              # 404 with the site's page
curl -s https://classicjewels.ae/gold-rates.php                         # the JSON
```

Then the form from the live site, three times: a normal visit request answered in place (JSON path); the same with JavaScript disabled (the 303 to `/thank-you/`); and once with the hidden `website` field filled from the browser's developer tools (success shown, no email received). securityheaders.com should report an A, as on Apache. Run `npm run lighthouse` against the live site and keep the reports.

### A.7 Rolling back

The project > Deployments > the previous deployment > Rollback to this deployment. Or re-run the workflow on an earlier commit. The functions and `[vars]` roll back with the deployment; the secret does not change.

## B. The existing Apache host

1. Build locally or in CI:

   ```bash
   npm ci
   npm run build
   ```

2. Upload the contents of `dist/` to the web root, replacing the old site. `dist/.htaccess` must be included; it carries the https and non-www redirect, the redirects from the old URLs, caching, compression and the security headers. `dist/_headers` and `dist/_redirects` are harmless there (Apache serves them as text if asked, and they contain nothing secret).
3. Keep `gold-rates.php` in the web root. The rate board fetches `/gold-rates.php` same-origin. It is not part of this repository.
4. Open `public/api/contact.php` (deployed as `/api/contact.php`) and set `RECIPIENT` to the inbox that should receive enquiries. Test it once from the live site, including the honeypot path (fill the hidden `website` field with any value; the request must return success and send nothing) and the no-JavaScript path (a 303 to `/thank-you/`).
5. Confirm the old parked-domain 404 page is gone: request a nonsense URL and expect the site's own `404.html`.
6. Set up the rebuild so the baked gold rate stays fresh: `.github/workflows/rates.yml` commits the snapshot three times a day, but nothing on Apache deploys it. Either a cron job on the host that pulls the repository, builds and syncs `dist/` into the web root, or an upload step in a GitHub workflow (SFTP or rsync with a deploy key). Without it the rate board still refreshes in the browser from the feed; only the figure in the HTML ages.

### Checking headers

```bash
curl -sI https://classicjewels.ae/ | grep -iE "strict-transport|content-security|x-frame|x-content-type|referrer|cache-control"
```

All six should be present. securityheaders.com should report an A.

## Environment variables at build time

Copy `.env.example` to `.env` for local overrides. The `PUBLIC_*` variables are embedded in the client bundle; the rest are read by the Pages functions at request time (section A.4) and never reach the browser.

| Variable                    | Default            | Purpose                                 |
| --------------------------- | ------------------ | --------------------------------------- |
| `PUBLIC_GOLD_RATE_ENDPOINT` | `/gold-rates.php`  | JSON feed the rate board refreshes from |
| `PUBLIC_GTM_ID`             | (empty: disabled)  | Google Tag Manager container id         |
| `PUBLIC_FORM_ENDPOINT`      | `/api/contact.php` | Where the contact form posts            |

Both hosts work with the defaults. If `PUBLIC_FORM_ENDPOINT` ever points at another origin, add that origin to `form-action` and `connect-src` in `public/_headers` and `public/.htaccess`.

## The rebuild chain

```
rates.yml (09:20, 13:50, 18:20 Dubai)  -->  commit src/content/rates/<date>.json  -->  deploy.yml (workflow_run)  -->  build (live feed fetched)  -->  wrangler pages deploy
```

GitHub runs schedules on the default branch, so both workflows must be on `main`. Schedules can start late by a few minutes at busy times. If a snapshot run fails, `deploy.yml` skips (the condition on `workflow_run.conclusion`), and the previous deployment stays up with its baked figure; the rate board still refreshes in the browser.

## Continuous integration

`.github/workflows/ci.yml` runs type-check, lint, format check, the build and the dist audit on every push and pull request, then Lighthouse CI against the built site with the thresholds in `lighthouserc.json`. `npm run validate` also runs `npm run functions:check`.

## Updating the site

- Content: edit files in `src/content/` (see `docs/content-guide.md`), run `npm run check`, commit. The next deployment publishes it.
- Business facts (hours, phone, a new branch): edit `src/data/site.ts`.
- Fonts, colours, spacing: `src/styles/tokens.css`.
- The inbox for enquiries: `CONTACT_TO` in `wrangler.toml` (Pages) and `RECIPIENT` in `public/api/contact.php` (Apache).
- Dependencies: `npm outdated`, then `npm update`. Astro major upgrades: `npx @astrojs/upgrade` and read the migration guide. Wrangler is not a dependency; the `pages:*` scripts run it through `npx wrangler@4`.

## Troubleshooting

| Symptom                                                    | Cause and fix                                                                                                                                                                                 |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/gold-rates.php` answers 503 `Feed not configured`        | `ORIGIN_FEED_URL` is missing, not http(s), or points at the site itself. Fix it in `wrangler.toml` and deploy                                                                                 |
| `/gold-rates.php` answers 502 `Feed unavailable`           | The PHP host did not answer, answered an error, or returned something other than the feed. `curl -A "Mozilla/5.0" <ORIGIN_FEED_URL>` from a terminal; check the subdomain and its certificate |
| The rate board never changes after a deploy                | Expected while the feed's posting equals the baked one; `rate.ts` only writes a newer or changed posting. It also keeps a 30-minute copy in sessionStorage                                    |
| The form answers 500                                       | `RESEND_API_KEY` is not set for this environment, or Resend refused the message (unverified domain, a sender off the domain). Read the function logs                                          |
| The form answers 403                                       | The `Origin` header matches neither the deployment nor `SITE_ORIGIN`. Check `SITE_ORIGIN` after a domain change                                                                               |
| Headers missing on `/gold-rates.php` or `/api/contact.php` | By design: `_headers` applies to static assets only; the functions set their own `Cache-Control` and `X-Content-Type-Options`                                                                 |
| A deploy failed with "project not found"                   | Step 2 was skipped, or `name` in `wrangler.toml` differs from the project's name                                                                                                              |
| A deploy failed with "Direct Upload is not allowed"        | The project is Git-connected. Use Git builds (section A.3) or create a Direct Upload project                                                                                                  |
