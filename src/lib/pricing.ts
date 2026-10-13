/**
 * The gold value of a piece at a given rate: net gold weight × the rate for its karat.
 * Used by product cards and product pages so the two can never disagree.
 *
 * Gross weight includes stones, so it is only used when the piece is plain gold; stone-set pieces
 * show a gold value only once a net weight is recorded.
 */
import type { CollectionEntry } from 'astro:content';

import type { GoldRate, Karat } from '@/lib/gold-rate';

export interface GoldValue {
  /** Rounded AED value of the gold content. */
  value: number;
  grams: number;
  perGram: number;
  karat: Karat;
}

export function goldValue(
  data: CollectionEntry<'products'>['data'],
  rate: GoldRate | null,
): GoldValue | null {
  if (!rate || data.availability === 'sold') return null;
  const grams = data.netWeightGrams ?? (data.material === 'gold' ? data.weightGrams : undefined);
  if (!grams) return null;
  const karat = `${data.karat}k` as Karat;
  const perGram = rate.perGram[karat];
  return { value: Math.round(perGram * grams), grams, perGram, karat };
}
