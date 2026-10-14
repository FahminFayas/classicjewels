/**
 * The karat follower (docs/design-system-v2.md §7, §3.2 "Rate figures"). Loaded by BaseLayout.
 *
 * A change of any [data-karat-input] radio (the rate instrument's keys, the estimator's chips)
 * sets html[data-karat] and remembers it for the session, so every RateFigure karat="follow"
 * (header chip, phone bar, drawer) shows that karat through one CSS rule in base.css. On load the
 * stored karat is applied to html and to the estimator's karat radios ([data-estimator]), never
 * to the hero instrument, whose 22K default stays as rendered. Without this script followers show
 * 22K and the instrument still switches by CSS (:has()). Budget: 0.4 KB minified.
 */
const KEY = 'cj:karat';
const root = document.documentElement;
const valid = (v?: string | null): v is string => /^(2[124]|18)k$/.test(v ?? '');

addEventListener('change', ({ target }) => {
  const input = target as HTMLInputElement;
  if (!input.matches('[data-karat-input]') || !valid(input.value)) return;
  root.dataset.karat = input.value;
  try {
    sessionStorage[KEY] = input.value;
  } catch {
    /* storage blocked: the choice lasts for this page */
  }
});

let saved: string | undefined;
try {
  saved = sessionStorage[KEY];
} catch {
  /* storage blocked */
}
if (valid(saved)) {
  root.dataset.karat = saved;
  // click() checks the radio and fires a bubbling change event, so the estimator recomputes.
  for (const radio of document.querySelectorAll<HTMLInputElement>(
    `[data-estimator] input[value="${saved}"]:not(:checked)`,
  ))
    radio.click();
}

// A module, so its top-level names stay local (scripts without imports share one scope).
export {};
