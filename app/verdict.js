// Deal math and the honesty signal. Every number shown on a card comes from
// here, so a discount can never disagree with its two prices.

export function discountOf(deal) {
  return Math.round((1 - deal.price / deal.was) * 100);
}

export function savedOf(deal) {
  return deal.was - deal.price;
}

export function money(amount) {
  const text = amount.toFixed(2);
  return "$" + (text.endsWith(".00") ? text.slice(0, -3) : text);
}

export const SIGNALS = {
  "new-low": { label: "New low", hint: "Lowest price on record for this listing." },
  strong: { label: "Strong price", hint: "A deep cut on a real list price." },
  decent: { label: "Decent cut", hint: "Worth it if you already wanted it." },
  modest: { label: "Modest cut", hint: "A small discount; check before you buy." },
};

export function signalOf(deal) {
  return SIGNALS[deal.signal] ?? SIGNALS.decent;
}

// Best-first order for the default view: new lows first, then by discount.
export function rankScore(deal) {
  const order = { "new-low": 0, strong: 1, decent: 2, modest: 3 };
  return (order[deal.signal] ?? 2) * 1000 - discountOf(deal);
}
