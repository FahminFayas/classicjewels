/**
 * Header behaviour: mobile drawer (<dialog>), mega-panel keyboard and hover-intent handling,
 * the hairline under the sticky header once the page has scrolled, hiding the mobile action bar
 * while a field is focused, and highlighting today's row in opening-hours tables.
 * Everything degrades: without this script the drawer still opens via the native dialog
 * fallback link and the mega panel is reachable from the Jewellery index page.
 */

const HOVER_INTENT_MS = 120;

// ---------- Mobile drawer ----------
const drawer = document.querySelector<HTMLDialogElement>('#site-drawer');
const openButton = document.querySelector<HTMLButtonElement>('[data-drawer-open]');
if (drawer && openButton) {
  openButton.addEventListener('click', () => {
    drawer.showModal();
    openButton.setAttribute('aria-expanded', 'true');
  });
  drawer.addEventListener('close', () => openButton.setAttribute('aria-expanded', 'false'));
  for (const el of drawer.querySelectorAll<HTMLElement>('[data-drawer-close]')) {
    el.addEventListener('click', () => drawer.close());
  }
  // Click on the backdrop closes.
  drawer.addEventListener('click', (event) => {
    if (event.target === drawer) drawer.close();
  });
}

// ---------- Mega panel ----------
for (const trigger of document.querySelectorAll<HTMLButtonElement>('[data-mega-trigger]')) {
  const panelId = trigger.getAttribute('aria-controls');
  const panel = panelId ? document.getElementById(panelId) : null;
  const item = trigger.closest<HTMLElement>('[data-mega-item]');
  if (!panel || !item) continue;

  let hoverTimer: number | undefined;
  const setOpen = (open: boolean) => {
    trigger.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
    item.dataset.open = open ? 'true' : 'false';
  };
  const isOpen = () => trigger.getAttribute('aria-expanded') === 'true';

  trigger.addEventListener('click', () => setOpen(!isOpen()));
  item.addEventListener('pointerenter', (event) => {
    if ((event as PointerEvent).pointerType !== 'mouse') return;
    hoverTimer = window.setTimeout(() => setOpen(true), HOVER_INTENT_MS);
  });
  item.addEventListener('pointerleave', () => {
    window.clearTimeout(hoverTimer);
    setOpen(false);
  });
  item.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      trigger.focus();
    }
  });
  item.addEventListener('focusout', (event) => {
    if (!item.contains(event.relatedTarget as Node | null)) setOpen(false);
  });
}

// ---------- Sticky header hairline ----------
const header = document.querySelector<HTMLElement>('[data-site-header]');
const sentinel = document.querySelector<HTMLElement>('[data-scroll-sentinel]');
if (header && sentinel && 'IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => {
    header.dataset.scrolled = entry && !entry.isIntersecting ? 'true' : 'false';
  }).observe(sentinel);
}

// ---------- Mobile action bar: hide while typing ----------
const bar = document.querySelector<HTMLElement>('[data-action-bar]');
if (bar) {
  const isField = (el: Element | null) =>
    el instanceof HTMLInputElement ||
    el instanceof HTMLTextAreaElement ||
    el instanceof HTMLSelectElement;
  document.addEventListener('focusin', (e) => {
    if (isField(e.target as Element)) bar.hidden = true;
  });
  document.addEventListener('focusout', () => {
    bar.hidden = false;
  });
}

// ---------- Opening hours: mark today ----------
const today = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'Asia/Dubai' }).format(
  new Date(),
);
for (const row of document.querySelectorAll<HTMLElement>('[data-hours-days]')) {
  if (row.dataset.hoursDays?.split(',').includes(today)) row.dataset.today = 'true';
}
