'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ZoomIn, ZoomOut, X, Maximize2, Camera, TreePine, ShoppingBag, Utensils, Waves, Landmark, Building2 } from 'lucide-react';

// Image dimensions - update these if the source image changes
const IMAGE_WIDTH = 2793;
const IMAGE_HEIGHT = 2046;

interface MapMarker {
  id: string;
  x: number; // pixel x coordinate based on IMAGE_WIDTH
  y: number; // pixel y coordinate based on IMAGE_HEIGHT
  title: string;
  blurb?: string;
  category?: 'hotel' | 'attraction' | 'restaurant' | 'activity';
  label?: string; // Letter or number to display in marker
  icon?: 'camera' | 'tree' | 'shopping' | 'food' | 'waterfall' | 'bridge' | 'museum'; // Icon for POI markers
  isPrimary?: boolean; // If true, marker is larger
  tooltipPosition?: 'up' | 'down'; // Default is 'up'
  pinColor?: string; // Custom pin color
}

// Sample markers - update coordinates based on your 2500px wide image
const markers: MapMarker[] = [
  {
    id: '1',
    x: 1479, // center horizontally
    y: 1432,  // center vertically
    title: 'Ilala Lodge Hotel',
    blurb: 'Your home in Victoria Falls. Just an 8-minute walk from the majestic Victoria Falls.',
    category: 'hotel',
    label: 'A',
    isPrimary: true, // Larger marker
  },
  {
    id: '2',
    x: 704,
    y: 266,
    title: 'The Palm River Hotel',
    blurb: 'The largest waterfall in the world. A UNESCO World Heritage Site and one of the Seven Natural Wonders.',
    category: 'attraction',
    label: 'B',
    tooltipPosition: 'down',
  },
  {
    id: '3',
    x: 1506,
    y: 1664,
    title: 'Victoria Falls Hotel',
    blurb: 'Local arts, crafts, and souvenirs. Experience authentic Zimbabwean craftsmanship.',
    category: 'activity',
    label: 'C',
  },
  {
    id: '4',
    x: 1513,
    y: 1543,
    title: 'Stanley and Livingstone',
    blurb: 'Local arts, crafts, and souvenirs. Experience authentic Zimbabwean craftsmanship.',
    category: 'activity',
    label: 'D',
  },
  {
    id: '5',
    x: 455,
    y: 967,
    title: 'Stanley and Livingstone',
    blurb: 'Local arts, crafts, and souvenirs. Experience authentic Zimbabwean craftsmanship.',
    category: 'activity',
    label: 'E',
  },
  {
    id: '6',
    x: 949,
    y: 589,
    title: 'Stanley and Livingstone',
    blurb: 'Local arts, crafts, and souvenirs. Experience authentic Zimbabwean craftsmanship.',
    category: 'activity',
    label: 'F',
  },
  {
    id: '7',
    x: 877,
    y: 1663,
    title: 'Stanley and Livingstone',
    blurb: 'Local arts, crafts, and souvenirs. Experience authentic Zimbabwean craftsmanship.',
    category: 'activity',
    label: 'G',
  },
  {
    id: '8',
    x: 1245,
    y: 1254,
    title: 'Stanley and Livingstone',
    blurb: 'Local arts, crafts, and souvenirs. Experience authentic Zimbabwean craftsmanship.',
    category: 'activity',
    label: 'H',
  },
  // Places of Interest - sample markers (update coordinates as needed)
  {
    id: 'poi-1',
    x: 1700,
    y: 1377,
    title: 'Rainforest Entrance',
    blurb: 'xx Spectacular views of the falls.',
    icon: 'tree',
    pinColor: '#16A34A', // Blue
  },
  {
    id: 'poi-2',
    x: 1705,
    y: 1583,
    title: 'Batoka Gorge',
    blurb: 'Wildlife and natural beauty.',
    icon: 'camera',
    pinColor: '#2563EB', // Green
  },
  {
    id: 'poi-3',
    x: 2155,
    y: 1516,
    title: 'Victoria Falls Bridge',
    blurb: '',
    icon: 'camera',
    pinColor: '#2563EB', // Purple
  },
  {
    id: 'poi-4',
    x: 1476,
    y: 760,
    title: 'The Big Tree',
    blurb: '',
    icon: 'tree',
    pinColor: '#16A34A', // Purple
  },
  {
    id: 'poi-5',
    x: 1414,
    y: 1381,
    title: 'Shopping Center',
    blurb: '',
    icon: 'shopping',
    pinColor: '#f01d79', // Purple
  },
  {
    id: 'poi-6',
    x: 1364,
    y: 1541,
    title: 'Shopping Center',
    blurb: '',
    icon: 'shopping',
    pinColor: '#f01d79', // Purple
  },
];

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
    if (zoomLevel === '100') return IMAGE_WIDTH;
    if (zoomLevel === '50') return Math.round(IMAGE_WIDTH * 0.5);
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
        src="/images/VF_Town-Map-6-v2-cropped.jpg"
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
                width: marker.isPrimary ? '48px' : '32px',
                height: marker.isPrimary ? '64px' : '43px',
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
                {/* Lucide icon overlay */}
                {marker.icon && (
                  <div
                    className="absolute flex items-center justify-center map-marker-icon"
                    style={{
                      top: marker.isPrimary ? '10px' : '5px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      color: marker.pinColor || '#5A645B',
                      ['--icon-size' as string]: marker.isPrimary ? '27px' : '18px',
                    }}
                  >
                    {marker.icon === 'camera' && <Camera strokeWidth={2.5} />}
                    {marker.icon === 'tree' && <TreePine strokeWidth={2.5} />}
                    {marker.icon === 'shopping' && <ShoppingBag strokeWidth={2.5} />}
                    {marker.icon === 'food' && <Utensils strokeWidth={2.5} />}
                    {marker.icon === 'waterfall' && <Waves strokeWidth={2.5} />}
                    {marker.icon === 'bridge' && <Landmark strokeWidth={2.5} />}
                    {marker.icon === 'museum' && <Building2 strokeWidth={2.5} />}
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
            src="/images/VF_Town-Map-6-v2-cropped.jpg"
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
