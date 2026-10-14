/**
 * Small motion helpers (docs/design-system-v2.md §3.7, §3.8, §7). Loaded by BaseLayout.
 * Budget: 0.7 KB minified.
 *
 * 1. Image fade. A lazy image below the first viewport that has not loaded yet is held at
 *    opacity 0 (img[data-fade="wait"] in base.css) and fades in over --dur-slow once it loads
 *    (or fails, so its alt text shows). Never the priority image (it is eager), never an image
 *    already painted, never a case image with its own scroll light (StageImage light="scroll"),
 *    never under reduced motion.
 * 2. Rails. Inside a .rail-wrap, the [data-rail-prev] / [data-rail-next] buttons (rendered with
 *    the hidden attribute) are shown while its .rail actually overflows, move it one card per
 *    press (the distance between the first two cards, so the gap and right-to-left are included),
 *    and are disabled at either end.
 *
 * Without this script images appear as they load and rails scroll by touch, trackpad and keys.
 */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduce)
  for (const img of document.querySelectorAll<HTMLImageElement>('img[loading=lazy]')) {
    if (
      img.complete ||
      img.closest('[data-light=scroll]') ||
      img.getBoundingClientRect().top < innerHeight
    )
      continue;
    img.dataset.fade = 'wait';
    img.onload = img.onerror = () => (img.dataset.fade = 'in');
  }

for (const rail of document.querySelectorAll<HTMLElement>('.rail-wrap .rail')) {
  const buttons = rail
    .closest('.rail-wrap')!
    .querySelectorAll<HTMLButtonElement>('[data-rail-prev],[data-rail-next]');
  // Runs on every scroll and resize (and once on observe): shows, disables and arms each button.
  const update = () => {
    const max = rail.scrollWidth - rail.clientWidth;
    const pos = Math.abs(rail.scrollLeft);
    for (const b of buttons) {
      const back = 'railPrev' in b.dataset;
      b.hidden = max < 2;
      b.disabled = back ? pos < 2 : pos > max - 2;
      b.onclick = () => {
        const [first, second] = rail.children as unknown as HTMLElement[];
        rail.scrollBy({
          left: (back ? -1 : 1) * (second!.offsetLeft - first!.offsetLeft),
          behavior: reduce ? 'auto' : 'smooth',
        });
      };
    }
  };
  rail.addEventListener('scroll', update);
  new ResizeObserver(update).observe(rail);
}

// A module, so its top-level names stay local (scripts without imports share one scope).
export {};
