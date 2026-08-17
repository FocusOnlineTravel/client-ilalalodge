'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeroSection } from '@/types/sections';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ENABLE_TITLE_FADE, VIDEO_TITLE_FADE_DELAY } from '@/lib/hero-config';

interface Props {
  data: HeroSection;
}

export default function Hero({ data }: Props) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [titleVisible, setTitleVisible] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Start/restart auto-advance timer
  const startCarouselTimer = useCallback(() => {
    if (data.media_type !== 'carousel' || !data.carousel_images?.length) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.carousel_images!.length);
    }, 5000);
  }, [data.media_type, data.carousel_images]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    startCarouselTimer();
  }, [startCarouselTimer]);

  const goToPrevSlide = useCallback(() => {
    if (!data.carousel_images) return;
    setCurrentSlide((prev) => (prev - 1 + data.carousel_images!.length) % data.carousel_images!.length);
    startCarouselTimer();
  }, [data.carousel_images, startCarouselTimer]);

  const goToNextSlide = useCallback(() => {
    if (!data.carousel_images) return;
    setCurrentSlide((prev) => (prev + 1) % data.carousel_images!.length);
    startCarouselTimer();
  }, [data.carousel_images, startCarouselTimer]);

  // Auto-advance carousel
  useEffect(() => {
    startCarouselTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startCarouselTimer]);

  // Fade title after delay for video heroes
  useEffect(() => {
    if (!ENABLE_TITLE_FADE || data.media_type !== 'video') return;

    const timeout = setTimeout(() => {
      setTitleVisible(false);
    }, VIDEO_TITLE_FADE_DELAY);

    return () => clearTimeout(timeout);
  }, [data.media_type]);

  // Fade title when carousel moves past first slide
  useEffect(() => {
    if (!ENABLE_TITLE_FADE || data.media_type !== 'carousel') return;

    setTitleVisible(currentSlide === 0);
  }, [currentSlide, data.media_type]);

  const openVideo = () => {
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
  };

  const heightClass = {
    tall: 'h-[80vh]',
    medium: 'h-[70vh]',
    compact: 'h-[50vh]',
    short: 'h-[50vh] min-h-[350px]',
  }[data.height || 'tall'];

  // Solid-colour hero: no media, section renders on its section_theme colour
  // with a subtle gradient overlay for text depth.
  const colorBgClass = {
    dark: 'bg-brand-forest',
    forest: 'bg-brand-forest',
    accent: 'bg-brand-daisy',
    light: 'bg-white',
  }[data.section_theme] || 'bg-brand-forest';
  const isColorHero = data.media_type === 'color' || (!data.image && !data.video_url && !data.carousel_images?.length);

  const spacingBottomClass = {
    none: 'mb-0',
    small: 'mb-8',
    default: 'mb-16 lg:mb-24',
    large: 'mb-[100px]',
  }[data.spacing_bottom || 'large'];

  // Short/color heroes default to centred text (rates-style banners); taller
  // heroes with media default to bottom-aligned text.
  const centredTextDefault = isColorHero || data.height === 'short' || data.height === 'compact';
  const textPositionClass =
    data.text_position === 'center' || (centredTextDefault && data.text_position !== 'bottom')
      ? 'items-center justify-center'
      : 'items-end justify-center pb-24 lg:pb-32';

  const overlayOpacity = data.overlay_opacity ?? 20;

  return (
    <>
      <section className={`relative ${heightClass} w-full flex ${textPositionClass} ${spacingBottomClass} overflow-hidden ${isColorHero ? colorBgClass : ''}`}>
        {/* Background Media with Parallax */}
        <div
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          {isColorHero && (
            <div className={`absolute inset-0 ${colorBgClass} bg-gradient-to-b from-brand-forest/80 to-brand-forest`} />
          )}
          {data.media_type === 'video' && data.video_url && (
            <video
              src={data.video_url}
              poster={data.image?.url}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover scale-110"
              aria-label={data.image?.alt || data.heading}
            />
          )}

          {data.media_type === 'image' && data.image && (
            <Image
              src={data.image.url}
              alt={data.image.alt}
              fill
              className="object-cover scale-110"
              priority
            />
          )}

          {data.media_type === 'carousel' && data.carousel_images && (
            <>
              {data.carousel_images.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
              {/* Carousel Navigation */}
              {data.carousel_images.length > 1 && (
                <>
                  <button
                    onClick={goToPrevSlide}
                    className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={goToNextSlide}
                    className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                  {/* Dots */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {data.carousel_images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* Dark overlay for text legibility */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/40"
            style={{ opacity: overlayOpacity / 100 * 2 }}
          />
        </div>

        {/* Content */}
        <div className={`relative z-10 container mx-auto px-4 text-center text-white transition-opacity duration-1000 ${
          ENABLE_TITLE_FADE && !titleVisible ? 'opacity-0' : 'opacity-100'
        }`}>
          {data.eyebrow && (
            <span className="text-brand-gold font-script text-4xl md:text-5xl lg:text-6xl block mb-4">
              {data.eyebrow}
            </span>
          )}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl mb-4 lg:mb-6 leading-tight">
            {data.heading}
          </h1>
          {data.subheading && (
            <p className="text-lg md:text-xl lg:text-2xl mb-8 lg:mb-12 max-w-3xl mx-auto font-light">
              {data.subheading}
            </p>
          )}
          {data.cta && (
            <Link
              href={data.cta.url}
              target={data.cta.target}
              rel={data.cta.target === '_blank' ? 'noopener noreferrer' : undefined}
              className="inline-block bg-white hover:bg-white/90 text-brand-forest px-6 pt-2 pb-1.5 rounded-full font-semibold transition-all duration-200 uppercase tracking-wide"
            >
              {data.cta.title}
            </Link>
          )}
        </div>

        {/* Play Button - Bottom Left */}
        {data.show_play_button && (
          <button
            onClick={openVideo}
            className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 z-20 bg-white/90 hover:bg-white text-brand-forest p-4 lg:p-5 rounded-full transition-all duration-200 group"
            aria-label="Play video"
          >
            <Play className="h-6 w-6 lg:h-8 lg:w-8 fill-current" />
          </button>
        )}
      </section>

      {/* Video Lightbox */}
      {isVideoOpen && data.video_modal_url && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={closeVideo}
        >
          {/* Close Button */}
          <button
            onClick={closeVideo}
            className="absolute top-4 right-4 lg:top-8 lg:right-8 text-white hover:text-brand-gold transition-colors z-10"
            aria-label="Close video"
          >
            <X className="h-8 w-8 lg:h-10 lg:w-10" />
          </button>

          {/* Video Container */}
          <div
            className="relative w-full max-w-7xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src={data.video_modal_url}
              title="Video"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
