'use client';

import { useState, useEffect } from 'react';
import { HeroBlock } from '@/types/acf';
import { Play, X } from 'lucide-react';

const HERO_VIDEO_URL = 'https://streamable.com/l/iprhyt/mp4.mp4';

interface Props {
  data: HeroBlock;
}

export default function HeroSection({ data }: Props) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openVideo = () => {
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
  };

  return (
    <>
      <section className="relative h-screen w-full flex items-center justify-center mb-[100px] overflow-hidden">
        {/* Background Video with Parallax */}
        <div
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <video
            src={HERO_VIDEO_URL}
            poster={data.hero_background_image.url}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover scale-110"
            aria-label={data.hero_background_image.alt}
          />
          {/* Dark overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl mb-4 lg:mb-6 leading-tight">
            {data.hero_heading}
          </h1>
          {data.hero_subheading && (
            <p className="text-lg md:text-xl lg:text-2xl mb-8 lg:mb-12 max-w-3xl mx-auto font-light">
              {data.hero_subheading}
            </p>
          )}
        </div>

        {/* Play Button - Bottom Left */}
        <button
          onClick={openVideo}
          className="absolute bottom-8 left-8 lg:bottom-12 lg:left-12 z-20 bg-white/90 hover:bg-white text-brand-forest p-4 lg:p-5 rounded-full transition-all duration-200 group"
          aria-label="Play video"
        >
          <Play className="h-6 w-6 lg:h-8 lg:w-8 fill-current" />
        </button>
      </section>

      {/* Video Lightbox */}
      {isVideoOpen && (
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
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://streamable.com/e/iprhyt?autoplay=1"
              title="Ilala Lodge Hotel Video"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
