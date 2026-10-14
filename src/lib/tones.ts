/**
 * Shared types for the v2 design system (docs/design-system-v2.md §1.2, §3.3, §5.1).
 * Framework-free: imported by components, pages and client scripts alike.
 */

/** The ground a section declares with data-tone. Components read the tone's semantic variables. */
export type Tone =
  'stage' | 'stage-raised' | 'ivory' | 'parchment' | 'white' | 'plum' | 'plum-deep';

/** The tone family of a page's first section: decides the header tone and the overscroll ground. */
export type Ground = 'stage' | 'ivory';

/** The four karats the site prints (14K stays in the feed but is never shown). */
export type DisplayKarat = '24k' | '22k' | '21k' | '18k';

/** Display order everywhere: purest first. */
export const DISPLAY_KARATS: readonly DisplayKarat[] = ['24k', '22k', '21k', '18k'];

/** Default karat for followers, the hero instrument and the estimator. */
export const DEFAULT_KARAT: DisplayKarat = '22k';

/** Gold content as a fraction, and the UAE hallmark stamp, per karat. */
export const KARAT_FACTS: Record<
  DisplayKarat,
  { label: string; stamp: string; fineness: number; percent: string }
> = {
  '24k': { label: '24K', stamp: '999', fineness: 0.999, percent: '99.9%' },
  '22k': { label: '22K', stamp: '916', fineness: 0.916, percent: '91.6%' },
  '21k': { label: '21K', stamp: '875', fineness: 0.875, percent: '87.5%' },
  '18k': { label: '18K', stamp: '750', fineness: 0.75, percent: '75%' },
};

/** 22 -> "22k": content stores karats as numbers, rate hooks and followers use the string. */
export function toDisplayKarat(karat: 24 | 22 | 21 | 18): DisplayKarat {
  return `${karat}k` as DisplayKarat;
}

export function isDisplayKarat(value: unknown): value is DisplayKarat {
  return typeof value === 'string' && (DISPLAY_KARATS as readonly string[]).includes(value);
}

/** True for the grounds where text is light: stage, stage-raised, plum and plum-deep. */
export function isDarkTone(tone: Tone): boolean {
  return tone.startsWith('stage') || tone.startsWith('plum');
}

/**
 * <meta name="theme-color"> per ground. A meta tag cannot read a custom property, so these two
 * values mirror --stage-0 and --surface-1 in src/styles/tokens.css; change them together.
 */
export const THEME_COLOR: Record<Ground, string> = {
  stage: '#0b0918',
  ivory: '#faf7f2',
};
