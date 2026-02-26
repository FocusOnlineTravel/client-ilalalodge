import Image from 'next/image';
import { IntroBlock } from '@/types/acf';
import { ArrowRight } from 'lucide-react';

interface Props {
  data: IntroBlock;
}

export default function IntroSection({ data }: Props) {
  return (
    <section className="py-0 bg-white w-full" id="about">
      <div className="flex flex-col lg:flex-row w-full">
        {/* Text Content - 40% width */}
        <div className="w-full lg:w-[40%] flex items-center justify-center px-6 py-12 lg:px-12 lg:py-16">
          <div className="space-y-6 w-[75%]">
            <span className="text-brand-gold font-serif text-sm lg:text-base uppercase tracking-wider block">
              {data.intro_eyebrow}
            </span>
            <h2 className="font-serif text-3xl lg:text-5xl text-brand-forest leading-tight">
              {data.intro_heading}
            </h2>
            <p className="text-brand-stem text-base lg:text-lg leading-relaxed">
              {data.intro_body_copy}
            </p>
            <a
              href={data.intro_cta.url}
              target={data.intro_cta.target}
              rel={data.intro_cta.target === '_blank' ? 'noopener noreferrer' : undefined}
              className="inline-block bg-brand-forest hover:bg-brand-forest/90 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 hover:shadow-lg uppercase tracking-wide"
            >
              {data.intro_cta.label}
            </a>
          </div>
        </div>

        {/* Image - 60% width, bleeds to edge */}
        <div className="relative w-full lg:w-[60%] h-[400px] lg:h-[600px] overflow-hidden">
          <Image
            src={data.intro_image.url}
            alt={data.intro_image.alt}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </div>
      </div>
    </section>
  );
}
