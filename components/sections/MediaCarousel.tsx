'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MediaCarouselSection } from '@/types/sections';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';

interface Props {
  data: MediaCarouselSection;
}

export default function MediaCarousel({ data }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const bgClass = {
    light: 'bg-white',
    dark: 'bg-brand-forest',
    accent: 'bg-brand-daisy',
    forest: 'bg-brand-forest',
  }[data.section_theme];

  const textColorClass = data.section_theme === 'dark' || data.section_theme === 'forest' ? 'text-white' : 'text-brand-forest';

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % data.items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + data.items.length) % data.items.length);
  };

  // Tab display mode
  if (data.display_mode === 'tabs') {
    return (
      <section className={`py-16 md:py-24 ${bgClass}`} id={data.anchor_id}>
        <div className="max-w-5xl mx-auto px-4">
          {/* Header */}
          {(data.eyebrow || data.heading) && (
            <div className="text-center mb-12">
              {data.eyebrow && (
                <span className="text-brand-gold font-script text-4xl block mb-2">
                  {data.eyebrow}
                </span>
              )}
              {data.heading && (
                <h2 className={`font-serif text-3xl md:text-4xl ${textColorClass}`}>
                  {data.heading}
                </h2>
              )}
            </div>
          )}

          {/* Tab Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {data.items.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === index
                    ? 'bg-brand-forest text-white'
                    : 'bg-brand-daisy text-brand-forest hover:bg-brand-forest/10'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="relative aspect-[4/3] max-w-3xl mx-auto">
            {data.items[activeTab].media_type === 'pdf' && data.items[activeTab].pdf ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-brand-daisy rounded-lg">
                <FileText className="w-16 h-16 text-brand-forest mb-4" />
                <p className="text-brand-forest font-medium mb-4">{data.items[activeTab].title}</p>
                <a
                  href={data.items[activeTab].pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-brand-forest text-white rounded-full font-medium hover:bg-brand-forest/90 transition-colors"
                >
                  View PDF
                </a>
              </div>
            ) : data.items[activeTab].image ? (
              <Image
                src={data.items[activeTab].image!.url}
                alt={data.items[activeTab].image!.alt || data.items[activeTab].title}
                fill
                className="object-contain"
              />
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  // Carousel display mode
  return (
    <section className={`py-16 md:py-24 ${bgClass}`} id={data.anchor_id}>
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        {(data.eyebrow || data.heading) && (
          <div className="text-center mb-12">
            {data.eyebrow && (
              <span className="text-brand-gold font-script text-4xl block mb-2">
                {data.eyebrow}
              </span>
            )}
            {data.heading && (
              <h2 className={`font-serif text-3xl md:text-4xl ${textColorClass}`}>
                {data.heading}
              </h2>
            )}
          </div>
        )}

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {data.items.map((item, index) => (
                <div key={index} className="min-w-full px-4">
                  <div className="relative aspect-[4/3] max-w-3xl mx-auto">
                    {item.media_type === 'pdf' && item.pdf ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-brand-daisy rounded-lg">
                        <FileText className="w-16 h-16 text-brand-forest mb-4" />
                        <p className="text-brand-forest font-medium mb-4">{item.title}</p>
                        <a
                          href={item.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2 bg-brand-forest text-white rounded-full font-medium hover:bg-brand-forest/90 transition-colors"
                        >
                          View PDF
                        </a>
                      </div>
                    ) : item.image ? (
                      <Image
                        src={item.image.url}
                        alt={item.image.alt || item.title}
                        fill
                        className="object-contain"
                      />
                    ) : null}
                  </div>
                  <p className={`text-center mt-4 font-medium ${textColorClass}`}>{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          {data.items.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-brand-gold text-brand-forest p-2 rounded-full transition-all z-10"
                aria-label="Previous"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-brand-gold text-brand-forest p-2 rounded-full transition-all z-10"
                aria-label="Next"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {data.items.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex ? 'bg-brand-gold w-8' : 'bg-brand-stem/30'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
