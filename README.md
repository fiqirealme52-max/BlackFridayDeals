# DealHawk — Real Black Friday Deals, Checked Today

[![DealHawk — Real Black Friday Deals, Checked Today](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![Rank](https://make.fun/badge/black-friday-deal-finder-01/fiqirealme52-max/BlackFridayDeals/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![Reward](https://make.fun/badge/black-friday-deal-finder-01/fiqirealme52-max/BlackFridayDeals/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)

DealHawk is a Black Friday deal finder built around one rule: a deal only counts
if its price was actually read from a real store or deal roundup. Every one of
the **48 deals** on the site carries the sale price, the usual price, the
discount (computed from those two numbers, never typed by hand), a verdict, the
time the price was checked, and the source where the price was read.

## The numbers

- **48 verified deals** — Tech 12, TV & Audio 7, Gaming 4, Home & Kitchen 9,
  Toys 7, Smart Home 5, Fashion 2, Beauty 2.
- **Verdicts:** 6 NEW LOW · 24 STRONG DEAL · 18 ROUTINE SALE.
- **Total savings if you bought one of everything: $8,846.47** (computed from
  the deal data, not typed in).
- **Stores:** Amazon 24 · Target 10 · Walmart 9 · Best Buy 4 · Dyson 1.
- **All prices checked 27 Nov 2026, 13:30 WIB** (reading window 13:20–13:50 WIB;
  AirPods Pro 3, Dyson V9, Sony WH-1000XM5 and the LEGO Rhino were spot-checked
  again at 13:35 WIB and were unchanged).

## What the verdicts mean

- **NEW LOW** — the source explicitly calls it an all-time low, lowest ever, or
  best price to date. Only 6 deals earned this.
- **STRONG DEAL** — a cut of 40% or more, or the source calls it the lowest
  price it has tracked.
- **ROUTINE SALE** — a real cut, but the price has been seen lower before, or
  the cut is small (under 20%).

## Features

- **Search** by product name, plus filters for category, store, discount
  (20%+ / 40%+ / 50%+) and verdict.
- **Sorting:** best deals first (verdict, then discount), biggest discount,
  lowest price, name A–Z.
- **Detail page per deal** (`#/deal/<slug>`) with the full evidence: source,
  the quote the source actually gave, and the check time.
- **Same-product comparison** on six hero products (AirPods Pro 3, Apple Watch
  Series 12, Dyson V9, Meta Quest 3S, Beats Studio Pro, Sony DualSense): the
  verified price at each store, with the cheapest marked BEST PRICE.

## How to verify a deal

1. Open a deal's detail page and read the source + evidence lines.
2. Click "Shop at …" — it opens the store's own search for that exact product,
   so you can see the live price in one click. (Links go to store search pages,
   never to invented product URLs.)
3. Compare the live price with the checked price and check time shown on the
   card. Black Friday prices move fast; if a store price has moved since
   13:30 WIB, the card still shows what was verified and when.

Deals with shaky "was" prices were left out on purpose — for example a bundle
whose "$50 off" claim did not match its real usual price, and a TV whose list
price looked inflated for the model.

## Run it locally

```sh
cd app
python3 -m http.server 8080
# open http://localhost:8080/
```

Vanilla JavaScript, no framework, no network loads — everything lives in
`app/` (HTML, CSS, and four small JS files: data, filters, views, app logic).

## Build the submission dossier

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` into the output directory and
writes `dossier.json` via the bundled frontend helper in
`vendor/makefun-frontend.ts`.
