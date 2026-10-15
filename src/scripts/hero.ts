/**
 * The home hero's case light (docs/design-system-v2.md §5.7, §6.1 section 1, §7). Loaded by
 * HomeHero only. Budget: 1.2 KB minified. Hooks, all inside [data-hero]: [data-stage] (the
 * wrapper the shade sits on), [data-glint], [data-slot] (one per piece, holding its figure, with
 * data-href for the morph), [data-cap] (one caption per piece), [data-go="i"] (name buttons),
 * [data-step="-1|1"] (previous/next), [data-live] (a status line for screen readers). Slots and
 * captions other than the shown one carry data-off (display: none for a slot, visibility for a
 * caption, so the caption cell keeps the height of the tallest and nothing shifts).
 *
 * 1. The light comes on. 400 ms after the priority image has loaded, one champagne glint sweeps
 *    the pool: a CSS animation on [data-glint], a masked strip over the image. The image's own
 *    opacity is never touched, and it is never hidden or delayed.
 * 2. The switch. Previous/next and the name buttons choose a piece. The light dims to the stage
 *    over 200 ms (data-light="dim": the shade), the slot and caption swap, the light comes back
 *    over 400 ms with the glint. data-morph-href follows the shown slot, so piece-morph.ts grows
 *    the right piece into its page. Under reduced motion: a plain swap.
 * 3. Once through the set by itself. 7 s per piece after the first glint, round to the first
 *    piece, then it stops. A tick is skipped (and tried again 7 s later) while the hero is hovered
 *    or holds focus, or while the tab is hidden. Any press stops it for good. Never under reduced
 *    motion.
 * 4. The other pieces' images load once the browser is idle (loading="lazy" becomes "eager" on
 *    the slots that are off; they keep fetchpriority="low" from the markup).
 *
 * Without this script the first piece shows exactly as rendered, its caption link works, and the
 * controls stay invisible (visibility, so their space is reserved and nothing shifts).
 */
const root = document.querySelector<HTMLElement>('[data-hero]');
const stage = root?.querySelector<HTMLElement>('[data-stage]');
const glint = root?.querySelector<HTMLElement>('[data-glint]');

if (root && stage && glint) {
  const all = <T extends Element>(selector: string) => root.querySelectorAll<T>(selector);
  /** The slots, then the captions: index modulo the count is the piece. */
  const parts = all<HTMLElement>('[data-slot],[data-cap]');
  const names = all<HTMLElement>('[data-go]');
  const live = root.querySelector<HTMLElement>('[data-live]');
  const count = parts.length / 2;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let shown = 0;
  /** Automatic advances still to come: one full cycle, ending back on the first piece. */
  let left = count;
  let swapTimer: ReturnType<typeof setTimeout> | undefined;

  // Run the glint: data-on alternates between "" and "b", each with its own keyframes (like the
  // rate rule's sheen / sheen-again), so a change of value restarts the sweep without a reflow.
  const flash = () => (glint.dataset.on = glint.dataset.on ? '' : 'b');

  const show = (k: number) => {
    parts.forEach((el, j) => {
      const on = j % count == k;
      el.toggleAttribute('data-off', !on);
      if (on) el.dataset.morphHref = el.dataset.href;
      else delete el.dataset.morphHref;
    });
    names.forEach((b, j) => b.toggleAttribute('aria-current', j == k));
    shown = k;
  };

  const go = (to: number, byUser?: boolean) => {
    const k = (to + count) % count;
    if (byUser) {
      left = 0;
      live!.textContent = `${names[k]!.textContent}, ${k + 1} of ${count}`;
    }
    if (k == shown) return;
    clearTimeout(swapTimer);
    if (reduce) return show(k);
    stage.dataset.light = 'dim';
    swapTimer = setTimeout(() => {
      show(k);
      stage.dataset.light = 'lit';
      flash();
    }, 200);
  };

  // One tick every 7 s until the cycle is spent (left reaches 0, or a press sets it to 0).
  const tick = () => {
    if (!left) return;
    if (!document.hidden && !root.matches(':hover,:focus-within')) {
      left -= 1;
      go(shown + 1);
    }
    setTimeout(tick, 7000);
  };

  root.addEventListener('click', (event) => {
    const d = (event.target as Element).closest<HTMLElement>('[data-go],[data-step]')?.dataset;
    if (d) go(d.step ? shown + +d.step : +d.go!, true);
  });

  root.dataset.ready = '';

  // The light comes on once the priority image has painted; the automatic cycle follows.
  const lit = () =>
    setTimeout(() => {
      if (reduce) return;
      flash();
      setTimeout(tick, 7000);
    }, 400);
  const first = parts[0]!.querySelector('img')!;
  if (first.complete) lit();
  else first.onload = lit;

  (window.requestIdleCallback ?? setTimeout)(() => {
    for (const img of all<HTMLImageElement>('[data-slot][data-off] img')) img.loading = 'eager';
  });
}

// A module, so its top-level names stay local (scripts without imports share one scope).
export {};
