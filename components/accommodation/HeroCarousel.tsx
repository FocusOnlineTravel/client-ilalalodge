'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroCarouselProps {
  images: string[];
  title: string;
}

export default function HeroCarousel({ images, title }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, [goToNext]);

  return (
    <div className="absolute inset-0">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={`${title} - Image ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/35" />

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-20"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-10 w-10 lg:h-12 lg:w-12" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-20"
            aria-label="Next image"
          >
            <ChevronRight className="h-10 w-10 lg:h-12 lg:w-12" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-6'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
