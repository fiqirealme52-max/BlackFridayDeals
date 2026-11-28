/* DealHawk R3 data — 58 deals, every price re-verified live on 28 Nov 2026.
   sale + usual are numbers; discount % is computed at render, never typed.
   Verdict rules: NEW LOW only when a source explicitly says all-time low /
   lowest ever / best price to date / matches lowest ever. STRONG DEAL when
   the discount is 40%+ or a source calls it the best/lowest price.
   ROUTINE SALE otherwise. "Checked" is one fixed string for all deals. */

var CHECKED = '28 Nov 2026, 09:00 WIB';

var DEALS = [
  /* Tech (13) */
  { key: 'airpods-pro-3', name: 'Apple AirPods Pro 3', store: 'Amazon', cat: 'Tech', sale: 149.00, usual: 249.00, verdict: 'NEW LOW', src: 'CNN Underscored', ev: "Only time they've fallen below $169 — $100 off, lowest price yet.", note: 'Amazon stock sold out and came back during Black Friday.' },
  { key: 'airpods-pro-3', name: 'Apple AirPods Pro 3', store: 'Walmart', cat: 'Tech', sale: 149.00, usual: 249.00, verdict: 'NEW LOW', src: '9to5Toys', ev: 'Lowest price deal trackers have recorded.' },
  { key: 'airpods-pro-3', name: 'Apple AirPods Pro 3', store: 'Target', cat: 'Tech', sale: 179.99, usual: 249.99, verdict: 'ROUTINE SALE', src: 'MacRumors', ev: '$179.99, down from $249.99 — seen cheaper at Amazon and Walmart.' },
  { key: 'apple-watch-series-12', name: 'Apple Watch Series 12 42mm GPS', store: 'Amazon', cat: 'Tech', sale: 299.00, usual: 399.00, verdict: 'NEW LOW', src: 'CNN Underscored', ev: 'Best price to date — all-time low on Apple Watch 12.' },
  { key: 'apple-watch-series-12', name: 'Apple Watch Series 12 42mm GPS', store: 'Walmart', cat: 'Tech', sale: 299.00, usual: 399.00, verdict: 'NEW LOW', src: '9to5Toys', ev: 'New all-time low.' },
  { key: 'apple-watch-se-3', name: 'Apple Watch SE 3', store: 'Walmart', cat: 'Tech', sale: 179.00, usual: 249.00, verdict: 'ROUTINE SALE', src: 'CNN Underscored', ev: 'Now even lower — no all-time-low claim.' },
  { key: 'airpods-4', name: 'Apple AirPods 4', store: 'Walmart', cat: 'Tech', sale: 89.00, usual: 129.00, verdict: 'ROUTINE SALE', src: 'The Verge', ev: '$20 shy of their best price.' },
  { key: 'airpods-max-2', name: 'Apple AirPods Max 2', store: 'Amazon', cat: 'Tech', sale: 419.00, usual: 549.00, verdict: 'ROUTINE SALE', src: 'The Verge', ev: '$19 shy of their best price to date.' },
  { key: 'macbook-neo', name: 'Apple MacBook Neo 256GB', store: 'Amazon', cat: 'Tech', sale: 649.00, usual: 699.00, verdict: 'ROUTINE SALE', src: '9to5Toys', ev: '$649 (Reg. $700) — 7% off.' },
  { key: 'macbook-air-m5', name: 'Apple MacBook Air 13" M5', store: 'Amazon', cat: 'Tech', sale: 1049.00, usual: 1299.00, verdict: 'ROUTINE SALE', src: 'The Gadgeteer', ev: 'Was $989.10 on Monday, now $1,049 — 19% off, still $250 off.' },
  { key: 'sony-wh-1000xm5', name: 'Sony WH-1000XM5', store: 'Best Buy', cat: 'Tech', sale: 169.99, usual: 398.00, verdict: 'STRONG DEAL', src: 'Best Buy', ev: 'Save $228.01 — 57% off the $398 comparable value.' },
  { key: 'beats-studio-pro', name: 'Beats Studio Pro', store: 'Walmart', cat: 'Tech', sale: 99.00, usual: 299.00, verdict: 'STRONG DEAL', src: 'dealnews', ev: 'Drops to $99 — $200 off, the best price we have seen.' },
  { key: 'airtag-2', name: 'Apple AirTag 2 (1-pack)', store: 'Amazon', cat: 'Tech', sale: 18.00, usual: 29.00, verdict: 'NEW LOW', src: 'MacRumors', ev: 'New all-time low price — $18 at Amazon and Best Buy, down from $29.' },
  /* TV & Audio (10) */
  { key: 'samsung-the-frame-55', name: 'Samsung 55" The Frame TV', store: 'Target', cat: 'TV & Audio', sale: 899.99, usual: 1199.99, verdict: 'ROUTINE SALE', src: 'MacRumors', ev: '$899.99, down from $1,199.99.' },
  { key: 'tcl-qled-smart-frame-65', name: 'TCL 65" QLED Smart Frame TV', store: 'Target', cat: 'TV & Audio', sale: 799.99, usual: 994.99, verdict: 'ROUTINE SALE', src: 'MacRumors', ev: '$799.99, down from $994.99.' },
  { key: 'tcl-4k-fire-tv-65', name: 'TCL 65" 4K UHD HDR Smart TV with Fire TV', store: 'Best Buy', cat: 'TV & Audio', sale: 229.99, usual: 469.99, verdict: 'STRONG DEAL', src: 'Best Buy', ev: '$469.99 to $229.99 — $240 off, doorbuster.', note: 'Doorbuster — ends 28 Nov.' },
  { key: 'lg-b6e-oled-55', name: 'LG B6E OLED TV 55"', store: 'Best Buy', cat: 'TV & Audio', sale: 699.99, usual: 1399.99, verdict: 'STRONG DEAL', src: 'The Verge', ev: '$699.99 — half the $1,399.99 comparable value.' },
  { key: 'hisense-canvastv-55', name: 'Hisense CanvasTV 55" (2026)', store: 'Amazon', cat: 'TV & Audio', sale: 697.99, usual: 1499.99, verdict: 'STRONG DEAL', src: 'PC Guide', ev: 'Down to $697.99 — within cents of its record low; was $798 earlier in the week.' },
  { key: 'hisense-u7-65', name: 'Hisense 65" U7 Mini-LED', store: 'Amazon', cat: 'TV & Audio', sale: 797.99, usual: 1497.99, verdict: 'NEW LOW', src: 'PC Guide', ev: 'At its lowest price according to price tracking sites — hits its Amazon all-time low.' },
  { key: 'hisense-qd5-98', name: 'Hisense 98" QD5 QLED 4K TV', store: 'Best Buy', cat: 'TV & Audio', sale: 799.99, usual: 2499.99, verdict: 'STRONG DEAL', src: 'Cashback Index', ev: '$799.99, was $2,499.99 — 68% off.', note: 'Deal ends 28 Nov.' },
  { key: 'fire-tv-stick-4k', name: 'Amazon Fire TV Stick 4K (2026 model)', store: 'Amazon', cat: 'TV & Audio', sale: 19.99, usual: 59.99, verdict: 'NEW LOW', src: 'PCWorld', ev: 'Now $19.99, was $59.99 — lowest price ever.', note: '2026 model — Vega OS 2.0, Wi-Fi 6, no Dolby Vision.' },
  { key: 'tcl-q3cr-40', name: 'TCL 40" Q3CR QLED Roku TV (2026)', store: 'Best Buy', cat: 'TV & Audio', sale: 99.99, usual: 299.99, verdict: 'STRONG DEAL', src: 'Best Buy', ev: '$99.99, Save $200, comparable value $299.99.', note: 'Deal ends 28 Nov.' },
  { key: 'samsung-s90h-65', name: 'Samsung 65" S90H OLED TV', store: 'Costco', cat: 'TV & Audio', sale: 1399.99, usual: 2699.99, verdict: 'STRONG DEAL', src: 'SlashGear', ev: 'Costco lists the 65-inch S90H at $1,399.99, down from its $2,699.99 MSRP.', note: 'Costco membership required.' },
  /* Gaming (4) */
  { key: 'dualsense', name: 'Sony DualSense Wireless Controller', store: 'Amazon', cat: 'Gaming', sale: 54.00, usual: 74.99, verdict: 'ROUTINE SALE', src: 'The Verge', ev: '$54, down from $74.99.' },
  { key: 'meta-quest-3s', name: 'Meta Quest 3S 128GB', store: 'Amazon', cat: 'Gaming', sale: 297.00, usual: 349.99, verdict: 'ROUTINE SALE', src: '9to5Google', ev: '$297 at Amazon — $53 off.' },
  { key: 'meta-quest-3s', name: 'Meta Quest 3S 128GB', store: 'Target', cat: 'Gaming', sale: 297.49, usual: 349.99, verdict: 'ROUTINE SALE', src: 'VR.org', ev: '$297.49 — plus a $50 Target gift card.', note: '$50 Target gift card included.' },
  { key: 'dualsense-marathon-le', name: 'Sony DualSense Controller Marathon Limited Edition', store: 'Target', cat: 'Gaming', sale: 64.99, usual: 84.99, verdict: 'ROUTINE SALE', src: 'Target', ev: '$64.99, reg $84.99 — in stock.' },
  /* Home & Kitchen (10) */
  { key: 'dyson-v9-motorbar', name: 'Dyson V9 Motorbar Cordless Vacuum', store: 'Target', cat: 'Home & Kitchen', sale: 269.99, usual: 599.99, verdict: 'NEW LOW', src: 'CNN Underscored', ev: '55% off matches the lowest price ever.' },
  { key: 'dyson-v9-motorbar', name: 'Dyson V9 Motorbar Cordless Vacuum', store: 'Amazon', cat: 'Home & Kitchen', sale: 269.95, usual: 599.99, verdict: 'NEW LOW', src: 'CNN Underscored', ev: 'Matches the lowest price ever for only the second time this year.' },
  { key: 'dyson-ball-animal', name: 'Dyson Ball Animal Total Clean Vacuum', store: 'Target', cat: 'Home & Kitchen', sale: 299.99, usual: 499.99, verdict: 'STRONG DEAL', src: 'Target', ev: '$299.99, reg $499.99 — 40% off.' },
  { key: 'dyson-v15-detect', name: 'Dyson V15 Detect', store: 'Amazon', cat: 'Home & Kitchen', sale: 598.50, usual: 849.99, verdict: 'STRONG DEAL', src: 'Product Bible', ev: 'Lowest price on this listing.' },
  { key: 'roomba-plus-415', name: 'iRobot Roomba Plus 415 Combo Robot Vacuum and Mop', store: 'Target', cat: 'Home & Kitchen', sale: 379.99, usual: 599.99, verdict: 'ROUTINE SALE', src: 'Target', ev: '$379.99, reg $599.99.' },
  { key: 'shark-detect-lift-away', name: 'Shark Detect Lift-Away Upright Vacuum', store: 'Walmart', cat: 'Home & Kitchen', sale: 144.00, usual: 379.99, verdict: 'STRONG DEAL', src: 'dealnews', ev: 'Starts at $144, down from $379.99 — 62% off.' },
  { key: 'kitchenaid-deluxe-45', name: 'KitchenAid Deluxe 4.5-Qt Stand Mixer', store: 'Walmart', cat: 'Home & Kitchen', sale: 279.00, usual: 449.99, verdict: 'ROUTINE SALE', src: 'ShopLTK', ev: '$279 (was $450).' },
  { key: 'kitchenaid-classic-45', name: 'KitchenAid Classic 4.5-Qt Stand Mixer (K45SS)', store: 'Amazon', cat: 'Home & Kitchen', sale: 279.99, usual: 399.99, verdict: 'STRONG DEAL', src: '9to5Toys', ev: '$279.99, down from $400 — best price of the year.' },
  { key: 'kitchenaid-bowl-lift-55', name: 'KitchenAid 5.5-Qt Bowl-Lift Stand Mixer (KSM55)', store: 'Amazon', cat: 'Home & Kitchen', sale: 299.99, usual: 499.99, verdict: 'STRONG DEAL', src: 'Product Bible', ev: '$299.99, list $499.99 — about 40% under, lowest since April.' },
  { key: 'ninja-air-fryer-af141', name: 'Ninja Air Fryer Pro AF141 5Qt', store: 'Amazon', cat: 'Home & Kitchen', sale: 78.99, usual: 129.99, verdict: 'STRONG DEAL', src: 'CyberMondayIsHere', ev: 'Lowest price we have tracked, down $11.' },
  /* Toys (7) */
  { key: 'lego-rhino-31171', name: 'LEGO Creator 3-in-1 Majestic Rhino 31171', store: 'Amazon', cat: 'Toys', sale: 29.99, usual: 59.99, verdict: 'STRONG DEAL', src: 'Consumer Queen', ev: '$29.99 against a $59.99 list price — 50% off.' },
  { key: 'lego-mooshroom-21270', name: 'LEGO Minecraft Mooshroom House 21270', store: 'Target', cat: 'Toys', sale: 24.99, usual: 46.49, verdict: 'STRONG DEAL', src: 'Consumer Queen', ev: 'Regularly $46.49.' },
  { key: 'lego-mos-eisley-75425', name: 'LEGO Star Wars SMART Play Mos Eisley Cantina 75425', store: 'Target', cat: 'Toys', sale: 38.99, usual: 64.99, verdict: 'STRONG DEAL', src: 'Consumer Queen', ev: 'Regularly $64.99.' },
  { key: 'lego-jango-fett-75433', name: "LEGO Star Wars Jango Fett's Starship 75433", store: 'Walmart', cat: 'Toys', sale: 35.00, usual: 69.99, verdict: 'STRONG DEAL', src: 'Consumer Queen', ev: 'Down from $69.99 — by far its best-ever price (dealnews).', note: 'Walmart notes 65% of this deal is gone.' },
  { key: 'lego-red-panda-31394', name: 'LEGO Creator 3-in-1 Cute Animals Red Panda 31394', store: 'Walmart', cat: 'Toys', sale: 15.00, usual: 29.99, verdict: 'STRONG DEAL', src: 'dealnews', ev: '$15, down from $30 — 50% off.' },
  { key: 'lego-mini-bonsai', name: 'LEGO Botanicals Mini Bonsai Trees', store: 'Amazon', cat: 'Toys', sale: 44.99, usual: 64.99, verdict: 'ROUTINE SALE', src: 'PopSci', ev: '$44.99 (was $64.99) — 31% off.' },
  { key: 'lego-n1-starfighter', name: "LEGO Star Wars The Mandalorian's N-1 Starfighter", store: 'Amazon', cat: 'Toys', sale: 41.99, usual: 59.99, verdict: 'ROUTINE SALE', src: 'starwars-fans.com', ev: '$41.99, down from $59.99.' },
  /* Smart Home (7) */
  { key: 'echo-dot-2026', name: 'Amazon Echo Dot (newest, 2026)', store: 'Amazon', cat: 'Smart Home', sale: 49.99, usual: 99.99, verdict: 'STRONG DEAL', src: 'Home Automation Weekly', ev: '50% off — prices checked 24 Nov.' },
  { key: 'echo-dot-max', name: 'Amazon Echo Dot Max', store: 'Amazon', cat: 'Smart Home', sale: 49.99, usual: 119.99, verdict: 'STRONG DEAL', src: 'Home Automation Weekly', ev: 'From $119.99 to $49.99 — 58% off.' },
  { key: 'echo-time', name: 'Amazon Echo Time', store: 'Amazon', cat: 'Smart Home', sale: 99.99, usual: 199.99, verdict: 'STRONG DEAL', src: '9to5Toys', ev: 'New all-time low on the brand-new Echo Time — $100 off.' },
  { key: 'ring-wired-doorbell-2k', name: 'Ring Wired Doorbell 2K', store: 'Amazon', cat: 'Smart Home', sale: 39.99, usual: 79.99, verdict: 'STRONG DEAL', src: 'Home Automation Weekly', ev: '50% off — prices checked 24 Nov.' },
  { key: 'ring-floodlight-cam-2k', name: 'Ring Floodlight Cam 2K', store: 'Amazon', cat: 'Smart Home', sale: 98.99, usual: 199.99, verdict: 'NEW LOW', src: 'PCWorld', ev: 'Matching its all-time lowest price — $98.99 is the live Amazon listing price.' },
  { key: 'ring-battery-doorbell-2k', name: 'Ring Battery Doorbell 2K', store: 'Amazon', cat: 'Smart Home', sale: 39.99, usual: 99.99, verdict: 'NEW LOW', src: '9to5Toys', ev: 'Lowest price we have tracked at Amazon to date — ties its fall Prime Day low.' },
  { key: 'ring-indoor-cam-2k', name: 'Ring Indoor Cam 2K', store: 'Amazon', cat: 'Smart Home', sale: 24.99, usual: 59.99, verdict: 'NEW LOW', src: 'PopSci', ev: 'Tying its 2026 low — lowest Amazon price ever (Keepa).' },
  /* Fashion (4) */
  { key: 'new-balance-574', name: "New Balance Men's 574 Core Sneakers", store: 'Amazon', cat: 'Fashion', sale: 74.95, usual: 99.99, verdict: 'ROUTINE SALE', src: 'CNN Underscored', ev: '25% off — $74.95 at Amazon.' },
  { key: 'nike-vomero-5', name: "Nike Zoom Vomero 5 (women's, Pink Glow)", store: 'Nike', cat: 'Fashion', sale: 106.97, usual: 170.00, verdict: 'STRONG DEAL', src: 'stupiddope.com', ev: 'Pink Glow $106.97 vs $170 — Nike listing, 23 Nov.', note: 'Extra 25% off with code BFRIDAY at checkout (about $80.23) — the code is not the sale price.' },
  { key: 'nike-air-max-sc', name: "Nike Men's Air Max SC", store: 'Amazon', cat: 'Fashion', sale: 50.13, usual: 90.00, verdict: 'STRONG DEAL', src: 'koupon.ai', ev: '$50.13 (was $90.00) — 44% off, no code needed.', note: 'Summit White/Stadium Green, size 9 — price varies by size and color.' },
  { key: 'nike-dunk-low-womens', name: "Nike Women's Dunk Low Sneakers", store: 'Amazon', cat: 'Fashion', sale: 91.07, usual: 163.75, verdict: 'STRONG DEAL', src: 'koupon.ai', ev: 'Size 10, $91.07 — 44% off its $163.75 list price (live price feed, 28 Nov).', note: 'Shimmer/Burnt Sunrise, women\'s size 10.' },
  /* Beauty (3) */
  { key: 'truskin-vitamin-c', name: 'TruSkin Vitamin C Facial Serum, 2 oz', store: 'Amazon', cat: 'Beauty', sale: 19.31, usual: 38.99, verdict: 'NEW LOW', src: 'BuzzFeed', ev: 'Matching its fall Prime Day best-ever price — lowest price ever, ties the record.', note: 'Prime-exclusive price — non-Prime pays $34.99.' },
  { key: 'dyson-airwrap', name: 'Dyson Airwrap Multistyler', store: 'Dyson', cat: 'Beauty', sale: 500.00, usual: 649.99, verdict: 'STRONG DEAL', src: 'CNN Underscored', ev: '$150 off right now — lowest price of the year.' },
  { key: 'waterpik-aquarius', name: 'Waterpik Aquarius Water Flosser', store: 'Amazon', cat: 'Beauty', sale: 49.99, usual: 99.99, verdict: 'STRONG DEAL', src: 'Product Bible', ev: 'Half price.' }
];

/* Compare-only prices (not deal rows): the same hero product at another
   store, verified live 28 Nov 2026. Shown in the detail compare table. */
var COMPARE = {
  'beats-studio-pro': [
    { store: 'Amazon', sale: 139.95, usual: 299.99 },
    { store: 'Target', sale: 149.99, usual: 349.99 }
  ],
  'dualsense': [
    { store: 'Best Buy', sale: 54.99, usual: 74.99 },
    { store: 'Target', sale: 54.99, usual: 74.99 }
  ]
};
