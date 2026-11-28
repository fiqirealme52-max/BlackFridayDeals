# DealHawk — Real Black Friday Deals, Checked Today

[![DealHawk — Real Black Friday Deals, Checked Today](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![Rank](https://make.fun/badge/black-friday-deal-finder-01/fiqirealme52-max/BlackFridayDeals/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![Reward](https://make.fun/badge/black-friday-deal-finder-01/fiqirealme52-max/BlackFridayDeals/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)

A Black Friday deal finder that only lists prices read live at the store or in a
deals source that names the store. Every card shows the product, the store, the
sale price, the usual price, the discount (computed from the two prices shown),
a verdict, a 0–100 score, the check time, and the source the price was read from.

## The numbers

- **58 verified deals** — 53 products across 7 stores (Amazon 31 · Target 10 ·
  Walmart 9 · Best Buy 5 · Costco 1 · Nike 1 · Dyson 1) and 8 categories
  (Tech 13 · TV & Audio 10 · Gaming 4 · Home & Kitchen 10 · Toys 7 ·
  Smart Home 7 · Fashion 4 · Beauty 3).
- **13 new lows** · 28 strong deals · 17 routine sales.
- **Total savings $10,923.77** — the sum of (usual − sale) over all 58 deals,
  computed from `app/data.js` at render time.
- **Last checked: 28 Nov 2026, 09:00 WIB.** Every deal was re-verified live on
  the build day; prices that moved were updated to the live price, and deals
  that could no longer be verified were dropped (Skechers Go Walk Flex — price
  moved and its usual price could not be re-confirmed; a duplicate KitchenAid
  Classic row and a duplicate Ring Floodlight row were merged into one deal each).

## Score 0–100

Each card carries a score so the best deals sort first. The formula is the same
for every card:

- Verdict base: NEW LOW 50 · STRONG DEAL 35 · ROUTINE SALE 20
- Plus 0.6 points per discount percent (rounded)
- Plus 5 points when the deal saves $100 or more
- Capped at 100

Example: the Fire TV Stick 4K (2026 model) is NEW LOW at 67% off, saving $40 —
50 + 40 + 0 = 90. The Dyson V9 at Target is NEW LOW at 55% off, saving $330 —
50 + 33 + 5 = 88.

## Verdicts

- **NEW LOW** — a source explicitly says all-time low / lowest ever / best price
  to date / matches lowest ever. Ties count: a price that matches a previous
  record low (TruSkin, the three Ring cameras) is a new low, not a new record.
- **STRONG DEAL** — 40%+ off, or a source calls it the best/lowest price.
- **ROUTINE SALE** — a cut, but seen cheaper before, or under 20% off.

## How prices were verified

Each price was read live on 28 Nov 2026 from the store listing or from a dated
deal roundup (27–28 Nov 2026) that names the store and the price. Store links go
to the store's own search for that product — no product URLs were invented. Two
prices needed a live check for the exact variant: the Nike Dunk Low (size 10,
Shimmer/Burnt Sunrise — $91.07, not $86.73) and the Fire TV Stick 4K (the $19.99
deal is the 2026 model with Vega OS, not the 2023 hardware).

## Features

Search by product name; filter by category, store, minimum discount (20%+ /
40%+ / 50%+) and verdict; sort by best deal score, biggest discount, lowest
price, or name. One card per product — the best price is shown first, with the
other stores listed on the card. Each deal has its own page (`#/deal/<slug>`)
with the full evidence and a same-product, other-stores comparison table with the
best price marked. "Today's Top Picks" shows the six highest-scored deals.

## Run it

Serve `app/` over HTTP and open it — no build step, no network load, vanilla JS:

```
python3 -m http.server 8080 --directory app
```

Then open http://localhost:8080. The entrypoint `main.ts` (Node, standard library
only) copies `app/` and `screenshots/` to the output directory and writes
`dossier.json`:

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```
