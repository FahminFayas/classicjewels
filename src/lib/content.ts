/**
 * Typed queries over the content collections. Pages import these instead of calling
 * getCollection() directly, so sorting, draft filtering and reference resolution live in one place.
 */
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

import { routes } from '@/lib/routes';

export type Product = CollectionEntry<'products'>;
export type Category = CollectionEntry<'categories'>;
export type DesignCollection = CollectionEntry<'collections'>;
export type Occasion = CollectionEntry<'occasions'>;
export type Article = CollectionEntry<'journal'>;
export type FaqGroup = CollectionEntry<'faqs'>;

const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;

export async function getCategories(): Promise<Category[]> {
  return (await getCollection('categories')).sort(byOrder);
}

export async function getNavCategories(): Promise<Category[]> {
  return (await getCategories()).filter((c) => c.data.inNav);
}

export async function getDesignCollections(): Promise<DesignCollection[]> {
  return (await getCollection('collections')).sort(byOrder);
}

export async function getFeaturedCollections(): Promise<DesignCollection[]> {
  return (await getDesignCollections()).filter((c) => c.data.featured);
}

export async function getOccasions(): Promise<Occasion[]> {
  return (await getCollection('occasions')).sort(byOrder);
}

/** Published products only, in editorial order. */
export async function getProducts(): Promise<Product[]> {
  const isProd = import.meta.env.PROD;
  return (await getCollection('products', ({ data }) => !(isProd && data.draft))).sort(byOrder);
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.data.featured).slice(0, limit);
}

export async function getNewProducts(limit = 8): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.data.isNew).slice(0, limit);
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.data.category.id === categoryId);
}

export async function getProductsByCollection(collectionId: string): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.data.collection?.id === collectionId);
}

export async function getProductsByOccasion(occasionId: string): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.data.occasions.some((o) => o.id === occasionId));
}

export async function getProductsByMaterial(
  materials: Product['data']['material'][],
): Promise<Product[]> {
  return (await getProducts()).filter((p) => materials.includes(p.data.material));
}

/** Resolves the category and collection entries a product references. */
export async function resolveProductRefs(product: Product) {
  const [category, collection] = await Promise.all([
    getEntry(product.data.category),
    product.data.collection ? getEntry(product.data.collection) : Promise.resolve(undefined),
  ]);
  if (!category) throw new Error(`Product ${product.id} references a missing category`);
  return { category, collection };
}

/** Canonical path of a product, which lives under its category. */
export function productPath(product: Product): string {
  return routes.product(product.data.category.id, product.id);
}

export async function getFaqGroup(id: string): Promise<FaqGroup> {
  const group = await getEntry('faqs', id);
  if (!group) throw new Error(`FAQ group "${id}" does not exist in src/content/faqs`);
  return group;
}

/** Published articles, newest first. */
export async function getArticles(): Promise<Article[]> {
  const isProd = import.meta.env.PROD;
  return (await getCollection('journal', ({ data }) => !(isProd && data.draft))).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export type Offer = CollectionEntry<'offers'>;

/** Offers whose end date has not passed (Dubai time), soonest-ending first. */
export async function getActiveOffers(now: Date = new Date()): Promise<Offer[]> {
  const today = new Date(now.toLocaleDateString('en-CA', { timeZone: 'Asia/Dubai' }));
  return (await getCollection('offers'))
    .filter((o) => o.data.endsOn >= today && o.data.startsOn <= today)
    .sort((a, b) => a.data.endsOn.valueOf() - b.data.endsOn.valueOf());
}
