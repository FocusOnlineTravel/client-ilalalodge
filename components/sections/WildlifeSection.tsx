import Image from 'next/image';
import { WildlifeBlock } from '@/types/acf';

interface Props {
  data: WildlifeBlock;
}

export default function WildlifeSection({ data }: Props) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-brand-daisy to-white" id="nature">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6 px-8 lg:px-20">
            <span className="text-brand-gold font-serif text-sm lg:text-base uppercase tracking-wider block">
              {data.wildlife_eyebrow}
            </span>
            <h2 className="font-serif text-[2.2rem] text-brand-forest leading-tight">
              {data.wildlife_heading}
            </h2>
            <p className="text-brand-stem text-[1rem] leading-relaxed">
              {data.wildlife_body_copy}
            </p>
            <a
              href={data.wildlife_cta.url}
              target={data.wildlife_cta.target}
              rel={data.wildlife_cta.target === '_blank' ? 'noopener noreferrer' : undefined}
              className="inline-block border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 rounded-full font-semibold transition-all duration-200 uppercase tracking-wide mt-8"
            >
              Explore The Falls
            </a>
          </div>

          {/* Image Grid - 2x2 */}
          <div className="grid grid-cols-2 gap-4">
            {data.wildlife_images.map((image, index) => (
              <div
                key={index}
                className="relative h-[200px] lg:h-[250px] overflow-hidden"
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
