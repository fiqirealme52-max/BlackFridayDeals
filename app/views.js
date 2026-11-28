/* DealHawk views — grid cards and the per-deal detail page. */

/* Category tile: inline SVG, no product photos, no external images. */
var ICONS = {
  'Tech': '<svg class="ico" viewBox="0 0 16 16" fill="none" stroke="#ffc93c" stroke-width="1.5"><rect x="2" y="3" width="12" height="9" rx="1"/><path d="M5 14h6"/></svg>',
  'TV & Audio': '<svg class="ico" viewBox="0 0 16 16" fill="none" stroke="#ffc93c" stroke-width="1.5"><rect x="1" y="3" width="14" height="9" rx="1"/><path d="M6 14h4"/></svg>',
  'Gaming': '<svg class="ico" viewBox="0 0 16 16" fill="none" stroke="#ffc93c" stroke-width="1.5"><path d="M4 5h8a3 3 0 0 1 0 6h-2l-1-2H7l-1 2H4a3 3 0 0 1 0-6z"/></svg>',
  'Home & Kitchen': '<svg class="ico" viewBox="0 0 16 16" fill="none" stroke="#ffc93c" stroke-width="1.5"><path d="M2 8l6-5 6 5v5H2z"/></svg>',
  'Toys': '<svg class="ico" viewBox="0 0 16 16" fill="none" stroke="#ffc93c" stroke-width="1.5"><rect x="3" y="3" width="10" height="10" rx="1"/><path d="M8 3v10M3 8h10"/></svg>',
  'Smart Home': '<svg class="ico" viewBox="0 0 16 16" fill="none" stroke="#ffc93c" stroke-width="1.5"><circle cx="8" cy="8" r="2"/><path d="M4 4l2 2M12 4l-2 2M4 12l2-2M12 12l-2-2"/></svg>',
  'Fashion': '<svg class="ico" viewBox="0 0 16 16" fill="none" stroke="#ffc93c" stroke-width="1.5"><path d="M3 4l3-2 2 3 2-3 3 2-1 9H4z"/></svg>',
  'Beauty': '<svg class="ico" viewBox="0 0 16 16" fill="none" stroke="#ffc93c" stroke-width="1.5"><circle cx="8" cy="6" r="3"/><path d="M5 12h6l1 2H4z"/></svg>'
};

function iconFor(cat) {
  return ICONS[cat] || ICONS['Tech'];
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function cardHtml(p, multiStoreKeys) {
  const d = p.best;
  const multi = multiStoreKeys.has(p.key);
  const slug = slugOf(d, multi);
  const also = p.others.length
    ? '<div class="also">Also at ' + p.others.map((o) => '<b>' + esc(o.store) + ' ' + money(o.sale) + '</b>').join(' &middot; ') + '</div>'
    : '';
  return '<a class="card" href="#/deal/' + slug + '">' +
    '<div class="row1">' + iconFor(d.cat) + '<span class="store">' + esc(d.store) + '</span>' +
    '<span class="cat">' + esc(d.cat) + '</span></div>' +
    '<h3>' + esc(d.name) + '</h3>' +
    '<div class="prices"><span class="sale">' + money(d.sale) + '</span>' +
    '<span class="usual">' + money(d.usual) + '</span>' +
    '<span class="off">&minus;' + discountOf(d) + '%</span></div>' +
    '<div class="meta"><i class="chip ' + verdictClass(d.verdict) + '">' + d.verdict + '</i>' +
    '<span class="save">Save ' + money(saveOf(d)) + '</span>' +
    '<span class="score">Score ' + scoreOf(d) + '/100</span></div>' +
    also +
    '<div class="src">Checked ' + esc(CHECKED) + ' &middot; ' + esc(d.src) + '</div>' +
    '</a>';
}

function gridHtml(products, totalDeals, totalProducts, sortLabel) {
  if (!products.length) return '<div class="empty">No deals match those filters. Clear the search or lower the discount.</div>';
  const label = '<p class="grid-label">Showing ' + products.length + ' of ' + totalProducts + ' products &middot; ' +
    totalDeals + ' deals &middot; ' + (sortLabel || 'sorted by best deal score') + '</p>';
  return label + '<div class="grid">' + products.map((p) => cardHtml(p, MULTI_STORE_KEYS)).join('') + '</div>';
}

/* Detail page: full deal info + the same product at other stores, best marked. */
function detailHtml(slug) {
  const d = DEAL_BY_SLUG[slug];
  if (!d) return '<div class="empty">Deal not found. <a href="#/">Back to all deals</a></div>';
  const p = PRODUCT_BY_KEY[d.key];
  const rows = compareRows(d.key);
  const rowsHtml = rows.map((r) => {
    const best = r.best ? ' class="best"' : '';
    const tag = r.best ? ' <span class="best-tag">BEST PRICE</span>' : '';
    return '<tr' + best + '><td>' + esc(r.store) + '</td><td>' + money(r.sale) + '</td>' +
      '<td>' + money(r.usual) + '</td><td>&minus;' + r.disc + '%</td><td>Save ' + money(r.save) + tag + '</td></tr>';
  }).join('');
  const note = d.note ? '<div class="note">' + esc(d.note) + '</div>' : '';
  return '<article class="detail">' +
    '<a class="back" href="#/">&larr; All deals</a>' +
    '<h1>' + esc(d.name) + '</h1>' +
    '<div class="dsub">' + esc(d.store) + ' &middot; ' + esc(d.cat) + '</div>' +
    '<div class="dprices"><span class="sale">' + money(d.sale) + '</span>' +
    '<span class="usual">' + money(d.usual) + '</span>' +
    '<span class="off">&minus;' + discountOf(d) + '%</span></div>' +
    '<div class="dmeta"><i class="chip ' + verdictClass(d.verdict) + '">' + d.verdict + '</i>' +
    '<span class="save">You save ' + money(saveOf(d)) + '</span>' +
    '<span class="score">Score ' + scoreOf(d) + '/100</span></div>' +
    '<div class="evidence"><b>Why this verdict:</b> ' + esc(d.ev) + '</div>' +
    note +
    '<a class="visit" href="' + storeSearchUrl(d.store, d.name) + '" target="_blank" rel="noopener">View at ' + esc(d.store) + ' &rarr;</a>' +
    '<h2>Same product, other stores</h2>' +
    '<table class="compare"><thead><tr><th>Store</th><th>Sale</th><th>Usual</th><th>Off</th><th>You save</th></tr></thead>' +
    '<tbody>' + rowsHtml + '</tbody></table>' +
    '<p class="checked-line">Checked ' + esc(CHECKED) + ' &middot; Source: ' + esc(d.src) +
    '. Store links go to the store&rsquo;s own search for this product.</p>' +
    '</article>';
}

/* Compare rows: every variant of this product in DEALS, plus compare-only
   prices from COMPARE (verified in R1, re-checked 28 Nov), best marked. */
function compareRows(key) {
  const p = PRODUCT_BY_KEY[key];
  const rows = p.variants.map((d) => ({ store: d.store, sale: d.sale, usual: d.usual, disc: discountOf(d), save: saveOf(d) }));
  const extra = (typeof COMPARE !== 'undefined' && COMPARE[key]) || [];
  for (const e of extra) {
    if (rows.some((r) => r.store === e.store)) continue;
    const usual = e.usual || p.best.usual;
    rows.push({ store: e.store, sale: e.sale, usual, disc: Math.round((usual - e.sale) / usual * 100), save: Math.round((usual - e.sale) * 100) / 100 });
  }
  rows.sort((a, b) => a.sale - b.sale);
  rows.forEach((r, i) => { r.best = i === 0; });
  return rows;
}
