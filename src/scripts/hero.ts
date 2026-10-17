/**
 * The home hero's case light (docs/design-system-v2.md §5.7, §6.1 section 1, §7). Loaded by
 * HomeHero only. Budget: 1.4 KB minified. Hooks, all inside [data-hero]: [data-stage] (the
 * wrapper the shade sits on), [data-glint], [data-slot] (one per piece, holding its figure, with
 * data-href for the morph), [data-cap] (one caption per piece), [data-go="i"] (the name buttons,
 * desktop), [data-step="1"] ("Next piece", phones), [data-live] (a status line for screen
 * readers). Slots and captions other than the shown one carry data-off (display: none for a slot,
 * visibility for a caption, so the caption cell keeps the height of the tallest and nothing
 * shifts).
 *
 * 1. The light comes on. 400 ms after the priority image has loaded, one champagne glint sweeps
 *    the pool: a CSS animation on [data-glint], a masked strip over the image. The image's own
 *    opacity is never touched, and it is never hidden or delayed.
 * 2. The switch. A name button, "Next piece" or a horizontal swipe across the case (pointer
 *    events, 40 px, further sideways than up or down; left for the next piece, right for the
 *    previous) chooses a piece. The light dims to the stage over 200 ms (data-light="dim": the
 *    shade), the slot and caption swap, the light comes back over 400 ms with the glint.
 *    data-morph-href follows the shown slot, so piece-morph.ts grows the right piece into its
 *    page. Under reduced motion: a plain swap. (A touch that swipes never clicks, and a mouse
 *    dragged across the caption link starts a native link drag instead, so no guard is needed.)
 * 3. Once through the set by itself. 7 s per piece after the first glint, round to the first
 *    piece, then it stops. A tick is skipped (and tried again 7 s later) while the hero is hovered
 *    or holds focus, or while the tab is hidden. Any press or swipe stops it for good. Never under
 *    reduced motion.
 * 4. The other pieces' images load once the browser is idle (loading="lazy" becomes "eager" on
 *    the slots that are off; they keep fetchpriority="low" from the markup).
 *
 * The name buttons and "Next piece" are plain buttons: Tab reaches each, Enter and Space press.
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
  /** Where the pointer went down (x is NaN while no press is in progress). */
  let x = NaN;
  let y = 0;

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
    // "true", not an empty value: ARIA reads aria-current="" as false.
    names.forEach((b, j) =>
      j == k ? b.setAttribute('aria-current', 'true') : b.removeAttribute('aria-current'),
    );
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

  root.onclick = (event) => {
    const d = (event.target as Element).closest<HTMLElement>('[data-go],[data-step]')?.dataset;
    if (d) go(d.step ? shown + +d.step : +d.go!, true);
  };

  // The swipe. A press records its start; a cancelled gesture (the page scrolling) forgets it.
  root.onpointerdown = (event) => {
    x = event.clientX;
    y = event.clientY;
  };
  root.onpointercancel = () => (x = NaN);
  root.onpointerup = (event) => {
    const dx = event.clientX - x;
    const dy = event.clientY - y;
    x = NaN;
    // At least 40 px, and further sideways than up or down (squares: no Math.abs, no sign).
    if (dx * dx >= 1600 && dx * dx > dy * dy) go(shown + (dx < 0 ? 1 : -1), true);
  };

  root.dataset.ready = '';

  // The light comes on once the priority image has painted; the automatic cycle follows.
  const lit = () =>
    setTimeout(() => {
      if (reduce) return;
      flash();
      setTimeout(tick, 7000);
    }, 400);
  const first = root.querySelector('img')!;
  if (first.complete) lit();
  else first.onload = lit;

  (window.requestIdleCallback ?? setTimeout)(() =>
    all<HTMLImageElement>('[data-off] img').forEach((img) => (img.loading = 'eager')),
  );
}

// A module, so its top-level names stay local (scripts without imports share one scope).
export {};
