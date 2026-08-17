'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GallerySection } from '@/types/sections';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';

interface Props {
  data: GallerySection;
}

export default function Gallery({ data }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const bgClass = {
    light: 'bg-white',
    dark: 'bg-brand-forest',
    accent: 'bg-brand-daisy',
    forest: 'bg-brand-forest',
  }[data.section_theme];

  const columns = data.columns || '4';
  const columnClass = {
    '2': 'grid-cols-2',
    '3': 'grid-cols-2 md:grid-cols-3',
    '4': 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }[columns];

  const maxWidthClass = {
    medium: 'max-w-4xl',
    wide: 'max-w-6xl',
    full: 'max-w-7xl',
  }[data.max_width || 'full'];

  // Get unique categories
  const categories = data.enable_filters
    ? ['All', ...Array.from(new Set(data.images.map(img => img.category).filter(Boolean)))]
    : [];

  // Filter images
  const filteredImages = activeFilter === 'All'
    ? data.images
    : data.images.filter(img => img.category === activeFilter);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (lightboxIndex === null) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  return (
    <section className={`py-8 md:py-12 ${bgClass}`} id={data.anchor_id} onKeyDown={handleKeyDown} tabIndex={0}>
      <div className={`${maxWidthClass} mx-auto px-4`}>
        {/* Header */}
        {(data.eyebrow || data.heading) && (
          <div className="text-center mb-8">
            {data.eyebrow && (
              <span className="text-brand-gold font-script text-4xl block mb-2">
                {data.eyebrow}
              </span>
            )}
            {data.heading && (
              <h2 className="font-serif text-3xl md:text-4xl text-brand-forest">
                {data.heading}
              </h2>
            )}
          </div>
        )}

        {/* Filter Buttons */}
        {data.enable_filters && categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category as string)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === category
                    ? 'bg-brand-forest text-white'
                    : 'bg-brand-daisy text-brand-forest hover:bg-brand-forest/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Image Grid */}
        <div className={`grid ${columnClass} gap-3 md:gap-4`}>
          {filteredImages.map((item, index) => {
            const aspectClass = {
              '1:1': 'aspect-square',
              '4:3': 'aspect-[4/3]',
              '16:9': 'aspect-video',
            }[data.aspect_ratio || '4:3'];

            return (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className={`relative ${aspectClass} overflow-hidden group cursor-pointer`}
            >
              <Image
                src={item.image.url}
                alt={item.image.alt || item.caption || ''}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes={`(max-width: 768px) 50vw, ${100 / parseInt(columns)}vw`}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <Expand className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6" />
              </div>
            </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 lg:top-8 lg:right-8 text-white hover:text-brand-gold transition-colors z-10"
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Navigation */}
          {filteredImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 text-white hover:text-brand-gold transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-10 w-10" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 text-white hover:text-brand-gold transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight className="h-10 w-10" />
              </button>
            </>
          )}

          {/* Image */}
          <div
            className="relative w-full h-full max-w-5xl max-h-[80vh] m-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filteredImages[lightboxIndex].image.url}
              alt={filteredImages[lightboxIndex].image.alt || ''}
              fill
              className="object-contain"
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {lightboxIndex + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
