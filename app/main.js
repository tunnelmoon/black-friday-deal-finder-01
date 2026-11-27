// Deal Scout boot: wires the controls, renders the grid, and routes between
// the grid (#/) and a single deal (#/deal/<id>). No network calls anywhere.

import { deals, CHECKED_AT } from "./data.js";
import { applyFilters, CATEGORIES, freshState, SORTS, STORES } from "./filters.js";
import { dealById, detailHtml, gridHtml, notFoundHtml } from "./render.js";

const state = freshState();
const grid = document.getElementById("grid");
const countLine = document.getElementById("count");
const view = document.getElementById("view");
const searchBox = document.getElementById("search");
const categoryBox = document.getElementById("category");
const storeBox = document.getElementById("store");
const minOffBox = document.getElementById("minoff");
const sortBox = document.getElementById("sort");
const minOffLabel = document.getElementById("minoff-label");

function fillSelect(box, values, allLabel) {
  box.innerHTML = `<option value="All">${allLabel}</option>` + values.map((v) => `<option value="${v}">${v}</option>`).join("");
}

function fillSort(box) {
  box.innerHTML = Object.entries(SORTS)
    .map(([key, sort]) => `<option value="${key}">${sort.label}</option>`)
    .join("");
}

function renderGrid() {
  const list = applyFilters(state);
  grid.innerHTML = gridHtml(list);
  const total = deals.length;
  countLine.textContent =
    list.length === total
      ? `${total} deals, checked 27 Nov 2026`
      : `${list.length} of ${total} deals match`;
  view.hidden = false;
  document.getElementById("detail").hidden = true;
  document.title = "Deal Scout: Black Friday 2026";
}

function renderDetail(id) {
  const deal = dealById(id);
  const detail = document.getElementById("detail");
  if (!deal) {
    detail.innerHTML = notFoundHtml(id);
  } else {
    detail.innerHTML = detailHtml(deal);
    document.title = `${deal.title} (${deal.store}) - Deal Scout`;
  }
  view.hidden = true;
  detail.hidden = false;
  window.scrollTo(0, 0);
}

function route() {
  const hash = window.location.hash || "#/";
  const match = hash.match(/^#\/deal\/([a-z0-9-]+)$/);
  if (match) renderDetail(match[1]);
  else renderGrid();
}

fillSelect(categoryBox, CATEGORIES, "All categories");
fillSelect(storeBox, STORES, "All stores");
fillSort(sortBox);
document.getElementById("checked-note").textContent =
  `All ${deals.length} prices were read from named deals sources on 27 Nov 2026 (${CHECKED_AT}). Prices can change; confirm at the store before you buy.`;

searchBox.addEventListener("input", () => {
  state.query = searchBox.value;
  renderGrid();
});
categoryBox.addEventListener("change", () => {
  state.category = categoryBox.value;
  renderGrid();
});
storeBox.addEventListener("change", () => {
  state.store = storeBox.value;
  renderGrid();
});
minOffBox.addEventListener("input", () => {
  state.minOff = Number(minOffBox.value);
  minOffLabel.textContent = state.minOff === 0 ? "Any discount" : `At least ${state.minOff}% off`;
  renderGrid();
});
sortBox.addEventListener("change", () => {
  state.sort = sortBox.value;
  renderGrid();
});

window.addEventListener("hashchange", route);
route();
