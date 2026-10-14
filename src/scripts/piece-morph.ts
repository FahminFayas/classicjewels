/**
 * The piece grows into its page (docs/design-system-v2.md §3.8 "View transitions", §7).
 * Loaded by CaseWall, PlateGrid and HomeHero, never by BaseLayout. Budget: 0.35 KB minified.
 *
 * Listing cards carry data-morph-href (the piece page's path, from routes.ts) on their figure
 * (StageImage morph="source"). When a cross-document view transition leaves this page, the figure
 * whose path matches the destination gets view-transition-name: piece, pairing it with the piece
 * page's stage (morph="target"). Only one name is ever set, so there is no duplicate-name error;
 * it is cleared on pageshow, when the page comes back from the back/forward cache. Without
 * support: a plain cross-fade.
 */
interface SwapEvent extends Event {
  viewTransition: object | null;
  activation: { entry: { url: string | null } | null } | null;
}

const figures = () => document.querySelectorAll<HTMLElement>('[data-morph-href]');

addEventListener('pageswap', (event) => {
  const { viewTransition, activation } = event as SwapEvent;
  const url = activation?.entry?.url;
  if (!viewTransition || !url) return;
  const path = new URL(url).pathname;
  for (const fig of figures()) {
    if (fig.dataset.morphHref == path) return void (fig.style.viewTransitionName = 'piece');
  }
});

addEventListener('pageshow', () => {
  for (const fig of figures()) fig.style.viewTransitionName = '';
});

// A module, so its top-level names stay local (scripts without imports share one scope).
export {};
