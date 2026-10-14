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

/* ---------- Grounds and karats (docs/design-system-v2.md §1.2 rule 1, §9.2) ---------- */

/** What a photograph was shot on: velvet photos live on the stage, studio cut-outs on lilac. */
export type PhotoGround = 'velvet' | 'lilac';

/** The ground of a product's first (cover) photograph. */
export function photoGround(product: Product): PhotoGround {
  return product.data.images[0]?.ground ?? 'lilac';
}

/** Splits products by the ground of their cover photograph, keeping their order. */
export function splitByGround(products: Product[]): { velvet: Product[]; lilac: Product[] } {
  const velvet: Product[] = [];
  const lilac: Product[] = [];
  for (const p of products) (photoGround(p) === 'velvet' ? velvet : lilac).push(p);
  return { velvet, lilac };
}

/**
 * Collections that offer a karat, in editorial order ("In our cases:" on the hallmark stamps).
 * Accepts 22 or "22k".
 */
export function collectionsWithKarat(
  collections: DesignCollection[],
  karat: 24 | 22 | 21 | 18 | '24k' | '22k' | '21k' | '18k',
): DesignCollection[] {
  const k = typeof karat === 'number' ? karat : Number.parseInt(karat, 10);
  return collections.filter((c) => c.data.karats.includes(k as 24 | 22 | 21 | 18)).sort(byOrder);
}

/** The first published piece of a collection photographed on velvet, if any. */
export async function firstVelvetProduct(collectionId: string): Promise<Product | undefined> {
  return (await getProductsByCollection(collectionId)).find((p) => photoGround(p) === 'velvet');
}

/** Collection id -> shortName ("Kolkata"), for card eyebrows and CaseWall's collectionNames. */
export function collectionShortNames(collections: DesignCollection[]): Record<string, string> {
  return Object.fromEntries(collections.map((c) => [c.id, c.data.shortName]));
}
