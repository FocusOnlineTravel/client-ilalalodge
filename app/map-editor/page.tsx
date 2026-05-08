'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, Plus, Trash2, Copy, Check, GripVertical } from 'lucide-react';

// Image dimensions - must match InteractiveMap.tsx
const IMAGE_WIDTH = 5000;
const IMAGE_HEIGHT = 3663;

// Icon types available
const ICON_TYPES = [
  { value: 'camera', label: 'Sightseeing', color: '#2563EB' },
  { value: 'tree', label: 'Nature', color: '#16A34A' },
  { value: 'shopping', label: 'Shopping', color: '#f01d79' },
  { value: 'dining', label: 'Dining', color: '#F97316' },
  { value: 'food', label: 'Food', color: '#F97316' },
  { value: 'waterfall', label: 'Waterfall', color: '#0891B2' },
  { value: 'bridge', label: 'Bridge', color: '#6B7280' },
  { value: 'museum', label: 'Museum', color: '#8B5CF6' },
  { value: 'medical', label: 'Hospital', color: '#ff0000' },
  { value: 'pill', label: 'Pharmacy', color: '#ff0000' },
  { value: 'police', label: 'Police', color: '#311caa' },
  { value: 'boat', label: 'Jetty', color: '#0891B2' },
  { value: 'storefront', label: 'Market', color: '#f01d79' },
  { value: 'activity', label: 'Activity', color: '#22C55E' },
  { value: 'golf', label: 'Golf', color: '#22C55E' },
] as const;

// Color presets
const COLOR_PRESETS = [
  { value: '#2563EB', label: 'Blue' },
  { value: '#16A34A', label: 'Green' },
  { value: '#f01d79', label: 'Pink' },
  { value: '#F97316', label: 'Orange' },
  { value: '#ff0000', label: 'Red' },
  { value: '#311caa', label: 'Purple' },
  { value: '#0891B2', label: 'Cyan' },
  { value: '#5A645B', label: 'Forest (Hotel)' },
];

interface MapMarker {
  id: string;
  x: number;
  y: number;
  title: string;
  blurb?: string;
  category?: 'hotel' | 'attraction' | 'restaurant' | 'activity';
  label?: string;
  icon?: string;
  isPrimary?: boolean;
  tooltipPosition?: 'up' | 'down';
  pinColor?: string;
}

// Initial markers from InteractiveMap - synced with current state
const initialMarkers: MapMarker[] = [
  { id: '1', x: 2648, y: 2564, title: 'Ilala Lodge Hotel', blurb: 'Boutique hotel within walking distance of Victoria Falls and the rainforest entrance.', category: 'hotel', label: 'A', isPrimary: true },
  { id: '2', x: 1260, y: 476, title: 'The Palm River Hotel', blurb: 'Elegant riverside hotel blending luxury accommodation with peaceful Zambezi River surroundings.', category: 'attraction', label: 'B', tooltipPosition: 'down' },
  { id: '3', x: 2696, y: 2979, title: 'Victoria Falls Hotel', blurb: 'Historic colonial-style hotel overlooking the Victoria Falls Bridge and Batoka Gorge.', category: 'activity', label: 'C' },
  { id: '4', x: 2709, y: 2762, title: 'Stanley and Livingstone', blurb: 'Exclusive safari-style boutique retreat located within a private wildlife reserve.', category: 'activity', label: 'D' },
  { id: '5', x: 815, y: 1731, title: 'Victoria Falls Safari Lodge', blurb: 'Safari lodge famous for sunset views and wildlife visiting its waterhole.', category: 'activity', label: 'E' },
  { id: '6', x: 1699, y: 1055, title: 'Elephant Hills Hotel', blurb: 'Resort hotel with golf course, river views, and family-friendly facilities.', category: 'activity', label: 'F' },
  { id: '7', x: 1570, y: 2977, title: 'Victoria Falls River Lodge', blurb: 'Luxury tented lodge offering immersive safari experiences along the Zambezi River.', category: 'activity', label: 'G' },
  { id: '8', x: 2229, y: 2245, title: 'Zambezi Sands River Lodge', blurb: 'Local arts, crafts, and souvenirs. Experience authentic Zimbabwean craftsmanship.', category: 'activity', label: 'H' },
  { id: 'poi-1', x: 3044, y: 2465, title: 'Rainforest Entrance', blurb: 'Main entrance to the rainforest and iconic Victoria Falls viewpoints.', icon: 'tree', pinColor: '#16A34A' },
  { id: 'poi-2', x: 3053, y: 2834, title: 'Batoka Gorge', blurb: 'Dramatic gorge carved by the Zambezi River below Victoria Falls.', icon: 'camera', pinColor: '#2563EB' },
  { id: 'poi-3', x: 3859, y: 2714, title: 'Victoria Falls Bridge', icon: 'camera', pinColor: '#2563EB' },
  { id: 'poi-4', x: 2643, y: 1361, title: 'The Big Tree', blurb: 'Massive ancient baobab tree popular for photographs and historical significance.', icon: 'tree', pinColor: '#16A34A' },
  { id: 'poi-5', x: 2531, y: 2472, title: 'Shopping Center', icon: 'shopping', pinColor: '#f01d79' },
  { id: 'poi-6', x: 2452, y: 2732, title: 'Shopping Center', icon: 'shopping', pinColor: '#f01d79' },
  { id: 'poi-7', x: 2023, y: 2914, title: 'Shopping Center', icon: 'shopping', pinColor: '#f01d79' },
  { id: 'poi-8', x: 2245, y: 2685, title: 'Pharmacy', icon: 'pill', pinColor: '#ff0000' },
  { id: 'poi-9', x: 2077, y: 2964, title: 'Pharmacy', icon: 'pill', pinColor: '#ff0000' },
  { id: 'poi-10', x: 2177, y: 2853, title: 'Police', icon: 'police', pinColor: '#311caa' },
  { id: 'poi-11', x: 1500, y: 3448, title: 'Pharmacy', icon: 'pill', pinColor: '#ff0000' },
  { id: 'poi-12', x: 1973, y: 2564, title: 'Hospital', icon: 'medical', pinColor: '#ff0000' },
  { id: 'poi-13', x: 2578, y: 2390, title: 'Curio Market', icon: 'storefront', pinColor: '#f01d79' },
  { id: 'poi-14', x: 3233, y: 2501, title: 'Victoria Falls Rainforest', icon: 'camera', pinColor: '#2563EB' },
  { id: 'poi-15', x: 1468, y: 3526, title: 'Dusty Road Township Experience', blurb: 'Community-based cultural dining experience showcasing township cuisine, music, and storytelling.', icon: 'camera', pinColor: '#2563EB' },
  { id: 'poi-16', x: 675, y: 1799, title: 'Vulture Feeding', blurb: 'Educational conservation experience observing wild vultures during scheduled feeding sessions.', icon: 'camera', pinColor: '#2563EB' },
  { id: 'poi-17', x: 508, y: 310, title: 'Zambezi National Park', blurb: 'Wildlife-rich national park offering game drives, birdwatching, and river safari experiences.', icon: 'camera', pinColor: '#2563EB' },
  { id: 'poi-18', x: 1416, y: 406, title: 'Ra-Ikane Jetty', blurb: 'Departure point for luxury sunset cruises on the Zambezi River.', icon: 'boat', pinColor: '#0891B2' },
  { id: 'poi-19', x: 762, y: 2100, title: 'The Boma - Dinner & Drum Show', blurb: 'Interactive cultural dining experience featuring traditional food, drumming, and dancing performances.', icon: 'dining', pinColor: '#F97316' },
  { id: 'poi-20', x: 2441, y: 2704, title: 'GOAT at Mama Africa Restaurant', blurb: 'Popular African fusion restaurant specialising in grilled meats and vibrant atmosphere.', icon: 'dining', pinColor: '#F97316' },
  { id: 'poi-21', x: 1722, y: 2565, title: 'Nyota Zimbabwean Cuisine', blurb: 'Authentic Zimbabwean restaurant celebrating local flavours and traditional regional dishes.', icon: 'dining', pinColor: '#F97316' },
  { id: 'poi-22', x: 2420, y: 2713, title: 'Zulu Bistro Bar', blurb: 'Trendy African-inspired bistro offering cocktails, tapas, and stylish evening dining.', icon: 'dining', pinColor: '#F97316' },
  { id: 'poi-23', x: 2228, y: 2566, title: 'La Piazza Victoria Falls', blurb: 'Casual Italian-inspired restaurant serving pizzas, pasta, and family-friendly meals.', icon: 'dining', pinColor: '#F97316' },
  { id: 'poi-24', x: 769, y: 2557, title: 'The Social Kitchen', blurb: 'Contemporary cafe-style restaurant known for fresh breakfasts, lunches, and relaxed dining.', icon: 'dining', pinColor: '#F97316' },
  { id: 'poi-25', x: 3045, y: 2778, title: 'The Lookout Cafe - Wild Horizons', blurb: 'Gorge-edge cafe with spectacular views overlooking the Batoka Gorge and bridge.', icon: 'dining', pinColor: '#F97316' },
  { id: 'poi-26', x: 2484, y: 2618, title: 'The Three Monkeys Restaurant & Bar', blurb: 'Vibrant restaurant serving wood-fired pizzas, burgers, cocktails, and lively social dining.', icon: 'dining', pinColor: '#F97316' },
];

export default function MapEditorPage() {
  const [markers, setMarkers] = useState<MapMarker[]>(initialMarkers);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [originalPosition, setOriginalPosition] = useState<{ x: number; y: number } | null>(null);
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const [pendingPosition, setPendingPosition] = useState<{ x: number; y: number } | null>(null);
  const [markerType, setMarkerType] = useState<'hotel' | 'poi'>('poi');
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedMarkerId, setDraggedMarkerId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<'fit' | '50' | '100'>('50');
  const [clickIndicator, setClickIndicator] = useState<{ x: number; y: number } | null>(null);

  // Close panel and reset all states
  const closePanel = () => {
    setSelectedMarker(null);
    setOriginalPosition(null);
    setPendingPosition(null);
    setIsAddingMarker(false);
    setDraggedMarkerId(null);
  };

  // Revert marker to original position
  const revertPosition = () => {
    if (selectedMarker && originalPosition) {
      const reverted = { ...selectedMarker, x: originalPosition.x, y: originalPosition.y };
      setSelectedMarker(reverted);
      setMarkers(prev => prev.map(m => m.id === selectedMarker.id ? reverted : m));
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ startX: 0, startY: 0, scrollLeft: 0, scrollTop: 0 });

  // Generate next ID
  const getNextId = (type: 'hotel' | 'poi') => {
    if (type === 'hotel') {
      const hotelMarkers = markers.filter(m => !m.icon);
      return String(hotelMarkers.length + 1);
    } else {
      const poiMarkers = markers.filter(m => m.icon);
      return `poi-${poiMarkers.length + 1}`;
    }
  };

  // Generate next hotel label (A, B, C...)
  const getNextLabel = () => {
    const hotelMarkers = markers.filter(m => !m.icon && m.label);
    const lastLabel = hotelMarkers.length > 0
      ? hotelMarkers[hotelMarkers.length - 1].label || 'A'
      : '@'; // Character before 'A'
    return String.fromCharCode(lastLabel.charCodeAt(0) + 1);
  };

  // Handle map click
  // Note: There's a ~15px visual offset due to marker pin geometry, compensated here
  const MARKER_Y_OFFSET = 15; // pixels to add to click position

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const scaleX = IMAGE_WIDTH / rect.width;
    const scaleY = IMAGE_HEIGHT / rect.height;

    const x = Math.round((e.clientX - rect.left) * scaleX);
    // Add offset to compensate for marker pin visual position
    const y = Math.round((e.clientY - rect.top) * scaleY) + Math.round(MARKER_Y_OFFSET * scaleY);

    // Always show click indicator for feedback (at actual click, not adjusted)
    const clickY = Math.round((e.clientY - rect.top) * scaleY);
    setClickIndicator({ x, y: clickY });
    setTimeout(() => setClickIndicator(null), 1000);

    if (!isAddingMarker) return;

    setPendingPosition({ x, y });
    setSelectedMarker({
      id: getNextId(markerType),
      x,
      y,
      title: '',
      blurb: '',
      ...(markerType === 'hotel'
        ? { label: getNextLabel(), category: 'hotel' as const }
        : { icon: 'camera', pinColor: '#2563EB' }
      ),
    });
  };

  // Handle marker drag
  const handleMarkerMouseDown = (e: React.MouseEvent, marker: MapMarker) => {
    e.stopPropagation();
    if (isAddingMarker) return;

    setDraggedMarkerId(marker.id);
    setSelectedMarker(marker);
    // Store original position for revert functionality
    if (!originalPosition || selectedMarker?.id !== marker.id) {
      setOriginalPosition({ x: marker.x, y: marker.y });
    }
  };

  // Handle mouse move for dragging markers
  useEffect(() => {
    if (!draggedMarkerId || !imageRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = imageRef.current!.getBoundingClientRect();
      const scaleX = IMAGE_WIDTH / rect.width;
      const scaleY = IMAGE_HEIGHT / rect.height;

      const x = Math.round((e.clientX - rect.left) * scaleX);
      const y = Math.round((e.clientY - rect.top) * scaleY);

      // Clamp to image bounds
      const clampedX = Math.max(0, Math.min(IMAGE_WIDTH, x));
      const clampedY = Math.max(0, Math.min(IMAGE_HEIGHT, y));

      setMarkers(prev => prev.map(m =>
        m.id === draggedMarkerId ? { ...m, x: clampedX, y: clampedY } : m
      ));
      setSelectedMarker(prev => prev ? { ...prev, x: clampedX, y: clampedY } : null);
    };

    const handleMouseUp = () => {
      setDraggedMarkerId(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggedMarkerId]);

  // Pan handling for zoomed view
  useEffect(() => {
    const container = containerRef.current;
    if (!container || zoomLevel === 'fit') return;

    const handleMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button') || draggedMarkerId) return;

      setIsDragging(true);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        scrollLeft: container.scrollLeft,
        scrollTop: container.scrollTop,
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || draggedMarkerId) return;

      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;

      container.scrollLeft = dragRef.current.scrollLeft - dx;
      container.scrollTop = dragRef.current.scrollTop - dy;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [zoomLevel, isDragging, draggedMarkerId]);

  // Save marker
  const saveMarker = () => {
    if (!selectedMarker || !selectedMarker.title.trim()) return;

    const existingIndex = markers.findIndex(m => m.id === selectedMarker.id);
    if (existingIndex >= 0) {
      setMarkers(prev => prev.map(m => m.id === selectedMarker.id ? selectedMarker : m));
    } else {
      setMarkers(prev => [...prev, selectedMarker]);
    }

    setSelectedMarker(null);
    setPendingPosition(null);
    setIsAddingMarker(false);
  };

  // Delete marker
  const deleteMarker = (id: string) => {
    setMarkers(prev => prev.filter(m => m.id !== id));
    setSelectedMarker(null);
    setPendingPosition(null);
  };

  // Export JSON
  const exportJSON = () => {
    const output = markers.map(m => {
      const marker: Record<string, unknown> = {
        id: m.id,
        x: m.x,
        y: m.y,
        title: m.title,
      };
      if (m.blurb) marker.blurb = m.blurb;
      if (m.category) marker.category = m.category;
      if (m.label) marker.label = m.label;
      if (m.icon) marker.icon = m.icon;
      if (m.isPrimary) marker.isPrimary = m.isPrimary;
      if (m.tooltipPosition) marker.tooltipPosition = m.tooltipPosition;
      if (m.pinColor) marker.pinColor = m.pinColor;
      return marker;
    });

    const json = JSON.stringify(output, null, 2);
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getZoomWidth = () => {
    if (zoomLevel === '100') return IMAGE_WIDTH; // 5000px - full size
    if (zoomLevel === '50') return Math.round(IMAGE_WIDTH * 0.35); // ~1750px - comfortable viewing
    return undefined;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Map Editor</h1>
            <span className="text-gray-400 text-sm">
              {markers.length} markers ({markers.filter(m => !m.icon).length} hotels, {markers.filter(m => m.icon).length} POIs)
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Zoom Controls */}
            <div className="flex gap-1 bg-gray-700 rounded-lg p-1">
              {(['fit', '50', '100'] as const).map(level => (
                <button
                  key={level}
                  onClick={() => setZoomLevel(level)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    zoomLevel === level ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {level === 'fit' ? 'Fit' : `${level}%`}
                </button>
              ))}
            </div>

            {/* Add Marker Toggle */}
            <div className="flex gap-1 bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => { setIsAddingMarker(true); setMarkerType('hotel'); }}
                className={`px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors ${
                  isAddingMarker && markerType === 'hotel' ? 'bg-green-600 text-white' : 'text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Plus size={16} /> Hotel
              </button>
              <button
                onClick={() => { setIsAddingMarker(true); setMarkerType('poi'); }}
                className={`px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors ${
                  isAddingMarker && markerType === 'poi' ? 'bg-green-600 text-white' : 'text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Plus size={16} /> POI
              </button>
            </div>

            {isAddingMarker && (
              <button
                onClick={closePanel}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
                type="button"
              >
                Cancel
              </button>
            )}

            {/* Export Button */}
            <button
              onClick={exportJSON}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-sm flex items-center gap-2"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Export JSON'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 flex">
        {/* Map Container */}
        <div
          ref={containerRef}
          className={`flex-1 ${zoomLevel === 'fit' ? 'h-[calc(100vh-64px)] flex items-center justify-center p-4' : 'overflow-auto'}`}
          style={zoomLevel !== 'fit' ? { height: 'calc(100vh - 64px)' } : {}}
        >
          <div
            ref={imageRef}
            className={`relative ${isAddingMarker ? 'cursor-crosshair' : draggedMarkerId ? 'cursor-grabbing' : zoomLevel !== 'fit' ? 'cursor-grab' : ''}`}
            style={zoomLevel !== 'fit' ? { width: `${getZoomWidth()}px` } : { maxHeight: '100%', maxWidth: '100%' }}
            onClick={handleMapClick}
          >
            <Image
              src="/images/VF_Town-Map-6-v3.jpg"
              alt="Victoria Falls Town Map"
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              className={zoomLevel === 'fit' ? 'max-h-full max-w-full object-contain' : 'w-full h-auto'}
              draggable={false}
              priority
            />

            {/* Markers */}
            {markers.map((marker) => {
              const xPercent = (marker.x / IMAGE_WIDTH) * 100;
              const yPercent = (marker.y / IMAGE_HEIGHT) * 100;
              const isSelected = selectedMarker?.id === marker.id;
              const isHotel = !marker.icon;

              return (
                <div
                  key={marker.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-full transition-all ${
                    isSelected ? 'z-50 scale-125' : 'z-10 hover:z-40 hover:scale-110'
                  }`}
                  style={{
                    left: `${xPercent}%`,
                    top: `${yPercent}%`,
                  }}
                >
                  <button
                    onMouseDown={(e) => handleMarkerMouseDown(e, marker)}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isAddingMarker) {
                        setSelectedMarker(marker);
                        setOriginalPosition({ x: marker.x, y: marker.y });
                      }
                    }}
                    className="relative group"
                    title={`${marker.title} (${marker.x}, ${marker.y})`}
                  >
                    {/* Pin SVG */}
                    <div style={{
                      width: marker.isPrimary ? '48px' : isHotel ? '32px' : '28px',
                      height: marker.isPrimary ? '64px' : isHotel ? '43px' : '37px',
                    }}>
                      <svg
                        viewBox="0 0 24 32"
                        className="w-full h-full"
                        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
                      >
                        <path
                          d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20c0-6.627-5.373-12-12-12z"
                          fill={marker.pinColor || '#5A645B'}
                        />
                        <circle cx="12" cy="11" r="9" fill="white" />
                        {isHotel && (
                          <text
                            x="12"
                            y="15"
                            textAnchor="middle"
                            fill="#222715"
                            fontWeight="600"
                            style={{ fontSize: '12px' }}
                          >
                            {marker.label}
                          </text>
                        )}
                      </svg>
                      {/* Icon for POI */}
                      {!isHotel && (
                        <div
                          className="absolute flex items-center justify-center"
                          style={{
                            top: '3px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '18px',
                            height: '18px',
                            color: marker.pinColor || '#5A645B',
                          }}
                        >
                          <IconRenderer icon={marker.icon || 'camera'} />
                        </div>
                      )}
                    </div>
                    {/* Drag handle indicator */}
                    <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 rounded p-0.5">
                      <GripVertical size={12} className="text-gray-400" />
                    </div>
                  </button>
                </div>
              );
            })}

            {/* Pending position marker */}
            {pendingPosition && (
              <div
                className="absolute transform -translate-x-1/2 -translate-y-full z-50 animate-bounce"
                style={{
                  left: `${(pendingPosition.x / IMAGE_WIDTH) * 100}%`,
                  top: `${(pendingPosition.y / IMAGE_HEIGHT) * 100}%`,
                }}
              >
                <div className="w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg" />
              </div>
            )}

            {/* Click indicator - shows exactly where you clicked */}
            {clickIndicator && (
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
                style={{
                  left: `${(clickIndicator.x / IMAGE_WIDTH) * 100}%`,
                  top: `${(clickIndicator.y / IMAGE_HEIGHT) * 100}%`,
                }}
              >
                <div className="relative">
                  {/* Crosshair */}
                  <div className="absolute w-6 h-0.5 bg-red-500 -left-3 top-0" />
                  <div className="absolute w-0.5 h-6 bg-red-500 left-0 -top-3" />
                  {/* Coordinate label */}
                  <div className="absolute left-4 -top-3 bg-black/80 text-white text-xs px-2 py-0.5 rounded whitespace-nowrap">
                    {clickIndicator.x}, {clickIndicator.y}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Edit Panel */}
        {selectedMarker && (
          <div className="w-96 bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto" style={{ height: 'calc(100vh - 64px)' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">
                {markers.find(m => m.id === selectedMarker.id) ? 'Edit Marker' : 'New Marker'}
              </h2>
              <button
                onClick={closePanel}
                className="p-2 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Coordinates */}
            <div className="mb-4 p-3 bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Coordinates</div>
              <div className="flex gap-4">
                <div>
                  <label className="text-xs text-gray-500">X</label>
                  <input
                    type="number"
                    value={selectedMarker.x}
                    onChange={(e) => setSelectedMarker({ ...selectedMarker, x: parseInt(e.target.value) || 0 })}
                    className="w-full bg-gray-600 rounded px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Y</label>
                  <input
                    type="number"
                    value={selectedMarker.y}
                    onChange={(e) => setSelectedMarker({ ...selectedMarker, y: parseInt(e.target.value) || 0 })}
                    className="w-full bg-gray-600 rounded px-2 py-1 text-sm"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Drag marker on map to reposition</p>
              {/* Revert button - shows when position changed */}
              {originalPosition && (selectedMarker.x !== originalPosition.x || selectedMarker.y !== originalPosition.y) && (
                <button
                  onClick={revertPosition}
                  className="mt-2 w-full py-1.5 bg-yellow-600 hover:bg-yellow-700 rounded text-sm font-medium"
                  type="button"
                >
                  Revert to Original Position
                </button>
              )}
            </div>

            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Title *</label>
              <input
                type="text"
                value={selectedMarker.title}
                onChange={(e) => setSelectedMarker({ ...selectedMarker, title: e.target.value })}
                className="w-full bg-gray-700 rounded px-3 py-2"
                placeholder="Enter title..."
                autoFocus
              />
            </div>

            {/* Blurb */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <textarea
                value={selectedMarker.blurb || ''}
                onChange={(e) => setSelectedMarker({ ...selectedMarker, blurb: e.target.value })}
                className="w-full bg-gray-700 rounded px-3 py-2 h-24 resize-none"
                placeholder="Enter description..."
              />
            </div>

            {/* Marker Type Toggle */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Marker Type</label>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const { icon, pinColor, ...rest } = selectedMarker;
                    setSelectedMarker({
                      ...rest,
                      label: selectedMarker.label || getNextLabel(),
                      category: 'hotel'
                    });
                  }}
                  className={`flex-1 py-2 rounded text-sm ${
                    !selectedMarker.icon ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  Hotel (Letter)
                </button>
                <button
                  onClick={() => {
                    const { label, category, ...rest } = selectedMarker;
                    setSelectedMarker({
                      ...rest,
                      icon: 'camera',
                      pinColor: '#2563EB'
                    });
                  }}
                  className={`flex-1 py-2 rounded text-sm ${
                    selectedMarker.icon ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  POI (Icon)
                </button>
              </div>
            </div>

            {/* Hotel-specific fields */}
            {!selectedMarker.icon && (
              <>
                <div className="mb-4">
                  <label className="block text-sm text-gray-400 mb-1">Label Letter</label>
                  <input
                    type="text"
                    value={selectedMarker.label || ''}
                    onChange={(e) => setSelectedMarker({ ...selectedMarker, label: e.target.value.toUpperCase().slice(0, 2) })}
                    className="w-full bg-gray-700 rounded px-3 py-2"
                    maxLength={2}
                  />
                </div>
                <div className="mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedMarker.isPrimary || false}
                      onChange={(e) => setSelectedMarker({ ...selectedMarker, isPrimary: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Primary (Larger marker)</span>
                  </label>
                </div>
              </>
            )}

            {/* POI-specific fields */}
            {selectedMarker.icon && (
              <>
                <div className="mb-4">
                  <label className="block text-sm text-gray-400 mb-2">Icon</label>
                  <div className="grid grid-cols-5 gap-2">
                    {ICON_TYPES.map(iconType => (
                      <button
                        key={iconType.value}
                        onClick={() => {
                          setSelectedMarker({
                            ...selectedMarker,
                            icon: iconType.value,
                            pinColor: iconType.color
                          });
                        }}
                        className={`relative group p-2 rounded-lg transition-all ${
                          selectedMarker.icon === iconType.value
                            ? 'bg-blue-600 ring-2 ring-blue-400'
                            : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                        title={iconType.label}
                      >
                        <div
                          className="w-6 h-6 mx-auto"
                          style={{ color: selectedMarker.icon === iconType.value ? 'white' : iconType.color }}
                        >
                          <IconRenderer icon={iconType.value} />
                        </div>
                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          {iconType.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-gray-400 mb-1">Color</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {COLOR_PRESETS.map(color => (
                      <button
                        key={color.value}
                        onClick={() => setSelectedMarker({ ...selectedMarker, pinColor: color.value })}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedMarker.pinColor === color.value ? 'border-white scale-110' : 'border-transparent hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.label}
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    value={selectedMarker.pinColor || '#2563EB'}
                    onChange={(e) => setSelectedMarker({ ...selectedMarker, pinColor: e.target.value })}
                    className="w-full h-10 bg-gray-700 rounded cursor-pointer"
                  />
                </div>
              </>
            )}

            {/* Tooltip Position */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Tooltip Position</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedMarker({ ...selectedMarker, tooltipPosition: undefined })}
                  className={`flex-1 py-2 rounded text-sm ${
                    !selectedMarker.tooltipPosition ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  Above (Default)
                </button>
                <button
                  onClick={() => setSelectedMarker({ ...selectedMarker, tooltipPosition: 'down' })}
                  className={`flex-1 py-2 rounded text-sm ${
                    selectedMarker.tooltipPosition === 'down' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  Below
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-6">
              <button
                onClick={saveMarker}
                disabled={!selectedMarker.title.trim()}
                className="flex-1 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded font-semibold"
              >
                Save Marker
              </button>
              {markers.find(m => m.id === selectedMarker.id) && (
                <button
                  onClick={() => deleteMarker(selectedMarker.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      {!selectedMarker && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
          <div className="bg-gray-800/90 px-6 py-3 rounded-full text-sm text-gray-300">
            {isAddingMarker
              ? `Click on the map to place a new ${markerType === 'hotel' ? 'hotel' : 'POI'} marker`
              : 'Click a marker to edit, or click "+ Hotel" / "+ POI" to add new markers'}
          </div>
        </div>
      )}
    </div>
  );
}

// Icon renderer component
function IconRenderer({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    camera: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/>
        <path d="M20 4h-3.17L15 2H9L7.17 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm-8 13a5 5 0 110-10 5 5 0 010 10z"/>
      </svg>
    ),
    tree: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2L4 12h3v4H4l8 8 8-8h-3v-4h3L12 2z"/>
      </svg>
    ),
    shopping: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zm0 2h12l1.5 2H4.5L6 4zm1 6a1 1 0 012 0 3 3 0 006 0 1 1 0 012 0 5 5 0 01-10 0z"/>
      </svg>
    ),
    dining: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
      </svg>
    ),
    food: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
      </svg>
    ),
    waterfall: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M5 3c0 2.5 1.5 4 1.5 6.5S5 13 5 15.5 6.5 20 6.5 20H8s-1.5-2-1.5-4.5S8 11 8 8.5 6.5 3 6.5 3H5zm5.5 0c0 2.5 1.5 4 1.5 6.5s-1.5 4-1.5 6.5 1.5 4.5 1.5 4.5h1.5s-1.5-2-1.5-4.5 1.5-4 1.5-6.5-1.5-6.5-1.5-6.5h-1.5zm5.5 0c0 2.5 1.5 4 1.5 6.5S16 13 16 15.5s1.5 4.5 1.5 4.5H19s-1.5-2-1.5-4.5S19 11 19 8.5 17.5 3 17.5 3H16z"/>
      </svg>
    ),
    bridge: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M2 18h2v2H2v-2zm4 0h2v2H6v-2zm10 0h2v2h-2v-2zm4 0h2v2h-2v-2zM2 6h20v2H2V6zm0 4c2 0 3 2 5 2s3-2 5-2 3 2 5 2 3-2 5-2v2c-2 0-3 2-5 2s-3-2-5-2-3 2-5 2-3-2-5-2v-2z"/>
      </svg>
    ),
    museum: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 3L2 8v2h20V8L12 3zM4 12v6h3v-6H4zm5 0v6h3v-6H9zm5 0v6h3v-6h-3zm5 0v6h3v-6h-3zM2 20v2h20v-2H2z"/>
      </svg>
    ),
    medical: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
      </svg>
    ),
    police: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.74-5 8-2.67-1.26-5-4.5-5-8V7.18L12 5zm-1 3v2H9v2h2v2h2v-2h2v-2h-2V8h-2z"/>
      </svg>
    ),
    boat: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.64 2.63.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z"/>
      </svg>
    ),
    pill: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M4.22 11.29l6.07-6.07a5.003 5.003 0 017.07 0 5.003 5.003 0 010 7.07l-6.07 6.07a5.003 5.003 0 01-7.07 0 5.003 5.003 0 010-7.07zm1.41 5.66a3 3 0 004.24 0l3.54-3.54-4.24-4.24-3.54 3.54a3 3 0 000 4.24z"/>
      </svg>
    ),
    storefront: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"/>
      </svg>
    ),
    activity: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/>
      </svg>
    ),
    golf: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M14 2v9l-4-2v-5l4-2zm-3 16c-3.31 0-6 1.79-6 4h14c0-2.21-2.69-4-6-4h-2zm1-2V9.97l1 .5V15c0 .55-.45 1-1 1z"/>
      </svg>
    ),
  };

  return icons[icon] || icons.camera;
}
