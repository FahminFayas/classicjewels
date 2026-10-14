/**
 * The digit roll (docs/design-system-v2.md §3.2 "The digit roll", §7). Client-only module,
 * imported by src/scripts/rate.ts and src/scripts/estimator.ts; never loaded on its own.
 *
 * roll(el, next) writes `next` into `el`. When `el` is marked data-roll, the length is unchanged
 * and motion is allowed, each changed digit is drawn as a .roll-d box (an invisible ghost that
 * holds the width, and a two-digit reel that slides up or down), staggered from the right by
 * --roll-stagger; once every reel has finished the element holds plain text again. Figures are
 * tabular, so the box never changes width (CLS 0). Otherwise the text is simply swapped.
 */

export const reducedMotion = (): boolean => matchMedia('(prefers-reduced-motion: reduce)').matches;

const num = (s: string) => parseFloat(s.replace(/[^\d.]/g, ''));
const digit = (c = '') => /\d/.test(c);

export function roll(el: HTMLElement, next: string): void {
  // A roll still in progress is settled first, so we compare against its target.
  const prev = el.dataset.rollTo ?? el.textContent?.trim() ?? '';
  el.textContent = next;
  delete el.dataset.rollTo;
  // Figures only: anything that is not a digit, separator or letter is swapped, never parsed.
  if (prev == next || prev.length != next.length || !el.hasAttribute('data-roll')) return;
  if (reducedMotion() || /[^\w ,.]/.test(next + prev)) return;

  const dir = num(next) < num(prev) ? 'down' : 'up';
  el.innerHTML = [...next]
    .map((ch, i) => {
      const was = prev[i];
      if (ch == was || !digit(ch) || !digit(was)) return ch;
      // Up: the old digit on top and the reel slides up to the new one. Down: the reverse.
      const [a, b] = dir == 'up' ? [was, ch] : [ch, was];
      return `<span class="roll-d"><span class="roll-d__ghost">${ch}</span><span class="roll-d__reel" data-dir="${dir}" aria-hidden="true" style="--delay:calc(var(--roll-stagger) * ${next.length - 1 - i})"><span>${a}</span><span>${b}</span></span></span>`;
    })
    .join('');
  el.dataset.rollTo = next;
  Promise.all(el.getAnimations({ subtree: true }).map((a) => a.finished)).then(
    () => {
      if (el.dataset.rollTo != next) return;
      el.textContent = next;
      delete el.dataset.rollTo;
    },
    () => {
      /* replaced by a newer roll */
    },
  );
}
