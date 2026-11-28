/* DealHawk filters — pure functions over DEALS. No I/O, no clock, no random. */

/* Discount % is always computed from the two prices shown, rounded to the
   nearest whole percent. Never typed in by hand. */
function discountOf(d) {
  return Math.round((d.usual - d.sale) / d.usual * 100);
}

function saveOf(d) {
  return Math.round((d.usual - d.sale) * 100) / 100;
}

/* Score 0–100 (documented in README): verdict base + discount + savings.
   NEW LOW 50 / STRONG DEAL 35 / ROUTINE SALE 20, plus 0.6 per discount
   point, plus 5 when the deal saves $100 or more. Capped at 100. */
function scoreOf(d) {
  const base = d.verdict === 'NEW LOW' ? 50 : d.verdict === 'STRONG DEAL' ? 35 : 20;
  const bonus = saveOf(d) >= 100 ? 5 : 0;
  return Math.min(100, base + Math.round(discountOf(d) * 0.6) + bonus);
}

function verdictClass(v) {
  return v === 'NEW LOW' ? 'newlow' : v === 'STRONG DEAL' ? 'strong' : 'routine';
}

/* Store search URLs only — never an invented product URL. */
function storeSearchUrl(store, name) {
  const q = encodeURIComponent(name);
  if (store === 'Amazon') return 'https://www.amazon.com/s?k=' + q;
  if (store === 'Walmart') return 'https://www.walmart.com/search?q=' + q;
  if (store === 'Best Buy') return 'https://www.bestbuy.com/site/searchpage.jsp?st=' + q;
  if (store === 'Target') return 'https://www.target.com/s?searchTerm=' + q;
  if (store === 'Dyson') return 'https://www.dyson.com/';
  if (store === 'Costco') return 'https://www.costco.com/CatalogSearch?dept=All&keyword=' + q;
  if (store === 'Nike') return 'https://www.nike.com/w?q=' + q;
  return '#';
}

/* Slug: short product key, plus the store when the product is sold by
   more than one store. e.g. dyson-v9-motorbar-target */
function slugOf(d, multiStore) {
  return multiStore ? d.key + '-' + d.store.toLowerCase().replace(/[^a-z0-9]+/g, '') : d.key;
}

/* Group deal rows into one card per product. The card shows the best
   variant (highest score, then lowest sale) and lists the other stores. */
function groupByProduct(deals) {
  const byKey = new Map();
  for (const d of deals) {
    if (!byKey.has(d.key)) byKey.set(d.key, { key: d.key, name: d.name, cat: d.cat, variants: [] });
    byKey.get(d.key).variants.push(d);
  }
  const out = [];
  for (const p of byKey.values()) {
    p.variants.sort((a, b) => scoreOf(b) - scoreOf(a) || a.sale - b.sale);
    p.best = p.variants[0];
    p.others = p.variants.slice(1);
    out.push(p);
  }
  return out;
}

/* Filters: search text, category, store, minimum discount, verdict.
   A store filter keeps only variants from that store; a product stays
   visible when at least one of its variants matches every filter. */
function filterProducts(products, f) {
  const q = (f.q || '').trim().toLowerCase();
  return products.map((p) => {
    const variants = p.variants.filter((d) => {
      if (f.cat && d.cat !== f.cat) return false;
      if (f.store && d.store !== f.store) return false;
      if (discountOf(d) < (f.disc || 0)) return false;
      if (f.verdict && d.verdict !== f.verdict) return false;
      if (q && (d.name + ' ' + d.store + ' ' + d.cat).toLowerCase().indexOf(q) === -1) return false;
      return true;
    });
    if (!variants.length) return null;
    const kept = { key: p.key, name: p.name, cat: p.cat, variants };
    kept.variants.sort((a, b) => scoreOf(b) - scoreOf(a) || a.sale - b.sale);
    kept.best = kept.variants[0];
    kept.others = kept.variants.slice(1);
    return kept;
  }).filter(Boolean);
}

function sortProducts(products, sort) {
  const arr = products.slice();
  if (sort === 'discount') arr.sort((a, b) => discountOf(b.best) - discountOf(a.best) || scoreOf(b.best) - scoreOf(a.best));
  else if (sort === 'price') arr.sort((a, b) => a.best.sale - b.best.sale || scoreOf(b.best) - scoreOf(a.best));
  else if (sort === 'name') arr.sort((a, b) => a.name.localeCompare(b.name));
  else arr.sort((a, b) => scoreOf(b.best) - scoreOf(a.best) || discountOf(b.best) - discountOf(a.best));
  return arr;
}

function money(n) {
  return '$' + n.toFixed(2).replace(/\.00$/, '');
}
