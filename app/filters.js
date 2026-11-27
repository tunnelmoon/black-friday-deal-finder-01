// Search, filter and sort state for the deal board. Pure functions over the
// deal list, so the same rules drive the grid, the count line and the detail
// page's "same product elsewhere" box.

import { deals } from "./data.js";
import { discountOf, rankScore, savedOf } from "./verdict.js";

export const CATEGORIES = [...new Set(deals.map((d) => d.category))].sort();
export const STORES = [...new Set(deals.map((d) => d.store))].sort();

export const SORTS = {
  best: { label: "Best first", run: (list) => [...list].sort((a, b) => rankScore(a) - rankScore(b)) },
  discount: { label: "Biggest % off", run: (list) => [...list].sort((a, b) => discountOf(b) - discountOf(a)) },
  saving: { label: "Biggest saving $", run: (list) => [...list].sort((a, b) => savedOf(b) - savedOf(a)) },
  price: { label: "Lowest price", run: (list) => [...list].sort((a, b) => a.price - b.price) },
};

export function freshState() {
  return { query: "", category: "All", store: "All", minOff: 0, sort: "best" };
}

export function applyFilters(state) {
  const needle = state.query.trim().toLowerCase();
  let list = deals.filter((deal) => {
    if (state.category !== "All" && deal.category !== state.category) return false;
    if (state.store !== "All" && deal.store !== state.store) return false;
    if (discountOf(deal) < state.minOff) return false;
    if (needle) {
      const hay = (deal.title + " " + deal.store + " " + deal.category).toLowerCase();
      if (!hay.includes(needle)) return false;
    }
    return true;
  });
  return SORTS[state.sort].run(list);
}

// Other listings of the exact same product at another store, for the
// "compare across stores" box on a deal page.
export function sameProductElsewhere(deal) {
  return deals.filter((other) => other.id !== deal.id && other.title === deal.title);
}
