import Image from 'next/image';
import { CtaBannerBlock } from '@/types/acf';
import FadeInView from '@/components/animations/FadeInView';

interface Props {
  data: CtaBannerBlock;
}

export default function CtaBannerSection({ data }: Props) {
  return (
    <section className="relative w-full h-[500px] lg:h-[600px] overflow-hidden">
      <div className="flex h-full">
        {/* Left Side - Dark Overlay with Content */}
        <div className="w-full lg:w-[40%] bg-[#3d3d3d] flex items-center justify-center px-8 lg:px-16">
          <div className="text-center text-white space-y-8 px-4 lg:px-8">
            <FadeInView>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight px-4 lg:px-12">
                Ready to experience Victoria Falls for yourself?
              </h2>
            </FadeInView>
            <FadeInView delay={150}>
              <a
                href={data.cta_banner_cta.url}
                target={data.cta_banner_cta.target}
                rel={data.cta_banner_cta.target === '_blank' ? 'noopener noreferrer' : undefined}
                className="inline-block border border-white text-white hover:bg-white hover:text-brand-forest px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 rounded-full font-semibold transition-all duration-200 uppercase tracking-wide"
              >
                {data.cta_banner_cta.label}
              </a>
            </FadeInView>
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
