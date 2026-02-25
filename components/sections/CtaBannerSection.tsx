import Image from 'next/image';
import { CtaBannerBlock } from '@/types/acf';

interface Props {
  data: CtaBannerBlock;
}

export default function CtaBannerSection({ data }: Props) {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.cta_banner_image.url}
          alt={data.cta_banner_image.alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-brand-forest/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-6xl mb-4 lg:mb-6 leading-tight">
          {data.cta_banner_heading}
        </h2>
        {data.cta_banner_subheading && (
          <p className="text-lg md:text-xl lg:text-2xl mb-8 lg:mb-12 max-w-3xl mx-auto font-light">
            {data.cta_banner_subheading}
          </p>
        )}
        <a
          href={data.cta_banner_cta.url}
          target={data.cta_banner_cta.target}
          rel={data.cta_banner_cta.target === '_blank' ? 'noopener noreferrer' : undefined}
          className="inline-block bg-brand-gold hover:bg-brand-gold/90 text-brand-forest px-10 py-4 lg:px-12 lg:py-5 rounded-full font-semibold text-base lg:text-lg transition-all duration-200 hover:shadow-2xl uppercase tracking-wide"
        >
          {data.cta_banner_cta.label}
        </a>
      </div>
    </section>
  );
}
