import Image from 'next/image';
import { WildlifeBlock } from '@/types/acf';
import FadeInView from '@/components/animations/FadeInView';

interface Props {
  data: WildlifeBlock;
}

export default function WildlifeSection({ data }: Props) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-brand-daisy to-white" id="nature">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <FadeInView direction="left" className="space-y-6 px-8 lg:px-20">
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
          </FadeInView>

          {/* Image Grid - 2x2 */}
          <div className="flex gap-4">
            {/* Left column */}
            <div className="flex-1 flex flex-col gap-4">
              {data.wildlife_images.filter((_, i) => i % 2 === 0).map((image, index) => (
                <FadeInView
                  key={index}
                  delay={index * 100}
                  className="relative h-[400px] lg:h-[400px] overflow-hidden"
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </FadeInView>
              ))}
            </div>
            {/* Right column - staggered */}
            <div className="flex-1 flex flex-col gap-4 mt-[30px]">
              {data.wildlife_images.filter((_, i) => i % 2 === 1).map((image, index) => (
                <FadeInView
                  key={index}
                  delay={150 + index * 100}
                  className="relative h-[400px] lg:h-[400px] overflow-hidden"
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </FadeInView>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
