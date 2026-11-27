/* DealHawk filters + sorting. Pure functions over the deal list:
   search by product name, category, store, minimum discount, and sort. */
(function () {
  function discountPct(deal) {
    return Math.round((deal.usual - deal.sale) / deal.usual * 100);
  }

  function money(n) {
    return "$" + n.toFixed(2);
  }

  function verdictRank(v) {
    if (v === "NEW LOW") return 0;
    if (v === "STRONG DEAL") return 1;
    return 2;
  }

  function applyFilters(deals, state) {
    var q = (state.q || "").trim().toLowerCase();
    return deals.filter(function (d) {
      if (q && d.name.toLowerCase().indexOf(q) === -1) return false;
      if (state.category && state.category !== "All" && d.category !== state.category) return false;
      if (state.store && state.store !== "All" && d.store !== state.store) return false;
      if (state.minDiscount && discountPct(d) < state.minDiscount) return false;
      if (state.verdict && state.verdict !== "All" && d.verdict !== state.verdict) return false;
      return true;
    });
  }

  function sortDeals(deals, sortKey) {
    var out = deals.slice();
    if (sortKey === "discount") {
      out.sort(function (a, b) { return discountPct(b) - discountPct(a) || a.sale - b.sale; });
    } else if (sortKey === "price") {
      out.sort(function (a, b) { return a.sale - b.sale; });
    } else if (sortKey === "name") {
      out.sort(function (a, b) { return a.name < b.name ? -1 : a.name > b.name ? 1 : 0; });
    } else {
      /* "best": verdict first, then biggest discount, then lowest price. */
      out.sort(function (a, b) {
        return verdictRank(a.verdict) - verdictRank(b.verdict)
          || discountPct(b) - discountPct(a)
          || a.sale - b.sale;
      });
    }
    return out;
  }

  function storeUrl(store, name) {
    var q = encodeURIComponent(name);
    if (store === "Amazon") return "https://www.amazon.com/s?k=" + q;
    if (store === "Walmart") return "https://www.walmart.com/search?q=" + q;
    if (store === "Best Buy") return "https://www.bestbuy.com/site/searchpage.jsp?st=" + q;
    if (store === "Target") return "https://www.target.com/s?searchTerm=" + q;
    return "https://www.dyson.com/";
  }

  window.DealHawkFilters = {
    discountPct: discountPct,
    money: money,
    applyFilters: applyFilters,
    sortDeals: sortDeals,
    storeUrl: storeUrl
  };
})();
