import Image from 'next/image';
import { HeroBlock } from '@/types/acf';
import { ChevronDown } from 'lucide-react';

interface Props {
  data: HeroBlock;
}

export default function HeroSection({ data }: Props) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center mb-[100px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.hero_background_image.url}
          alt={data.hero_background_image.alt}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
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
        <a
          href={data.hero_cta.url}
          target={data.hero_cta.target}
          rel={data.hero_cta.target === '_blank' ? 'noopener noreferrer' : undefined}
          className="inline-block bg-white hover:bg-white/90 text-brand-forest px-10 py-4 lg:px-12 lg:py-5 rounded-full font-semibold text-base lg:text-lg transition-all duration-200 hover:shadow-2xl uppercase tracking-wide"
        >
          {data.hero_cta.label}
        </a>
      </div>
    </section>
  );
}
