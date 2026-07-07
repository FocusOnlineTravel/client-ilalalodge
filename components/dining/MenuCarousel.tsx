'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MenuItem {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  menuUrl: string;
}

const menuItems: MenuItem[] = [
  {
    title: 'Breakfast',
    subtitle: '06:30 - 10:00',
    description: 'Begin the day with a continental buffet, complemented by a cooked breakfast menu, served in the relaxed setting of Cassia Restaurant.',
    image: '/images/Ilala-Lodge-Dining-1-Breakfast-25.jpg',
    menuUrl: '/documents/ILH_BreakfastMenu_2025.pdf',
  },
  {
    title: 'Lunch',
    subtitle: '12:00 - 14:00',
    description: 'Served beneath the shade of the Cassia trees or around the poolside bar, with a selection of lighter dishes and more substantial options.',
    image: '/images/Ilala-Lodge-Dining-2-Lunch-03.jpg',
    menuUrl: '/documents/ILH_LunchMenu_2025.pdf',
  },
  {
    title: 'Dinner',
    subtitle: '18:30 - 21:30',
    description: 'Dine al fresco under African skies with the sound of the Falls in the background, supported by a curated wine list, beers, gins, and cocktails.',
    image: '/images/Ilala-Lodge-Dining-3-Dinner-05.jpg',
    menuUrl: '/documents/ILH_DinnerMenu_2025.pdf',
  },
  {
    title: 'Snack Menu',
    subtitle: 'Available all day',
    description: 'Light bites and poolside snacks available throughout the day.',
    image: '/images/Ilala-Lodge-Dining-2-Lunch-05.jpg',
    menuUrl: '/documents/ILH_SnackMenu_2025.pdf',
  },
  {
    title: 'Bar Menu',
    subtitle: 'Poolside Bar',
    description: 'Beers, gins, cocktails, and refreshments from the poolside bar.',
    image: '/images/Ilala-Lodge-Facilities-Poolside-Bar-06.jpg',
    menuUrl: '/documents/ILH_BeverageList_2026 (Online).pdf',
  },
  {
    title: 'Wine Menu',
    subtitle: 'Curated Selection',
    description: 'A curated selection from South Africa\'s leading vineyards.',
    image: '/images/Ilala-Lodge-Dining-3-Dinner-09.jpg',
    menuUrl: '/documents/ILH_WineList_2026 (Online).pdf',
  },
];

export default function MenuCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;
  const totalSlides = Math.ceil(menuItems.length / itemsPerView);

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
          {/* Group items into slides of 3 */}
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="min-w-full flex gap-8 md:gap-12">
              {menuItems
                .slice(slideIndex * itemsPerView, slideIndex * itemsPerView + itemsPerView)
                .map((item, itemIndex) => (
                  <div
                    key={item.title}
                    className="w-full md:w-[calc(33.333%-2rem)] flex-shrink-0 text-center"
                  >
                    {/* Image */}
                    <div className="relative h-64 mb-6 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <h3 className="font-serif text-3xl md:text-4xl text-brand-forest mb-1">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-lg text-brand-stem font-semibold mb-4">
                        {item.subtitle}
                      </p>
                    )}
                    <p className="text-brand-forest/70 leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <a
                      href={item.menuUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-white text-brand-forest border border-brand-stem/30 hover:border-brand-forest hover:bg-brand-daisy"
                    >
                      View Menu
                    </a>
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
            className="absolute -left-4 lg:-left-16 top-1/3 -translate-y-1/2 bg-white hover:bg-brand-gold text-brand-forest p-3 rounded-full transition-all duration-300 z-10 shadow-lg"
            aria-label="Previous menus"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-4 lg:-right-16 top-1/3 -translate-y-1/2 bg-white hover:bg-brand-gold text-brand-forest p-3 rounded-full transition-all duration-300 z-10 shadow-lg"
            aria-label="Next menus"
          >
            <ChevronRight className="h-6 w-6" />
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
              className={`h-3 rounded-full transition-all duration-300 ${
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
