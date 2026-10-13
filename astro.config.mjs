// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig, envField, fontProviders, sharpImageService } from 'astro/config';

/** Canonical origin. Non-www, https, no trailing slash. Used for canonicals, sitemap and JSON-LD. */
export const SITE_URL = 'https://classicjewels.ae';

/** Pages that must never appear in the sitemap (utility pages, redirects targets). */
const SITEMAP_EXCLUDE = ['/thank-you/', '/404/'];

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  output: 'static',
  // `true` keeps a single space between inline elements (the v7 default 'jsx' mode drops it,
  // which silently glues words together in rich copy).
  compressHTML: true,
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  image: {
    // Every <Image>/<Picture> gets a responsive srcset + sizes and intrinsic dimensions (CLS 0).
    layout: 'constrained',
    responsiveStyles: true,
    service: sharpImageService({
      avif: { quality: 55, effort: 4 },
      webp: { quality: 78 },
      jpeg: { quality: 82, mozjpeg: true },
    }),
  },
  /**
   * Self-hosted variable fonts, served from /_astro/fonts/ with metric-matched fallbacks that
   * Astro generates (zero layout shift on swap). Files come from the npm packages, so builds
   * never touch a font CDN. Bodoni carries its optical-size axis; Plex Sans is weight-only.
   */
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Bodoni Moda',
      cssVariable: '--font-display',
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
      options: {
        variants: [
          {
            src: [
              './node_modules/@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-opsz-normal.woff2',
            ],
            weight: '400 900',
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'IBM Plex Sans',
      cssVariable: '--font-text',
      fallbacks: ['Arial', 'Helvetica', 'sans-serif'],
      options: {
        variants: [
          {
            src: [
              './node_modules/@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2',
            ],
            weight: '100 700',
            style: 'normal',
          },
        ],
      },
    },
  ],
  env: {
    schema: {
      PUBLIC_GOLD_RATE_ENDPOINT: envField.string({
        context: 'client',
        access: 'public',
        default: '/gold-rates.php',
      }),
      PUBLIC_GTM_ID: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_FORM_ENDPOINT: envField.string({
        context: 'client',
        access: 'public',
        default: '/api/contact.php',
      }),
    },
  },
  integrations: [
    // No changefreq/priority (Google ignores both) and no build-time lastmod: a date that changes on
    // every deploy teaches crawlers to ignore it. Add a content-derived lastmod via `serialize` if
    // the content collections ever carry an updated date for every page.
    sitemap({
      filter: (page) => !SITEMAP_EXCLUDE.some((path) => page.endsWith(path)),
    }),
  ],
  vite: {
    build: {
      // Never inline scripts into the HTML. The Content-Security-Policy in public/.htaccess and
      // public/_headers allows only same-origin script files, so an inlined <script> would be
      // blocked in production (the mobile menu would stop working). scripts/audit-dist.mjs fails
      // the build check if an inline script ever appears.
      assetsInlineLimit: 0,
    },
    server: {
      // In dev, proxy the gold-rate feed to the live host so the widget works without PHP.
      proxy: {
        '/gold-rates.php': {
          target: SITE_URL,
          changeOrigin: true,
          headers: { 'User-Agent': 'Mozilla/5.0 (classicjewels-dev-proxy)' },
        },
      },
    },
  },
});
