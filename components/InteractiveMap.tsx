'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ZoomIn, ZoomOut, X, Maximize2 } from 'lucide-react';

// Image dimensions - update these if the source image changes
const IMAGE_WIDTH = 5000;
const IMAGE_HEIGHT = 3663;

interface MapMarker {
  id: string;
  x: number; // pixel x coordinate based on IMAGE_WIDTH
  y: number; // pixel y coordinate based on IMAGE_HEIGHT
  title: string;
  blurb?: string;
  category?: 'hotel' | 'attraction' | 'restaurant' | 'activity';
  label?: string; // Letter or number to display in marker
  icon?: 'camera' | 'tree' | 'shopping' | 'food' | 'waterfall' | 'bridge' | 'museum' | 'medical' | 'police' | 'boat' | 'pill' | 'storefront' | 'dining'; // Icon for POI markers
  isPrimary?: boolean; // If true, marker is larger
  tooltipPosition?: 'up' | 'down'; // Default is 'up'
  pinColor?: string; // Custom pin color
}

// Markers - coordinates scaled for 5000px width image
const markers: MapMarker[] = [
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
    "id": "7",
    "x": 1570,
    "y": 2977,
    "title": "Victoria Falls River Lodge",
    "blurb": "Luxury tented lodge offering immersive safari experiences along the Zambezi River.",
    "category": "activity",
    "label": "G"
  },
  {
    "id": "8",
    "x": 2229,
    "y": 2245,
    "title": "Zambezi Sands River Lodge",
    "blurb": "Local arts, crafts, and souvenirs. Experience authentic Zimbabwean craftsmanship.",
    "category": "activity",
    "label": "H"
  },
  {
    "id": "poi-1",
    "x": 3077,
    "y": 2450,
    "title": "Rainforest Entrance",
    "blurb": "Main entrance to the rainforest and iconic Victoria Falls viewpoints.",
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
    "x": 3233,
    "y": 2501,
    "title": "Victoria Falls Rainforest",
    "icon": "camera",
    "pinColor": "#2563EB"
  },
  {
    "id": "poi-15",
    "x": 1495,
    "y": 3392,
    "title": "Dusty Road Township Experience",
    "blurb": "Community-based cultural dining experience showcasing township cuisine, music, and storytelling.",
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
    "id": "poi-19",
    "x": 762,
    "y": 2100,
    "title": "The Boma - Dinner & Drum Show",
    "blurb": "Interactive cultural dining experience featuring traditional food, drumming, and dancing performances.",
    "icon": "dining",
    "pinColor": "#F97316"
  },
  {
    "id": "poi-20",
    "x": 2441,
    "y": 2704,
    "title": "GOAT at Mama Africa Restaurant",
    "blurb": "Popular African fusion restaurant specialising in grilled meats and vibrant atmosphere.",
    "icon": "dining",
    "pinColor": "#F97316"
  },
  {
    "id": "poi-21",
    "x": 1722,
    "y": 2565,
    "title": "Nyota Zimbabwean Cuisine",
    "blurb": "Authentic Zimbabwean restaurant celebrating local flavours and traditional regional dishes.",
    "icon": "dining",
    "pinColor": "#F97316"
  },
  {
    "id": "poi-22",
    "x": 2420,
    "y": 2713,
    "title": "Zulu Bistro Bar",
    "blurb": "Trendy African-inspired bistro offering cocktails, tapas, and stylish evening dining.",
    "icon": "dining",
    "pinColor": "#F97316"
  },
  {
    "id": "poi-23",
    "x": 2228,
    "y": 2566,
    "title": "La Piazza Victoria Falls",
    "blurb": "Casual Italian-inspired restaurant serving pizzas, pasta, and family-friendly meals.",
    "icon": "dining",
    "pinColor": "#F97316"
  },
  {
    "id": "poi-24",
    "x": 769,
    "y": 2557,
    "title": "The Social Kitchen",
    "blurb": "Contemporary cafe-style restaurant known for fresh breakfasts, lunches, and relaxed dining.",
    "icon": "dining",
    "pinColor": "#F97316"
  },
  {
    "id": "poi-25",
    "x": 3045,
    "y": 2778,
    "title": "The Lookout Cafe - Wild Horizons",
    "blurb": "Gorge-edge cafe with spectacular views overlooking the Batoka Gorge and bridge.",
    "icon": "dining",
    "pinColor": "#F97316"
  },
  {
    "id": "poi-26",
    "x": 2484,
    "y": 2618,
    "title": "The Three Monkeys Restaurant & Bar",
    "blurb": "Vibrant restaurant serving wood-fired pizzas, burgers, cocktails, and lively social dining.",
    "icon": "dining",
    "pinColor": "#F97316"
  },
  {
    "id": "poi-27",
    "x": 2629,
    "y": 2449,
    "title": "The Cassia Restaurant",
    "blurb": "Elegant fine dining restaurant at Ilala Lodge Hotel overlooking lush indigenous gardens.",
    "icon": "dining",
    "pinColor": "#F97316"
  },
  {
    "id": "poi-28",
    "x": 3099,
    "y": 2049,
    "title": "Baines Restaurant",
    "blurb": "Sophisticated riverside restaurant offering refined cuisine and beautiful sunset dining experiences.",
    "icon": "dining",
    "pinColor": "#F97316"
  },
  {
    "id": "poi-29",
    "x": 719,
    "y": 1780,
    "title": "MaKuwa-Kuwa Restaurant",
    "blurb": "Safari lodge restaurant overlooking a busy waterhole frequented by wildlife.",
    "icon": "dining",
    "pinColor": "#F97316"
  },
  {
    "id": "poi-30",
    "x": 2666,
    "y": 2927,
    "title": "Stanley's Terrace",
    "blurb": "Historic terrace restaurant serving high tea and classic meals with scenic views.",
    "icon": "dining",
    "pinColor": "#F97316"
  },
  {
    "id": "poi-31",
    "x": 2304,
    "y": 2716,
    "title": "Marula Cafe",
    "blurb": "Relaxed cafe popular for quality coffee, brunches, and lighter meals.",
    "icon": "dining",
    "pinColor": "#F97316"
  },
  {
    "id": "poi-32",
    "x": 3066,
    "y": 2498,
    "title": "Malonga Cafe",
    "blurb": "Casual cafe serving coffee, light meals, desserts, and refreshing drinks.",
    "icon": "dining",
    "pinColor": "#F97316"
  },
  {
    "id": "poi-33",
    "x": 2497,
    "y": 2533,
    "title": "Active Sushi Victoria Falls",
    "blurb": "Contemporary sushi restaurant offering fresh Japanese-inspired dishes in central Victoria Falls.",
    "icon": "dining",
    "pinColor": "#F97316"
  },
  {
    "id": "poi-34",
    "x": 3114,
    "y": 2454,
    "title": "The Rainforest Cafe",
    "blurb": "Convenient cafe near the rainforest entrance serving snacks, meals, and refreshments.",
    "icon": "dining",
    "pinColor": "#F97316"
  },
  {
    "id": "poi-35",
    "x": 2524,
    "y": 2486,
    "title": "The River",
    "blurb": "Relaxed riverside dining venue with scenic Zambezi views and contemporary cuisine.",
    "icon": "dining",
    "pinColor": "#F97316"
  },
  {
    "id": "poi-36",
    "x": 2530,
    "y": 2552,
    "title": "The Smokehouse at River Brewery Victoria Falls",
    "blurb": "Craft brewery restaurant specialising in smoked meats, burgers, and local beers.",
    "icon": "dining",
    "pinColor": "#F97316"
  },
  {
    "id": "poi-37",
    "x": 2266,
    "y": 2617,
    "title": "The Little Monkey Takeaway",
    "blurb": "Casual eatery serving quick bites, coffee, and relaxed daytime dining.",
    "icon": "food",
    "pinColor": "#F97316"
  },
  {
    "id": "poi-38",
    "x": 2063,
    "y": 2562,
    "title": "Shoestrings Restaurant",
    "blurb": "Backpacker-friendly restaurant and bar with casual meals and lively evening entertainment.",
    "icon": "dining",
    "pinColor": "#F97316"
  },
  {
    "id": "poi-39",
    "x": 3980,
    "y": 2841,
    "title": "Shearwater Cafe",
    "blurb": "Central cafe popular for coffee, breakfasts, and quick light meals.",
    "icon": "dining",
    "pinColor": "#F97316"
  },
  {
    "id": "poi-40",
    "x": 2429,
    "y": 2727,
    "title": "Mama Africa",
    "blurb": "Vibrant local restaurant celebrating African cuisine, music, and warm hospitality.",
    "icon": "dining",
    "pinColor": "#F97316"
  },
  {
    "id": "poi-41",
    "x": 2667,
    "y": 2942,
    "title": "Jungle Junction Restaurant",
    "blurb": "Buffet-style restaurant at Victoria Falls Hotel featuring African-inspired and international cuisine.",
    "icon": "dining",
    "pinColor": "#F97316"
  },
  {
    "id": "poi-42",
    "x": 2551,
    "y": 2433,
    "title": "Namtook Restaurant",
    "blurb": "Thai-inspired restaurant offering flavourful curries, stir-fries, and Asian-inspired dishes.",
    "icon": "dining",
    "pinColor": "#F97316"
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
    "x": 3945,
    "y": 87,
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
  }
]

const categoryColors: Record<string, { bg: string; fill: string }> = {
  hotel: { bg: 'bg-brand-gold', fill: '#C9A227' },
  attraction: { bg: 'bg-blue-500', fill: '#3B82F6' },
  restaurant: { bg: 'bg-orange-500', fill: '#F97316' },
  activity: { bg: 'bg-green-500', fill: '#22C55E' },
};

type ZoomLevel = 'fit' | '50' | '100';

export default function InteractiveMap() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>('fit');
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHoveringPreview, setIsHoveringPreview] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ startX: 0, startY: 0, scrollLeft: 0, scrollTop: 0 });

  const handleZoomChange = (level: ZoomLevel) => {
    setZoomLevel(level);
    setActiveMarker(null);

    // Scroll to center when zooming in
    if (level !== 'fit' && containerRef.current) {
      setTimeout(() => {
        if (containerRef.current) {
          const container = containerRef.current;
          container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
          container.scrollTop = (container.scrollHeight - container.clientHeight) / 2;
        }
      }, 100);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setZoomLevel('fit');
    setActiveMarker(null);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleModalClose();
    };
    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // Mouse/touch drag handlers using native events for smoothness
  useEffect(() => {
    const container = containerRef.current;
    if (!container || zoomLevel === 'fit') return;

    const handleMouseDown = (e: MouseEvent) => {
      // Ignore if clicking on a marker button
      if ((e.target as HTMLElement).closest('button')) return;

      setIsDragging(true);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        scrollLeft: container.scrollLeft,
        scrollTop: container.scrollTop,
      };
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;

      container.scrollLeft = dragRef.current.scrollLeft - dx;
      container.scrollTop = dragRef.current.scrollTop - dy;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest('button')) return;

      const touch = e.touches[0];
      setIsDragging(true);
      dragRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        scrollLeft: container.scrollLeft,
        scrollTop: container.scrollTop,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;

      const touch = e.touches[0];
      const dx = touch.clientX - dragRef.current.startX;
      const dy = touch.clientY - dragRef.current.startY;

      container.scrollLeft = dragRef.current.scrollLeft - dx;
      container.scrollTop = dragRef.current.scrollTop - dy;
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [zoomLevel, isDragging]);

  // Map content component (reused in both preview and modal)
  const getZoomWidth = () => {
    if (zoomLevel === '100') return IMAGE_WIDTH; // 5000px - full size
    if (zoomLevel === '50') return Math.round(IMAGE_WIDTH * 0.35); // ~1750px - comfortable viewing
    return undefined;
  };

  const MapContent = ({ inModal = false, fitHeight = false }: { inModal?: boolean; fitHeight?: boolean }) => (
    <div
      className={`relative transition-all duration-300 ${
        zoomLevel !== 'fit' ? '' : fitHeight ? 'h-full' : 'w-full'
      }`}
      style={zoomLevel !== 'fit' ? { width: `${getZoomWidth()}px` } : {}}
    >
      {/* Map Image */}
      <Image
        src="/images/VF_Town-Map-6-v3.jpg"
        alt="Victoria Falls Town Map"
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        className={`transition-all duration-300 pointer-events-none ${
          zoomLevel !== 'fit' ? 'w-auto' : fitHeight ? 'h-full w-auto' : 'w-full h-auto'
        }`}
        draggable={false}
        priority
      />

      {/* Markers */}
      {markers.map((marker) => {
        const xPercent = (marker.x / IMAGE_WIDTH) * 100;
        const yPercent = (marker.y / IMAGE_HEIGHT) * 100;
        const isActive = activeMarker === marker.id;

        return (
          <div
            key={marker.id}
            className={`absolute transform -translate-x-1/2 -translate-y-full ${
              isActive ? 'z-30' : marker.icon ? 'z-10' : 'z-20'
            }`}
            style={{
              left: `${xPercent}%`,
              top: `${yPercent}%`,
            }}
          >
            {/* Marker Pin */}
            <button
              onClick={() => setActiveMarker(isActive ? null : marker.id)}
              onMouseEnter={() => setActiveMarker(marker.id)}
              onMouseLeave={() => setActiveMarker(null)}
              className={`relative group transition-transform duration-200 hover:scale-110 ${
                isActive ? 'scale-110' : ''
              }`}
            >
              {/* Map pin with icon/label */}
              <div className="relative" style={{
                width: marker.isPrimary ? '48px' : marker.icon ? '28px' : '32px',
                height: marker.isPrimary ? '64px' : marker.icon ? '37px' : '43px',
              }}>
                {/* Pin SVG */}
                <svg
                  viewBox="0 0 24 32"
                  className="map-marker absolute inset-0 w-full h-full"
                  style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.4))' }}
                >
                  <path
                    d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20c0-6.627-5.373-12-12-12z"
                    fill={marker.pinColor || '#5A645B'}
                  />
                  <circle cx="12" cy="11" r="9" fill="white" />
                  {/* Letter label (if no icon) */}
                  {!marker.icon && (
                    <text
                      x="12"
                      y="15"
                      textAnchor="middle"
                      fill="#222715"
                      fontWeight="600"
                      style={{ fontSize: '12px' }}
                    >
                      {marker.label || ''}
                    </text>
                  )}
                </svg>
                {/* Custom solid SVG icon overlay */}
                {marker.icon && (
                  <div
                    className="absolute flex items-center justify-center map-marker-icon"
                    style={{
                      top: marker.isPrimary ? '10px' : '3px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      color: marker.pinColor || '#5A645B',
                      ['--icon-size' as string]: marker.isPrimary ? '27px' : '18px',
                    }}
                  >
                    {marker.icon === 'camera' && (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/>
                        <path d="M20 4h-3.17L15 2H9L7.17 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm-8 13a5 5 0 110-10 5 5 0 010 10z"/>
                      </svg>
                    )}
                    {marker.icon === 'tree' && (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M12 2L4 12h3v4H4l8 8 8-8h-3v-4h3L12 2z"/>
                      </svg>
                    )}
                    {marker.icon === 'shopping' && (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zm0 2h12l1.5 2H4.5L6 4zm1 6a1 1 0 012 0 3 3 0 006 0 1 1 0 012 0 5 5 0 01-10 0z"/>
                      </svg>
                    )}
                    {marker.icon === 'food' && (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
                      </svg>
                    )}
                    {marker.icon === 'waterfall' && (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M5 3c0 2.5 1.5 4 1.5 6.5S5 13 5 15.5 6.5 20 6.5 20H8s-1.5-2-1.5-4.5S8 11 8 8.5 6.5 3 6.5 3H5zm5.5 0c0 2.5 1.5 4 1.5 6.5s-1.5 4-1.5 6.5 1.5 4.5 1.5 4.5h1.5s-1.5-2-1.5-4.5 1.5-4 1.5-6.5-1.5-6.5-1.5-6.5h-1.5zm5.5 0c0 2.5 1.5 4 1.5 6.5S16 13 16 15.5s1.5 4.5 1.5 4.5H19s-1.5-2-1.5-4.5S19 11 19 8.5 17.5 3 17.5 3H16z"/>
                      </svg>
                    )}
                    {marker.icon === 'bridge' && (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M2 18h2v2H2v-2zm4 0h2v2H6v-2zm10 0h2v2h-2v-2zm4 0h2v2h-2v-2zM2 6h20v2H2V6zm0 4c2 0 3 2 5 2s3-2 5-2 3 2 5 2 3-2 5-2v2c-2 0-3 2-5 2s-3-2-5-2-3 2-5 2-3-2-5-2v-2z"/>
                      </svg>
                    )}
                    {marker.icon === 'museum' && (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M12 3L2 8v2h20V8L12 3zM4 12v6h3v-6H4zm5 0v6h3v-6H9zm5 0v6h3v-6h-3zm5 0v6h3v-6h-3zM2 20v2h20v-2H2z"/>
                      </svg>
                    )}
                    {marker.icon === 'medical' && (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                      </svg>
                    )}
                    {marker.icon === 'police' && (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.74-5 8-2.67-1.26-5-4.5-5-8V7.18L12 5zm-1 3v2H9v2h2v2h2v-2h2v-2h-2V8h-2z"/>
                      </svg>
                    )}
                    {marker.icon === 'boat' && (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.64 2.63.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z"/>
                      </svg>
                    )}
                    {marker.icon === 'pill' && (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M4.22 11.29l6.07-6.07a5.003 5.003 0 017.07 0 5.003 5.003 0 010 7.07l-6.07 6.07a5.003 5.003 0 01-7.07 0 5.003 5.003 0 010-7.07zm1.41 5.66a3 3 0 004.24 0l3.54-3.54-4.24-4.24-3.54 3.54a3 3 0 000 4.24z"/>
                      </svg>
                    )}
                    {marker.icon === 'storefront' && (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/>
                      </svg>
                    )}
                    {marker.icon === 'dining' && (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
                      </svg>
                    )}
                  </div>
                )}
              </div>
            </button>

            {/* Tooltip */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-64 transition-all duration-200 ${
                marker.tooltipPosition === 'down'
                  ? 'top-full mt-3'
                  : 'bottom-full mb-3'
              } ${
                isActive
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : `opacity-0 ${marker.tooltipPosition === 'down' ? 'translate-y-[-8px]' : 'translate-y-2'} pointer-events-none`
              }`}
            >
              {/* Arrow at top for down-pointing tooltip */}
              {marker.tooltipPosition === 'down' && (
                <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white" />
              )}
              <div className="bg-white rounded-lg shadow-xl p-4 text-left">
                <h3 className={`font-serif text-xl text-brand-forest font-bold ${marker.blurb ? 'mb-2' : ''}`}>
                  {marker.title}
                </h3>
                {marker.blurb && (
                  <p className="text-sm text-brand-forest/70 leading-relaxed">
                    {marker.blurb}
                  </p>
                )}
              </div>
              {/* Arrow at bottom for up-pointing tooltip */}
              {marker.tooltipPosition !== 'down' && (
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Preview Map (clickable to open modal) */}
      <div className="relative w-full">
        <div
          ref={previewRef}
          className="relative cursor-none"
          onClick={() => setIsModalOpen(true)}
          onMouseMove={(e) => {
            if (previewRef.current) {
              const rect = previewRef.current.getBoundingClientRect();
              setCursorPos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              });
            }
          }}
          onMouseEnter={() => setIsHoveringPreview(true)}
          onMouseLeave={() => setIsHoveringPreview(false)}
        >
          <Image
            src="/images/VF_Town-Map-6-v3.jpg"
            alt="Victoria Falls Town Map"
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            className="w-full h-auto"
            draggable={false}
          />
          {/* Overlay */}
          <div className={`absolute inset-0 transition-all duration-300 ${isHoveringPreview ? 'bg-black/20' : 'bg-black/0'}`} />
          {/* Cursor-following expand icon */}
          <div
            className={`absolute pointer-events-none transition-all duration-150 ease-out ${
              isHoveringPreview ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="bg-white/90 rounded-full p-4 shadow-lg">
              <Maximize2 className="w-8 h-8 text-brand-forest" />
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-brand-forest/50 mt-2">
          Click to explore the interactive map
        </p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleModalClose();
          }}
        >
          {/* Modal Content */}
          <div
            className="relative overflow-hidden"
            style={{ width: '95vw', height: '95vh' }}
          >
            {/* Close Button */}
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 z-30 flex items-center gap-2 px-4 py-2 bg-brand-forest hover:bg-brand-forest/90 text-white rounded-full shadow-lg transition-all duration-200 font-semibold text-sm"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>

            {/* Zoom Buttons */}
            <div className="absolute top-4 left-4 z-30 flex gap-2">
              <button
                onClick={() => handleZoomChange('fit')}
                className={`px-4 py-2 rounded-full shadow-lg transition-all duration-200 font-semibold text-sm ${
                  zoomLevel === 'fit'
                    ? 'bg-brand-forest text-white'
                    : 'bg-white/90 hover:bg-white text-brand-forest'
                }`}
              >
                Fit
              </button>
              <button
                onClick={() => handleZoomChange('50')}
                className={`px-4 py-2 rounded-full shadow-lg transition-all duration-200 font-semibold text-sm ${
                  zoomLevel === '50'
                    ? 'bg-brand-forest text-white'
                    : 'bg-white/90 hover:bg-white text-brand-forest'
                }`}
              >
                50%
              </button>
              <button
                onClick={() => handleZoomChange('100')}
                className={`px-4 py-2 rounded-full shadow-lg transition-all duration-200 font-semibold text-sm ${
                  zoomLevel === '100'
                    ? 'bg-brand-forest text-white'
                    : 'bg-white/90 hover:bg-white text-brand-forest'
                }`}
              >
                100%
              </button>
            </div>

            {/* Map Container */}
            <div
              ref={containerRef}
              className={`w-full h-full select-none ${
                zoomLevel !== 'fit'
                  ? `overflow-auto scrollbar-hide ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`
                  : 'overflow-hidden flex items-center justify-center'
              }`}
              style={zoomLevel !== 'fit' ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : {}}
            >
              {zoomLevel !== 'fit' ? (
                <div className="min-w-full min-h-full flex items-center justify-center">
                  <MapContent inModal />
                </div>
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) handleModalClose();
                  }}
                >
                  <div className="relative h-full">
                    <MapContent inModal fitHeight />
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
              <p className="text-center text-sm text-white bg-black/50 px-4 py-2 rounded-full">
                {zoomLevel !== 'fit'
                  ? 'Click and drag to pan. Hover markers for details.'
                  : 'Hover over markers to see details.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
