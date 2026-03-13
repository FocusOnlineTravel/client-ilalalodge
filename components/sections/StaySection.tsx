'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StayBlock } from '@/types/acf';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FadeInView from '@/components/animations/FadeInView';

// Map room names to their slugs
const roomSlugMap: Record<string, string> = {
  'Classic Rooms': 'classic-rooms',
  'Classic Suites': 'classic-suites',
  'Deluxe Rooms': 'deluxe-rooms',
  'Executive Suites': 'executive-suites',
  'Strathearn Suite': 'strathearn-suite',
};

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
        <FadeInView>
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
        </FadeInView>

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
                      className="w-full lg:w-[calc(50%-1rem)] flex-shrink-0 bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
                    >
                      {/* Room Image */}
                      <div className="relative h-[250px] lg:h-[350px]">
                        <Image
                          src={room.room_image.url}
                          alt={room.room_image.alt}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>

                      {/* Room Info */}
                      <div className="p-6 lg:p-8 space-y-4">
                        <Link href={`/accommodation/${roomSlugMap[room.room_name] || '#'}`}>
                          <h3 className="font-serif text-2xl lg:text-3xl text-brand-forest hover:text-brand-gold transition-colors">
                            {room.room_name}
                          </h3>
                        </Link>
                        <p className="text-brand-stem leading-relaxed text-sm lg:text-base line-clamp-3">
                          {room.room_description}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-brand-stem/20">
                          <div>
                            <div className="text-xs text-brand-stem mb-1">From</div>
                            <div className="flex items-baseline gap-1">
                              <span className="text-3xl lg:text-4xl font-light text-brand-forest font-serif">
                                {room.room_price_from.replace('From ', '')}
                              </span>
                              {room.room_price_suffix && (
                                <span className="text-sm text-brand-stem">
                                  {room.room_price_suffix.replace('per night', 'pppn')}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Link
                              href={`/accommodation/${roomSlugMap[room.room_name] || '#'}`}
                              className="border-2 border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-white px-4 pt-1.5 pb-1 lg:px-5 lg:pt-2 lg:pb-1.5 rounded-full font-semibold transition-all duration-200 text-sm lg:text-base uppercase tracking-wide"
                            >
                              {room.room_name.includes('Suite') ? 'View Suites' : 'View Rooms'}
                            </Link>
                            <a
                              href={room.room_cta.url}
                              target={room.room_cta.target}
                              rel={room.room_cta.target === '_blank' ? 'noopener noreferrer' : undefined}
                              className="bg-brand-forest hover:bg-brand-forest/90 text-white px-4 pt-1.5 pb-1 lg:px-5 lg:pt-2 lg:pb-1.5 rounded-full font-semibold transition-all duration-200 hover:shadow-lg text-sm lg:text-base uppercase tracking-wide"
                            >
                              {room.room_name.includes('Suite') ? 'Book Suite' : room.room_cta.label}
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
      </div>
    </section>
  );
}
