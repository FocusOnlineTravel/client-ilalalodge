'use client';

import { useState, useEffect, ReactNode } from 'react';
import { ENABLE_TITLE_FADE, VIDEO_TITLE_FADE_DELAY } from '@/lib/hero-config';

interface VideoHeroProps {
  videoUrl: string;
  children: ReactNode;
}

export default function VideoHero({ videoUrl, children }: VideoHeroProps) {
  const [titleVisible, setTitleVisible] = useState(true);

  // Fade title after delay
  useEffect(() => {
    if (!ENABLE_TITLE_FADE) return;

    const timeout = setTimeout(() => {
      setTitleVisible(false);
    }, VIDEO_TITLE_FADE_DELAY);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center">
      <div className="absolute inset-0">
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <div className={`relative z-10 text-center text-white px-4 transition-opacity duration-1000 ${
        ENABLE_TITLE_FADE && !titleVisible ? 'opacity-0' : 'opacity-100'
      }`}>
        {children}
      </div>
    </section>
  );
}
