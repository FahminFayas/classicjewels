# Deployment

The build output is a folder of static files. It can be hosted anywhere, but the current host (Apache with PHP) is the default and needs the least setup.

## Option A: the existing Apache host (default)

1. Build locally or in CI:

   ```bash
   npm ci
   npm run build
   ```

2. Upload the contents of `dist/` to the web root, replacing the old site. `dist/.htaccess` must be included; it carries the https/non-www redirect, the redirects from the old URLs, caching, compression and the security headers.
3. Keep `gold-rates.php` in the web root. The rate board fetches `/gold-rates.php` same-origin. It is not part of this repository.
4. Open `public/api/contact.php` (deployed as `/api/contact.php`) and set `RECIPIENT` to the inbox that should receive enquiries. The form posts `name`, `email`, `phone`, `branch`, `topic`, `reference`, `message`, plus the honeypot `website` and `started_at`. Test it once from the live site, including the honeypot path (fill the hidden field with any value; the request must return success and send nothing).
5. Confirm the old parked-domain 404 page is gone: request a nonsense URL and expect the site's own `404.html`.
6. Set up a daily rebuild so the baked gold rate and the sitemap dates stay fresh: either the GitHub Actions workflow in `.github/workflows/rates.yml` plus a deploy step, or a cron job on the host that runs the build and syncs `dist/`.

### Checking headers

```bash
curl -sI https://classicjewels.ae/ | grep -iE "strict-transport|content-security|x-frame|x-content-type|referrer|cache-control"
```

All six should be present. `securityheaders.com` should report an A.

## Option B: Netlify or Cloudflare Pages

- Build command `npm run build`, publish directory `dist`, Node 22.
- `public/_headers` and `public/_redirects` are copied into `dist/` and replace `.htaccess`.
- The gold-rate feed must be reachable same-origin. Add a redirect/proxy rule from `/gold-rates.php` to the PHP host, or set `PUBLIC_GOLD_RATE_ENDPOINT` to a same-origin function that fetches it. Without this the board still shows the build-time value; it just does not refresh in the browser.
- The contact form needs a form backend. Point `PUBLIC_FORM_ENDPOINT` at Netlify Forms, Formspree, Web3Forms or a serverless function that accepts the same field names.

## Environment variables

Copy `.env.example` to `.env` for local overrides. All variables are public (embedded in the client bundle):

| Variable                    | Default            | Purpose                                 |
| --------------------------- | ------------------ | --------------------------------------- |
| `PUBLIC_GOLD_RATE_ENDPOINT` | `/gold-rates.php`  | JSON feed the rate board refreshes from |
| `PUBLIC_GTM_ID`             | (empty: disabled)  | Google Tag Manager container id         |
| `PUBLIC_FORM_ENDPOINT`      | `/api/contact.php` | Where the contact form posts            |

## Continuous integration

`.github/workflows/ci.yml` runs type-check, lint, format check and the build on every push and pull request, then Lighthouse CI against the built site with the thresholds in `lighthouserc.json` (performance ≥ 0.95 as a warning, accessibility, best practices and SEO as errors). Add a deploy step after the build job for your host.

## Updating the site

- Content: edit files in `src/content/` (see `docs/content-guide.md`), run `npm run check`, commit. The next build publishes it.
- Business facts (hours, phone, a new branch): edit `src/data/site.ts`.
- Fonts, colours, spacing: `src/styles/tokens.css`.
- Dependencies: `npm outdated`, then `npm update`. Astro major upgrades: `npx @astrojs/upgrade` and read the migration guide.
