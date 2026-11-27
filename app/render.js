// Rendering for the deal board: cards on the grid and the single-deal page.
// All text comes from the deal data, escaped before it reaches the page.

import { deals } from "./data.js";
import { discountOf, money, savedOf, signalOf } from "./verdict.js";
import { sameProductElsewhere } from "./filters.js";

function esc(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function initials(category) {
  return category
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function cardHtml(deal) {
  const signal = signalOf(deal);
  const off = discountOf(deal);
  return `
  <article class="card" data-id="${esc(deal.id)}">
    <a class="card-link" href="#/deal/${esc(deal.id)}" aria-label="${esc(deal.title)} at ${esc(deal.store)}">
      <div class="thumb thumb-${esc(deal.category.toLowerCase().replace(/[^a-z]+/g, "-"))}" aria-hidden="true">${esc(initials(deal.category))}</div>
      <div class="card-body">
        <div class="card-top">
          <span class="store">${esc(deal.store)}</span>
          <span class="signal signal-${esc(deal.signal)}" title="${esc(signal.hint)}">${esc(signal.label)}</span>
        </div>
        <h3>${esc(deal.title)}</h3>
        <p class="category">${esc(deal.category)}</p>
        <p class="prices"><span class="price">${money(deal.price)}</span> <s class="was">${money(deal.was)}</s> <span class="off">-${off}%</span></p>
        <p class="save">You save ${money(savedOf(deal))}</p>
        <p class="checked">Checked 27 Nov 2026 &middot; ${esc(deal.source)}</p>
      </div>
    </a>
    <a class="store-btn" href="${esc(deal.url)}" target="_blank" rel="noopener">View at ${esc(deal.store)} &nearr;</a>
  </article>`;
}

export function gridHtml(list) {
  if (list.length === 0) {
    return `<p class="empty">No deals match those filters. Clear the search or lower the discount bar.</p>`;
  }
  return list.map(cardHtml).join("");
}

export function detailHtml(deal) {
  const signal = signalOf(deal);
  const off = discountOf(deal);
  const others = sameProductElsewhere(deal);
  const compare = others.length
    ? `<section class="compare"><h2>Same product at another store</h2>${others
        .map(
          (other) => `<p><strong>${esc(other.store)}</strong> ${money(other.price)} (was ${money(other.was)}, -${discountOf(other)}%) <a href="#/deal/${esc(other.id)}">see that listing</a> &middot; <a href="${esc(other.url)}" target="_blank" rel="noopener">view at ${esc(other.store)}</a></p>`,
        )
        .join("")}</section>`
    : "";
  return `
  <a class="back" href="#/">&larr; All deals</a>
  <article class="detail">
    <div class="thumb thumb-${esc(deal.category.toLowerCase().replace(/[^a-z]+/g, "-"))} thumb-big" aria-hidden="true">${esc(initials(deal.category))}</div>
    <div class="detail-body">
      <div class="card-top">
        <span class="store">${esc(deal.store)}</span>
        <span class="signal signal-${esc(deal.signal)}" title="${esc(signal.hint)}">${esc(signal.label)}</span>
      </div>
      <h2>${esc(deal.title)}</h2>
      <p class="category">${esc(deal.category)}</p>
      <p class="prices prices-big"><span class="price">${money(deal.price)}</span> <s class="was">${money(deal.was)}</s> <span class="off">-${off}%</span></p>
      <p class="save">You save ${money(savedOf(deal))}</p>
      <p class="evidence"><strong>Is it really a deal?</strong> ${esc(deal.evidence)}</p>
      <p class="checked">Price checked 27 Nov 2026, 06:30 UTC &middot; Source: ${esc(deal.source)}</p>
      <a class="store-btn store-btn-big" href="${esc(deal.url)}" target="_blank" rel="noopener">View at ${esc(deal.store)} &nearr;</a>
    </div>
  </article>
  ${compare}`;
}

export function notFoundHtml(id) {
  return `<p class="empty">No deal with the id “${esc(id)}” on this board. <a href="#/">Back to all deals</a>.</p>`;
}

export function dealById(id) {
  return deals.find((deal) => deal.id === id);
}
