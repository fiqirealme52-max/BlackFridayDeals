/* DealHawk data — 48 Black Friday deals, all prices read from the web and
   checked 27 Nov 2026, 13:30 WIB. Discount % is NOT stored here: it is
   computed at render time from sale / usual. Savings totals are computed
   from this file too, so the numbers on screen always match the data. */
(function () {
  var CHECKED_AT = "27 Nov 2026, 13:30 WIB";

  var DEALS = [
    { slug: "airpods-pro-3-amazon", group: "airpods-pro-3", name: "Apple AirPods Pro 3", store: "Amazon", category: "Tech", sale: 149.00, usual: 249.00, verdict: "NEW LOW", source: "CNN Underscored", evidence: "Only time they have fallen below $169; $100 off." },
    { slug: "airpods-pro-3-walmart", group: "airpods-pro-3", name: "Apple AirPods Pro 3", store: "Walmart", category: "Tech", sale: 149.00, usual: 249.00, verdict: "NEW LOW", source: "9to5Toys", evidence: "Lowest price deal trackers have recorded; re-checked 25 Nov, price unchanged." },
    { slug: "airpods-pro-3-target", group: "airpods-pro-3", name: "Apple AirPods Pro 3", store: "Target", category: "Tech", sale: 149.99, usual: 249.99, verdict: "STRONG DEAL", source: "Target; CNN", evidence: "Target dropped to $149.99 on 27 Nov, matching Amazon's $149 all-time low." },
    { slug: "apple-watch-series-12-42mm-gps-amazon", group: "apple-watch-12", name: "Apple Watch Series 12 42mm GPS", store: "Amazon", category: "Tech", sale: 299.00, usual: 399.00, verdict: "NEW LOW", source: "CNN; Tom's Guide", evidence: "Best price to date; all-time low price on Apple Watch 12." },
    { slug: "apple-watch-series-12-42mm-gps-walmart", group: "apple-watch-12", name: "Apple Watch Series 12 42mm GPS", store: "Walmart", category: "Tech", sale: 299.00, usual: 399.00, verdict: "NEW LOW", source: "9to5Toys", evidence: "New all-time low." },
    { slug: "apple-watch-se-3", name: "Apple Watch SE 3", store: "Walmart", category: "Tech", sale: 179.00, usual: 249.00, verdict: "ROUTINE SALE", source: "9to5Toys", evidence: "Now even lower; no all-time-low claim." },
    { slug: "apple-airpods-4", name: "Apple AirPods 4", store: "Walmart", category: "Tech", sale: 89.00, usual: 129.00, verdict: "ROUTINE SALE", source: "The Verge", evidence: "$20 shy of their best price." },
    { slug: "apple-airpods-max-2", name: "Apple AirPods Max 2", store: "Amazon", category: "Tech", sale: 419.00, usual: 549.00, verdict: "ROUTINE SALE", source: "The Verge", evidence: "$19 shy of their best price to date." },
    { slug: "apple-macbook-neo-256gb", name: "Apple MacBook Neo 256GB", store: "Amazon", category: "Tech", sale: 649.00, usual: 699.00, verdict: "ROUTINE SALE", source: "The Verge", evidence: "$50 off list price." },
    { slug: "apple-macbook-air-13-m5", name: "Apple MacBook Air 13-inch M5", store: "Amazon", category: "Tech", sale: 989.00, usual: 1299.00, verdict: "ROUTINE SALE", source: "9to5Toys via beebulletin", evidence: "$989 ($310 off)." },
    { slug: "sony-wh-1000xm5", name: "Sony WH-1000XM5", store: "Best Buy", category: "Tech", sale: 169.99, usual: 398.00, verdict: "STRONG DEAL", source: "Best Buy via Hot Hardware; Digital Trends", evidence: "$169.99 at Best Buy, save $228.01; doorbuster through 28 Nov." },
    { slug: "beats-studio-pro", group: "beats-studio-pro", name: "Beats Studio Pro", store: "Walmart", category: "Tech", sale: 99.00, usual: 299.00, verdict: "STRONG DEAL", source: "dealnews", evidence: "Drop to $99, which is $200 off." },
    { slug: "samsung-55-the-frame-tv", name: "Samsung 55-inch The Frame TV", store: "Target", category: "TV & Audio", sale: 899.99, usual: 1199.99, verdict: "ROUTINE SALE", source: "Flash Deal Feed", evidence: "Target Black Friday price, checked 27 Nov." },
    { slug: "tcl-65-qled-smart-frame-tv", name: "TCL 65-inch QLED Smart Frame TV", store: "Target", category: "TV & Audio", sale: 799.99, usual: 994.99, verdict: "ROUTINE SALE", source: "Flash Deal Feed", evidence: "Target Black Friday price, checked 27 Nov." },
    { slug: "tcl-65-4k-uhd-hdr-smart-tv-fire-tv", name: "TCL 65-inch 4K UHD HDR Smart TV with Fire TV", store: "Best Buy", category: "TV & Audio", sale: 229.99, usual: 469.99, verdict: "STRONG DEAL", source: "Best Buy release via beebulletin", evidence: "$469.99 down to $229.99 ($240 off)." },
    { slug: "lg-b6e-oled-tv-55", name: "LG B6E OLED TV 55-inch", store: "Best Buy", category: "TV & Audio", sale: 700.00, usual: 1400.00, verdict: "STRONG DEAL", source: "The Verge", evidence: "$700, was $1,400, 50% off at Best Buy (55-inch)." },
    { slug: "hisense-canvastv-55-2026", name: "Hisense CanvasTV 55-inch (2026)", store: "Amazon", category: "TV & Audio", sale: 798.00, usual: 1500.00, verdict: "STRONG DEAL", source: "The Verge", evidence: "$798, was $1,500, 47% off." },
    { slug: "hisense-65-u7-mini-led", name: "Hisense 65-inch U7 Mini-LED", store: "Amazon", category: "TV & Audio", sale: 797.99, usual: 1497.99, verdict: "STRONG DEAL", source: "Product Bible", evidence: "Lowest Amazon price on this TV." },
    { slug: "hisense-98-qd5-qled-4k-tv", name: "Hisense 98-inch QD5 QLED 4K TV", store: "Best Buy", category: "TV & Audio", sale: 800.00, usual: 2500.00, verdict: "STRONG DEAL", source: "Cashback Index", evidence: "Hisense 98-inch QD5 at $800, was $2,500." },
    { slug: "sony-dualsense-wireless-controller-amazon", group: "dualsense", name: "Sony DualSense Wireless Controller", store: "Amazon", category: "Gaming", sale: 54.00, usual: 74.99, verdict: "ROUTINE SALE", source: "The Verge", evidence: "Black Friday controller deal, checked 27 Nov." },
    { slug: "meta-quest-3s-128gb-amazon", group: "quest-3s", name: "Meta Quest 3S 128GB", store: "Amazon", category: "Gaming", sale: 297.00, usual: 349.99, verdict: "ROUTINE SALE", source: "The Verge", evidence: "Black Friday headset deal, checked 27 Nov." },
    { slug: "meta-quest-3s-128gb-target", group: "quest-3s", name: "Meta Quest 3S 128GB", store: "Target", category: "Gaming", sale: 297.49, usual: 349.99, verdict: "ROUTINE SALE", source: "Flash Deal Feed", evidence: "Target Black Friday price, checked 27 Nov." },
    { slug: "sony-dualsense-controller-marathon-limited-edition", name: "Sony DualSense Controller Marathon Limited Edition", store: "Target", category: "Gaming", sale: 64.99, usual: 84.99, verdict: "ROUTINE SALE", source: "Flash Deal Feed", evidence: "Target Black Friday price, checked 27 Nov." },
    { slug: "dyson-v9-motorbar-cordless-vacuum-target", group: "dyson-v9", name: "Dyson V9 Motorbar Cordless Vacuum", store: "Target", category: "Home & Kitchen", sale: 269.99, usual: 599.99, verdict: "NEW LOW", source: "CNN; Flash Deal Feed", evidence: "55% discount matches the lowest price ever." },
    { slug: "dyson-v9-motorbar-cordless-vacuum-amazon", group: "dyson-v9", name: "Dyson V9 Motorbar Cordless Vacuum", store: "Amazon", category: "Home & Kitchen", sale: 270.00, usual: 599.99, verdict: "NEW LOW", source: "CNN", evidence: "Matches the lowest price ever for only the second time this year." },
    { slug: "dyson-ball-animal-total-clean-vacuum", name: "Dyson Ball Animal Total Clean Vacuum", store: "Target", category: "Home & Kitchen", sale: 299.99, usual: 499.99, verdict: "STRONG DEAL", source: "Flash Deal Feed", evidence: "Target Black Friday price, checked 27 Nov." },
    { slug: "dyson-v15-detect", name: "Dyson V15 Detect", store: "Amazon", category: "Home & Kitchen", sale: 598.50, usual: 849.99, verdict: "STRONG DEAL", source: "Product Bible", evidence: "Lowest price on this listing." },
    { slug: "irobot-roomba-plus-415-combo", name: "iRobot Roomba Plus 415 Combo Robot Vacuum and Mop", store: "Target", category: "Home & Kitchen", sale: 379.99, usual: 599.99, verdict: "ROUTINE SALE", source: "Flash Deal Feed", evidence: "Target Black Friday price, checked 27 Nov." },
    { slug: "shark-detect-lift-away-upright-vacuum", name: "Shark Detect Lift-Away Upright Vacuum", store: "Walmart", category: "Home & Kitchen", sale: 144.00, usual: 380.00, verdict: "STRONG DEAL", source: "dealnews", evidence: "Starts at $144, down from $380." },
    { slug: "kitchenaid-deluxe-4-5-qt-stand-mixer", name: "KitchenAid Deluxe 4.5 Qt Stand Mixer", store: "Walmart", category: "Home & Kitchen", sale: 279.00, usual: 449.99, verdict: "ROUTINE SALE", source: "ShopLTK; The Bold News", evidence: "$279 (was $450)." },
    { slug: "kitchenaid-classic-4-5-qt-stand-mixer-k45ss", name: "KitchenAid Classic 4.5 Qt Stand Mixer K45SS", store: "Amazon", category: "Home & Kitchen", sale: 279.99, usual: 399.99, verdict: "STRONG DEAL", source: "CyberMondayIsHere", evidence: "Lowest price we have tracked." },
    { slug: "ninja-air-fryer-pro-af141-5qt", name: "Ninja Air Fryer Pro AF141 5Qt", store: "Amazon", category: "Home & Kitchen", sale: 78.99, usual: 129.99, verdict: "STRONG DEAL", source: "CyberMondayIsHere", evidence: "Lowest price we have tracked, down $11." },
    { slug: "lego-creator-3-in-1-majestic-rhino-31171", name: "LEGO Creator 3-in-1 Majestic Rhino 31171", store: "Amazon", category: "Toys", sale: 29.99, usual: 59.99, verdict: "STRONG DEAL", source: "Consumer Queen", evidence: "Compared with a $59.99 list price, 50% off." },
    { slug: "lego-minecraft-mooshroom-house-21270", name: "LEGO Minecraft Mooshroom House 21270", store: "Target", category: "Toys", sale: 24.99, usual: 46.49, verdict: "STRONG DEAL", source: "Consumer Queen", evidence: "Regularly $46.49." },
    { slug: "lego-star-wars-smart-play-mos-eisley-cantina-75425", name: "LEGO Star Wars SMART Play Mos Eisley Cantina 75425", store: "Target", category: "Toys", sale: 38.99, usual: 64.99, verdict: "STRONG DEAL", source: "Consumer Queen; Flash Deal Feed", evidence: "Regularly $64.99; $39, down from $65." },
    { slug: "lego-star-wars-jango-fetts-starship-75433", name: "LEGO Star Wars Jango Fett's Starship 75433", store: "Walmart", category: "Toys", sale: 35.00, usual: 69.99, verdict: "STRONG DEAL", source: "Consumer Queen", evidence: "Down from $69.99." },
    { slug: "lego-creator-3-in-1-cute-animals-red-panda-31394", name: "LEGO Creator 3-in-1 Cute Animals Red Panda 31394", store: "Walmart", category: "Toys", sale: 15.00, usual: 29.99, verdict: "STRONG DEAL", source: "Consumer Queen; dealnews", evidence: "$15, down from $30." },
    { slug: "lego-botanicals-mini-bonsai-trees", name: "LEGO Botanicals Mini Bonsai Trees", store: "Amazon", category: "Toys", sale: 44.99, usual: 59.99, verdict: "ROUTINE SALE", source: "dealnews; CNN", evidence: "$44.99 at Amazon; $45 at Amazon." },
    { slug: "lego-star-wars-the-mandalorians-n-1-starfighter", name: "LEGO Star Wars The Mandalorian's N-1 Starfighter", store: "Amazon", category: "Toys", sale: 41.99, usual: 59.99, verdict: "ROUTINE SALE", source: "starwars-fans.com", evidence: "$59.99 list, $41.99 at Amazon." },
    { slug: "amazon-echo-dot-newest-2026", name: "Amazon Echo Dot (newest, 2026)", store: "Amazon", category: "Smart Home", sale: 49.99, usual: 99.99, verdict: "STRONG DEAL", source: "Home Automation Weekly", evidence: "Prices checked 24 Nov, 9:16 AM ET." },
    { slug: "amazon-echo-dot-max", name: "Amazon Echo Dot Max", store: "Amazon", category: "Smart Home", sale: 49.99, usual: 119.99, verdict: "STRONG DEAL", source: "Home Automation Weekly; The Verge", evidence: "$50 at Amazon." },
    { slug: "amazon-echo-time", name: "Amazon Echo Time", store: "Amazon", category: "Smart Home", sale: 99.99, usual: 199.99, verdict: "STRONG DEAL", source: "Home Automation Weekly", evidence: "Price from Amazon's Echo comparison table." },
    { slug: "ring-wired-doorbell-2k", name: "Ring Wired Doorbell 2K", store: "Amazon", category: "Smart Home", sale: 39.99, usual: 79.99, verdict: "STRONG DEAL", source: "Home Automation Weekly", evidence: "Prices checked 24 Nov." },
    { slug: "ring-floodlight-cam-2k", name: "Ring Floodlight Cam 2K", store: "Amazon", category: "Smart Home", sale: 98.99, usual: 199.99, verdict: "STRONG DEAL", source: "BasketPrice", evidence: "Verified 26 Nov." },
    { slug: "new-balance-mens-574-core-sneakers", name: "New Balance Men's 574 Core Sneakers", store: "Amazon", category: "Fashion", sale: 75.00, usual: 99.99, verdict: "ROUTINE SALE", source: "CNN Underscored", evidence: "25% off; $75 at Amazon." },
    { slug: "skechers-womens-go-walk-flex-hands-free-slip-ins", name: "Skechers Women's Go Walk Flex Hands Free Slip-Ins", store: "Amazon", category: "Fashion", sale: 51.21, usual: 60.25, verdict: "ROUTINE SALE", source: "BasketPrice", evidence: "Typical price $60.25; verified 26 Nov." },
    { slug: "dyson-airwrap-multistyler", name: "Dyson Airwrap Multistyler", store: "Dyson", category: "Beauty", sale: 499.00, usual: 649.99, verdict: "STRONG DEAL", source: "Medium; The Beat DFW", evidence: "Lowest price of the year; Airwrap $499." },
    { slug: "waterpik-aquarius-water-flosser", name: "Waterpik Aquarius Water Flosser", store: "Amazon", category: "Beauty", sale: 49.99, usual: 99.99, verdict: "STRONG DEAL", source: "Product Bible", evidence: "Half price." }
  ];

  /* Same-product prices at other stores, for the six hero products.
     Only prices that were verified in the deal research are listed here. */
  var COMPARE = {
    "airpods-pro-3": [
      { store: "Amazon", sale: 149.00, usual: 249.00 },
      { store: "Walmart", sale: 149.00, usual: 249.00 },
      { store: "Target", sale: 149.99, usual: 249.99 }
    ],
    "apple-watch-12": [
      { store: "Amazon", sale: 299.00, usual: 399.00 },
      { store: "Walmart", sale: 299.00, usual: 399.00 }
    ],
    "dyson-v9": [
      { store: "Target", sale: 269.99, usual: 599.99 },
      { store: "Amazon", sale: 270.00, usual: 599.99 }
    ],
    "quest-3s": [
      { store: "Amazon", sale: 297.00, usual: 349.99 },
      { store: "Target", sale: 297.49, usual: 349.99 }
    ],
    "beats-studio-pro": [
      { store: "Walmart", sale: 99.00, usual: 299.00 },
      { store: "Amazon", sale: 139.95, usual: 349.99 },
      { store: "Target", sale: 149.99, usual: 349.99 }
    ],
    "dualsense": [
      { store: "Amazon", sale: 54.00, usual: 74.99 },
      { store: "Best Buy", sale: 54.99, usual: 74.99 },
      { store: "Target", sale: 54.99, usual: 74.99 }
    ]
  };

  window.DEALHAWK = { checkedAt: CHECKED_AT, deals: DEALS, compare: COMPARE };
})();
