'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

type Category = 'rooms' | 'dining' | 'wildlife' | 'hotel';

interface GalleryImage {
  src: string;
  alt: string;
  category: Category;
}

const FILTERS: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'rooms', label: 'Rooms & Suites' },
  { id: 'dining', label: 'Dining' },
  { id: 'wildlife', label: 'Wildlife' },
  { id: 'hotel', label: 'Hotel & Grounds' },
];

const galleryImages: GalleryImage[] = [
  { src: '/images/Strathern-Suite-Bedroom.jpeg', alt: 'Strathearn Suite Bedroom', category: 'rooms' },
  { src: '/images/Classic-Suite-ILH--1334x1000.jpg', alt: 'Classic Suite at Ilala Lodge', category: 'rooms' },
  { src: '/images/Executive-Suite-Bedroom-ILH-1500x1000.jpeg', alt: 'Executive Suite Bedroom', category: 'rooms' },
  { src: '/images/Deluxe-Room-King-ILH--1500x1000.jpeg', alt: 'Deluxe Room with King bed', category: 'rooms' },
  { src: '/images/accommodation-classic.png', alt: 'Classic Room', category: 'rooms' },
  { src: '/images/accommodation-luxury.png', alt: 'Luxury accommodation', category: 'rooms' },

  { src: '/images/dining-banner.jpg', alt: 'Cassia Restaurant ambience', category: 'dining' },
  { src: '/images/dining-1.png', alt: 'Cassia Restaurant', category: 'dining' },
  { src: '/images/dining-2.png', alt: 'Breakfast at Cassia', category: 'dining' },
  { src: '/images/dining-3.png', alt: 'Lunch at Cassia', category: 'dining' },
  { src: '/images/dining-4.png', alt: 'Dinner under African skies', category: 'dining' },
  { src: '/images/dining-5.png', alt: 'High Tea at Palm River Hotel', category: 'dining' },

  { src: '/images/wildlife-1.png', alt: 'Elephants on the hotel lawns', category: 'wildlife' },
  { src: '/images/wildlife-2.png', alt: 'Wildlife at Ilala Lodge', category: 'wildlife' },
  { src: '/images/wildlife-3.png', alt: 'Wildlife encounter at Victoria Falls', category: 'wildlife' },
  { src: '/images/wildlife-4.png', alt: 'Wildlife viewing from the gardens', category: 'wildlife' },

  { src: '/images/banner-image.png', alt: 'Ilala Lodge Hotel exterior', category: 'hotel' },
  { src: '/images/intr0-image.png', alt: 'Hotel gardens', category: 'hotel' },
  { src: '/images/pool.png', alt: 'Hotel pool', category: 'hotel' },
  { src: '/images/night5.jpg', alt: 'Ilala Lodge at night', category: 'hotel' },
  { src: '/images/banner-image-2-cropped.png', alt: 'Hotel landscape view', category: 'hotel' },
];

export default function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState<Category | 'all'>('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredImages =
    activeFilter === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter);

  const closeLightbox = () => setSelectedIndex(null);
  const goPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === 0 ? filteredImages.length - 1 : selectedIndex - 1);
  };
  const goNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === filteredImages.length - 1 ? 0 : selectedIndex + 1);
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

  // Reset lightbox when filter changes (selected index would otherwise refer to wrong image)
  useEffect(() => {
    setSelectedIndex(null);
  }, [activeFilter]);

  return (
    <>
      {/* Filter chips */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14">
        {FILTERS.map((f) => {
          const isActive = activeFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
                isActive
                  ? 'bg-brand-forest text-white border border-brand-forest'
                  : 'bg-white text-brand-forest border border-brand-stem/30 hover:border-brand-forest hover:bg-brand-daisy'
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {filteredImages.map((img, idx) => (
          <button
            key={`${img.src}-${idx}`}
            onClick={() => setSelectedIndex(idx)}
            className="relative aspect-square overflow-hidden group cursor-pointer"
            aria-label={`View ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
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

      {filteredImages.length === 0 && (
        <p className="text-center text-brand-stem/70 py-12">No images in this category yet.</p>
      )}

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
              src={filteredImages[selectedIndex].src}
              alt={filteredImages[selectedIndex].alt}
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
            {selectedIndex + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </>
  );
}
