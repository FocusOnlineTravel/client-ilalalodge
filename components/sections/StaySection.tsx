'use client';

import { useState } from 'react';
import Image from 'next/image';
import { StayBlock } from '@/types/acf';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  data: StayBlock;
}

export default function StaySection({ data }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = Math.ceil(data.stay_rooms.length / 2);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getVisibleRooms = () => {
    const startIndex = currentIndex * 2;
    return data.stay_rooms.slice(startIndex, startIndex + 2);
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-brand-daisy" id="accommodation">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-brand-script font-script text-6xl lg:text-8xl block mb-2">
            {data.stay_eyebrow}
          </span>
          <h2 className="font-serif text-3xl lg:text-5xl text-brand-forest mb-4">
            {data.stay_heading}
          </h2>
          {data.stay_subheading && (
            <p className="text-brand-stem text-lg max-w-2xl mx-auto">
              {data.stay_subheading}
            </p>
          )}
        </div>

        {/* Carousel */}
        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden">
            {/* Room Cards Container with Smooth Transition */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {/* Group rooms into slides of 2 */}
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full flex gap-6 lg:gap-8">
                  {data.stay_rooms.slice(slideIndex * 2, slideIndex * 2 + 2).map((room, roomIndex) => (
                    <div
                      key={roomIndex}
                      className="flex-1 bg-white overflow-hidden shadow-xl"
                    >
                      {/* Room Image with Count Pill */}
                      <div className="relative h-[250px] lg:h-[350px]">
                        <Image
                          src={room.room_image.url}
                          alt={room.room_image.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {/* Room Count Pill */}
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 shadow-lg">
                          <span className="text-brand-forest font-semibold text-sm">
                            {room.room_count} Rooms
                          </span>
                        </div>
                      </div>

                      {/* Room Info */}
                      <div className="p-6 lg:p-8 space-y-4">
                        <h3 className="font-serif text-2xl lg:text-3xl text-brand-forest">
                          {room.room_name}
                        </h3>
                        <p className="text-brand-stem leading-relaxed text-sm lg:text-base line-clamp-3">
                          {room.room_description}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-brand-stem/20">
                          <div>
                            <div className="text-xl lg:text-2xl font-bold text-brand-forest">
                              {room.room_price_from}
                            </div>
                            {room.room_price_suffix && (
                              <div className="text-xs lg:text-sm text-brand-stem">
                                {room.room_price_suffix}
                              </div>
                            )}
                          </div>
                          <a
                            href={room.room_cta.url}
                            target={room.room_cta.target}
                            rel={room.room_cta.target === '_blank' ? 'noopener noreferrer' : undefined}
                            className="bg-brand-forest hover:bg-brand-forest/90 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-full font-semibold transition-all duration-200 hover:shadow-lg text-sm lg:text-base uppercase tracking-wide"
                          >
                            {room.room_cta.label}
                          </a>
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
      </div>
    </section>
  );
}
