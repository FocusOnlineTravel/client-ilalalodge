'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BOOKING_URL } from '@/lib/constants';

interface Room {
  slug: string;
  title: string;
  shortDescription: string;
  image: string;
  roomCount: number;
  size: string;
}

interface OtherRoomsCarouselProps {
  rooms: Room[];
}

export default function OtherRoomsCarousel({ rooms }: OtherRoomsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const roomsPerView = 2;
  const totalSlides = Math.ceil(rooms.length / roomsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="relative max-w-7xl mx-auto">
      <div className="overflow-hidden">
        {/* Cards Container */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {/* Group rooms into slides of 2 */}
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="min-w-full flex gap-6 lg:gap-8">
              {rooms
                .slice(slideIndex * roomsPerView, slideIndex * roomsPerView + roomsPerView)
                .map((room) => (
                  <div
                    key={room.slug}
                    className="w-full lg:w-[calc(50%-1rem)] flex-shrink-0 bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  >
                    {/* Room Image */}
                    <div className="relative h-[250px] lg:h-[350px]">
                      <Image
                        src={room.image}
                        alt={room.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>

                    {/* Room Info */}
                    <div className="p-6 lg:p-8 space-y-4">
                      <Link href={`/accommodation/${room.slug}`}>
                        <h3 className="font-serif text-2xl lg:text-3xl text-brand-forest hover:text-brand-gold transition-colors">
                          {room.title}
                        </h3>
                      </Link>
                      <p className="text-brand-stem leading-relaxed text-sm lg:text-base line-clamp-3">
                        {room.shortDescription}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-brand-stem/20">
                        <div>
                          <div className="text-xs text-brand-stem mb-1">Room Size</div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl lg:text-3xl font-light text-brand-forest font-serif">
                              {room.size}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            href={`/accommodation/${room.slug}`}
                            className="border-2 border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-white px-4 pt-1.5 pb-1 lg:px-5 lg:pt-2 lg:pb-1.5 rounded-full font-semibold transition-all duration-200 text-sm lg:text-base uppercase tracking-wide"
                          >
                            View Room
                          </Link>
                          <a
                            href={BOOKING_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-brand-forest hover:bg-brand-forest/90 text-white px-4 pt-1.5 pb-1 lg:px-5 lg:pt-2 lg:pb-1.5 rounded-full font-semibold transition-all duration-200 hover:shadow-lg text-sm lg:text-base uppercase tracking-wide"
                          >
                            Book Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute -left-6 lg:-left-24 top-1/2 -translate-y-1/2 bg-white hover:bg-brand-gold text-brand-forest p-3 shadow-lg transition-all duration-300 z-10"
            aria-label="Previous rooms"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-6 lg:-right-24 top-1/2 -translate-y-1/2 bg-white hover:bg-brand-gold text-brand-forest p-3 shadow-lg transition-all duration-300 z-10"
            aria-label="Next rooms"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {totalSlides > 1 && (
        <div className="flex justify-center gap-3 mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 transition-all duration-300 ${
                index === currentIndex ? 'w-10 bg-brand-gold' : 'w-3 bg-brand-stem/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
