/**
 * Content collections. Each folder under src/content is a collection with a typed schema;
 * a bad field fails the build instead of shipping a broken page.
 *
 *  categories  - product types (necklaces, rings, gold coins & bars ...)     JSON, one file each
 *  collections - the twelve named design collections (Kolkata, Temple ...)   Markdown with story body
 *  occasions   - wedding, anniversary, birthday, festivals                   Markdown
 *  products    - individual pieces that can be enquired about               Markdown
 *  journal     - articles (buying guides, gold-rate explainers, news)        Markdown
 *  faqs        - question/answer groups keyed by the page that shows them   JSON
 *
 * See docs/content-guide.md for how to add or edit entries.
 */
import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const KARAT = z.union([z.literal(24), z.literal(22), z.literal(21), z.literal(18)]);

const seoFields = {
  /** <title> without the brand suffix. Keep under 60 characters. */
  title: z.string().max(60),
  /** Meta description, 70-160 characters. */
  description: z.string().min(70).max(160),
};

const categories = defineCollection({
  loader: glob({ base: './src/content/categories', pattern: '*.json' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      /** Short label for navigation and cards. */
      shortName: z.string().optional(),
      ...seoFields,
      /** First paragraph on the category page, plain text. */
      intro: z.string(),
      image: image(),
      imageAlt: z.string(),
      order: z.number().int(),
      /** Shown in the main navigation. */
      inNav: z.boolean().default(true),
    }),
});

const collections = defineCollection({
  loader: glob({ base: './src/content/collections', pattern: '*.md' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      ...seoFields,
      /** Where the style comes from, e.g. "Kolkata, West Bengal". Shown as the eyebrow. */
      origin: z.string(),
      /** One sentence for cards and the collections index. */
      summary: z.string().max(200),
      /** Two to five short phrases that characterise the craft, shown as a spec list. */
      hallmarks: z.array(z.string()).min(2).max(5),
      /** Karats offered in this collection. */
      karats: z.array(KARAT).min(1),
      image: image(),
      imageAlt: z.string(),
      order: z.number().int(),
      featured: z.boolean().default(false),
    }),
});

const occasions = defineCollection({
  loader: glob({ base: './src/content/occasions', pattern: '*.md' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      ...seoFields,
      summary: z.string().max(200),
      image: image(),
      imageAlt: z.string(),
      /** Categories to suggest on the occasion page, in order. */
      suggestedCategories: z.array(reference('categories')).min(1),
      order: z.number().int(),
    }),
});

const products = defineCollection({
  loader: glob({ base: './src/content/products', pattern: '*.md' }),
  schema: ({ image }) =>
    z.object({
      name: z.string().max(80),
      /** Internal reference quoted in WhatsApp enquiries, e.g. CJ-NK-001. */
      sku: z.string().regex(/^CJ-[A-Z]{2,4}-\d{3,4}$/),
      description: z.string().min(70).max(160),
      category: reference('categories'),
      collection: reference('collections').optional(),
      occasions: z.array(reference('occasions')).default([]),
      material: z.enum(['gold', 'diamond', 'gemstone', 'polki']),
      karat: KARAT,
      /** Gross weight in grams. Optional until the store confirms it. */
      weightGrams: z.number().positive().optional(),
      /** Net gold weight in grams (gross minus stones), used for the baked gold-value line. */
      netWeightGrams: z.number().positive().optional(),
      /** Base metal colour. Shown separately from any surface finish so buyers are not surprised. */
      colour: z.enum(['yellow', 'white', 'rose', 'two-tone']).default('yellow'),
      /** Plating or coating over the base metal, e.g. "Rhodium plated". Optional. */
      plating: z.string().optional(),
      /** Free-text stone details: "0.42 ct, G colour, VS1". */
      stones: z.string().optional(),
      /** "Tested in store" or the laboratory and report number. */
      certification: z.string().optional(),
      /** Surface finish: "Antique matte", "Mirror polish", "Matte and bright". */
      finish: z.string().optional(),
      availability: z.enum(['in-store', 'made-to-order', 'sold']).default('in-store'),
      images: z
        .array(z.object({ src: image(), alt: z.string().min(10) }))
        .min(1)
        .max(6),
      featured: z.boolean().default(false),
      isNew: z.boolean().default(false),
      order: z.number().int().default(100),
      draft: z.boolean().default(false),
    }),
});

/**
 * Daily gold-rate snapshots written by `npm run rates:snapshot` (and the scheduled workflow).
 * One file per date, named YYYY-MM-DD.json. The newest entry is baked into every rate surface
 * at build time; the history powers the table on /gold-rate/.
 */
const rates = defineCollection({
  loader: glob({ base: './src/content/rates', pattern: '*.json' }),
  schema: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    perGram: z.object({
      '24k': z.number().positive(),
      '22k': z.number().positive(),
      '21k': z.number().positive(),
      '18k': z.number().positive(),
      '14k': z.number().positive(),
    }),
    currency: z.literal('AED'),
    fetchedAt: z.iso.datetime(),
  }),
});

const journal = defineCollection({
  loader: glob({ base: './src/content/journal', pattern: '*.md' }),
  schema: ({ image }) =>
    z.object({
      ...seoFields,
      /** Headline shown on the page; may be longer than the SEO title. */
      headline: z.string().optional(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string().default('Classic Jewels & Diamonds'),
      cover: image(),
      coverAlt: z.string(),
      tags: z.array(z.string()).default([]),
      /** Collections to link from the article footer. */
      relatedCollections: z.array(reference('collections')).default([]),
      draft: z.boolean().default(false),
    }),
});

const faqs = defineCollection({
  loader: glob({ base: './src/content/faqs', pattern: '*.json' }),
  schema: z.object({
    /** Heading shown above the list. */
    heading: z.string(),
    items: z
      .array(
        z.object({
          question: z.string(),
          /** Plain text. Also emitted as FAQPage JSON-LD. */
          answer: z.string(),
        }),
      )
      .min(2),
  }),
});

/**
 * Campaign offers (Diwali, Onam, wedding season). Each has an owner-visible end date; expired
 * offers are not built, so a campaign can never outlive itself on the site.
 */
const offers = defineCollection({
  loader: glob({ base: './src/content/offers', pattern: '*.md' }),
  schema: ({ image }) =>
    z.object({
      ...seoFields,
      /** Headline on the page and in the home-page campaign slot. */
      headline: z.string().max(90),
      summary: z.string().max(200),
      startsOn: z.coerce.date(),
      endsOn: z.coerce.date(),
      /** Bullet terms shown on the page, plain text. */
      terms: z.array(z.string()).min(1),
      image: image().optional(),
      imageAlt: z.string().optional(),
      /** Branches the offer applies to; empty means all. */
      branches: z.array(z.string()).default([]),
      /** Pre-filled WhatsApp message for the offer. */
      whatsappMessage: z.string().optional(),
    }),
});

export const collections_ = {
  categories,
  collections,
  occasions,
  products,
  journal,
  faqs,
  rates,
  offers,
};
export { collections_ as collections };
