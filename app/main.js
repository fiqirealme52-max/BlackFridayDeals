/* DealHawk app: stats bar (computed from data), hash routing, controls,
   and grid rendering. No network calls, no timestamps at runtime — the
   only date shown is the fixed check time stored in data.js. */
(function () {
  var F = window.DealHawkFilters;
  var V = window.DealHawkViews;
  var DATA = window.DEALHAWK;

  var state = { q: "", category: "All", store: "All", minDiscount: 0, verdict: "All", sort: "best" };

  var CATEGORIES = ["Tech", "TV & Audio", "Gaming", "Home & Kitchen", "Toys", "Smart Home", "Fashion", "Beauty"];
  var STORES = ["Amazon", "Target", "Walmart", "Best Buy", "Dyson"];

  function $(id) { return document.getElementById(id); }

  function renderStats() {
    var deals = DATA.deals;
    var newLow = deals.filter(function (d) { return d.verdict === "NEW LOW"; }).length;
    var totalSave = deals.reduce(function (sum, d) { return sum + (d.usual - d.sale); }, 0);
    $("stat-deals").textContent = deals.length + " verified deals";
    $("stat-newlow").textContent = newLow + " new lows";
    $("stat-save").textContent = "Total savings " + F.money(totalSave);
    $("stat-checked").textContent = "Last checked " + DATA.checkedAt;
  }

  function renderGrid() {
    var filtered = F.applyFilters(DATA.deals, state);
    var sorted = F.sortDeals(filtered, state.sort);
    var grid = $("grid");
    var count = $("count");
    if (sorted.length === 0) {
      grid.innerHTML = '<p class="empty">No deals match those filters. Try widening the search or lowering the discount filter.</p>';
    } else {
      grid.innerHTML = sorted.map(V.cardHTML).join("");
    }
    count.textContent = sorted.length + " of " + DATA.deals.length + " deals";
  }

  function renderDetail(slug) {
    var deal = null;
    for (var i = 0; i < DATA.deals.length; i++) {
      if (DATA.deals[i].slug === slug) { deal = DATA.deals[i]; break; }
    }
    var detail = $("detail");
    var gridWrap = $("grid-wrap");
    if (!deal) {
      detail.innerHTML = '<p class="empty">Deal not found. <a href="#/">Back to all deals</a></p>';
    } else {
      detail.innerHTML = V.detailHTML(deal);
      document.title = deal.name + " — " + F.money(deal.sale) + " at " + deal.store + " | DealHawk";
    }
    detail.hidden = false;
    gridWrap.hidden = true;
    window.scrollTo(0, 0);
  }

  function renderHome() {
    $("detail").hidden = true;
    $("detail").innerHTML = "";
    $("grid-wrap").hidden = false;
    document.title = "DealHawk — Real Black Friday Deals, Checked Today";
    renderGrid();
  }

  function parseHash() {
    var h = window.location.hash || "#/";
    if (h.indexOf("#/deal/") === 0) {
      renderDetail(h.slice(7));
      return;
    }
    /* Filter state can ride in the hash: #/?discount=50&verdict=NEW+LOW */
    var qi = h.indexOf("?");
    if (qi !== -1) {
      var params = new URLSearchParams(h.slice(qi + 1));
      var d = parseInt(params.get("discount") || "0", 10);
      state.minDiscount = isNaN(d) ? 0 : d;
      var v = params.get("verdict");
      state.verdict = v ? v : "All";
      syncControls();
    }
    renderHome();
  }

  function syncControls() {
    $("q").value = state.q;
    $("category").value = state.category;
    $("store").value = state.store;
    $("discount").value = String(state.minDiscount);
    $("verdict").value = state.verdict;
    $("sort").value = state.sort;
  }

  function fillOptions() {
    var cat = $("category");
    CATEGORIES.forEach(function (c) {
      var o = document.createElement("option");
      o.value = c; o.textContent = c; cat.appendChild(o);
    });
    var st = $("store");
    STORES.forEach(function (s) {
      var o = document.createElement("option");
      o.value = s; o.textContent = s; st.appendChild(o);
    });
  }

  function bind() {
    $("q").addEventListener("input", function (e) { state.q = e.target.value; renderGrid(); });
    $("category").addEventListener("change", function (e) { state.category = e.target.value; renderGrid(); });
    $("store").addEventListener("change", function (e) { state.store = e.target.value; renderGrid(); });
    $("discount").addEventListener("change", function (e) { state.minDiscount = parseInt(e.target.value, 10); renderGrid(); });
    $("verdict").addEventListener("change", function (e) { state.verdict = e.target.value; renderGrid(); });
    $("sort").addEventListener("change", function (e) { state.sort = e.target.value; renderGrid(); });
    window.addEventListener("hashchange", parseHash);
  }

  fillOptions();
  bind();
  renderStats();
  syncControls();
  parseHash();
})();
