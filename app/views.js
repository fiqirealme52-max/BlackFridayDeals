/* DealHawk detail view: full deal page + same-product price comparison
   across stores for the six hero products. Rendered from data.js only. */
(function () {
  var F = window.DealHawkFilters;

  var ICONS = {
    "Tech": "M4 5h16v11H4z M8 19h8 M12 16v3",
    "TV & Audio": "M3 6h18v10H3z M9 20h6",
    "Gaming": "M7 8h10a4 4 0 0 1 4 4v2a3 3 0 0 1-5 2l-1-1H9l-1 1a3 3 0 0 1-5-2v-2a4 4 0 0 1 4-4z",
    "Home & Kitchen": "M4 11h16v9H4z M5 11l7-6 7 6 M10 20v-5h4v5",
    "Toys": "M9 3h6v4H9z M12 7v13 M7 20h10 M8 12h8",
    "Smart Home": "M12 3l8 7v9h-5v-5h-6v5H4v-9z",
    "Fashion": "M8 4l4 3 4-3 3 4-7 12-7-12z",
    "Beauty": "M9 3h6v3H9z M10 6h4l1 13a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"
  };

  function icon(category) {
    var d = ICONS[category] || ICONS["Tech"];
    return '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="' + d + '"/></svg>';
  }

  function verdictClass(v) {
    return v === "NEW LOW" ? "v-new" : v === "STRONG DEAL" ? "v-strong" : "v-routine";
  }

  function cardHTML(d) {
    var pct = F.discountPct(d);
    var save = F.money(d.usual - d.sale);
    return '<article class="card">'
      + '<a class="card-link" href="#/deal/' + d.slug + '">'
      + '<span class="card-icon">' + icon(d.category) + '</span>'
      + '<span class="card-verdict ' + verdictClass(d.verdict) + '">' + d.verdict + '</span>'
      + '<span class="card-name">' + d.name + '</span>'
      + '<span class="card-meta">' + d.store + ' &middot; ' + d.category + '</span>'
      + '<span class="card-prices"><span class="sale">' + F.money(d.sale) + '</span>'
      + '<span class="usual"><s>' + F.money(d.usual) + '</s></span>'
      + '<span class="pct">-' + pct + '%</span></span>'
      + '<span class="card-save">You save ' + save + ' &middot; Checked ' + window.DEALHAWK.checkedAt + '</span>'
      + '</a>'
      + '<a class="card-shop" href="' + F.storeUrl(d.store, d.name) + '" target="_blank" rel="noopener">Shop at ' + d.store + ' &nearr;</a>'
      + '</article>';
  }

  function detailHTML(d) {
    var pct = F.discountPct(d);
    var save = F.money(d.usual - d.sale);
    var factsHTML = '<dl class="detail-facts">'
      + '<dt>Price checked</dt><dd>' + window.DEALHAWK.checkedAt + '</dd>'
      + '<dt>Where the price was read</dt><dd>' + d.source + '</dd>'
      + '<dt>Evidence</dt><dd>' + d.evidence + '</dd>'
      + '<dt>Verdict</dt><dd>' + d.verdict + ' — '
      + (d.verdict === "NEW LOW"
        ? "the source calls this an all-time low / best price to date."
        : d.verdict === "STRONG DEAL"
        ? "a big cut (40%+), or the source calls it the lowest price it has tracked."
        : "a real cut, but the price has been seen lower before, or the cut is small.")
      + '</dd></dl>';
    /* Same-product comparison, built first so it renders right under the
       shop button — the most useful thing on the page. */
    var rows = d.group ? window.DEALHAWK.compare[d.group] : null;
    var compareHTML = "";
    if (rows && rows.length > 1) {
      var best = Math.min.apply(null, rows.map(function (r) { return r.sale; }));
      compareHTML = '<h3>Same product, other stores</h3>'
        + '<p class="compare-note">Verified prices for the same product, checked ' + window.DEALHAWK.checkedAt + '. The cheapest store is marked.</p>'
        + '<table class="compare"><thead><tr><th>Store</th><th>Sale price</th><th>Usual</th><th>Off</th><th></th></tr></thead><tbody>';
      rows.forEach(function (r) {
        var p = Math.round((r.usual - r.sale) / r.usual * 100);
        compareHTML += '<tr' + (r.sale === best ? ' class="best-row"' : '') + '>'
          + '<td>' + r.store + '</td><td><strong>' + F.money(r.sale) + '</strong></td>'
          + '<td><s>' + F.money(r.usual) + '</s></td><td>-' + p + '%</td>'
          + '<td>' + (r.sale === best ? '<span class="best-tag">BEST PRICE</span>' : '') + '</td></tr>';
      });
      compareHTML += '</tbody></table>';
    }
    var html = '<div class="detail">'
      + '<p class="crumbs"><a href="#/">&larr; All deals</a> &middot; ' + d.category + ' &middot; ' + d.store + '</p>'
      + '<div class="detail-head"><span class="card-icon big">' + icon(d.category) + '</span>'
      + '<div><h2>' + d.name + '</h2>'
      + '<p class="detail-store">Sold at <strong>' + d.store + '</strong></p></div></div>'
      + '<p><span class="card-verdict ' + verdictClass(d.verdict) + '">' + d.verdict + '</span></p>'
      + '<p class="detail-prices"><span class="sale big">' + F.money(d.sale) + '</span>'
      + '<span class="usual big"><s>' + F.money(d.usual) + '</s></span>'
      + '<span class="pct big">-' + pct + '%</span></p>'
      + '<p class="detail-save">You save <strong>' + save + '</strong> off the usual price of ' + F.money(d.usual) + '.</p>'
      + '<p><a class="btn-shop" href="' + F.storeUrl(d.store, d.name) + '" target="_blank" rel="noopener">Shop this deal at ' + d.store + ' &nearr;</a></p>'
      + compareHTML
      + factsHTML;
    html += '</div>';
    return html;
  }

  window.DealHawkViews = { cardHTML: cardHTML, detailHTML: detailHTML, icon: icon };
})();
