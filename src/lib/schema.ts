/**
 * JSON-LD builders. Typed with schema-dts so a typo in a property name fails `astro check`.
 * Every builder returns a plain object; <JsonLd /> serialises it.
 *
 * Entity graph: one Organization (#organization) with a JewelryStore per branch
 * (#store-{branch id}), linked through `branchOf`. Breadcrumbs, products, lists and articles
 * hang off those ids.
 */
import type {
  Article,
  BreadcrumbList,
  ItemList,
  JewelryStore,
  Organization,
  Product,
  WebSite,
  WithContext,
} from 'schema-dts';

import { site, type Branch } from '@/data/site';
import { openingSpecs } from '@/lib/hours';
import { routes } from '@/lib/routes';
import type { BreadcrumbItem } from '@/lib/seo';

export const ORG_ID = `${site.url}/#organization`;
export const storeId = (branch: Branch) => `${site.url}/#store-${branch.id}`;

export function organizationSchema(logoUrl: string): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: site.shortName,
    url: site.url,
    logo: { '@type': 'ImageObject', url: logoUrl },
    slogan: site.slogan,
    foundingDate: String(site.founded.brandYear),
    parentOrganization: { '@type': 'Organization', name: site.group.name, url: site.group.url },
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
    },
    email: site.email,
    telephone: site.phone.landline.e164,
    areaServed: ['Dubai', 'Sharjah', 'Abu Dhabi', 'United Arab Emirates'],
    sameAs: site.social.map((s) => s.url),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: site.phone.landline.e164,
        contactType: 'sales',
        areaServed: 'AE',
        availableLanguage: ['en', 'ar', 'hi', 'ml'],
      },
    ],
  };
}

/**
 * One JewelryStore per branch: its own telephone, map link, pin and the hours it publishes on
 * Google (openingHoursSpecification whenever `hours.weekly` exists; a split Friday becomes two
 * entries). Never aggregateRating: the Google rating is text on the page, not a claim in markup.
 */
export function jewelryStoreSchema(branch: Branch, imageUrl: string): WithContext<JewelryStore> {
  const schema: WithContext<JewelryStore> = {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    '@id': storeId(branch),
    name: `${site.name}, ${branch.name}`,
    url: new URL(routes.store(branch.id), site.url).toString(),
    image: imageUrl,
    telephone: (branch.phone ?? site.phone.landline).e164,
    email: site.email,
    priceRange: '$$$',
    currenciesAccepted: 'AED',
    paymentAccepted: site.paymentAccepted.join(', '),
    address: {
      '@type': 'PostalAddress',
      streetAddress: branch.address.street,
      addressLocality: branch.address.locality,
      addressRegion: branch.address.region,
      addressCountry: branch.address.countryCode,
    },
    branchOf: { '@id': ORG_ID },
    parentOrganization: { '@id': ORG_ID },
    hasMerchantReturnPolicy: {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: 'AE',
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      merchantReturnDays: site.returnPolicy.days,
      returnMethod: 'https://schema.org/ReturnInStore',
      returnFees: 'https://schema.org/FreeReturn',
    },
  };
  if (branch.map?.url) schema.hasMap = branch.map.url;
  if (branch.map?.geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: branch.map.geo.latitude,
      longitude: branch.map.geo.longitude,
    };
  }
  if (branch.hours?.weekly.length) {
    schema.openingHoursSpecification = openingSpecs(branch).map((spec) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: spec.days,
      opens: spec.opens,
      closes: spec.closes,
    }));
  }
  if (branch.isFlagship) schema.sameAs = [...site.social.map((s) => s.url), site.map.placeUrl];
  return schema;
}

export function breadcrumbSchema(
  items: BreadcrumbItem[],
  origin: string,
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.href, origin).toString(),
    })),
  };
}

export interface ProductSchemaInput {
  name: string;
  description: string;
  url: string;
  images: string[];
  sku?: string;
  karat?: number;
  fineness?: string;
  material: string;
  colour?: string;
  category: string;
  collection?: string;
  /** Absolute URL of the collection page, linked as isRelatedTo. */
  collectionUrl?: string;
  weightGrams?: number;
  stones?: string;
  certification?: string;
}

/**
 * Product markup without an Offer: prices are quoted on enquiry because they move with the daily
 * gold rate (design-spec §5.4, Option A). Google's product-snippet report will list these pages
 * as missing "offers, review or aggregateRating" until indicative prices ship (Option B); that is
 * expected and recorded in docs/launch-checklist.md. The entity still describes the piece for
 * image and shopping-intent queries.
 */
export function productSchema(p: ProductSchemaInput): WithContext<Product> {
  const attributes: { name: string; value: string }[] = [
    { name: 'Material', value: p.material },
    ...(p.karat ? [{ name: 'Karat', value: `${p.karat}K` }] : []),
    ...(p.fineness ? [{ name: 'Fineness', value: p.fineness }] : []),
    ...(p.colour ? [{ name: 'Colour', value: p.colour }] : []),
    ...(p.collection ? [{ name: 'Collection', value: p.collection }] : []),
    ...(p.stones ? [{ name: 'Stones', value: p.stones }] : []),
    ...(p.certification ? [{ name: 'Certificate', value: p.certification }] : []),
  ];
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    url: p.url,
    image: p.images,
    sku: p.sku,
    brand: { '@type': 'Brand', name: site.name },
    material: p.karat
      ? `${p.karat}K ${p.colour ?? ''} ${p.material}`.replace(/\s+/g, ' ')
      : p.material,
    color: p.colour,
    category: `Jewellery > ${p.category}`,
    weight: p.weightGrams
      ? { '@type': 'QuantitativeValue', value: p.weightGrams, unitCode: 'GRM' }
      : undefined,
    additionalProperty: attributes.map((a) => ({ '@type': 'PropertyValue', ...a })),
    itemCondition: 'https://schema.org/NewCondition',
    isRelatedTo: p.collectionUrl
      ? { '@type': 'ProductCollection', name: p.collection, url: p.collectionUrl }
      : undefined,
    manufacturer: { '@id': ORG_ID },
  };
}

export function itemListSchema(
  items: { name: string; url: string; image?: string }[],
  name: string,
): WithContext<ItemList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url,
      image: item.image,
    })),
  };
}

/**
 * Minimal WebSite entity. No SearchAction: Google dropped the sitelinks search box in 2024.
 * (FAQPage is also deliberately absent; its rich result ended in May 2026.)
 */
export function websiteSchema(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    publisher: { '@id': ORG_ID },
    inLanguage: site.language,
  };
}

export interface ArticleSchemaInput {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: Date;
  dateModified?: Date;
  author: string;
}

export function articleSchema(a: ArticleSchemaInput): WithContext<Article> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.headline,
    description: a.description,
    url: a.url,
    mainEntityOfPage: a.url,
    image: a.image ? { '@type': 'ImageObject', url: a.image } : undefined,
    datePublished: a.datePublished.toISOString(),
    dateModified: (a.dateModified ?? a.datePublished).toISOString(),
    author: { '@type': 'Organization', name: a.author, '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  };
}
