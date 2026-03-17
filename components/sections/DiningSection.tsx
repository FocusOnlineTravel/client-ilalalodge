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
              <div className="col-span-2 relative h-[500px] lg:h-[750px] overflow-hidden">
                <Image
                  src={data.dining_images[0]?.url || '/images/dining-1.png'}
                  alt={data.dining_images[0]?.alt || 'Dining'}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Two smaller images */}
              {data.dining_images.slice(1, 3).map((image, index) => (
                <div
                  key={index}
                  className="relative h-[350px] lg:h-[450px] overflow-hidden"
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
          <div className="order-1 lg:order-2 space-y-6 px-8 lg:px-20">
            <span className="text-brand-gold font-serif text-sm lg:text-base uppercase tracking-wider block">
              {data.dining_eyebrow}
            </span>
            <h2 className="font-serif text-[2.2rem] text-brand-forest leading-tight">
              {data.dining_heading}
            </h2>
            <h3 className="font-serif text-2xl lg:text-3xl text-brand-greenery">
              {data.dining_subheading}
            </h3>
            <p className="text-brand-stem text-[1rem] leading-relaxed">
              {data.dining_body_copy}
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href={data.dining_cta.url}
                target={data.dining_cta.target}
                rel={data.dining_cta.target === '_blank' ? 'noopener noreferrer' : undefined}
                className="inline-block border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 rounded-full font-semibold transition-all duration-200 uppercase tracking-wide"
              >
                {data.dining_cta.label}
              </a>
              {data.dining_cta_secondary && (
                <a
                  href={data.dining_cta_secondary.url}
                  target={data.dining_cta_secondary.target}
                  rel={data.dining_cta_secondary.target === '_blank' ? 'noopener noreferrer' : undefined}
                  className="inline-block border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 rounded-full font-semibold transition-all duration-200 uppercase tracking-wide"
                >
                  {data.dining_cta_secondary.label}
                </a>
              )}
            </div>

            {/* Bottom images */}
            <div className="grid grid-cols-2 gap-4 !mt-[50px]">
              {data.dining_images.slice(3, 5).map((image, index) => (
                <div
                  key={index}
                  className={`relative h-[320px] lg:h-[400px] overflow-hidden ${index === 0 ? 'mt-[80px]' : ''}`}
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
      </div>
    </section>
  );
}
