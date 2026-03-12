import Image from 'next/image';
import { CtaBannerBlock } from '@/types/acf';

interface Props {
  data: CtaBannerBlock;
}

export default function CtaBannerSection({ data }: Props) {
  return (
    <section className="relative w-full h-[400px] lg:h-[500px] overflow-hidden">
      <div className="flex h-full">
        {/* Left Side - Dark Overlay with Content */}
        <div className="w-full lg:w-[40%] bg-[#3d3d3d] flex items-center justify-center px-8 lg:px-16">
          <div className="text-center text-white space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
              {data.cta_banner_heading}
            </h2>
            <a
              href={data.cta_banner_cta.url}
              target={data.cta_banner_cta.target}
              rel={data.cta_banner_cta.target === '_blank' ? 'noopener noreferrer' : undefined}
              className="inline-block bg-white hover:bg-white/90 text-brand-forest px-8 py-3 lg:px-10 lg:py-4 rounded-full font-semibold text-sm lg:text-base transition-all duration-200 hover:shadow-lg uppercase tracking-wider"
            >
              {data.cta_banner_cta.label}
            </a>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:block lg:w-[60%] relative">
          <Image
            src={data.cta_banner_image.url}
            alt={data.cta_banner_image.alt}
            fill
            className="object-cover"
            sizes="60vw"
          />
        </div>
      </div>
    </section>
  );
}
