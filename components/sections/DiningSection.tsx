import Image from 'next/image';
import { DiningBlock } from '@/types/acf';
import { ArrowRight } from 'lucide-react';

interface Props {
  data: DiningBlock;
}

export default function DiningSection({ data }: Props) {
  return (
    <section className="py-16 lg:py-24 bg-white" id="dining">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image Grid */}
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              {/* Main large image */}
              <div className="col-span-2 relative h-[300px] lg:h-[350px] overflow-hidden shadow-lg">
                <Image
                  src={data.dining_images[0]?.url || '/images/dining-1.png'}
                  alt={data.dining_images[0]?.alt || 'Dining'}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Smaller images */}
              {data.dining_images.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  className="relative h-[150px] lg:h-[180px] overflow-hidden shadow-lg"
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

          {/* Text Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <span className="text-brand-script font-script text-6xl lg:text-8xl block">
              {data.dining_eyebrow}
            </span>
            <h2 className="font-serif text-3xl lg:text-5xl text-brand-forest leading-tight">
              {data.dining_heading}
            </h2>
            <h3 className="font-serif text-2xl lg:text-3xl text-brand-greenery">
              {data.dining_subheading}
            </h3>
            <p className="text-brand-stem text-base lg:text-lg leading-relaxed">
              {data.dining_body_copy}
            </p>
            <a
              href={data.dining_cta.url}
              target={data.dining_cta.target}
              rel={data.dining_cta.target === '_blank' ? 'noopener noreferrer' : undefined}
              className="inline-block bg-brand-forest hover:bg-brand-forest/90 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 hover:shadow-lg uppercase tracking-wide"
            >
              {data.dining_cta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
