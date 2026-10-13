import { site } from '@/data/site';

export const TITLE_SEPARATOR = ' | ';
/** Google shows roughly 60 characters of a title. Page titles are capped here, suffix included. */
export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 160;

/**
 * Builds the document title.
 *
 * Inner pages: "Kolkata Gold Jewellery in Dubai | Classic Jewels". The short brand suffix is only
 * appended when the result still fits in TITLE_MAX; otherwise the page title stands alone (Google
 * shows the site name separately, from the WebSite structured data).
 *
 * Home page (`brandFirst`): "Classic Jewels & Diamonds | Gold Jewellers in Dubai, UAE".
 */
export function buildTitle(title: string, { brandFirst = false, suffix = true } = {}): string {
  if (!suffix) return title;
  if (brandFirst) return `${site.name}${TITLE_SEPARATOR}${title}`;
  const withSuffix = `${title}${TITLE_SEPARATOR}${site.shortName}`;
  return withSuffix.length <= TITLE_MAX ? withSuffix : title;
}

/** Trims a description to the SEO-safe length on a word boundary. */
export function clampDescription(text: string, max = DESCRIPTION_MAX): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}
