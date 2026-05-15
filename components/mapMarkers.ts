// Map markers data - exported from /map-editor

export interface MapMarker {
  id: string;
  x: number;
  y: number;
  title: string;
  blurb?: string;
  link?: string;
  linkText?: string;
  category?: 'hotel' | 'attraction' | 'restaurant' | 'activity';
  label?: string;
  icon?: 'camera' | 'tree' | 'shopping' | 'food' | 'waterfall' | 'bridge' | 'museum' | 'medical' | 'police' | 'boat' | 'pill' | 'storefront' | 'dining' | 'activity' | 'golf' | 'plane';
  isPrimary?: boolean;
  tooltipPosition?: 'up' | 'down';
  pinColor?: string;
}

export const markers: MapMarker[] = [
  {
    "id": "1",
    "x": 2646,
    "y": 2503,
    "title": "Ilala Lodge Hotel",
    "blurb": "Boutique hotel within walking distance of Victoria Falls and the rainforest entrance.",
    "category": "hotel",
    "label": "A",
    "isPrimary": true
  },
  {
    "id": "2",
    "x": 1260,
    "y": 476,
    "title": "The Palm River Hotel",
    "blurb": "Elegant riverside hotel blending luxury accommodation with peaceful Zambezi River surroundings.",
    "category": "attraction",
    "label": "B",
    "isPrimary": true,
    "tooltipPosition": "down"
  },
  {
    "id": "3",
    "x": 2696,
    "y": 2979,
    "title": "Victoria Falls Hotel",
    "blurb": "Historic colonial-style hotel overlooking the Victoria Falls Bridge and Batoka Gorge.",
    "category": "activity",
    "label": "C"
  },
  {
    "id": "4",
    "x": 2709,
    "y": 2762,
    "title": "Stanley and Livingstone",
    "blurb": "Exclusive safari-style boutique retreat located within a private wildlife reserve.",
    "category": "activity",
    "label": "D"
  },
  {
    "id": "5",
    "x": 815,
    "y": 1731,
    "title": "Victoria Falls Safari Lodge",
    "blurb": "Safari lodge famous for sunset views and wildlife visiting its waterhole.",
    "category": "activity",
    "label": "E"
  },
  {
    "id": "6",
    "x": 1699,
    "y": 1055,
    "title": "Elephant Hills Hotel",
    "blurb": "Resort hotel with golf course, river views, and family-friendly facilities.",
    "category": "activity",
    "label": "F"
  },
  {
    "id": "8",
    "x": 989,
    "y": 421,
    "title": "A'Zambezi River Lodge",
    "blurb": "Upscale resort with views of the Zambezi River 2 km from Victoria Falls.",
    "category": "hotel",
    "label": "G",
    "tooltipPosition": "down"
  },
  {
    "id": "poi-1",
    "x": 3077,
    "y": 2450,
    "title": "Rainforest Entrance",
    "blurb": "Main entrance to the rainforest and iconic Victoria Falls viewpoints.",
    "link": "http://localhost:3000/map-editor",
    "linkText": "View detailed map",
    "icon": "tree",
    "pinColor": "#16A34A"
  },
  {
    "id": "poi-2",
    "x": 3053,
    "y": 2834,
    "title": "Batoka Gorge",
    "blurb": "Dramatic gorge carved by the Zambezi River below Victoria Falls.",
    "icon": "camera",
    "pinColor": "#2563EB"
  },
  {
    "id": "poi-3",
    "x": 3938,
    "y": 2706,
    "title": "Victoria Falls Bridge",
    "blurb": "Historic bridge connecting Zimbabwe and Zambia above the dramatic Batoka Gorge.",
    "icon": "camera",
    "pinColor": "#2563EB"
  },
  {
    "id": "poi-4",
    "x": 2643,
    "y": 1361,
    "title": "The Big Tree",
    "blurb": "Massive ancient baobab tree popular for photographs and historical significance.",
    "icon": "tree",
    "pinColor": "#16A34A"
  },
  {
    "id": "poi-5",
    "x": 2531,
    "y": 2472,
    "title": "Shopping Center",
    "icon": "shopping",
    "pinColor": "#f01d79"
  },
  {
    "id": "poi-6",
    "x": 2452,
    "y": 2732,
    "title": "Shopping Center",
    "icon": "shopping",
    "pinColor": "#f01d79"
  },
  {
    "id": "poi-7",
    "x": 2023,
    "y": 2914,
    "title": "Shopping Center",
    "icon": "shopping",
    "pinColor": "#f01d79"
  },
  {
    "id": "poi-8",
    "x": 2245,
    "y": 2685,
    "title": "Pharmacy",
    "icon": "pill",
    "pinColor": "#ff0000"
  },
  {
    "id": "poi-9",
    "x": 2077,
    "y": 2964,
    "title": "Pharmacy",
    "icon": "pill",
    "pinColor": "#ff0000"
  },
  {
    "id": "poi-10",
    "x": 2177,
    "y": 2853,
    "title": "Police",
    "icon": "police",
    "pinColor": "#311caa"
  },
  {
    "id": "poi-11",
    "x": 1508,
    "y": 3422,
    "title": "Pharmacy",
    "icon": "pill",
    "pinColor": "#ff0000"
  },
  {
    "id": "poi-12",
    "x": 1973,
    "y": 2564,
    "title": "Hospital",
    "icon": "medical",
    "pinColor": "#ff0000"
  },
  {
    "id": "poi-13",
    "x": 2578,
    "y": 2390,
    "title": "Curio Market",
    "icon": "storefront",
    "pinColor": "#f01d79"
  },
  {
    "id": "poi-14",
    "x": 3286,
    "y": 2470,
    "title": "Victoria Falls Rainforest",
    "linkText": "View detailed map",
    "icon": "camera",
    "pinColor": "#2563EB"
  },
  {
    "id": "poi-16",
    "x": 675,
    "y": 1799,
    "title": "Vulture Feeding",
    "blurb": "Educational conservation experience observing wild vultures during scheduled feeding sessions.",
    "icon": "camera",
    "pinColor": "#2563EB"
  },
  {
    "id": "poi-17",
    "x": 508,
    "y": 310,
    "title": "Zambezi National Park",
    "blurb": "Wildlife-rich national park offering game drives, birdwatching, and river safari experiences.",
    "icon": "camera",
    "pinColor": "#2563EB"
  },
  {
    "id": "poi-18",
    "x": 1416,
    "y": 406,
    "title": "Ra-Ikane Jetty",
    "blurb": "Departure point for luxury sunset cruises on the Zambezi River.",
    "icon": "boat",
    "pinColor": "#0891B2"
  },
  {
    "id": "poi-43",
    "x": 2565,
    "y": 2474,
    "title": "Elephant's Walk Shopping & Artist's Village",
    "blurb": "Open-air shopping village featuring local artists, crafts, jewellery, and souvenir boutiques.",
    "icon": "storefront",
    "pinColor": "#f01d79"
  },
  {
    "id": "poi-44",
    "x": 3917,
    "y": 166,
    "title": "Crocodile Farm",
    "blurb": "Educational crocodile farm showcasing Nile crocodiles and local reptile conservation.",
    "icon": "camera",
    "tooltipPosition": "down",
    "pinColor": "#2563EB"
  },
  {
    "id": "poi-45",
    "x": 1719,
    "y": 985,
    "title": "Elephant Hills Golf Course",
    "blurb": "Championship golf course surrounded by wildlife, indigenous bush, and scenic landscapes.",
    "icon": "camera",
    "pinColor": "#2563EB"
  },
  {
    "id": "poi-46",
    "x": 2771,
    "y": 414,
    "title": "Princess Elizabeth Island",
    "blurb": "Small Zambezi River island associated with historical royal visits and river cruises.",
    "icon": "camera",
    "pinColor": "#2563EB"
  },
  {
    "id": "poi-47",
    "x": 2467,
    "y": 2745,
    "title": "Bushtracks Express",
    "blurb": "Luxury steam train experience combining fine dining with scenic sunset journeys.",
    "icon": "camera",
    "pinColor": "#2563EB"
  },
  {
    "id": "poi-48",
    "x": 3300,
    "y": 1378,
    "title": "Princess Christian Island",
    "blurb": "Scenic Zambezi River island often viewed during luxury river cruise experiences.",
    "icon": "camera",
    "pinColor": "#2563EB"
  },
  {
    "id": "poi-24",
    "x": 3482,
    "y": 2363,
    "title": "Main Falls",
    "blurb": "One of the Seven Natural Wonders of the World. Known locally as Mosi-oa-Tunya (\"The Smoke that Thunders\").",
    "icon": "camera",
    "pinColor": "#2563EB"
  },
  {
    "id": "poi-25",
    "x": 3234,
    "y": 2567,
    "title": "Zimbabwe Border Post",
    "icon": "museum",
    "pinColor": "#311caa"
  },
  {
    "id": "poi-26",
    "x": 4425,
    "y": 2754,
    "title": "Zambia Border Post",
    "icon": "museum",
    "pinColor": "#311caa"
  },
  {
    "id": "poi-27",
    "x": 74,
    "y": 189,
    "title": "Botswana Border Post (75km)",
    "icon": "museum",
    "tooltipPosition": "down",
    "pinColor": "#311caa"
  },
  {
    "id": "poi-28",
    "x": 1056,
    "y": 3624,
    "title": "Victoria Falls Airport (21km)",
    "icon": "plane",
    "pinColor": "#311caa"
  }
]
