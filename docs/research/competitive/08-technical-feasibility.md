# 08 · Technical feasibility: the toolbox for an experiential redesign

Researched 13 October 2026 for the Astro 7.3.8 build in this repo. The question: which modern browser features can make classicjewels.ae feel like an experience instead of a blog, inside this repo's constraints (static output, vanilla CSS tokens, a few KB of vanilla TS, a CSP with no inline scripts), and how do we present 600 × 600 velvet product shots in an immersive layout without visible upscaling.

Method:

- **Support data, not memory.** Browser support comes from the MDN browser-compat-data package 8.1.5 (data timestamp 8 Oct 2026), web-features 3.42.0 (Baseline status) and the caniuse full data set (updated 13 Oct 2026), all downloaded and queried locally, then cross-checked against release notes (Chrome 146, Safari 26.4, WWDC26), web.dev, Chrome for Developers and the Astro docs.
- **Repo read:** `public/.htaccess`, `public/_headers`, `astro.config.mjs`, `src/layouts/BaseLayout.astro`, `src/styles/tokens.css`, `src/styles/base.css`, `src/components/ui/Plate.astro`, `src/components/sections/CategoryTile.astro`, `src/scripts/nav.ts`, `lighthouserc.json`, `docs/research/astro-7-notes.md`, `docs/implementation-notes.md`, plus Astro's own source in `node_modules/astro` (`components/ClientRouter.astro`, `dist/transitions/router.js`, `dist/assets/layout.js`) and `node_modules/sharp/lib/index.d.ts`.
- **Measured:** the current `dist/` build (bytes of every JS, CSS, font and product image file); the ClientRouter bundle (bundled with Rolldown from Astro 7.3.8's own modules, minified and gzipped); the edge and corner colours of every product photo (sharp); and a prototype of the dark-stage composition rendered with sharp at real size and in my own Chromium 152 browser tab at 1440 × 900 and 390 × 844, with `CSS.supports()` probes for every feature below.

---

## Pages and sources visited

| Source                                                                                                       | What it gave                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `@mdn/browser-compat-data` 8.1.5 (unpkg, timestamp 2026-10-08)                                               | Version numbers and dates for every feature in §3; current release of each browser                                                   |
| `web-features` 3.42.0 (unpkg)                                                                                | Baseline status (low / high dates)                                                                                                   |
| caniuse `data-2.0.json` (GitHub, updated 2026-10-13)                                                         | Global usage shares per browser version; notes on Firefox "partial" cross-document view transitions and partial anchor positioning   |
| web.dev "Interop 2026" and webkit.org "Announcing Interop 2026"                                              | Scroll-driven animations is a new Interop 2026 focus area; view transitions (incl. cross-document) and anchor positioning carry over |
| webkit.org "WebKit features for Safari 26.4"                                                                 | Threaded (compositor) scroll-driven animations from Safari 26.4; `@starting-style` and anchor positioning fixes                      |
| webkit.org "News from WWDC26" (Safari 27)                                                                    | Transform-aware anchor positioning, `sizes=auto`, scroll anchoring                                                                   |
| developer.chrome.com: cross-document view transitions; Chrome 146 release notes; scroll-triggered animations | Opt-in rules, 4 s timeout, `pageswap`/`pagereveal`, `blocking=render`; `timeline-trigger` is Chrome-only                             |
| MDN "Experimental features in Firefox"; Mozilla Connect thread                                               | Scroll-driven animations enabled in Nightly only (flag `layout.css.scroll-driven-animations.enabled`)                                |
| web.dev "Largest Contentful Paint"                                                                           | Opacity-0 elements are excluded from LCP; upscaled images report at most their intrinsic size                                        |
| corewebvitals.io "Impact of CSS view transitions on web performance"                                         | About 70 ms added to mobile LCP on repeat views (RUM, 5 sites); about 5 ms on desktop                                                |
| docs.astro.build "View transitions"                                                                          | ClientRouter trade-offs; Astro expects it to become "increasingly unnecessary" as browser APIs mature                                |
| MDN `Speculation-Rules` header                                                                               | Header syntax and the `application/speculationrules+json` MIME type                                                                  |
| This repo's `dist/` and `src/assets/`                                                                        | Byte budgets and photo colours in §1.3 and §4                                                                                        |

---

## Verdict in five lines

1. Everything the redesign needs can be built in CSS with **zero new JavaScript**: native cross-document view transitions, scroll-driven animations, popover/dialog with `@starting-style`, masks and container queries. Each one degrades to a static, complete page.
2. **Do not use Astro's `<ClientRouter />`.** It costs 16,213 B minified (5,725 B gzip), more than three times the site's entire current JS, and it rewires every script's lifecycle. The native `@view-transition` rule costs 0 B and already animates in about 88% of browsers.
3. **Firefox (157) has neither scroll-driven animations nor cross-document view transitions in stable**, and about one iPhone in four is still on iOS 18 or older. Motion must be decoration on top of a page that is already finished without it.
4. **The photos are the real limit, not the platform.** The fix: a near-black indigo stage (`#0b0918`, sampled from the velvet) with the photo's edges feathered by `mask-image` so the 600 px frame disappears. The photo is never drawn wider than 600 CSS px. Never set these photos on brand plum: the blue velvet leaves a visible navy box (tested).
5. A realistic budget is **LCP < 2.0 s on Lighthouse mobile, CLS 0, first-party JS ≤ 15 KB minified**. Today's site ships 4,692 B minified, so there are about 10 KB of headroom, enough for two optional micro-scripts (piece morph, reveal fallback) and nothing else.

---

## 1. The box we design inside

### 1.1 Content-Security-Policy

`public/.htaccess` (line 92) and `public/_headers` carry the same policy:

```
default-src 'self'; base-uri 'self'; form-action 'self' https://wa.me; frame-ancestors 'self';
img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com https://*.google.com https://*.gstatic.com https://*.facebook.com;
script-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://connect.facebook.net https://analytics.tiktok.com;
style-src 'self' 'unsafe-inline'; font-src 'self';
connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.facebook.com https://analytics.tiktok.com;
frame-src https://www.google.com https://maps.google.com https://www.googletagmanager.com; object-src 'none'; upgrade-insecure-requests
```

What that means for the redesign:

| Technique                                                                                                         | Verdict                     | Why                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Any inline `<script>`: `is:inline` code, `<script type="speculationrules">`, a head script that adds a `js` class | **Blocked**                 | `script-src` has no `'unsafe-inline'`, no hashes, no `'inline-speculation-rules'`. `vite.build.assetsInlineLimit: 0` and `scripts/audit-dist.mjs` already stop Astro inlining small scripts.               |
| Bundled module scripts from `src/scripts/`                                                                        | Allowed                     | Same origin. They run after parsing (deferred), so they can never hide content before first paint.                                                                                                         |
| GSAP, Lenis, Swiper, Lottie or any CDN script                                                                     | **Blocked**                 | Only `'self'` and analytics hosts are allowed. Bundling them would break the JS budget anyway.                                                                                                             |
| `style="…"` attributes and `<style>` blocks                                                                       | Allowed                     | `style-src 'unsafe-inline'`. Per-element custom properties (`--stage`, `--cap`, `--i`) and `view-transition-name` can be set in markup without JS. `Plate.astro` already does `style="--plate-max:750px"`. |
| CSS `mask-image: url(…)`, `background-image: url(…)`                                                              | Same origin or `data:` only | Governed by `img-src 'self' data:`. Gradient masks need no fetch at all.                                                                                                                                   |
| Fonts                                                                                                             | Self-hosted only            | `font-src 'self'`; the Astro fonts API already self-hosts Cormorant Garamond and IBM Plex Sans.                                                                                                            |
| Video                                                                                                             | Self-hosted only            | No `media-src`, so it falls back to `default-src 'self'`; `frame-src` allows only Google (Maps, GTM), so no YouTube or Vimeo embeds.                                                                       |
| `Speculation-Rules` HTTP header pointing to a same-origin JSON file                                               | Allowed                     | No inline script involved (see §3.17).                                                                                                                                                                     |
| Workers, WASM image decoders                                                                                      | Effectively no              | `worker-src` falls back to `script-src`; no `'wasm-unsafe-eval'`.                                                                                                                                          |

### 1.2 Build and image configuration (`astro.config.mjs`)

- `output: 'static'`, `trailingSlash: 'always'`, `compressHTML: true`, `build.inlineStylesheets: 'auto'`.
- `image.layout: 'constrained'`, `responsiveStyles: true`, sharp encoders AVIF q55 effort 4, WebP q78, JPEG q82 mozjpeg.
- Astro's sharp service never enlarges. The srcset generator (`node_modules/astro/dist/assets/layout.js`) gives `constrained` layouts `[width, 2 × width, …breakpoints]` filtered to `≤ min(2 × width, originalWidth)`. Breakpoints start at 640, so a 600 px source with `width={600}` produces a single 600w candidate unless `widths` are passed explicitly, as `Plate.astro` does (`[320, 480, 640]` filtered to the source, plus the source width).
- Fonts: Cormorant Garamond variable 300 to 700 (`--font-display`) and IBM Plex Sans variable 100 to 700 (`--font-text`), local files, metric-matched fallbacks generated by Astro (no swap shift).
- Existing motion tokens: `--ease: cubic-bezier(0.2, 0.7, 0.2, 1)`, `--dur-fast: 150ms`, `--dur-base: 200ms`, `--dur-slow: 240ms`. Under `prefers-reduced-motion: reduce` all three become `0ms`. `html { scroll-behavior: smooth }` is set only under `no-preference`.

### 1.3 What the current build ships (measured in `dist/`, built 13 Oct 18:35)

| Item                                                                             | Bytes                                                                                                                                                         |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home HTML                                                                        | 122,507 raw / 18,519 gzip                                                                                                                                     |
| First-party JS on the home page (`nav.ts` 1,992 B + `rate.ts` 2,700 B, minified) | 4,692 min / 2,166 gzip                                                                                                                                        |
| Other page scripts                                                               | Filters 1,559 min (804 gzip); form 1,338 min (699 gzip)                                                                                                       |
| Global CSS (`BaseLayout.*.css`)                                                  | 28,402 raw / 5,638 gzip; largest page CSS file 5,457 raw                                                                                                      |
| Fonts (two variable woff2, both preloaded)                                       | 37,640 + 45,712 = 83,352                                                                                                                                      |
| One 600 × 600 product photo at 600w                                              | AVIF 10,895 to 15,568; WebP 13,756 to 21,522                                                                                                                  |
| Images marked `fetchpriority="high"` on the home page                            | **3** (the 1488 × 962 hero and two 600 × 600 plates). This breaks the "one `priority` image per page" rule and splits bandwidth at the moment LCP is decided. |

Lighthouse CI (`lighthouserc.json`, mobile) already asserts CLS ≤ 0.01 (error), LCP ≤ 2,500 ms (warn), total bytes ≤ 800,000 (warn), performance ≥ 0.95 (warn).

### 1.4 House rules an experiential site has to amend

`CLAUDE.md` says: radius 0, no shadows, no hover transforms, no gradients. Proposed amendment, to be agreed before build:

- **Gradients:** allowed only as `mask-image` alpha ramps (the photo feather in §4) and the single one-shot gold hairline sheen (§7, item 8). Still never as visible colour backgrounds.
- **Radius 0, no shadows:** keep. Depth comes from the dark stage and from light in the photographs, not from drop shadows.
- **No hover transforms:** keep. Scaling a 600 px photo up on hover is upscaling it. Hover states stay colour, hairline and underline.
- **New rule:** every animation sits inside `@media (prefers-reduced-motion: no-preference)` and animates only `transform`/`translate`/`scale`/`opacity`, except the named exceptions in §7.

---

## 2. Browser landscape on 13 October 2026

| Browser                          | Current stable (BCD 8.1.5)                                                                                                              |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Chrome and Chrome Android        | 155 (6 Oct 2026); 156 beta lands 20 Oct                                                                                                 |
| Edge                             | 154 (24 Sep 2026)                                                                                                                       |
| Firefox                          | 157 (29 Sep 2026); 158 beta 13 Oct                                                                                                      |
| Safari macOS and iOS             | 27 (14 Sep 2026)                                                                                                                        |
| Samsung Internet                 | 30 (11 May 2026)                                                                                                                        |
| My browser tab for this research | Chromium 152.0.7977.130; `CSS.supports()` returned true for every feature in §3, including `timeline-trigger` and `scroll-marker-group` |

Usage shape (caniuse global, 13 Oct 2026): Chrome Android 154 alone is 42.8% of tracked usage. iOS Safari is about 14.7%. Of that, iOS 26.x/27 is about 11.35 points (≈ 77%) and iOS 18.5 to 18.7 about 2.0 points. **Roughly one iPhone in four will not get any Safari 26 feature** (scroll-driven animations, anchor positioning, `text-wrap: pretty`). The UAE has a higher iPhone share than the global mix, so Safari-26-only features must stay enhancements and never carry the layout.

Interop 2026 lists scroll-driven animations (new), view transitions including cross-document (carryover) and anchor positioning (carryover). So the Firefox gaps are officially targeted for 2026, but none had shipped in Firefox 157.

---

## 3. Feature by feature

### Summary

"Users" is the approximate share of global usage with full support, computed from caniuse usage by version against the BCD first-full-support versions.

| Feature                                                                                               | Chromium (Chrome/Edge) | Safari (mac/iOS)                             | Firefox                            | Baseline (web-features 3.42)                                                             | Users | Verdict for Classic               |
| ----------------------------------------------------------------------------------------------------- | ---------------------- | -------------------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------- | ----- | --------------------------------- |
| Scroll-driven animations (`animation-timeline: view()/scroll()`, `animation-range`, `timeline-scope`) | 115 (Jul 2023)         | 26 (Sep 2025); compositor-threaded from 26.4 | Nightly only                       | No                                                                                       | ≈ 87% | Use, behind `@supports`           |
| Scroll-triggered animations (`timeline-trigger`, `animation-trigger`)                                 | 146 (Mar 2026)         | No                                           | No                                 | No                                                                                       | ≈ 70% | Don't use                         |
| Cross-document view transitions (`@view-transition { navigation: auto }`)                             | 126 (Jun 2024)         | 18.2 (Dec 2024)                              | No (same-document only, since 144) | No                                                                                       | ≈ 88% | Use (0 B JS)                      |
| `view-transition-name` / `view-transition-class`                                                      | 111 / 125              | 18 / 18.2                                    | 144 / 144                          | Low, 2025-10-14                                                                          | ≈ 90% | Use                               |
| `pagereveal` / `pageswap`                                                                             | 123 / 124              | 18.2 (pageswap partial)                      | No                                 | No                                                                                       | ≈ 87% | Optional micro-script             |
| `@starting-style`                                                                                     | 117                    | 17.5                                         | 129                                | Low, 2024-08-06                                                                          | ≈ 92% | Use                               |
| `transition-behavior: allow-discrete` (transitioning `display`)                                       | 117 (117)              | 17.4 (18)                                    | 129 (no)                           | Low, 2024-08-06 (display-animation: no)                                                  | ≈ 92% | Use; Firefox exits snap           |
| `interpolate-size` / `calc-size()`                                                                    | 129                    | No                                           | No                                 | No                                                                                       | ≈ 72% | Bonus only                        |
| `::details-content`                                                                                   | 131                    | 18.4                                         | 143                                | Low, 2025-09-16                                                                          | ≈ 90% | Use                               |
| `popover`                                                                                             | 114                    | 17 (iOS 18.3)                                | 125                                | Low, 2025-01-27                                                                          | ≈ 92% | Use                               |
| `popover="hint"`                                                                                      | 151                    | Preview                                      | 153                                | No                                                                                       | –     | Don't use                         |
| Anchor positioning (core: `anchor-name`, `anchor()`, `position-area`, `position-try-fallbacks`)       | 125 to 129             | 26                                           | 147 (Jan 2026)                     | No (sub-features: `position-anchor` complete only in Chrome 151, Firefox 151, Safari 27) | ≈ 87% | Enhancement with centred fallback |
| Invoker commands (`commandfor`, `command`)                                                            | 135                    | 26.2                                         | 144                                | Low, 2025-12-12                                                                          | ≈ 85% | Use, keep JS fallback             |
| `text-wrap: balance`                                                                                  | 114                    | 17.5                                         | 121                                | Low, 2024-05-13                                                                          | ≈ 89% | Use                               |
| `text-wrap: pretty`                                                                                   | 117                    | 26                                           | No                                 | No                                                                                       | ≈ 87% | Use (ignored where unsupported)   |
| `text-box` (trim)                                                                                     | 133                    | 18.2                                         | 154 (Aug 2026)                     | Not yet                                                                                  | high  | Use on display numerals           |
| `color-mix()`                                                                                         | 111                    | 16.2                                         | 113                                | **High**, 2025-11-09                                                                     | ≈ 95% | Use in tokens                     |
| Relative colour (`oklch(from …)`)                                                                     | 122 (hsl 125)          | 18                                           | 128                                | Low, 2024-09-16                                                                          | ≈ 92% | Use in tokens                     |
| Container size queries and `cqi` units                                                                | 105                    | 16                                           | 110                                | **High**, 2025-08-14                                                                     | ≈ 96% | Use                               |
| Container style queries (custom properties)                                                           | 111                    | 18                                           | 151 (May 2026)                     | Low, 2026-05-19                                                                          | high  | Not needed                        |
| Scroll-state container queries                                                                        | 133                    | No                                           | No                                 | No                                                                                       | –     | Don't use                         |
| Scroll snap                                                                                           | 69                     | 11                                           | 68 (full 99)                       | **High**                                                                                 | ≈ 97% | Use on rails                      |
| `::scroll-marker`, `::scroll-button()`                                                                | 135                    | No                                           | No                                 | No                                                                                       | –     | Don't use                         |
| IntersectionObserver                                                                                  | 51                     | 12.1                                         | 55                                 | **High**                                                                                 | ≈ 97% | Fallback only                     |
| `backdrop-filter`                                                                                     | 76                     | 18 (prefixed since 9)                        | 103                                | Low, 2024-09-16                                                                          | ≈ 95% | Header only                       |
| `mask-image`, `mask-composite`                                                                        | 120 unprefixed         | 15.4                                         | 53                                 | **High**, 2026-06-07                                                                     | ≈ 93% | Core technique                    |
| `@property`                                                                                           | 85                     | 16.4                                         | 128                                | Low, 2024-07-09                                                                          | ≈ 95% | Small, one-shot uses              |
| SVG `stroke-dasharray`/`stroke-dashoffset`, `pathLength`                                              | Always                 | Always                                       | Always                             | **High**                                                                                 | ≈ 97% | Use                               |
| `prefers-reduced-motion`                                                                              | 74                     | 10.1                                         | 63                                 | **High**                                                                                 | –     | Mandatory gate                    |
| Speculation rules (inline / `Speculation-Rules` header)                                               | 109 / 121              | Behind a flag (26.2)                         | No                                 | No                                                                                       | ≈ 70% | Header only (CSP)                 |
| `sibling-index()`                                                                                     | 138                    | 26.2                                         | 154                                | Low, 2026-08-18                                                                          | –     | Optional stagger                  |
| `overflow: clip`                                                                                      | 90                     | 16                                           | 81                                 | High                                                                                     | ≈ 96% | Needed for view() (see 3.1)       |

### 3.1 Scroll-driven animations

**Support.** Chrome and Edge 115 (July 2023), Samsung Internet 23, Safari 26 (September 2025). Safari 26.4 (March 2026) moved them onto the compositor thread with no code change. Firefox: Nightly only (BCD "preview", flag `layout.css.scroll-driven-animations.enabled`), not in 157. Not Baseline; an Interop 2026 focus area.

**Where Classic uses it.**

- Section heads and piece cards rise 24 px and fade in as they enter.
- The hero stage photo recedes (scale to 0.94, opacity to 0.35) as it scrolls out: an exit effect only, so LCP is untouched.
- Collection-rail cards come into focus at the centre of a horizontal rail (`view(inline)`).
- A 2 px gold reading-progress hairline on journal articles (`scroll(root)`).
- The branch-route SVG draws as the stores section enters (§3.16).

**Pattern.**

```css
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .reveal {
      animation: reveal-rise linear both;
      animation-timeline: view(); /* must come after the shorthand, which resets it */
      animation-range: entry 10% entry 70%;
    }
    .stage-img--recede img {
      animation: stage-recede linear both;
      animation-timeline: view();
      animation-range: exit 0% exit 100%;
    }
    .rail .plate {
      animation: rail-focus linear both;
      animation-timeline: view(inline);
    }
  }
}
@keyframes reveal-rise {
  from {
    opacity: 0;
    translate: 0 1.5rem;
  }
}
@keyframes stage-recede {
  to {
    scale: 0.94;
    opacity: 0.35;
  }
}
@keyframes rail-focus {
  0%,
  100% {
    opacity: 0.6;
    scale: 0.94;
  }
  50% {
    opacity: 1;
    scale: 1;
  }
}
```

Reading progress, hidden by default and shown only where it can work:

```css
.progress {
  display: none;
}
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: scroll()) {
    .progress {
      display: block;
      position: fixed;
      inset: 0 0 auto;
      block-size: 2px;
      z-index: var(--z-bar);
      background: var(--rule-gold);
      transform-origin: 0 50%;
      animation: progress-grow linear both;
      animation-timeline: scroll(root block);
    }
  }
}
@keyframes progress-grow {
  from {
    scale: 0 1;
  }
}
```

**Reduced motion.** Everything sits inside `no-preference`, so reduce-motion users get the finished, static page. Zeroed duration tokens don't help here: scroll timelines ignore time durations, so the media query is the only gate that works.

**Pitfalls.**

1. **The `animation` shorthand resets `animation-timeline`.** Always declare the timeline after the shorthand.
2. **`overflow: hidden` on an ancestor makes that ancestor the scroll container**, so `view()` tracks a box that never scrolls and the animation freezes. `Plate.astro` (`.plate`) and `CategoryTile.astro` (`.tile__media`) both use `overflow: hidden`. Switch them to `overflow: clip`, which clips without creating a scroll container (Chrome 90, Safari 16, Firefox 81).
3. Only transform and opacity (and filter in Chromium) run off the main thread. Animating `width`, `height`, `top`, `margin`, `clip-path`, `mask-*` or `background-position` on scroll forces layout or paint every frame, which shows up as jank on mid-range Android and as INP on interaction.
4. **Never reveal first-viewport content** (H1, stage photo, rate chip). Chromium excludes opacity-0 elements from LCP, and items near the fold would sit half-faded at load.
5. Use ranges that always complete, such as `entry 10% entry 70%`. A range ending at `cover 50%` can leave the last section before the footer stuck semi-transparent when the page can't scroll any further.
6. Scale stage photos down only (≤ 1). A scale above 1 is upscaling.
7. Keep to about 8 animated elements in view at once. Animate a card's wrapper, not each child.

### 3.2 Scroll-triggered animations

`timeline-trigger` / `animation-trigger` shipped in Chrome and Edge 146 (10 March 2026) and nowhere else; BCD still marks them experimental. Not for Classic. The "play once when seen" job belongs to the IntersectionObserver pattern in §3.12, and only if the design needs it at all.

### 3.3 Cross-document view transitions

**Support.** `@view-transition` works in Chrome and Edge 126 (June 2024), Samsung Internet 28 and Safari 18.2 (December 2024). Firefox has same-document view transitions since 144 (October 2025), but caniuse marks cross-document "partial = Level 1 only" through Firefox 160, so Firefox just navigates normally. Related pieces:

- `view-transition-class`: Baseline low since 2025-10-14.
- `:active-view-transition-type()`: Baseline low since 2026-01-13.
- `pagereveal`: Chrome 123, Safari 18.2.
- `pageswap`: Chrome 124, Safari 18.2 (partial).
- `<link rel="expect" blocking="render">`: `blocking` is in Chrome 105 and Safari 18.2, not Firefox.

**Rules (Chrome docs).** Both pages opt in. Same origin, with no cross-origin redirect on the way. Chrome skips the transition if the navigation takes more than 4 s. Reloads and address-bar navigations don't animate.

**Where Classic uses it.**

- A 220 ms root cross-fade between every page.
- Persistent chrome: the utility strip with the gold rate, the header and the mobile action bar are named, so they hold still while the page underneath changes.
- A piece morph: the listing card's plate grows into the product page's stage photo.
- Collection index tile → collection page hero.

**Pattern (all CSS except the optional morph helper).**

```css
/* base.css */
@media (prefers-reduced-motion: no-preference) {
  @view-transition {
    navigation: auto;
  }
}
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: var(--dur-page);
  animation-timing-function: var(--ease);
}
.utility-strip {
  view-transition-name: utility;
}
.site-header {
  view-transition-name: site-header;
}
.action-bar {
  view-transition-name: action-bar;
}
.pdp-stage {
  view-transition-name: piece;
} /* product page only */
::view-transition-group(piece) {
  animation-duration: var(--dur-morph);
  animation-timing-function: var(--ease-out);
}
```

Naming only the clicked card on a listing page (bundled module, about 350 B minified; `pageswap` doesn't need render-blocking, so a deferred module is fine):

```ts
// src/scripts/piece-morph.ts: listing pages and home only
type SwapEvent = Event & {
  viewTransition: ViewTransition | null;
  activation: { entry: { url: string } } | null;
};
let named: HTMLElement | null = null;
addEventListener('pageswap', (event) => {
  const { viewTransition, activation } = event as SwapEvent;
  if (!viewTransition || !activation) return;
  const path = new URL(activation.entry.url).pathname;
  named = document.querySelector<HTMLElement>(`[data-piece="${CSS.escape(path)}"] .plate`);
  if (named) named.style.viewTransitionName = 'piece';
});
// Coming back through the back/forward cache, clear the name so it can't be duplicated.
addEventListener('pageshow', () => {
  if (named) named.style.viewTransitionName = '';
  named = null;
});
```

**Reduced motion.** The `@view-transition` rule itself sits inside `no-preference`. Reduce-motion users get plain navigation and none of the LCP cost below.

**Pitfalls.**

- **LCP cost:** about 70 ms on mobile repeat views in RUM, about 5 ms on fast desktops (corewebvitals.io). Pay it back with prerendering (§3.17) and keep the root fade at 250 ms or less.
- **Unique names:** a name used twice on one page aborts the whole transition. Don't give 24 listing cards static names; name the clicked one (above), or skip the morph.
- Every named element is captured as its own snapshot. Keep it to 6 or fewer named elements per page.
- The morph stretches the old 300 px card snapshot towards the 600 px stage for 320 ms, so it looks briefly soft before the crisp new image fades in. Keep the morph short.
- Astro's `transition:name` directive belongs to the ClientRouter world. Use plain CSS `view-transition-name` so nothing depends on the router.
- `<link rel="expect" blocking="render">` only with measurement. Chrome's own docs warn that it delays first render.

### 3.4 Astro `<ClientRouter />` vs native transitions

|                       | Native `@view-transition`                                        | `<ClientRouter />` (Astro 7.3.8)                                                                                                                                                                                                              |
| --------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JavaScript            | **0 B**                                                          | **16,213 B min / 5,725 B gzip** (router plus prefetch, bundled with Rolldown from `node_modules/astro/dist/transitions/router.js` and `prefetch/index.js`). That is 3.5 times all current first-party JS and over the 15 KB budget by itself. |
| Browsers that animate | Chrome and Edge 126+, Safari 18.2+, Samsung 28+ (≈ 88%)          | All; Firefox gets a simulated fade (`fallback="animate"`)                                                                                                                                                                                     |
| Script lifecycle      | Unchanged. `nav.ts` and `rate.ts` run on every page load as now. | Module scripts run once. Everything must re-bind on `astro:page-load`; `rate.ts` timers persist across pages; the `<dialog>` drawer and mega panel state must be reset by hand.                                                               |
| Analytics             | Normal page views                                                | Soft navigations. GTM needs a History Change trigger, and field LCP and CLS cover only the landing page.                                                                                                                                      |
| Prefetch              | `Speculation-Rules` header (Chromium)                            | `prefetchAll` on by default                                                                                                                                                                                                                   |
| CSP                   | Nothing to change                                                | Works (bundled), but the docs advise validating every URL passed to `navigate()`                                                                                                                                                              |
| Failure mode          | Firefox and old Safari: an ordinary page load                    | DOM swap edge cases: head merging, focus, scroll restoration, persisted islands                                                                                                                                                               |

**Decision:** native cross-document transitions. The Astro docs themselves say the client router "will increasingly become unnecessary" as browser APIs mature. Losing animation in Firefox (about 2 to 3% of traffic) is a fair price for 16 KB and an unchanged script model.

### 3.5 `@starting-style` and `transition-behavior: allow-discrete`

**Support.** `@starting-style`: Chrome 117, Safari 17.5, Firefox 129 (Baseline low 2024-08-06, widely available from February 2027). `transition-behavior: allow-discrete`: Chrome 117, Safari 17.4, Firefox 129. Transitioning `display` itself: Chrome 117 and Safari 18 only (Firefox no), and `overlay` is Chrome 117 only. In practice, entry animations work everywhere; exit animations of top-layer elements (closing a dialog or popover) animate in Chromium, partly in Safari, and snap shut in Firefox. That is acceptable.

**Where Classic uses it.** The mobile drawer `<dialog>`, the mega panel, the gold-rate popover, the branch picker, a small "Rate updated 10:15" toast.

```css
.sheet {
  opacity: 1;
  translate: 0 0;
  transition:
    opacity var(--dur-enter) var(--ease-out),
    translate var(--dur-enter) var(--ease-out),
    display var(--dur-enter) allow-discrete,
    overlay var(--dur-enter) allow-discrete;
}
.sheet:not([open]):not(:popover-open) {
  opacity: 0;
  translate: 0 1rem;
}
@starting-style {
  .sheet[open],
  .sheet:popover-open {
    opacity: 0;
    translate: 0 1rem;
  }
}
```

**Reduced motion.** Put `--dur-enter` in the reduce block of `tokens.css` next to the other durations (0 ms): the sheet then appears instantly.

**Pitfalls.**

- `@starting-style` also applies on the first render of an element that is visible at load. Never use it on hero or LCP content, or the LCP element starts at opacity 0.
- `display` and `overlay` must be in the transition list with `allow-discrete`, or the exit snaps.
- Never transition `height` here.

### 3.6 `interpolate-size`, `calc-size()` and `::details-content`

**Support.** `interpolate-size` and `calc-size()`: Chromium 129+ only (Samsung 28). `::details-content`: Chrome 131, Safari 18.4, Firefox 143 (Baseline low 2025-09-16). Exclusive accordions (`<details name>`): Chrome 120, Safari 17.2, Firefox 130.

**Where Classic uses it.** FAQ, "Hallmark and care" on product pages, branch opening hours.

```css
@media (prefers-reduced-motion: no-preference) {
  :root {
    interpolate-size: allow-keywords;
  }
  details::details-content {
    block-size: 0;
    overflow-y: clip;
    transition:
      block-size var(--dur-slow) var(--ease),
      content-visibility var(--dur-slow) allow-discrete;
  }
  details[open]::details-content {
    block-size: auto;
  }
}
```

**Pitfalls.**

- Safari and Firefox snap open and closed, which is fine.
- `block-size` is a layout animation. Acceptable for one small accordion at a time; never for long content.
- Don't adopt `hidden="until-found"` (Safari 26.2 support is partial).

### 3.7 Popover, anchor positioning and invoker commands

**Support.**

- `popover`: Chrome 114, Safari 17 (iOS 18.3 per web-features), Firefox 125 (Baseline low 2025-01-27).
- `popover="hint"`: Chrome 151, Firefox 153, Safari preview only. Skip it.
- Anchor positioning core: Chrome 125 to 129, Safari 26, Firefox 147 (January 2026). Not Baseline: `position-anchor` was completed only in Chrome 151, Firefox 151 and Safari 27, and caniuse marks Chrome and Firefox partial (no animating `anchor()`, no `position-visibility: anchor-valid`).
- Implicit anchor from `popovertarget`: Chrome 133, Safari 26, Firefox 147.
- Invoker commands (`commandfor`, `command="show-modal"`): Chrome 135, Firefox 144, Safari 26.2 (Baseline low 2025-12-12).
- Interest invokers (hover-triggered): Chrome 142 only. Skip them.

**Where Classic uses it.**

- The 22K rate chip in the header opens a popover with the 24K/22K/21K/18K/14K table and "as of" time.
- A branch chip opens the four branches with Call and WhatsApp links.
- The mega panel moves into the top layer (light-dismiss and Escape for free).
- A hallmark info button next to "916" / "750".

```html
<button type="button" class="rate-chip" popovertarget="rate-pop">22K 468.25</button>
<div id="rate-pop" popover class="sheet rate-pop">…</div>
```

```css
.rate-chip {
  anchor-name: --rate;
}
/* Without anchor positioning the UA centres the popover in the viewport: style that as a card. */
@supports (position-area: block-end) {
  .rate-pop {
    position-anchor: --rate;
    position-area: block-end span-inline-end;
    position-try-fallbacks: flip-block, flip-inline;
    inset: auto;
    margin: var(--space-2) 0 0;
  }
}
```

Drawer without JS where invokers exist; `nav.ts` stays as the fallback for iOS before 26.2:

```html
<button type="button" commandfor="site-drawer" command="show-modal" aria-haspopup="dialog">
  Menu
</button>
<dialog id="site-drawer" closedby="any">
  …
  <button type="button" commandfor="site-drawer" command="close">Close</button>
</dialog>
```

```ts
// nav.ts: bind the click handler only where invoker commands are missing
if (!('commandForElement' in HTMLButtonElement.prototype)) {
  /* existing showModal() binding */
}
```

`closedby` exists in Chrome 134 and Firefox 141 only, so keep the existing backdrop-click handler.

**Pitfalls.**

- The `popover` attribute adds no ARIA role. Label the trigger, and use `<dialog>` for anything modal.
- Keep `position-try-fallbacks` to 3 options or fewer.
- Top-layer popovers escape the header's `backdrop-filter` containing block (§3.13). That is the main reason to move the mega panel into a popover.

### 3.8 `text-wrap` and `text-box`

**Support.** `balance`: Chrome 114, Firefox 121, Safari 17.5 (Baseline low 2024-05-13). `pretty`: Chrome 117 and Safari 26 only; Firefox ignores it. `text-box` (trim): Chrome 133, Safari 18.2, Firefox 154 (August 2026). All three engines ship it, but web-features 3.42 doesn't list it as Baseline yet.

**Where Classic uses it.**

- `balance` on H1 to H3, eyebrows, pull quotes and the rate-board headings.
- `pretty` on paragraphs, captions and list items.
- `text-box: trim-both cap alphabetic` on the large Cormorant rate numerals (`--t-numeral-xl`), so the figure's cap height sits exactly on the gold hairlines.
- `font-variant-numeric: tabular-nums lining-nums` plus a fixed `min-inline-size` in `ch` on every rate figure, so a live refresh never shifts layout.

**Pitfalls.**

- Chromium balances only short blocks (a handful of lines), so never put `balance` on paragraphs.
- `pretty` costs a little extra layout. Fine for short copy, but don't set it on `*`.

### 3.9 `color-mix()` and relative colour

**Support.** `color-mix()`: Chrome 111, Safari 16.2, Firefox 113 (Baseline high since 2025-11-09). Relative colour: Chrome 122 (hsl 125), Safari 18, Firefox 128 (Baseline low 2024-09-16).

**Use.** Derive every translucent rule, hover tint and stage blend inside `tokens.css`, so the "tokens only" rule holds and components never carry raw colours:

```css
--rule-on-stage: color-mix(in oklch, var(--gold-500) 30%, transparent);
--plum-700-hover: oklch(from var(--plum-700) calc(l + 0.06) c h);
--header-glass: color-mix(in oklch, var(--stage-0) 78%, transparent);
```

**Pitfalls.** No performance cost. Always mix `in oklch` (sRGB mixes go muddy between plum and gold). Keep derived values in tokens, never in components.

### 3.10 Container queries and container units

**Support.** Size queries and `cqi`/`cqb` units: Chrome 105, Safari 16, Firefox 110 (Baseline high since 2025-08-14). Style queries on custom properties: Firefox 151 completed them in May 2026 (Baseline low 2026-05-19). Scroll-state queries: Chrome 133 only.

**Use.**

- `ProductCard`/`Plate` adapt to rail, grid or feature slots.
- Stage headlines sized with `cqi` inside the stage column instead of the viewport.
- `StoreCard` switches to two columns when its slot allows.

```css
.piece-card {
  container: piece / inline-size;
}
.stage__title {
  font-size: clamp(var(--t-h2), 9cqi, var(--t-display));
}
@container piece (min-width: 26rem) {
  .piece-card {
    grid-template-columns: 1fr 1fr;
  }
}
```

**Pitfalls.**

- `inline-size` containment means the container can't size itself to its content. Never put it on shrink-to-fit or auto-width items that should hug their content.
- `cqi` falls back to small-viewport units when there is no container, so be explicit about which element is the container.
- To switch a section's tone (stage vs ivory), use `[data-tone="stage"]` attribute selectors. Style queries add nothing here.

### 3.11 Scroll snap

**Support.** Baseline high (Chrome 69, Safari 11, Firefox 68 with full support from 99). `::scroll-marker`/`::scroll-button()` (Chrome 135) and `scrollsnapchange` events (Chrome 129) are Chromium-only. `scrollbar-color`: Chrome 121, Firefox 64, Safari 26.2.

**Use.** Mobile rails for the 12 collections and the four occasions, the product-page image strip and branch cards on phones.

```css
.rail {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min(78%, 20rem);
  gap: var(--grid-gap);
  padding-inline: var(--gutter);
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  scroll-snap-type: inline mandatory;
  scroll-padding-inline: var(--gutter);
  scrollbar-width: thin;
  scrollbar-color: var(--gold-600) transparent;
}
.rail > * {
  scroll-snap-align: start;
}
```

**Pitfalls.**

- Use `mandatory` only on horizontal rails whose items are narrower than the viewport.
- Never snap the page's vertical scroll: it traps keyboard and zoom users and fights find-in-page.
- Always add visible previous/next controls (`scrollBy`, about 300 B) for mouse and keyboard users.
- Never `scrollbar-width: none`.
- Smooth `scrollBy` only under `no-preference`.

### 3.12 IntersectionObserver as the fallback

**Support.** Baseline high everywhere.

**When.**

- Only as the one-shot reveal for browsers without scroll-driven animations (Firefox, iOS 18 and older), and only if the design really wants a reveal there. A static page is an acceptable fallback.
- Starting the gold-rate refresh or an SVG draw only when it is on screen.
- Pausing any looping video when it leaves the viewport.

```ts
// src/scripts/reveal.ts: about 600 B minified, runs only where view() is missing
if (
  matchMedia('(prefers-reduced-motion: no-preference)').matches &&
  !CSS.supports('animation-timeline: view()') &&
  'IntersectionObserver' in window
) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const el = e.target as HTMLElement;
        if (e.isIntersecting) {
          delete el.dataset.out;
          io.unobserve(el);
        } else el.dataset.out = ''; // first report says off-screen: hide until it arrives
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}
```

```css
@media (prefers-reduced-motion: no-preference) {
  .reveal {
    transition:
      opacity 600ms var(--ease-out),
      translate 600ms var(--ease-out);
  }
  .reveal[data-out] {
    opacity: 0;
    translate: 0 1.5rem;
  }
}
```

**Pitfalls.**

- Never hide content in CSS before the script runs. Under this CSP the module runs after parsing, so CSS-first hiding means "visible, then hidden, then animated", and invisible content if the script fails.
- Hide only what the first callback reports as off-screen.
- Unobserve after the first reveal, use one observer for everything, and don't read layout inside the callback.

### 3.13 `backdrop-filter`

**Support.** Chrome 76, Firefox 103, Safari 18 unprefixed (with `-webkit-` since Safari 9). Baseline low 2024-09-16.

**Use.** Only the sticky header and the mobile action bar, where they pass over the dark stage and photography.

```css
.site-header {
  position: sticky;
  inset-block-start: 0;
  isolation: isolate;
  background: color-mix(in oklch, var(--stage-0) 94%, transparent);
}
@supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
  .site-header {
    background: none;
  }
  .site-header::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: var(--header-glass);
    -webkit-backdrop-filter: blur(14px) saturate(1.15);
    backdrop-filter: blur(14px) saturate(1.15);
  }
}
```

**Pitfalls.**

- **An element with `backdrop-filter` (or `filter`) becomes the containing block for its fixed and absolute descendants.** On the header itself it would trap the mega panel and drawer inside the header box. Put the blur on `::before`, or move the panels into the top layer (§3.7).
- Cost scales with blurred area. Keep the header 72 px tall or less and the blur 16 px or less, never blur a full-screen overlay on phones, and never animate the blur radius.
- The fallback background (94%) must keep text contrast on its own.

### 3.14 `mask-image`

**Support.** Unprefixed in Chrome 120, Safari 15.4 and Firefox 53. Baseline high since 2026-06-07. `mask-composite` is in the same versions.

**Use.**

- The edge feather that melts each 600² velvet photo into the stage (§4): the core technique of the redesign.
- Fading long journal excerpts.
- Ornamental window shapes through a same-origin SVG mask (`img-src 'self'`).

**Pitfalls.**

- Masks are painted. Animating `mask-size` or `mask-position` repaints every frame, so never animate a mask on the LCP image or on full-width areas.
- A mask creates a stacking context and an offscreen buffer. Fine for about 10 masked images per viewport.
- Remote SVG masks are blocked by the CSP.
- A masked image still counts its full box for LCP.

### 3.15 `@property`

**Support.** Chrome 85, Safari 16.4, Firefox 128. Baseline low 2024-07-09.

**Use.**

- A single sheen that runs once along the gold hairline under the rate board on page load.
- Animating a feather radius on a non-LCP image.
- A typed `--progress` for gradient-based effects.

```css
@property --sheen {
  syntax: '<percentage>';
  inherits: false;
  initial-value: -20%;
}
.rule-sheen {
  block-size: 1px;
  background: linear-gradient(
    90deg,
    var(--gold-600) calc(var(--sheen) - 12%),
    var(--gold-300) var(--sheen),
    var(--gold-600) calc(var(--sheen) + 12%)
  );
}
@media (prefers-reduced-motion: no-preference) {
  .rule-sheen {
    animation: sheen 1.8s var(--ease-out) 600ms 1 both;
  }
}
@keyframes sheen {
  to {
    --sheen: 120%;
  }
}
```

**Pitfalls.**

- A registered property used inside a gradient or mask repaints on the main thread every frame. Keep it to hairlines and small images, run it once (never `infinite`), and set `inherits: false`.
- Never use counter tricks to make the gold rate "tick". The rate must be real DOM text and should read like a board, not a slot machine.

### 3.16 SVG stroke animation

**Support.** Universal (`stroke-dasharray` and `stroke-dashoffset` everywhere; the `pathLength` attribute in every current engine).

**Use.**

- A schematic route linking the four branches (Gold Souq Extension Deira → Safari Mall and Rolla Mall in Sharjah → Madinat Zayed in Abu Dhabi), drawn as the stores section enters.
- The 22K sparkline once the rate history has seven snapshots.
- A hairline ornament under section heads.
- A monogram draw on 404 and thank-you pages. This needs an SVG monogram; only a 200 × 200 PNG exists (`src/assets/brand/monogram.png`).

```html
<svg class="route" viewBox="0 0 640 240" aria-hidden="true">
  <path pathLength="1" d="M40 60 C 180 40, 260 120, 330 110 S 520 200, 600 190" />
</svg>
```

```css
.route path {
  fill: none;
  stroke: var(--rule-gold);
  stroke-width: 1.5;
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
}
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .route path {
      animation: draw linear both;
      animation-timeline: view();
      animation-range: entry 20% cover 55%;
    }
  }
}
@keyframes draw {
  from {
    stroke-dashoffset: 1;
  }
}
```

**Pitfalls.**

- Stroke animation is painted on the main thread. Keep paths simple and draw once.
- The SVG must be inline (Astro's SVG component import); an SVG in `<img>` can't be styled by page CSS.
- Label the route "schematic", not a map.
- Test `pathLength` together with `vector-effect: non-scaling-stroke` before using both.

### 3.17 Prerendering with speculation rules (CSP-safe through a header)

**Support.** Chrome and Edge 121 (header and `eagerness`), Samsung 25. Safari behind a flag (26.2). Firefox no.

Inline `<script type="speculationrules">` is blocked by this CSP. The `Speculation-Rules` response header pointing at a same-origin JSON file is not.

```json
// public/speculation-rules.json
{
  "prerender": [
    {
      "where": {
        "and": [
          { "href_matches": "/*" },
          { "not": { "href_matches": ["/api/*", "/thank-you/", "/*.php", "/*\\?*"] } }
        ]
      },
      "eagerness": "moderate"
    }
  ]
}
```

```apache
# public/.htaccess
<Files "speculation-rules.json">
  ForceType application/speculationrules+json
</Files>
Header always set Speculation-Rules "\"/speculation-rules.json\""
```

```
# public/_headers
/*
  Speculation-Rules: "/speculation-rules.json"
/speculation-rules.json
  Content-Type: application/speculationrules+json
```

**Why it matters.** With a prerendered destination the cross-document transition animates between two finished pages, which removes the roughly 70 ms LCP penalty.

**Pitfalls.**

- Check that GA4 and the pixels count a page view on activation, not on prerender (test with `document.prerendering` in DevTools).
- Keep `moderate` eagerness (hover or pointer-down).
- Exclude the PHP endpoints and query-string URLs.
- Verify under DevTools → Application → Speculative loads after deploy.

---

## 4. Small source images in an immersive layout

### 4.1 Inventory (sharp, `src/assets/`)

| Group                                                                                                                                                                         | Files and sizes                                                                              | Ground                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Products `p01`–`p09` (also reused as `collections/{antique,customised,gemstone,italian,kolkata,kuwait,rajkot,temple,turkish}.jpg` and `story/hero.jpg`, `story/workshop.jpg`) | 600 × 600                                                                                    | White bust on dark indigo or purple velvet                              |
| Legacy product shots                                                                                                                                                          | anklet 347², bangles 536², bracelet 556², chain 399², earrings 529², pendant 423², ring 300² | Mixed                                                                   |
| Collections diamonds / kids / singapore                                                                                                                                       | 300², 423², 399²                                                                             | Flat pale `#eae5e9`                                                     |
| Occasions (anniversary, birthday, festivals, wedding)                                                                                                                         | 784 × 1280                                                                                   | Light and coloured (corners `#c7c8c3`, `#895c9d`, `#63ad89`, `#e1c8a8`) |
| Category cut-outs                                                                                                                                                             | 800 × 318 PNG                                                                                | Pale lavender                                                           |
| Story                                                                                                                                                                         | store-lifestyle 1488 × 962; about-1 900 × 529; about-3 750²; banners 1920 × 478 / 488        | Mixed                                                                   |
| Journal                                                                                                                                                                       | 717–750 × 478–500                                                                            | Mixed                                                                   |

### 4.2 Measured edge colours of the velvet shots

Mean of the 8% corner squares and the 4% edge bands:

| Photo | Corners TL / TR / BL / BR               | Edge bands top / bottom / left / right  | Centre    |
| ----- | --------------------------------------- | --------------------------------------- | --------- |
| p01   | `#0a0814` `#170b36` `#6f627b` `#453a57` | `#1a1328` `#655775` `#16131e` `#281652` | `#e0cdaf` |
| p02   | `#090712` `#1e194c` `#211a4f` `#1d1743` | `#110d27` `#161735` `#171234` `#1b133d` | `#255866` |
| p03   | `#070513` `#1a143b` `#262242` `#28254b` | `#1b153c` `#28273e` `#1b1538` `#1c163d` | `#d6d0b5` |
| p04   | `#05040b` `#0e0b1f` `#171731` `#18192f` | `#120f2b` `#1a1b31` `#110f28` `#13112c` | `#d6dad6` |
| p05   | `#040307` `#0d0a1b` `#0e0d1a` `#141528` | `#0d0b1d` `#0e0d19` `#0e0d22` `#0c0a17` | `#9fa6a1` |
| p06   | `#252251` `#140f28` `#16142a` `#3a347a` | `#2d2764` `#272743` `#201b43` `#2b2356` | `#e8ebea` |
| p07   | `#040307` `#110f29` `#110f1c` `#191a2a` | `#0d0a1b` `#1b1a29` `#0f0c20` `#0d0a16` | `#afb1ab` |
| p08   | `#0f0c22` `#0a0816` `#191831` `#1d1945` | `#13102d` `#272742` `#120e27` `#120f2b` | `#d2cec5` |
| p09   | `#080611` `#0f0c23` `#0b0912` `#14102e` | `#100c23` `#373846` `#0f0d1d` `#110d24` | `#bcb8ae` |

In OKLCH, the velvet sits at hue 283–288°, lightness 0.15–0.32, chroma 0.03–0.10. Brand plum `#4B2849` and plum-900 `#2E1A2D` sit at hue 329°, 41–46° away and lighter (L 0.253 for plum-900) than the velvet corners (L ≈ 0.15). The outliers are p06 (a lighter purple velvet) and p01, whose bust base touches the bottom of the frame.

### 4.3 What the prototype showed

Photos rendered at 600 px on 800 × 680 stage panels with sharp, and in my Chromium tab at 1440 and 390 wide:

1. **Raw photo on `#0b0918`:** a visible rectangle. The velvet (`#1a1338`–`#2d2764`) is lighter and more saturated than any near-black stage.
2. **Edge feather** (linear ramps over 14% horizontally and 12% vertically, combined with `mask-composite: intersect`): the rectangle disappears and the necklace and bust are untouched. **This is the default treatment.**
3. **Radial feather** (`closest-side`, opaque to 72%): reads as a spotlight, but it also fades the bust's base and shoulders. Use it only for hero pieces sitting high in the frame (p03, p05).
4. **The same feathered photo on plum-900 `#2E1A2D` leaves a navy halo box.** Blue velvet against a red-violet ground, plus the lightness step. **Never put the velvet photos on plum.**
5. p06 melts slightly better into its own sampled colour (`#1b1740`) than into `#0b0918`. Both pass with the edge feather.
6. At 390 CSS px wide on a DPR-2 phone (781 device px drawn from a 600 px source, a 1.3× device upsample) the metalwork stays acceptably crisp. At 600 CSS px on a DPR-1 desktop the photo is drawn 1:1.

### 4.4 Rules for small photos

- **Never draw wider than the source in CSS pixels:** `max-inline-size: {image.width}px`, passed per image as `--cap`. Stage photo on desktop: `min(600px, 42vw)`. On phones: the full width inside the gutters.
- **Make the space big, not the photo.** The stage block runs full-bleed (100% wide, at least 80svh on desktop). The photo is centred at 600 px or less, and the type, gold hairlines and empty space carry the scale.
- **No AI upscaling.** It invents metalwork detail on a real piece, which is a misrepresentation. If a hero has to be bigger, reshoot on the same velvet at 2,000 px or more (add to `docs/launch-checklist.md`).
- **Stage colour:** `--stage-0: #0b0918` by default. Override per photo with its sampled edge colour when the edges are clearly lighter (p06 `#1b1740`). A build-time script can write a `stage` hex into each product entry.
- **Separate stage sections from plum bands** with ivory or a gold hairline. Velvet photos never butt against plum.
- **Cards on the stage:** 280–320 CSS px each (about 2× density on DPR-2 screens).
- **Pale-ground images** (diamonds, kids, singapore, category cut-outs) keep the ivory or white plate. The stage is for velvet shots only.
- **Text on the stage:** brand bronze `#BE8658` on `#0b0918` measures 6.32:1, so the real brand colour passes AA as text there (on ivory it had to be darkened). Ivory `#FAF7F2` 18.43:1, gold-300 `#DCC29A` 11.46:1, muted `#A99FB5` 7.80:1.

### 4.5 The `StageImage` component (Astro `<Picture>` settings)

Tokens first (`tokens.css`), so the component carries no raw values:

```css
:root {
  --stage-0: #0b0918; /* sampled: velvet corners, OKLCH h ≈ 288 */
  --stage-1: #120f2a; /* raised panel on the stage */
  --ink-on-stage: #faf7f2; /* 18.43:1 */
  --ink-on-stage-muted: #a99fb5; /* 7.80:1 */
  --gold-on-stage: #be8658; /* brand bronze verbatim, 6.32:1 */
  --feather-x: 14%;
  --feather-y: 12%;
  --mask-feather-edge:
    linear-gradient(
      to right,
      transparent,
      #000 var(--feather-x),
      #000 calc(100% - var(--feather-x)),
      transparent
    ),
    linear-gradient(
      to bottom,
      transparent,
      #000 var(--feather-y),
      #000 calc(100% - var(--feather-y)),
      transparent
    );
  --mask-feather-spot: radial-gradient(closest-side, #000 72%, transparent);
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-page: 220ms;
  --dur-morph: 320ms;
  --dur-enter: 320ms;
}
```

```astro
---
/**
 * A velvet product photo set into the dark stage. Never drawn wider than its source; its edges
 * are feathered into --stage so the 600 px frame has no visible rectangle.
 */
import { Picture } from 'astro:assets';
import type { ImageMetadata } from 'astro';

export interface Props {
  image: ImageMetadata;
  alt: string;
  /** Sampled edge colour (#rrggbb) when it differs from --stage-0. */
  stage?: string;
  /** Only the single LCP image of the page. */
  priority?: boolean;
  feather?: 'edge' | 'spot';
  recede?: boolean;
  sizes?: string;
}
const {
  image,
  alt,
  stage,
  priority = false,
  feather = 'edge',
  recede = false,
  sizes,
} = Astro.props;
const cap = image.width;
const widths = [...new Set([360, 480, cap].filter((w) => w <= cap))];
const style = [`--cap:${cap}px`, stage && `--stage:${stage}`].filter(Boolean).join(';');
---

<figure
  class:list={['stage-img', `stage-img--${feather}`, recede && 'stage-img--recede']}
  style={style}
>
  <Picture
    src={image}
    alt={alt}
    formats={['avif', 'webp']}
    widths={widths}
    sizes={sizes ?? `(min-width: 64em) min(${cap}px, 42vw), min(${cap}px, 100vw)`}
    fit="cover"
    priority={priority}
  />
</figure>

<style>
  .stage-img {
    inline-size: min(100%, var(--cap));
    margin-inline: auto;
    aspect-ratio: 1;
    background: var(--stage, var(--stage-0));
    overflow: clip; /* not hidden: keeps view() timelines working */
  }
  .stage-img :global(picture) {
    display: block;
  }
  .stage-img :global(img) {
    inline-size: 100%;
    block-size: auto;
  }
  .stage-img--edge :global(img) {
    mask-image: var(--mask-feather-edge);
    mask-composite: intersect;
  }
  .stage-img--spot :global(img) {
    mask-image: var(--mask-feather-spot);
  }
</style>
```

Notes:

- `width`/`height` come from the image metadata, and the figure has `aspect-ratio: 1`, so CLS is 0.
- `priority` makes Astro emit `loading="eager" decoding="sync" fetchpriority="high"`. Use it on exactly one image per page. Because the `<picture>` is in the HTML, the preload scanner finds it without a `<link rel=preload>`.
- `sizes` lets a DPR-1 360 px phone take the 360w file and DPR-2/3 phones take the 600w file.
- The section wrapping the stage carries `background: var(--stage-0)` full-bleed, so the feathered edge fades into the same colour as the page around it.

### 4.6 Portraits (784 × 1280)

These are light, coloured grounds, so the dark-stage melt does not apply. Present them as tall framed panels:

- **Phones:** full width inside the gutters (358–390 CSS px). At DPR 2 that needs 716–780 device px from a 784 px source, so they stay crisp.
- **Desktop:** a 5-of-12 column split (about 520–540 CSS px in the 1,280 px container), `max-inline-size: 784px`. Never full-bleed on desktop: 1,440 px wide would be a 1.84× upscale even at DPR 1.
- `<Picture … widths={[392, 588, 784]} sizes="(min-width: 64em) min(784px, 40vw), 100vw" fit="cover" position="top" />` (`position` is a sharp keyword, as the house rules require).
- The 1488 × 962 store photo is the only image that can span a wide desktop column. Keep it at 744 CSS px or less for 2× crispness. The 1920 × 478 banners are panoramas: on a phone they are only 478 px tall, so they can't fill a portrait frame.

### 4.7 Encoder settings

```js
service: sharpImageService({
  avif: { quality: 60, effort: 4 },             // test 55 vs 60 for banding in the dark velvet corners first
  webp: { quality: 78, smartSubsample: true },  // high-quality chroma subsampling for saturated purple
  jpeg: { quality: 82, mozjpeg: true },
}),
```

- sharp's AVIF default is already 4:4:4 chroma; keep it.
- `smartSubsample` is a documented sharp `WebpOptions` key (default false).
- At q55 a 600w AVIF is 11–16 KB, so moving to q60 costs a few KB per image. Make the change only if the side-by-side check of p05/p07 corners shows banding at 55. I did not test banding in this session.

---

## 5. Performance budget

Target conditions are Lighthouse mobile (Moto G Power profile, 4× CPU slowdown, simulated slow 4G: about 1.6 Mbps and 150 ms RTT). For **LCP < 2.0 s**: TTFB ≤ 600 ms on the Apache host, then HTML plus critical CSS (≤ 35 KB gzip), one preloaded font (≤ 40 KB) and the LCP resource (≤ 30 KB). That leaves about 0.5 s of margin.

| Metric / asset              | Budget                                                                                                   | Now (measured)                                                    | Action                                                                                                                                           |
| --------------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| LCP, lab mobile             | **< 2.0 s**                                                                                              | CI warns only above 2,500 ms                                      | Tighten `lighthouserc.json` to 2,000 ms as an error on the home page and the product page                                                        |
| CLS                         | **0** (CI error > 0.01)                                                                                  | Enforced                                                          | Stage figure `aspect-ratio`; rate numerals `tabular-nums` plus `min-inline-size`; nothing injected above existing content; transform-only motion |
| INP (field p75) / TBT (lab) | ≤ 150 ms / ≤ 100 ms                                                                                      | –                                                                 | No scroll listeners; native popover, details and dialog; GTM after consent                                                                       |
| First-party JS per page     | **≤ 15 KB min, ≤ 6 KB gzip**                                                                             | 4,692 B min / 2,166 B gzip (home)                                 | Headroom about 10 KB. ClientRouter alone would take 16.2 KB.                                                                                     |
| Third-party JS              | 0 B before LCP                                                                                           | GTM only when `PUBLIC_GTM_ID` is set                              | Load GTM after consent or first interaction; it is not counted in the 15 KB, but it drives INP                                                   |
| HTML (home)                 | ≤ 30 KB gzip                                                                                             | 18.5 KB gzip                                                      | –                                                                                                                                                |
| CSS per page                | ≤ 20 KB gzip; inline only the critical part                                                              | Global 5.6 KB gzip plus page CSS                                  | Keep motion CSS in the global file                                                                                                               |
| Fonts                       | ≤ 2 files, ≤ 90 KB; **preload one** (the LCP face)                                                       | 83.4 KB, both preloaded                                           | Preload only `--font-display` when the H1 is the LCP; about 46 KB less contention on 4G                                                          |
| LCP image                   | ≤ 30 KB, exactly one `priority`                                                                          | 15.6 KB (p01 600w AVIF); **3 `fetchpriority=high` on home today** | Fix to one                                                                                                                                       |
| Above-the-fold images       | ≤ 3 requests, ≤ 120 KB                                                                                   | –                                                                 | –                                                                                                                                                |
| Total home weight           | ≤ 800 KB (CI)                                                                                            | –                                                                 | –                                                                                                                                                |
| Video                       | None on phones. Desktop ≤ 1.5 MB, self-hosted, `preload="none"`, AVIF poster, never the LCP element      | None                                                              | –                                                                                                                                                |
| View transitions            | Root ≤ 250 ms, morph ≤ 320 ms, ≤ 6 named elements                                                        | –                                                                 | Pair with prerender                                                                                                                              |
| Scroll-linked animations    | ≤ 8 in view, transform and opacity only                                                                  | –                                                                 | –                                                                                                                                                |
| Paint-heavy effects         | `backdrop-filter` only on bars ≤ 72 px tall; masks only on images ≤ 600 px; no animated masks or filters | –                                                                 | –                                                                                                                                                |

---

## 6. What the toolbox does well and where it falls short

**Strengths**

1. Page transitions with no JavaScript in about 88% of browsers, and a clean fallback (ordinary navigation) in the rest.
2. Scroll-linked motion runs on the compositor in Chromium and in Safari 26.4+, so it costs no INP.
3. Native top-layer UI (popover, dialog, invoker commands, `@starting-style`) can take over most of `nav.ts`'s job and makes menus feel smooth.
4. The CSP already fits: inline style attributes are allowed, so per-element stage colours and transition names need no script.
5. Masks are Baseline high, so the small-photo problem can be solved in CSS rather than by reshooting before launch.

**Weaknesses**

1. Firefox 157 has neither scroll-driven animations nor cross-document transitions. Every effect needs a finished static state.
2. About a quarter of iPhones (iOS 18 and older) miss scroll-driven animations, anchor positioning and `text-wrap: pretty`.
3. `interpolate-size` is Chromium-only, so accordions only animate there.
4. No inline speculation rules under this CSP: prerendering needs the response header, and only Chromium honours it.
5. The ceiling is 600 px photography. CSS can hide the frame, but it can't add detail.

---

## 7. Allowed techniques (ranked)

Each item gives why it works and how Classic should use it, given an enquiry-led site, mostly 600 × 600 velvet photos, a daily gold-rate feed and four branches.

1. **The dark stage with feathered velvet photos** (§4.5: `StageImage`, `--mask-feather-edge`, `#0b0918`).
   _Why it works:_ the eye reads a full-bleed dark room, not a 600 px thumbnail. The photos were shot for darkness, so the composition finally matches them.
   _How Classic uses it:_ a home hero with one piece at 600 px or less, the H1 set in ivory and bronze beside it, and the "WhatsApp this piece" and "Visit Deira" actions under it. Product-page hero on the stage. Collection pages open on a stage with two or three pieces at 280–320 px.

2. **Native cross-document view transitions** (§3.3, `@view-transition` under `no-preference`; header, utility strip and action bar named; optional `piece-morph.ts` of about 350 B).
   _Why it works:_ continuity between pages is what separates an "app-like experience" from a blog, and it costs 0 B.
   _How Classic uses it:_ the gold-rate strip and header stay perfectly still while pages cross-fade in 220 ms, and a tapped piece grows into its product page.

3. **Scroll-driven reveal and recede** (§3.1, `@supports (animation-timeline: view())`, `entry 10% entry 70%`, `overflow: clip`).
   _Why it works:_ the page responds to the hand without scroll hijacking, on the compositor.
   _How Classic uses it:_ section heads and cards rise 24 px, and the hero piece recedes to 0.94 as you leave it. Never on first-viewport content.

4. **Top-layer UI** (§3.5 and §3.7: popover/dialog plus `@starting-style`; anchor positioning inside `@supports`; `commandfor` with the `nav.ts` fallback).
   _Why it works:_ it feels fast and native (Escape and light-dismiss for free), with no layout shift.
   _How Classic uses it:_ the rate chip opens today's 24K/22K/21K/18K board; the branch chip opens the four branches with Call and WhatsApp links; the mega panel moves into the top layer.

5. **Snap rails with a centred focus** (§3.11 plus the `view(inline)` keyframes in §3.1).
   _Why it works:_ on phones, a horizontal browse of 12 collections feels like flicking through trays, without a carousel library.
   _How Classic uses it:_ collections, occasions and the product image strip, with visible previous/next buttons.

6. **Precise typography** (§3.8 and §3.10: `balance`, `pretty`, `text-box: trim-both cap alphabetic`, `cqi` display sizes, `tabular-nums`).
   _Why it works:_ jewellery sites feel expensive through exact type, and an exact type system is cheap.
   _How Classic uses it:_ Cormorant numerals on the rate board sit precisely on bronze hairlines, and headlines scale to their column, not the window.

7. **SVG linework drawn once** (§3.16).
   _Why it works:_ it is motion that carries information, not decoration.
   _How Classic uses it:_ the four-branch route on `/stores/`, the 22K sparkline once there is data, the ornament under section heads.

8. **A one-shot gold hairline sheen** (§3.15, `@property --sheen`).
   _Why it works:_ a single quiet "glint" says "gold" without kitsch.
   _How Classic uses it:_ once, on the rate-board rule, 600 ms after load. Never looping.

9. **A frosted header over the stage** (§3.13, blur on `::before`).
   _Why it works:_ the chrome feels light over dark imagery and keeps content visible behind it.
   _How Classic uses it:_ the header and mobile action bar only, 72 px tall or less, blur 14 px.

10. **Prerendering through the `Speculation-Rules` header** (§3.17).
    _Why it works:_ instant navigations and transitions between finished pages.
    _How Classic uses it:_ `moderate` eagerness on internal links, excluding PHP and query URLs.

11. **Animated accordions** (§3.6: `::details-content`, `interpolate-size` as a Chromium bonus).
    _Why it works:_ calm disclosure for dense facts (hallmarks, exchange rules, opening hours).
    _How Classic uses it:_ FAQ, "Hallmark and care", branch hours.

12. **Optional IntersectionObserver reveal for Firefox and older iOS** (§3.12, about 600 B).
    _Why it works:_ it keeps the reveal for the users who lack `view()`.
    _How Classic uses it:_ ship it only if the design review decides the static fallback feels flat. It is never needed for content to work.

**Code cheat-sheet for implementers**

- Wrap every motion rule in `@media (prefers-reduced-motion: no-preference)`. Wrap every scroll-driven rule in `@supports (animation-timeline: view())`. Declare `animation-timeline` after the `animation` shorthand.
- Animate only `translate`, `scale`, `rotate`, `opacity` (plus `stroke-dashoffset` on small inline SVG and one registered property on a hairline).
- Use `overflow: clip`, never `overflow: hidden`, on anything that wraps a `view()`-animated element.
- One `priority` image per page. Photos never wider than their source (`--cap`), and never scaled above 1.
- Set colours, durations, easings and masks only in `tokens.css`: `--stage-0`, `--mask-feather-edge`, `--dur-page`, `--dur-morph`, `--dur-enter`, `--ease-out`.
- Per-element values go in a `style` attribute (`--cap`, `--stage`, `view-transition-name`), which the CSP allows. Never use inline `<script>`.
- No more than 6 named view-transition elements per page; names unique; the morph name set only on the clicked card.

---

## 8. Not allowed

- Astro `<ClientRouter />` (16.2 KB minified, a new script lifecycle, soft navigations).
- GSAP, ScrollTrigger, Lenis or Locomotive smooth-scroll, Swiper, Lottie, three.js or WebGL, canvas "gold dust" particles, custom cursors. All of them break the CSP and/or the 15 KB budget.
- Scroll hijacking: mandatory vertical snap on the page; pinned horizontal-scroll sections longer than one screen.
- Fading or sliding in the hero or LCP element on load (`opacity: 0` start, `@starting-style` on hero content).
- Parallax or `scale > 1` on any product photo; hover zoom on photos; `background-attachment: fixed`.
- Animating layout properties (`width`, `height`, `top`, `margin`, `grid-template-*`) or `filter`, `backdrop-filter`, `mask` and `clip-path` on large areas.
- Autoplay video heroes on phones; YouTube or Vimeo embeds (CSP `frame-src`).
- AI upscaling of product photos; showing any photo wider than its source.
- Velvet photos on plum grounds.
- Global `will-change`. Use it only on an element during its own animation, if a trace shows it helps.
- `blocking="render"`, `scroll-state` queries, `animation-trigger`, `::scroll-button()` and `popover="hint"` (single-engine or unmeasured).
- Ticking or counting-up numbers for the gold rate or any statistic.

---

## 9. Open items to verify during the build

1. Re-query BCD before launch: Firefox 158/159 may ship scroll-driven animations or cross-document transitions (both are Interop 2026 targets). Nothing in this plan needs changing if they do.
2. AVIF quality 55 vs 60: compare banding in the dark corners of p05 and p07 before changing the config.
3. GA4, Meta and TikTok page views with prerendering (`document.prerendering`, `prerenderingchange`).
4. LCP element on the new home page: if it is the H1, preload only Cormorant; if it is the stage photo, check that the AVIF arrives before the fonts on the Lighthouse mobile profile.
5. `pathLength` together with `vector-effect: non-scaling-stroke` in Safari and Firefox, if both are used on the route SVG.
6. Ask the owner for an SVG of the monogram and for 2,000 px or larger originals of the hero pieces (launch checklist).
7. Fix the three `fetchpriority="high"` images on the current home page now; it is independent of the redesign.

---

## Sources

- MDN browser-compat-data 8.1.5: https://unpkg.com/@mdn/browser-compat-data/data.json (timestamp 2026-10-08)
- web-features 3.42.0: https://unpkg.com/web-features/data.json
- caniuse data: https://raw.githubusercontent.com/Fyrd/caniuse/main/fulldata-json/data-2.0.json (updated 2026-10-13); https://caniuse.com/cross-document-view-transitions
- Interop 2026: https://web.dev/blog/interop-2026 · https://webkit.org/blog/17818/announcing-interop-2026/
- WebKit features in Safari 26.4: https://webkit.org/blog/17862/webkit-features-for-safari-26-4/
- News from WWDC26 (Safari 27): https://webkit.org/?p=17967
- Cross-document view transitions: https://developer.chrome.com/docs/web-platform/view-transitions/cross-document
- Same-document view transitions Baseline: https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available
- Scroll-driven animations: https://developer.chrome.com/docs/css-ui/scroll-driven-animations
- Chrome 146 (scroll-triggered animations): https://developer.chrome.com/release-notes/146
- Experimental features in Firefox: https://developer.mozilla.org/Firefox/Experimental_features
- Largest Contentful Paint: https://web.dev/articles/lcp
- View transitions and web performance: https://www.corewebvitals.io/pagespeed/view-transition-web-performance
- Speculation-Rules header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Speculation-Rules
- Astro view transitions: https://docs.astro.build/en/guides/view-transitions/
- Local: `node_modules/astro` 7.3.8 (`components/ClientRouter.astro`, `dist/transitions/router.js`, `dist/assets/layout.js`), `node_modules/sharp/lib/index.d.ts`, `dist/` build of 13 Oct 2026, `src/assets/` pixel sampling
