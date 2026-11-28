/* DealHawk main — render stats, store strip, top picks, grid; hash router. */

var PRODUCTS = groupByProduct(DEALS);
var MULTI_STORE_KEYS = new Set(PRODUCTS.filter((p) => p.variants.length > 1).map((p) => p.key));
var PRODUCT_BY_KEY = {};
PRODUCTS.forEach((p) => { PRODUCT_BY_KEY[p.key] = p; });
var DEAL_BY_SLUG = {};
for (const d of DEALS) DEAL_BY_SLUG[slugOf(d, MULTI_STORE_KEYS.has(d.key))] = d;

var NEW_LOWS = DEALS.filter((d) => d.verdict === 'NEW LOW').length;
var TOTAL_SAVE = DEALS.reduce((s, d) => s + saveOf(d), 0);

function el(id) { return document.getElementById(id); }

function renderStats() {
  el('stat-deals').textContent = DEALS.length;
  el('stat-lows').textContent = NEW_LOWS;
  el('stat-save').textContent = 'Total savings $' + TOTAL_SAVE.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  el('stat-checked').textContent = CHECKED;
}

function renderStores() {
  const counts = {};
  for (const d of DEALS) counts[d.store] = (counts[d.store] || 0) + 1;
  const order = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  el('stores').innerHTML = '<span class="store-label">Deals by store:</span>' +
    order.map((s) => '<span class="store-chip">' + s + ' <b>' + counts[s] + '</b></span>').join('');
}

function renderPicks() {
  const best = PRODUCTS.slice().sort((a, b) => scoreOf(b.best) - scoreOf(a.best) || discountOf(b.best) - discountOf(a.best)).slice(0, 6);
  el('pick-row').innerHTML = best.map((p) => {
    const d = p.best;
    const multi = MULTI_STORE_KEYS.has(d.key);
    const tag = d.verdict === 'NEW LOW' ? 'Lowest yet' : 'Deep cut';
    const cls = d.verdict === 'NEW LOW' ? 'lowest' : 'deep';
    return '<a class="pick" href="#/deal/' + slugOf(d, multi) + '">' +
      '<span class="off">&minus;' + discountOf(d) + '%</span>' +
      '<span class="nm">' + esc(d.name) + '</span>' +
      '<span class="pr">' + money(d.sale) + ' at ' + esc(d.store) + '</span>' +
      '<span class="tag2 ' + cls + '">' + tag + '</span></a>';
  }).join('');
}

function currentFilters() {
  return {
    q: el('q').value,
    cat: el('f-cat').value,
    store: el('f-store').value,
    disc: parseInt(el('f-disc').value, 10) || 0,
    verdict: el('f-verdict').value,
    sort: el('f-sort').value
  };
}

function renderGrid() {
  const f = currentFilters();
  const filtered = filterProducts(PRODUCTS, f);
  const sorted = sortProducts(filtered, f.sort);
  const labels = { best: 'sorted by best deal score', discount: 'sorted by biggest discount', price: 'sorted by lowest price', name: 'sorted by name A–Z' };
  el('view').innerHTML = gridHtml(sorted, DEALS.length, PRODUCTS.length, labels[f.sort]);
}

/* Hash query params (e.g. #/?disc=50) pre-set the filters, so a filtered
   view can be linked and screenshotted directly. */
function applyHashParams() {
  const hash = location.hash || '#/';
  const qi = hash.indexOf('?');
  if (qi === -1) return;
  const params = new URLSearchParams(hash.slice(qi + 1));
  const map = { q: 'q', cat: 'f-cat', store: 'f-store', disc: 'f-disc', verdict: 'f-verdict', sort: 'f-sort' };
  for (const key of Object.keys(map)) {
    if (params.has(key)) el(map[key]).value = params.get(key);
  }
}

function renderRoute() {
  const hash = location.hash || '#/';
  if (hash.indexOf('#/deal/') === 0) {
    el('view').innerHTML = detailHtml(hash.slice(7));
    window.scrollTo(0, 0);
  } else {
    renderGrid();
  }
}

function fillOptions() {
  const cats = [];
  const stores = [];
  for (const d of DEALS) {
    if (cats.indexOf(d.cat) === -1) cats.push(d.cat);
    if (stores.indexOf(d.store) === -1) stores.push(d.store);
  }
  cats.sort();
  stores.sort();
  for (const c of cats) {
    const o = document.createElement('option');
    o.value = c; o.textContent = c;
    el('f-cat').appendChild(o);
  }
  for (const s of stores) {
    const o = document.createElement('option');
    o.value = s; o.textContent = s;
    el('f-store').appendChild(o);
  }
}

function init() {
  fillOptions();
  renderStats();
  renderStores();
  renderPicks();
  ['q', 'f-cat', 'f-store', 'f-disc', 'f-verdict', 'f-sort'].forEach((id) => {
    el(id).addEventListener('input', () => {
      if ((location.hash || '#/') !== '#/') location.hash = '#/';
      else renderGrid();
    });
  });
  window.addEventListener('hashchange', renderRoute);
  applyHashParams();
  renderRoute();
}

init();
