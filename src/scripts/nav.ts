/**
 * Header behaviour (docs/design-system-v2.md §5.3, §7). Loaded by BaseLayout. Budget 1.6 KB min.
 *
 * The menus are declarative: the Jewellery button and the rate chip open their popovers with
 * popovertarget, the Menu button opens the drawer (a modal <dialog>) with commandfor, and
 * Escape and light dismiss are native. This script adds:
 *
 *  1. aria-expanded on every popover invoker, mirrored from the popover's toggle event;
 *  2. hover intent for the mega panel (mouse only: opens 150 ms after the pointer rests on
 *     Jewellery; if hover opened it, closes 200 ms after the pointer leaves button and panel;
 *     a click just after hover confirms it), focus back to Jewellery when it closes with focus
 *     inside or nowhere, and the last previewed style kept lit (data-active);
 *  3. the drawer where commandfor is missing (iOS before 26.2), a backdrop click that closes it
 *     where closedby="any" is missing, and any menu closing once one of its links is chosen (so
 *     the back button never brings a page back with a menu open);
 *  4. the phone action bar hidden while a form field has focus;
 *  5. today's row marked in opening-hours tables ([data-hours-days]).
 *
 * Without it every menu still opens by click or tap and every page stays reachable from the
 * footer.
 */
const doc = document;
const on = <E extends Event>(target: EventTarget, type: string, fn: (e: E) => unknown) =>
  target.addEventListener(type, fn as EventListener);

// 1. Popover invokers mirror their popover's state (each popover has one invoker).
for (const pop of doc.querySelectorAll('[popover][id]')) {
  const invoker = doc.querySelector(`[popovertarget="${pop.id}"]`);
  if (!invoker) continue;
  invoker.ariaExpanded = 'false';
  on<ToggleEvent>(pop, 'toggle', (e) => (invoker.ariaExpanded = `${e.newState == 'open'}`));
}

// 2. The mega panel.
const mega = doc.getElementById('mega');
const jewel = doc.querySelector<HTMLElement>('[popovertarget="mega"]');
if (mega && jewel) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  /** When hover opened the panel; 0 when a click or a key did. */
  let hover = 0;
  let lit: HTMLElement | null = null;
  const intent = (open: boolean) => (e: PointerEvent) => {
    if (e.pointerType != 'mouse') return;
    clearTimeout(timer);
    if (open || hover)
      timer = setTimeout(
        () =>
          !open
            ? mega.hidePopover()
            : mega.matches(':popover-open') || (mega.showPopover(), (hover = Date.now())),
        open ? 150 : 200,
      );
  };
  for (const el of [jewel, mega]) {
    on(el, 'pointerenter', intent(true));
    on(el, 'pointerleave', intent(false));
  }
  jewel.onclick = (e) => {
    if (Date.now() - hover < 600) e.preventDefault();
    hover = 0;
  };
  // Closing with focus inside, or with nothing focused after a click or a key, focuses
  // Jewellery first (so the hide keeps it there); a panel the pointer merely left does not.
  on<ToggleEvent>(mega, 'beforetoggle', (e) => {
    if (e.newState == 'open') return;
    const active = doc.activeElement;
    if (mega.contains(active) || (active == doc.body && !hover)) jewel.focus();
    hover = 0;
  });
  // The last previewed style stays lit.
  const light = (e: Event) => {
    const li = (e.target as Element).closest<HTMLElement>('[data-styles] li');
    if (!li) return;
    lit?.removeAttribute('data-active');
    (lit = li).dataset.active = '';
  };
  on(mega, 'pointerover', light);
  on(mega, 'focusin', light);
}

// 3. Dialogs and menus.
on(doc, 'click', (e) => {
  const t = e.target as Element;
  const invoker = t.closest('[commandfor]');
  const dialog = doc.getElementById(invoker?.getAttribute('commandfor') ?? '');
  // Checked per click, so the fallback can be tried by deleting commandForElement in DevTools.
  if (dialog instanceof HTMLDialogElement && !('commandForElement' in HTMLButtonElement.prototype))
    // Menu is inert while the drawer is open and Close is hidden while it is shut: a toggle.
    if (dialog.open) dialog.close();
    else dialog.showModal();
  // The drawer's content fills the dialog, so a click on the dialog itself is on the backdrop;
  // and a link chosen inside a menu closes the menu.
  const menu = t.localName == 'dialog' ? t : t.closest('a[href]')?.closest('dialog,[popover]');
  if (menu instanceof HTMLDialogElement) menu.close();
  else (menu as HTMLElement | undefined)?.hidePopover();
});

// 4. The phone action bar steps aside while a text field has focus (the keyboard needs the
// room). Radios and checkboxes (the karat keys, the estimator chips) take focus on Android without
// a keyboard, and the bar follows the chosen karat, so it stays for those.
const bar = doc.querySelector<HTMLElement>('[data-action-bar]');
const TYPING =
  'textarea, select, input:not([type=radio], [type=checkbox], [type=submit], [type=button], [type=file])';
if (bar) {
  on(doc, 'focusin', (e) => (bar.hidden = (e.target as Element).matches(TYPING)));
  on(doc, 'focusout', () => (bar.hidden = false));
}

// 5. Opening hours: mark today (Dubai time).
const today = new Date().toLocaleDateString('en-US', { weekday: 'long', timeZone: 'Asia/Dubai' });
for (const row of doc.querySelectorAll<HTMLElement>('[data-hours-days]')) {
  if (row.dataset.hoursDays?.split(',').includes(today)) row.dataset.today = 'true';
}

// A module, so its top-level names stay local (scripts without imports share one scope).
export {};
