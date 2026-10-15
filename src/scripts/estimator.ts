/**
 * The old-gold estimator (docs/design-system-v2.md §5.4, §7). Loaded by Estimator.astro (panel).
 *
 * Reads the form's data-mode (pending: fine-gold grams; confirmed: dirhams), data-rates (the
 * posted AED per gram), data-less (the buying discount per karat), data-sum and data-msg (the sum
 * line and the WhatsApp message as templates: {g} grams, {k} karat, {p} fineness, {f} fine gold,
 * {r} rate, {a} amount, {b} branch), data-wa and each karat radio's data-fine and data-pct. On
 * typing (220 ms after the last key), on the steppers and on a karat or branch change it writes
 * the output (rolled in confirmed mode, swapped otherwise), the sum line and the WhatsApp link.
 * Grams are clamped to the field's min and max (0.5 to 500) and written back when the field is
 * left. A newer rate from rate.ts (the cj:rates event) is applied too. The visitor's stored karat
 * reaches the radios through karat.ts, which checks them with a real change event. Without this
 * script the worked example baked into the HTML stands.
 */
import { formatAed } from '@/lib/format';
import { roll } from '@/lib/roll';

type Rates = Record<string, number>;

const grams = (g: number) => g.toLocaleString('en-GB', { maximumFractionDigits: 2 });
/** "{g} g of {k} …": fills a template baked into the page with this estimate's values. */
const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w)\}/g, (_, key: string) => values[key]!);

for (const form of document.querySelectorAll<HTMLFormElement>('form[data-estimator]')) {
  const $ = <T extends HTMLElement>(selector: string) => form.querySelector<T>(selector)!;
  const field = $<HTMLInputElement>('input[name="grams"]');
  const fig = $('[data-est-fig]');
  const sum = $('[data-est-sum]');
  const ask = $<HTMLAnchorElement>('[data-est-ask]');
  const branch = $<HTMLSelectElement>('select');
  const { mode, msg, wa } = form.dataset as { mode: string; msg: string; wa: string };
  const less: Rates = JSON.parse(form.dataset.less!);
  let rates: Rates = JSON.parse(form.dataset.rates!);
  const clamp = (g: number) => Math.min(+field.max, Math.max(+field.min, g));
  let weight = +field.value;
  let timer: ReturnType<typeof setTimeout>;

  /** The typed weight, clamped; an empty or unreadable field keeps the last good weight. */
  const read = () => {
    const v = parseFloat(field.value.replace(',', '.'));
    if (v > 0) weight = clamp(Math.round(v * 100) / 100);
  };

  const update = () => {
    const karat = $<HTMLInputElement>('input[type="radio"]:checked');
    const k = karat.value;
    const rate = rates[k]! - (less[k] ?? 0);
    const v: Record<string, string> = {
      g: grams(weight),
      k: k.toUpperCase(),
      p: karat.dataset.pct!,
      f: grams(Math.round(weight * +karat.dataset.fine! * 100) / 100),
      r: formatAed(rate),
      a: formatAed(weight * rate),
      b: branch.value,
    };
    roll(fig, mode == 'confirmed' ? v.a!.slice(4) : v.f!);
    sum.textContent = fill(form.dataset.sum!, v);
    ask.href = wa + encodeURIComponent(fill(msg, v));
  };

  /** Settle the field: the clamped weight is written back (on leaving it, or on Enter). */
  const settle = () => {
    clearTimeout(timer);
    read();
    field.value = String(weight);
    update();
  };

  form.addEventListener('input', ({ target }) => {
    if (target != field) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      read();
      update();
    }, 220);
  });

  form.addEventListener('change', ({ target }) => (target == field ? settle() : update()));

  form.addEventListener('click', ({ target }) => {
    const step = (target as Element).closest<HTMLElement>('[data-step]');
    if (!step) return;
    read();
    field.value = String((weight = clamp(Math.round((weight + +step.dataset.step!) * 10) / 10)));
    update();
  });

  // No submit button: Enter in the weight field settles it instead of reloading the page.
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    settle();
  });

  document.addEventListener('cj:rates', (event) => {
    rates = { ...rates, ...(event as CustomEvent<Rates>).detail };
    update();
  });

  // A restored form (back and forward navigation) may hold other values than the baked example.
  read();
  update();
  form.dataset.live = '';
}
