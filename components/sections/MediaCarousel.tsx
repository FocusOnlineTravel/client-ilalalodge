'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MediaCarouselSection } from '@/types/sections';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';

interface Props {
  data: MediaCarouselSection;
}

export default function MediaCarousel({ data }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  // Cards mode: mobile-first (1 per view) so SSR HTML renders correctly on
  // phones. useEffect bumps to the configured per-view value on desktop.
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Return null if no items
  if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
    return null;
  }

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

  // Cards display mode (menu-style multi-column layout on desktop, 1-up on mobile)
  if (data.display_mode === 'cards') {
    const desktopPerView = parseInt(data.items_per_slide || '3', 10);
    const itemsPerView = isDesktop ? desktopPerView : 1;
    const totalPages = Math.ceil(data.items.length / itemsPerView);
    const safePage = Math.min(currentIndex, totalPages - 1);
    const itemWidthPercent = 100 / itemsPerView;

    const nextCardSlide = () => setCurrentIndex((prev) => (prev + 1) % totalPages);
    const prevCardSlide = () => setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);

    return (
      <section className={`py-16 md:py-24 ${bgClass}`} id={data.anchor_id}>
        <div className="max-w-7xl mx-auto px-4">
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

          {/* Cards Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${safePage * 100}%)` }}
              >
                {data.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex-shrink-0 text-center px-3 md:px-6"
                    style={{ width: `${itemWidthPercent}%` }}
                  >
                    {item.image && (
                      <div className="relative h-64 mb-6 overflow-hidden">
                        <Image
                          src={item.image.url}
                          alt={item.image.alt || item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <h3 className={`font-serif text-3xl md:text-4xl ${textColorClass} mb-1`}>
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-lg text-brand-stem font-semibold mb-4">
                        {item.subtitle}
                      </p>
                    )}
                    {item.description && (
                      <p className={`leading-relaxed mb-4 ${data.section_theme === 'dark' || data.section_theme === 'forest' ? 'text-white/70' : 'text-brand-forest/70'}`}>
                        {item.description}
                      </p>
                    )}
                    {item.pdf && (
                      <a
                        href={item.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-white text-brand-forest border border-brand-stem/30 hover:border-brand-forest hover:bg-brand-daisy"
                      >
                        View Menu
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            {totalPages > 1 && (
              <>
                <button
                  onClick={prevCardSlide}
                  className="absolute -left-6 lg:-left-24 top-1/2 -translate-y-1/2 bg-white hover:bg-brand-gold text-brand-forest p-3 rounded-full transition-all duration-300 z-10"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={nextCardSlide}
                  className="absolute -right-6 lg:-right-24 top-1/2 -translate-y-1/2 bg-white hover:bg-brand-gold text-brand-forest p-3 rounded-full transition-all duration-300 z-10"
                  aria-label="Next"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>

                {/* Dots */}
                <div className="flex justify-center gap-3 mt-8">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-3 rounded-full transition-all duration-300 ${
                        index === safePage ? 'w-10 bg-brand-gold' : 'w-3 bg-brand-stem/30'
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
