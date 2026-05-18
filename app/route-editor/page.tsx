'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, Plus, Trash2, Copy, Check, GripVertical } from 'lucide-react';
import { routeMarkers as importedMarkers } from '@/components/routeMarkers';

// Image dimensions
const IMAGE_WIDTH = 4188;
const IMAGE_HEIGHT = 2000;

interface RouteMarker {
  id: string;
  x: number;
  y: number;
  number: number;
  title: string;
  blurb?: string;
}

export default function RouteEditorPage() {
  const [markers, setMarkers] = useState<RouteMarker[]>([...importedMarkers]);
  const [selectedMarker, setSelectedMarker] = useState<RouteMarker | null>(null);
  const [originalPosition, setOriginalPosition] = useState<{ x: number; y: number } | null>(null);
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const [pendingPosition, setPendingPosition] = useState<{ x: number; y: number } | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedMarkerId, setDraggedMarkerId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<'fit' | '50' | '100'>('50');
  const [clickIndicator, setClickIndicator] = useState<{ x: number; y: number } | null>(null);

  const closePanel = () => {
    setSelectedMarker(null);
    setOriginalPosition(null);
    setPendingPosition(null);
    setIsAddingMarker(false);
    setDraggedMarkerId(null);
  };

  const revertPosition = () => {
    if (selectedMarker && originalPosition) {
      const reverted = { ...selectedMarker, x: originalPosition.x, y: originalPosition.y };
      setSelectedMarker(reverted);
      setMarkers(prev => prev.map(m => m.id === selectedMarker.id ? reverted : m));
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ startX: 0, startY: 0, scrollLeft: 0, scrollTop: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container || zoomLevel === 'fit') return;

    const handleMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button')) return;
      if (isAddingMarker) return;
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
  }, [zoomLevel, isDragging, draggedMarkerId, isAddingMarker]);

  const handleMarkerMouseDown = useCallback((e: React.MouseEvent, marker: RouteMarker) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedMarkerId(marker.id);
    setSelectedMarker(marker);
    setOriginalPosition({ x: marker.x, y: marker.y });
  }, []);

  useEffect(() => {
    if (!draggedMarkerId || !mapRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const mapEl = mapRef.current;
      if (!mapEl) return;

      const rect = mapEl.getBoundingClientRect();
      const displayWidth = rect.width;
      const displayHeight = rect.height;

      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      const x = Math.round((relativeX / displayWidth) * IMAGE_WIDTH);
      const y = Math.round((relativeY / displayHeight) * IMAGE_HEIGHT);

      const clampedX = Math.max(0, Math.min(IMAGE_WIDTH, x));
      const clampedY = Math.max(0, Math.min(IMAGE_HEIGHT, y));

      setMarkers(prev =>
        prev.map(m => (m.id === draggedMarkerId ? { ...m, x: clampedX, y: clampedY } : m))
      );
      setSelectedMarker(prev =>
        prev && prev.id === draggedMarkerId ? { ...prev, x: clampedX, y: clampedY } : prev
      );
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

  const handleMapClick = (e: React.MouseEvent) => {
    if (!isAddingMarker) return;

    const mapEl = mapRef.current;
    if (!mapEl) return;

    const rect = mapEl.getBoundingClientRect();
    const displayWidth = rect.width;
    const displayHeight = rect.height;

    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    const x = Math.round((relativeX / displayWidth) * IMAGE_WIDTH);
    const y = Math.round((relativeY / displayHeight) * IMAGE_HEIGHT);

    setClickIndicator({ x: relativeX, y: relativeY });
    setTimeout(() => setClickIndicator(null), 300);

    setPendingPosition({ x, y });

    const nextNumber = markers.length > 0 ? Math.max(...markers.map(m => m.number)) + 1 : 1;
    const newMarker: RouteMarker = {
      id: `marker-${Date.now()}`,
      x,
      y,
      number: nextNumber,
      title: `Viewpoint ${nextNumber}`,
    };
    setSelectedMarker(newMarker);
    setOriginalPosition({ x, y });
  };

  const saveMarker = () => {
    if (!selectedMarker) return;

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

  const deleteMarker = (id: string) => {
    setMarkers(prev => prev.filter(m => m.id !== id));
    setSelectedMarker(null);
    setPendingPosition(null);
  };

  const exportJSON = () => {
    const output = markers.map(m => {
      const marker: Record<string, unknown> = {
        id: m.id,
        x: m.x,
        y: m.y,
        number: m.number,
        title: m.title,
      };
      if (m.blurb) marker.blurb = m.blurb;
      return marker;
    });

    const json = JSON.stringify(output, null, 2);

    const fileContent = `// Route markers data - exported from /route-editor

export interface RouteMarker {
  id: string;
  x: number;
  y: number;
  number: number;
  title: string;
  blurb?: string;
}

export const routeMarkers: RouteMarker[] = ${json}
`;

    navigator.clipboard.writeText(fileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getZoomWidth = () => {
    if (zoomLevel === '100') return IMAGE_WIDTH;
    if (zoomLevel === '50') return Math.round(IMAGE_WIDTH * 0.5);
    return undefined;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Route Map Editor</h1>
            <span className="text-gray-400 text-sm">
              {markers.length} markers
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
            <button
              onClick={() => {
                setIsAddingMarker(!isAddingMarker);
                if (isAddingMarker) {
                  setPendingPosition(null);
                  setSelectedMarker(null);
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isAddingMarker
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <Plus size={18} />
              <span>Add Marker</span>
            </button>

            {/* Export */}
            <button
              onClick={exportJSON}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              <span>{copied ? 'Copied!' : 'Export JSON'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 flex">
        {/* Map Area */}
        <div
          ref={containerRef}
          className={`flex-1 overflow-auto bg-gray-950 ${
            zoomLevel === 'fit' ? 'flex items-center justify-center p-4' : ''
          } ${isAddingMarker ? 'cursor-crosshair' : isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ height: 'calc(100vh - 64px)' }}
        >
          <div
            ref={mapRef}
            className="relative"
            style={zoomLevel === 'fit' ? { maxWidth: '100%', maxHeight: '100%' } : { width: getZoomWidth() }}
            onClick={handleMapClick}
          >
            {/* Click indicator */}
            {clickIndicator && (
              <div
                className="absolute w-8 h-8 -ml-4 -mt-4 rounded-full bg-green-500/50 animate-ping pointer-events-none z-50"
                style={{ left: clickIndicator.x, top: clickIndicator.y }}
              />
            )}

            <Image
              src="/images/vic-falls-footpath-map-large.jpg"
              alt="Victoria Falls Footpath Map"
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

              return (
                <div
                  key={marker.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
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
                    {/* Numbered circle */}
                    <div
                      className={`w-8 h-8 rounded-full text-white font-bold text-sm flex items-center justify-center border-2 border-white ${
                        isSelected ? 'bg-blue-600' : 'bg-brand-gold'
                      }`}
                      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
                    >
                      {marker.number}
                    </div>
                    {/* Quick delete button */}
                    <div
                      className="absolute -top-1 -left-1 opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 hover:bg-red-500 rounded p-0.5 cursor-pointer z-10"
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMarker(marker.id);
                      }}
                      title="Delete marker"
                    >
                      <Trash2 size={12} className="text-white" />
                    </div>
                    {/* Drag handle indicator */}
                    <div
                      className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 rounded p-0.5 z-10"
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <GripVertical size={12} className="text-gray-400" />
                    </div>
                  </button>
                </div>
              );
            })}

            {/* Pending position marker */}
            {pendingPosition && (
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce"
                style={{
                  left: `${(pendingPosition.x / IMAGE_WIDTH) * 100}%`,
                  top: `${(pendingPosition.y / IMAGE_HEIGHT) * 100}%`,
                }}
              >
                <div className="w-10 h-10 rounded-full bg-green-500 text-white font-bold flex items-center justify-center border-2 border-white shadow-lg">
                  ?
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Edit Panel */}
        {selectedMarker && (
          <div className="w-80 bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto" style={{ height: 'calc(100vh - 64px)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">
                {markers.find(m => m.id === selectedMarker.id) ? 'Edit Marker' : 'New Marker'}
              </h2>
              <button onClick={closePanel} className="p-1 hover:bg-gray-700 rounded">
                <X size={20} />
              </button>
            </div>

            {/* Position */}
            <div className="mb-4 p-3 bg-gray-700/50 rounded">
              <div className="text-sm text-gray-400 mb-1">Position</div>
              <div className="font-mono text-lg">
                x: {selectedMarker.x}, y: {selectedMarker.y}
              </div>
              {originalPosition && (selectedMarker.x !== originalPosition.x || selectedMarker.y !== originalPosition.y) && (
                <button
                  onClick={revertPosition}
                  className="mt-2 text-sm text-blue-400 hover:text-blue-300"
                >
                  Revert to Original Position
                </button>
              )}
            </div>

            {/* Number */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Number *</label>
              <input
                type="number"
                value={selectedMarker.number}
                onChange={(e) => setSelectedMarker({ ...selectedMarker, number: parseInt(e.target.value) || 1 })}
                className="w-full bg-gray-700 rounded px-3 py-2"
                min={1}
              />
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

            {/* Actions */}
            <div className="flex gap-2 mt-6">
              <button
                onClick={saveMarker}
                disabled={!selectedMarker.title}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded font-medium transition-colors"
              >
                Save
              </button>
              {markers.find(m => m.id === selectedMarker.id) && (
                <button
                  onClick={() => deleteMarker(selectedMarker.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      {isAddingMarker && !selectedMarker && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg">
          Click on the map to place a new marker
        </div>
      )}
    </div>
  );
}
