'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface ImageLightboxProps {
  images: { src: string; alt: string }[];
  columns?: string;
}

export default function ImageLightbox({ images, columns = 'grid-cols-3 md:grid-cols-4 lg:grid-cols-6' }: ImageLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closeLightbox = () => setSelectedIndex(null);
  const goPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
  };
  const goNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedIndex]);

  return (
    <>
      {/* Image Grid */}
      <div className={`grid ${columns}`}>
        {images.map((img, idx) => (
          <button
            key={img.src}
            onClick={() => setSelectedIndex(idx)}
            className="relative aspect-square overflow-hidden group cursor-pointer"
            aria-label={`View ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <Maximize2
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                size={28}
                strokeWidth={1.5}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 lg:top-6 lg:right-6 text-white hover:text-brand-gold transition-colors z-10"
            aria-label="Close gallery"
          >
            <X className="h-8 w-8 lg:h-10 lg:w-10" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-2 md:left-6 text-white hover:text-brand-gold transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-10 w-10 lg:h-14 lg:w-14" />
          </button>

          <div
            className="relative w-full h-full max-w-6xl max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-2 md:right-6 text-white hover:text-brand-gold transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="h-10 w-10 lg:h-14 lg:w-14" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
