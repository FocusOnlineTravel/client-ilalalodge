'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CardCarouselProps {
  images: string[];
  title: string;
  video?: string;
}

export default function CardCarousel({ images, title, video }: CardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };


  // If there's a video, show it instead
  if (video) {
    return (
      <div className="relative aspect-[3/2]">
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          aria-label={title}
        />
      </div>
    );
  }

  // Single image - no carousel needed
  if (images.length === 1) {
    return (
      <div className="relative aspect-[3/2]">
        <Image
          src={images[0]}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[3/2] group">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={`${title} - Image ${index + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 opacity-0 group-hover:opacity-100"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 opacity-0 group-hover:opacity-100"
        aria-label="Next image"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-4'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
