'use client';

import { useState } from 'react';
import { ReviewsBlock } from '@/types/acf';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Props {
  data: ReviewsBlock;
}

export default function ReviewsSection({ data }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % data.reviews_items.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + data.reviews_items.length) % data.reviews_items.length);
  };

  return (
    <section className="py-16 lg:py-24 bg-white" id="reviews">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-brand-gold font-script text-6xl lg:text-8xl block mb-2">
            {data.reviews_eyebrow}
          </span>
          <h2 className="font-serif text-3xl lg:text-5xl text-brand-forest">
            {data.reviews_heading}
          </h2>
        </div>

        {/* Reviews Grid for Desktop */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {data.reviews_items.map((review, index) => (
            <div
              key={index}
              className="bg-brand-daisy p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <Quote className="h-10 w-10 text-brand-gold mb-4" />
              <h3 className="font-serif text-xl text-brand-forest mb-3">
                {review.review_title}
              </h3>
              <p className="text-brand-stem leading-relaxed mb-4">
                {review.review_body}
              </p>
              <div className="pt-4 border-t border-brand-stem/20">
                <p className="font-semibold text-brand-forest">{review.review_author}</p>
                {review.review_source && (
                  <p className="text-sm text-brand-stem">{review.review_source}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Reviews Carousel for Mobile/Tablet */}
        <div className="lg:hidden relative">
          <div className="bg-brand-daisy p-6 md:p-8 shadow-lg min-h-[320px] flex flex-col">
            <Quote className="h-10 w-10 text-brand-gold mb-4" />
            <h3 className="font-serif text-xl text-brand-forest mb-3">
              {data.reviews_items[currentIndex].review_title}
            </h3>
            <p className="text-brand-stem leading-relaxed mb-4 flex-grow">
              {data.reviews_items[currentIndex].review_body}
            </p>
            <div className="pt-4 border-t border-brand-stem/20">
              <p className="font-semibold text-brand-forest">
                {data.reviews_items[currentIndex].review_author}
              </p>
              {data.reviews_items[currentIndex].review_source && (
                <p className="text-sm text-brand-stem">
                  {data.reviews_items[currentIndex].review_source}
                </p>
              )}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevReview}
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-forest p-2 transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex gap-2">
              {data.reviews_items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 transition-all ${
                    index === currentIndex ? 'w-8 bg-brand-gold' : 'w-2 bg-brand-stem/30'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextReview}
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-forest p-2 transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
