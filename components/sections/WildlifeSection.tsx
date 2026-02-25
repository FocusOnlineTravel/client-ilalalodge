import Image from 'next/image';
import { WildlifeBlock } from '@/types/acf';
import { ArrowRight } from 'lucide-react';

interface Props {
  data: WildlifeBlock;
}

export default function WildlifeSection({ data }: Props) {
  return (
    <section className="py-16 lg:py-24 bg-brand-daisy" id="nature">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <span className="text-brand-gold font-script text-6xl lg:text-8xl block">
              {data.wildlife_eyebrow}
            </span>
            <h2 className="font-serif text-3xl lg:text-5xl text-brand-forest leading-tight">
              {data.wildlife_heading}
            </h2>
            <p className="text-brand-stem text-base lg:text-lg leading-relaxed">
              {data.wildlife_body_copy}
            </p>
            <a
              href={data.wildlife_cta.url}
              target={data.wildlife_cta.target}
              rel={data.wildlife_cta.target === '_blank' ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-gold/80 font-semibold transition-colors group"
            >
              {data.wildlife_cta.label}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Image Grid - 2x2 */}
          <div className="grid grid-cols-2 gap-4">
            {data.wildlife_images.map((image, index) => (
              <div
                key={index}
                className="relative h-[200px] lg:h-[250px] overflow-hidden shadow-lg"
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
