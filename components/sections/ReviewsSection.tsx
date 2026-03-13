'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ReviewsBlock } from '@/types/acf';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  data: ReviewsBlock;
}

export default function ReviewsSection({ data }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = Math.ceil(data.reviews_items.length / 3);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="py-16 lg:py-24 bg-white" id="reviews">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-brand-script font-script text-6xl lg:text-8xl block mb-2">
            {data.reviews_eyebrow}
          </span>
          <h2 className="font-serif text-3xl lg:text-5xl text-brand-forest">
            {data.reviews_heading}
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden">
            {/* Review Cards Container with Smooth Transition */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {/* Group reviews into slides of 3 */}
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full flex gap-6 lg:gap-8">
                  {data.reviews_items.slice(slideIndex * 3, slideIndex * 3 + 3).map((review, reviewIndex) => (
                    <div
                      key={reviewIndex}
                      className="flex-1 bg-[#fafaf8] p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="relative w-8 h-8 lg:w-10 lg:h-10 mb-4">
                        <Image
                          src="/images/quote.png"
                          alt="Quote icon"
                          fill
                          className="object-contain opacity-60"
                        />
                      </div>
                      <h3 className="font-serif text-lg lg:text-xl text-brand-forest mb-3">
                        {review.review_title}
                      </h3>
                      <p className="text-brand-stem leading-relaxed mb-4 text-sm lg:text-base line-clamp-4">
                        {review.review_body}
                      </p>
                      <div className="pt-4 border-t border-brand-stem/20">
                        <p className="font-semibold text-brand-forest">{review.review_author}</p>
                        {review.review_source && (
                          <p className="text-xs lg:text-sm text-brand-stem">{review.review_source}</p>
                        )}
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
                className="absolute -left-6 lg:-left-24 top-1/2 -translate-y-1/2 bg-white hover:bg-brand-gold text-brand-forest p-3 rounded-full shadow-lg transition-all duration-300 z-10"
                aria-label="Previous reviews"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute -right-6 lg:-right-24 top-1/2 -translate-y-1/2 bg-white hover:bg-brand-gold text-brand-forest p-3 rounded-full shadow-lg transition-all duration-300 z-10"
                aria-label="Next reviews"
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
                  className={`h-3 rounded-full transition-all duration-300 ${
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
