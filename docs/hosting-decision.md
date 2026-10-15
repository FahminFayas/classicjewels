# Hosting decision

**Date:** 15 October 2026. **Decision:** Cloudflare Pages on the Free plan, deployed from GitHub Actions. **Runner-up:** Vercel on the Pro plan. The recommended path is prepared in the repository (`functions/`, `wrangler.toml`, `.github/workflows/deploy.yml`); the steps are in `docs/deployment.md`. Every figure below was read from the host's own pages on the date above; the links are in the last section. Plans change, so check the price pages again before paying for anything.

## 1. What the site needs from a host

The build is a folder of static files (`dist/`). Three things sit outside it.

1. **The gold-rate feed, same-origin.** Every page, the build and the snapshot script read `/gold-rates.php` (`PUBLIC_GOLD_RATE_ENDPOINT`, `src/lib/gold-rate.ts`). The script is the store's rate subscription and lives on the current Apache/PHP host. It sends no CORS headers, so a browser can only read it from the site's own origin. A host that is not that PHP server has to proxy the path or run a small function that fetches the script and returns its JSON.
2. **The contact form endpoint.** The form posts to `/api/contact.php` (`PUBLIC_FORM_ENDPOINT`) and expects the contract in `public/api/contact.php`: JSON `{ok, message}` when the request carries `Accept: application/json` (the in-page submit in `src/scripts/form.ts`), otherwise a 303 to `/thank-you/` (no JavaScript), plus the honeypot, fill-time and validation rules. A static host needs a function and a way to send email.
3. **A rebuild three times a day.** `.github/workflows/rates.yml` commits a rate snapshot at 09:20, 13:50 and 18:20 Dubai time. Each commit must produce a new deployment, so the figure baked into every page is the day's.

Then the shape of the business: a jeweller with four counters in Dubai, Sharjah and Abu Dhabi, whose visitors are in the UAE and whose site exists to bring enquiries (WhatsApp, calls, visits). That is commercial use. The security headers and the legacy redirects are already written as `public/_headers` and `public/_redirects` (Netlify syntax, which Cloudflare Pages reads too) and as `public/.htaccess` for Apache. The owner's store runs separately at classic-store-one.vercel.app.

## 2. The four hosts, side by side

|                                        | Cloudflare Pages, Free                                                                                         | Vercel, Hobby / Pro                                                                                              | Netlify, Free                                                                            | GitHub Pages                                                                             |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Price                                  | $0                                                                                                             | Hobby $0; Pro $20 a month per developer seat, with $20 of usage credit                                           | $0, 300 credits a month                                                                  | $0                                                                                       |
| Commercial use on the free tier        | Allowed: nothing in the Workers or Pages terms restricts it                                                    | **Not allowed.** "Hobby teams are restricted to non-commercial personal use only"; Pro or Enterprise is required | Allowed according to Netlify staff on their forum; the plan pages say nothing either way | **Not allowed** "to run your online business" or a site aimed at commercial transactions |
| Static bandwidth and requests          | "Free and unlimited"                                                                                           | Hobby: 100 GB and 1 M requests a month, capped. Pro: 1 TB and 10 M requests included, then metered               | Metered in credits: 20 credits per GB, 2 credits per 10,000 requests                     | Soft limit, 100 GB a month                                                               |
| When the allowance runs out            | Functions stop (fail open keeps the static site up); static assets never stop                                  | Hobby: usage is capped and cannot be bought. Pro: pay as you go                                                  | **Every site on the team is paused and shows "Site not available"** until the next month | GitHub "may not be able to serve the site"                                               |
| Functions (feed proxy, form)           | Pages Functions: 100,000 requests a day, 10 ms CPU each, 50 subrequests                                        | Hobby: 1 M invocations a month                                                                                   | Included, metered at 10 credits per GB-hour                                              | None                                                                                     |
| Proxy the feed without code            | No: `_redirects` rewrites stay inside the project. Needs the 80-line function in `functions/gold-rates.php.ts` | Yes: a `rewrites` entry with an external URL in `vercel.json`                                                    | Yes: a `_redirects` line with status 200                                                 | No                                                                                       |
| `_headers` and `_redirects` as written | Yes: 100 header rules, 2,100 redirects                                                                         | No: `vercel.json` has its own `headers` and `redirects` syntax                                                   | Yes (the files use Netlify's syntax)                                                     | No custom headers at all                                                                 |
| Builds                                 | 500 a month, one at a time, when Cloudflare builds; none used when GitHub Actions builds and uploads           | Included                                                                                                         | 15 credits per production deploy: 20 deploys use the whole month                         | 10 an hour (soft)                                                                        |
| Rebuild after the rates commit         | Git integration, a deploy hook (a POST to a secret URL), or `wrangler pages deploy` from Actions               | Git integration or a deploy hook                                                                                 | Git integration or a build hook                                                          | A GitHub Actions workflow                                                                |
| Scheduled jobs                         | Not needed (GitHub Actions does the schedule)                                                                  | Cron jobs on all plans, but Hobby runs them once a day at best, with an hour's imprecision                       | Scheduled functions                                                                      | Actions schedules                                                                        |
| An edge location in the UAE            | Dubai is on the network list (19 cities in the Middle East)                                                    | Not stated on Vercel's own pages (not verified)                                                                  | Not verified                                                                             | Not verified                                                                             |
| Email from the form                    | Any HTTP email API from the function (Resend prepared)                                                         | Same                                                                                                             | Same, or Netlify Forms with email notifications (a different contract from the PHP file) | None                                                                                     |

## 3. Each host in detail

### Cloudflare Pages

- **Terms.** The Pages Free plan is the Workers Free plan: 100,000 function requests a day and 10 ms of CPU per request, with static asset requests "free and unlimited". The pricing page carries no restriction on commercial use. When the daily function allowance runs out, a project set to "fail open" keeps serving the static site; only the two function routes answer with an error. For this site that means the rate board keeps the figure baked at build and the form falls back to WhatsApp.
- **The two endpoints.** Pages Functions are files in `functions/`, routed by file name: `functions/gold-rates.php.ts` answers `/gold-rates.php` and `functions/api/contact.php.ts` answers `/api/contact.php`, so both `PUBLIC_*` defaults work unchanged. Verified on 15 October 2026 by compiling the folder with Wrangler 4.151 and reading the route table it generates. `_redirects` cannot proxy to another origin on Pages (its 200 rewrites stay inside the project), so the feed goes through the function, which also caches it at the edge for five minutes.
- **`_headers` and `_redirects`.** Read as written; limits of 100 header rules and 2,100 redirects are far above the 6 and 13 in the repository. One rule to know: headers from `_headers` are not added to function responses, so the two functions set their own `Cache-Control` and `X-Content-Type-Options`.
- **Deploys.** Either Cloudflare builds from Git (500 builds a month on Free) or GitHub Actions builds and uploads with `wrangler pages deploy` (no Pages build used; the action is `cloudflare/wrangler-action@v4`). The repository prepares the second: the build then runs `npm run audit` first, and the rebuild after each rate snapshot is a `workflow_run` trigger in `deploy.yml`, which works where a plain push does not (a push made with `GITHUB_TOKEN` never starts another workflow; `workflow_run` and `workflow_dispatch` always do). A deploy hook (a POST to a secret URL) is the alternative if the dashboard's Git builds are preferred.
- **Pages or Workers?** Cloudflare's own matrix now presents Workers with static assets as the fuller platform and says it plans migration paths from Pages. Pages is maintained and still the simpler fit for a static site with two functions; moving later is a configuration change, not a rewrite. Nothing in this repository depends on a Pages-only feature.
- **Network.** Cloudflare lists Dubai among its cities, so UAE visitors are served from inside the country.
- **Cost.** $0 for the site. The current hosting account stays for the PHP rate script (see `docs/deployment.md`, the feed subdomain), unless the owner's rate provider offers an HTTPS API that the function can call directly.

### Vercel

- **Terms.** The fair-use page is explicit: "Hobby teams are restricted to non-commercial personal use only. All commercial usage of the platform requires either a Pro or Enterprise plan", and commercial means "advertising the sale of a product or service" among other things. A jeweller's site is commercial, so Hobby is not an option for classicjewels.ae. **This applies to the store at classic-store-one.vercel.app too**: if it runs on a Hobby team, it is outside Vercel's terms today, and moving it to Pro is worth doing whatever is decided here.
- **Pro.** $20 a month per developer seat with $20 of usage credit, 1 TB of transfer and 10 M requests included; cron jobs on every plan (every minute on Pro, once a day on Hobby). `vercel.json` carries `headers`, `redirects` and `rewrites`, and a rewrite may point at an external URL, so the feed could be proxied without a function. The contact form would be a Vercel Function (`api/contact.ts`) with the same code as the Pages one, minus the Pages-specific context.
- **When it wins.** If the owner already pays for Pro for the store, one more project on the same team costs nothing extra, and keeping both sites in one dashboard is a real convenience. That is the only case in which Vercel beats Cloudflare for this site; the price of the seat is otherwise paid for nothing the site needs.

### Netlify

- **Terms and limits.** Since September 2025 the Free plan is 300 credits a month, spent on deploys (15 each), bandwidth (20 per GB), requests (2 per 10,000) and compute. Netlify's billing FAQ says that once the credits are used, "all of your web projects are paused and visitors will find a Site not available page". Three builds a day for the rate alone cost 1,350 credits a month, so this site would be offline for most of every month on Free; the next tier (Personal, $9 a month, 1,000 credits) is still short. Commercial use is allowed according to Netlify staff on the support forum, but it is not written into the plan pages.
- **What fits.** `_headers` and `_redirects` are Netlify's own syntax, a `_redirects` line proxies the feed with no code, and Netlify Forms would take the submissions, but Forms answer with a redirect or a generic success, not the JSON contract `form.ts` expects, so the endpoint would still be a function.
- **Verdict.** Technically the easiest, financially the least predictable: a deploy cadence set by the gold rate does not suit a credit model that pauses the whole site.

### GitHub Pages

- **Terms.** "GitHub Pages is not intended for or allowed to be used as a free web-hosting service to run your online business", with a soft limit of 100 GB a month and 10 builds an hour. There are no functions, no custom headers (so no CSP, no HSTS) and no proxying, so neither the feed nor the form can work same-origin. Ruled out.

## 4. The decision

**Cloudflare Pages, Free plan, deployed by GitHub Actions.** It is the only host of the four that is free, permits commercial use in writing, never pauses the static site, has an edge in Dubai, reads the `_headers` and `_redirects` already in the repository, and can run the two endpoints the site needs for $0. The one gap (no code-free proxy for the feed) is closed by `functions/gold-rates.php.ts`, which also gives the PHP host a five-minute edge cache it never had. The build runs on GitHub (about three minutes, three or four times a day; GitHub's Free plan includes 2,000 Actions minutes a month for private repositories, unlimited for public ones), so Cloudflare's build quota is not used at all and the audit runs before every deploy.

**Runner-up: Vercel Pro**, for the single reason given above: it costs nothing extra if the store already needs a Pro seat, and both sites then live in one place. The code in `functions/` ports with small changes; `_headers` and `_redirects` would be rewritten as `vercel.json`. No `vercel.json` is prepared because the recommendation is Cloudflare.

**Not recommended:** Netlify Free (the site goes offline when credits run out, and the deploy cadence spends them), GitHub Pages (forbidden for a business site, and no functions).

**Keep the Apache host working.** `public/.htaccess` and `public/api/contact.php` stay in the repository and in every build; `docs/deployment.md` section B is unchanged in substance. The current hosting account also stays, because the PHP rate script lives there.

## 5. Email from the form: Resend

The PHP endpoint calls `mail()`; an edge function has no mail server. The prepared function sends through Resend's HTTP API: one HTTPS call, no SMTP, a documented Workers integration, a Free plan of 3,000 emails a month (100 a day) and up to 3 verified domains, Pro at $20 a month for 50,000. The volume of a contact form is a few messages a day. Requirements: the sending domain (classicjewels.ae) must be verified with the DNS records Resend lists, which takes minutes once DNS is on Cloudflare, and the API key is a Pages secret. There is no UAE data-residency rule for a shop's enquiry email; Resend lets the sending region be chosen per domain. Alternatives with the same shape (an HTTP POST with a key) are Brevo and Postmark; swapping means editing the `mail` object and the endpoint in `functions/api/contact.ts`.

## 6. What it costs

| Item         | Cloudflare path     | Note                                                            |
| ------------ | ------------------- | --------------------------------------------------------------- |
| Hosting      | $0                  | Pages Free                                                      |
| DNS          | $0                  | The zone moves to Cloudflare (nameservers at the .ae registrar) |
| Functions    | $0                  | Under 100,000 requests a day; the feed is cached five minutes   |
| Email        | $0                  | Resend Free, 100 a day                                          |
| Builds       | $0                  | GitHub Actions minutes                                          |
| The PHP host | The current renewal | Keeps `gold-rates.php` (and any mailboxes on the domain)        |

## 7. Sources (all read 15 October 2026)

- Cloudflare Pages limits (builds, files, `_headers`, `_redirects`, Functions quota): https://developers.cloudflare.com/pages/platform/limits/
- Workers limits (Free: 100,000 requests a day, 10 ms CPU, 50 subrequests): https://developers.cloudflare.com/workers/platform/limits/
- Workers pricing (static assets free and unlimited; Pages Functions billed the same; Paid $5 a month): https://developers.cloudflare.com/workers/platform/pricing/
- Pages Functions routing and `_routes.json` (fail open / fail closed): https://developers.cloudflare.com/pages/functions/routing/
- Pages Functions API (handlers, `waitUntil`, `next`, `env.ASSETS`): https://developers.cloudflare.com/pages/functions/api-reference/
- Pages Functions in TypeScript: https://developers.cloudflare.com/pages/functions/typescript/
- Pages `_headers` (not applied to function responses): https://developers.cloudflare.com/pages/configuration/headers/
- Pages `_redirects`: https://developers.cloudflare.com/pages/configuration/redirects/
- Deploy hooks: https://developers.cloudflare.com/pages/configuration/deploy-hooks/
- Direct Upload from GitHub Actions (`cloudflare/wrangler-action@v4`, token permission): https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/
- `wrangler.toml` for Pages (`pages_build_output_dir`, `[vars]`, dashboard read-only): https://developers.cloudflare.com/pages/functions/wrangler-configuration/
- Variables and secrets for Pages Functions (`.dev.vars` or `.env` locally): https://developers.cloudflare.com/pages/functions/bindings/
- Wrangler Pages commands (`pages deploy`, `pages secret put`, `pages functions build`, `pages dev`): https://developers.cloudflare.com/workers/wrangler/commands/pages/
- Custom domains on Pages (apex must be a Cloudflare zone; CAA): https://developers.cloudflare.com/pages/configuration/custom-domains/
- GitHub integration (skip prefixes, branch control): https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/
- Workers vs Pages compatibility matrix: https://developers.cloudflare.com/workers/static-assets/compatibility-matrix/
- Cache API (`caches.default`, per data centre): https://developers.cloudflare.com/workers/runtime-apis/cache/
- Cloudflare network map (Dubai, AE): https://www.cloudflare.com/network/
- `cloudflare/wrangler-action` (v4): https://github.com/cloudflare/wrangler-action
- Vercel fair use (Hobby non-commercial; usage table): https://vercel.com/docs/limits/fair-use-guidelines
- Vercel pricing (Hobby and Pro figures): https://vercel.com/pricing
- Vercel project configuration (`headers`, `redirects`, `rewrites` to external URLs, `crons`): https://vercel.com/docs/project-configuration
- Vercel cron jobs per plan: https://vercel.com/docs/cron-jobs/usage-and-pricing
- Netlify pricing (300 credits; credit costs): https://www.netlify.com/pricing/
- Netlify billing FAQ for credit plans (sites paused when credits run out): https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/billing-faq-for-credit-based-plans
- Netlify Forms usage and billing: https://docs.netlify.com/manage/forms/usage-and-billing/
- Netlify Forms setup (redirect or AJAX, no JSON body): https://docs.netlify.com/manage/forms/setup/
- Netlify proxies with `_redirects` status 200: https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/
- Netlify staff on commercial use of the free plan: https://answers.netlify.com/t/can-we-use-netlify-free-plan-for-commercial-purposes/41545
- GitHub Pages limits and the prohibited-use clause: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- `GITHUB_TOKEN` events do not start workflows, except `workflow_dispatch` and `repository_dispatch`: https://docs.github.com/en/actions/concepts/security/github_token
- GitHub Actions included minutes: https://docs.github.com/en/billing/managing-billing-for-your-products/managing-billing-for-github-actions/about-billing-for-github-actions
- Resend pricing (Free: 3,000 a month, 100 a day, 3 domains): https://resend.com/pricing
- Resend send-email API (`from`, `to`, `subject`, `text`, `reply_to`, `headers`): https://resend.com/docs/api-reference/emails/send-email
- Resend domains (a verified domain is required; region per domain): https://resend.com/docs/dashboard/domains/introduction
