/**
 * Every internal URL is built here so a route change is a single edit.
 * All paths end with a slash to match `trailingSlash: 'always'` in astro.config.mjs.
 */
export const routes = {
  home: '/',
  collections: '/collections/',
  collection: (slug: string) => `/collections/${slug}/`,
  jewellery: '/jewellery/',
  category: (slug: string) => `/jewellery/${slug}/`,
  product: (category: string, slug: string) => `/jewellery/${category}/${slug}/`,
  occasions: '/occasions/',
  occasion: (slug: string) => `/occasions/${slug}/`,
  diamonds: '/collections/diamonds/',
  goldRate: '/gold-rate/',
  goldCoinsBars: '/jewellery/gold-coins-bars/',
  customJewellery: '/custom-jewellery/',
  goldExchange: '/gold-exchange/',
  offers: '/offers/',
  offer: (slug: string) => `/offers/${slug}/`,
  about: '/about/',
  promise: '/our-promise/',
  stores: '/stores/',
  store: (slug: string) => `/stores/${slug}/`,
  contact: '/contact/',
  thankYou: '/thank-you/',
  journal: '/journal/',
  article: (slug: string) => `/journal/${slug}/`,
  privacy: '/privacy-policy/',
  terms: '/terms/',
  disclaimer: '/disclaimer/',
} as const;

/** Absolute URL for canonical tags, sitemaps and JSON-LD. */
export function absoluteUrl(path: string, origin: string): string {
  return new URL(path, origin).toString();
}
