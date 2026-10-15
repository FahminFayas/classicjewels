/**
 * Filter and sort over one or more grids of pieces (docs/design-system-v2.md §5.5, §7).
 * <Filters> names its grids in data-filters ("grid-velvet grid-studio"); each grid's cells carry
 * data-karat, data-collection, data-name and data-new (or the .card inside them does). State is
 * kept in location.hash (#karat=22&collection=kolkata&sort=name) with replaceState, so the page
 * keeps a single canonical URL and no history entries are added. A grid's whole section hides
 * when none of its cards match (never the section that holds the controls). Loaded only by
 * <Filters>; without it the block shows plain category links. Budget: 1.8 KB minified.
 */
const root = document.querySelector<HTMLElement>('[data-filters]');
const grids = (root?.dataset.filters ?? '')
  .split(' ')
  .map((id) => document.getElementById(id))
  .filter((g): g is HTMLElement => !!g);

if (root && grids.length) {
  const chips = [...root.querySelectorAll<HTMLButtonElement>('[data-facet]')];
  const facets = [...new Set(chips.map((b) => b.dataset.facet as string))];
  const sort = root.querySelector<HTMLSelectElement>('[data-sort]');
  const count = root.querySelector<HTMLElement>('[data-count]');
  const empty = root.querySelector<HTMLElement>('[data-empty]');
  const clear = root.querySelector<HTMLElement>('[data-clear]');
  const sets = grids.map((grid) => {
    const cells = [...grid.children] as HTMLElement[];
    cells.forEach((c, i) => (c.dataset.i = String(i)));
    const sec = grid.closest('section');
    return { grid, cells, sec: sec?.contains(root) ? null : sec };
  });

  const read = () => new URLSearchParams(location.hash.slice(1));
  const write = (p: URLSearchParams) => {
    const h = p.toString();
    history.replaceState(null, '', h ? `#${h}` : location.pathname + location.search);
  };
  const val = (c: HTMLElement, k: string) =>
    c.dataset[k] ?? c.querySelector<HTMLElement>('.card')?.dataset[k] ?? '';
  const idx = (c: HTMLElement) => Number(c.dataset.i);

  const apply = () => {
    const p = read();
    const s = p.get('sort') ?? 'featured';
    let total = 0;
    for (const b of chips) {
      b.setAttribute('aria-pressed', String(p.get(b.dataset.facet as string) === b.dataset.value));
    }
    for (const { grid, cells, sec } of sets) {
      let n = 0;
      for (const c of cells) {
        const ok = facets.every((f) => !p.get(f) || val(c, f) === p.get(f));
        c.hidden = !ok;
        if (ok) n++;
      }
      grid.append(
        ...cells.sort((a, b) =>
          s === 'name'
            ? val(a, 'name').localeCompare(val(b, 'name'))
            : s === 'newest'
              ? Number(val(b, 'new')) - Number(val(a, 'new')) || idx(a) - idx(b)
              : idx(a) - idx(b),
        ),
      );
      if (sec) sec.hidden = !n;
      total += n;
    }
    if (sort) sort.value = s;
    if (count) count.textContent = `${total} ${total === 1 ? 'piece' : 'pieces'} shown`;
    if (empty) empty.hidden = total > 0;
    if (clear) clear.hidden = !p.size;
  };

  for (const b of chips) {
    b.addEventListener('click', () => {
      const p = read();
      const f = b.dataset.facet as string;
      if (p.get(f) === b.dataset.value) p.delete(f);
      else p.set(f, b.dataset.value as string);
      write(p);
      apply();
    });
  }
  sort?.addEventListener('change', () => {
    const p = read();
    if (sort.value === 'featured') p.delete('sort');
    else p.set('sort', sort.value);
    write(p);
    apply();
  });
  clear?.addEventListener('click', () => {
    write(new URLSearchParams());
    apply();
  });
  addEventListener('hashchange', apply);

  root.querySelector('[data-filter-controls]')?.removeAttribute('hidden');
  apply();
}
