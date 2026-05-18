'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { X, Maximize2 } from 'lucide-react';
import { routeMarkers, RouteMarker } from './routeMarkers';

// Image dimensions
const IMAGE_WIDTH = 4188;
const IMAGE_HEIGHT = 2000;

type ZoomLevel = 'fit' | '50' | '100';

export default function RouteMap() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>('fit');
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHoveringPreview, setIsHoveringPreview] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ startX: 0, startY: 0, scrollLeft: 0, scrollTop: 0 });

  const handleZoomChange = (newLevel: ZoomLevel) => {
    const container = containerRef.current;
    const oldLevel = zoomLevel;

    let centerXPercent = 0.5;
    let centerYPercent = 0.5;

    if (container && oldLevel !== 'fit' && container.scrollWidth > 0) {
      const scrollCenterX = container.scrollLeft + container.clientWidth / 2;
      const scrollCenterY = container.scrollTop + container.clientHeight / 2;
      centerXPercent = scrollCenterX / container.scrollWidth;
      centerYPercent = scrollCenterY / container.scrollHeight;
    }

    setZoomLevel(newLevel);
    setActiveMarker(null);

    if (newLevel !== 'fit') {
      const newWidth = newLevel === '100' ? IMAGE_WIDTH : Math.round(IMAGE_WIDTH * 0.5);
      const newHeight = (newWidth / IMAGE_WIDTH) * IMAGE_HEIGHT;

      requestAnimationFrame(() => {
        if (containerRef.current) {
          const c = containerRef.current;
          const targetScrollX = Math.max(0, (newWidth * centerXPercent) - (c.clientWidth / 2));
          const targetScrollY = Math.max(0, (newHeight * centerYPercent) - (c.clientHeight / 2));
          c.scrollLeft = targetScrollX;
          c.scrollTop = targetScrollY;
        }
      });
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setZoomLevel('fit');
    setActiveMarker(null);
  };

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

  useEffect(() => {
    const container = containerRef.current;
    if (!container || zoomLevel === 'fit') return;

    const handleMouseDown = (e: MouseEvent) => {
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

    const handleMouseUp = () => setIsDragging(false);

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

    const handleTouchEnd = () => setIsDragging(false);

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

  const getZoomWidth = () => {
    if (zoomLevel === '100') return IMAGE_WIDTH;
    if (zoomLevel === '50') return Math.round(IMAGE_WIDTH * 0.5);
    return undefined;
  };

  const MapContent = ({ inModal = false, fitHeight = false }: { inModal?: boolean; fitHeight?: boolean }) => (
    <div
      className="relative transition-all duration-300"
      style={
        zoomLevel !== 'fit'
          ? { width: `${getZoomWidth()}px`, minWidth: `${getZoomWidth()}px` }
          : fitHeight
          ? { height: '100%' }
          : { width: '100%' }
      }
    >
      <Image
        src="/images/vic-falls-footpath-map-large.jpg"
        alt="Victoria Falls Footpath Map"
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        className="transition-all duration-300 pointer-events-none"
        style={
          zoomLevel !== 'fit'
            ? { width: `${getZoomWidth()}px`, height: 'auto' }
            : fitHeight
            ? { height: '100%', width: 'auto' }
            : { width: '100%', height: 'auto' }
        }
        draggable={false}
        priority
      />

      {/* Numbered Markers */}
      {routeMarkers.map((marker) => {
        const xPercent = (marker.x / IMAGE_WIDTH) * 100;
        const yPercent = (marker.y / IMAGE_HEIGHT) * 100;
        const isActive = activeMarker === marker.id;

        return (
          <div
            key={marker.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
              isActive ? 'z-30' : 'z-10'
            }`}
            style={{
              left: `${xPercent}%`,
              top: `${yPercent}%`,
            }}
            onMouseEnter={() => setActiveMarker(marker.id)}
            onMouseLeave={() => setActiveMarker(null)}
          >
            <button
              onClick={() => setActiveMarker(isActive ? null : marker.id)}
              className={`relative group transition-transform duration-200 hover:scale-110 ${
                isActive ? 'scale-110' : ''
              }`}
            >
              {/* Numbered circle marker */}
              <div
                className="w-8 h-8 rounded-full bg-brand-gold text-white font-bold text-sm flex items-center justify-center shadow-lg border-2 border-white"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
              >
                {marker.number}
              </div>
            </button>

            {/* Tooltip */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 bottom-full pb-3 transition-all duration-200 ${
                marker.blurb ? 'w-64' : 'w-auto'
              } ${
                isActive
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-2 pointer-events-none'
              }`}
            >
              <div className={`bg-white rounded-lg shadow-xl text-center relative ${marker.blurb ? 'p-4' : 'px-3 py-2 whitespace-nowrap'}`}>
                <h3 className={`font-serif text-brand-forest font-bold ${marker.blurb ? 'text-xl mb-2' : 'text-base'}`}>
                  {marker.title}
                </h3>
                {marker.blurb && (
                  <p className="text-sm text-brand-forest/70 leading-relaxed">
                    {marker.blurb}
                  </p>
                )}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Preview Map */}
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
            src="/images/vic-falls-footpath-map-large.jpg"
            alt="Victoria Falls Footpath Map"
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            className="w-full h-auto"
            draggable={false}
          />
          <div className={`absolute inset-0 transition-all duration-300 ${isHoveringPreview ? 'bg-black/20' : 'bg-black/0'}`} />
          <div
            className={`absolute pointer-events-none transition-opacity duration-150 ${
              isHoveringPreview ? 'opacity-100' : 'opacity-0'
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
          <div
            className="relative overflow-hidden"
            style={{ width: '95vw', height: '95vh' }}
          >
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 z-30 flex items-center gap-2 px-4 py-2 bg-brand-forest hover:bg-brand-forest/90 text-white rounded-full shadow-lg transition-all duration-200 font-semibold text-sm"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>

            <div className="absolute top-4 left-4 z-30 flex gap-2">
              {(['fit', '50', '100'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => handleZoomChange(level)}
                  className={`px-4 py-2 rounded-full shadow-lg transition-all duration-200 font-semibold text-sm ${
                    zoomLevel === level
                      ? 'bg-brand-forest text-white'
                      : 'bg-white/90 hover:bg-white text-brand-forest'
                  }`}
                >
                  {level === 'fit' ? 'Fit' : `${level}%`}
                </button>
              ))}
            </div>

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
                <MapContent inModal />
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
