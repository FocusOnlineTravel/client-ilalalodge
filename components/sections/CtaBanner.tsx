import Image from 'next/image';
import Link from 'next/link';
import { CtaBannerSection } from '@/types/sections';
import FadeInView from '@/components/animations/FadeInView';
import ServiceCTAs from '@/components/ui/ServiceCTAs';

interface Props {
  data: CtaBannerSection;
}

export default function CtaBanner({ data }: Props) {
  const isSplit = data.layout === 'split';
  const hasImage = data.background_type === 'image' && data.background_image;

  const bgClass = {
    light: 'bg-white',
    dark: 'bg-[#3d3d3d]',
    accent: 'bg-brand-gold',
    forest: 'bg-brand-forest',
  }[data.section_theme];

  const textColorClass = data.section_theme === 'light' ? 'text-brand-forest' : 'text-white';
  const subTextColorClass = data.section_theme === 'light' ? 'text-brand-stem' : 'text-white/80';

  // Split layout (homepage style)
  if (isSplit && hasImage) {
    return (
      <section className="relative w-full h-[500px] lg:h-[600px] overflow-hidden" id={data.anchor_id}>
        <div className="flex h-full">
          {/* Left Side - Dark Overlay with Content */}
          <div className={`w-full lg:w-[40%] ${bgClass} flex items-center justify-center px-8 lg:px-16`}>
            <div className={`text-center ${textColorClass} space-y-8 px-4 lg:px-8`}>
              <FadeInView>
                {data.eyebrow && (
                  <span className="text-brand-gold font-script text-4xl md:text-5xl block mb-4">
                    {data.eyebrow}
                  </span>
                )}
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight px-4 lg:px-12">
                  {data.heading}
                </h2>
              </FadeInView>
              <FadeInView delay={150}>
                {data.cta_primary && (
                  <Link
                    href={data.cta_primary.url}
                    target={data.cta_primary.target}
                    rel={data.cta_primary.target === '_blank' ? 'noopener noreferrer' : undefined}
                    className="inline-block border border-white text-white hover:bg-white hover:text-brand-forest px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 rounded-full font-semibold transition-all duration-200 uppercase tracking-wide"
                  >
                    {data.cta_primary.title}
                  </Link>
                )}
              </FadeInView>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="hidden lg:block lg:w-[60%] relative">
            <Image
              src={data.background_image!.url}
              alt={data.background_image!.alt}
              fill
              className="object-cover"
              sizes="60vw"
            />
          </div>
        </div>
      </section>
    );
  }

  // Centered layout with image background
  if (hasImage) {
    return (
      <section className="relative py-24 md:py-32 overflow-hidden" id={data.anchor_id}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={data.background_image!.url}
            alt={data.background_image!.alt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[72rem] mx-auto px-4 text-center text-white">
          {data.eyebrow && (
            <span className="text-brand-gold font-script text-5xl md:text-[6.5rem] block mb-4">
              {data.eyebrow}
            </span>
          )}
          <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-wide mb-6">
            {data.heading}
          </h2>
          {data.subheading && (
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              {data.subheading}
            </p>
          )}
          {data.content && (
            <p
              className="text-white/80 mb-8"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          )}
          {data.show_service_ctas ? (
            <ServiceCTAs theme="dark" email={data.service_email} />
          ) : data.cta_primary && (
            <Link
              href={data.cta_primary.url}
              target={data.cta_primary.target}
              rel={data.cta_primary.target === '_blank' ? 'noopener noreferrer' : undefined}
              className="inline-block px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 bg-white text-brand-forest font-semibold uppercase tracking-wide hover:bg-brand-gold hover:text-white transition-all duration-200 rounded-full"
            >
              {data.cta_primary.title}
            </Link>
          )}
        </div>
      </section>
    );
  }

  // Download banner: a cta_banner whose primary CTA links to a PDF is rendered
  // as a compact daisy-bg strip with a single large document-icon button, so
  // "Download the Special Offer PDF" doesn't need its own section type in ACF.
  const primaryIsPdf =
    !hasImage &&
    !data.show_service_ctas &&
    data.cta_primary?.url &&
    /\.pdf(\?|#|$)/i.test(data.cta_primary.url);

  if (primaryIsPdf && data.cta_primary) {
    return (
      <section className="py-12 md:py-16 bg-brand-daisy" id={data.anchor_id}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Link
            href={data.cta_primary.url}
            target={data.cta_primary.target || '_blank'}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-brand-forest text-white font-semibold uppercase tracking-wider text-sm hover:bg-brand-forest/90 transition-colors rounded-full"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {data.cta_primary.title}
          </Link>
        </div>
      </section>
    );
  }

  // Centered layout with solid background
  return (
    <section className={`py-24 md:py-32 ${bgClass} ${textColorClass} text-center`} id={data.anchor_id}>
      <div className="max-w-[72rem] mx-auto px-4">
        {data.eyebrow && (
          <p className={`font-script text-5xl md:text-[6.5rem] ${data.section_theme === 'accent' ? 'text-brand-forest' : 'text-brand-gold'} mb-4`}>
            {data.eyebrow}
          </p>
        )}
        <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-wide mb-6">
          {data.heading}
        </h2>
        {data.subheading && (
          <p className={subTextColorClass + ' mb-8 max-w-2xl mx-auto'}>
            {data.subheading}
          </p>
        )}
        {data.content && (
          <p
            className={subTextColorClass + ' mb-8'}
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        )}
        {data.show_service_ctas ? (
          <ServiceCTAs
            theme={data.section_theme === 'light' ? 'light' : 'dark'}
            email={data.service_email}
          />
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {data.cta_primary && (
              <Link
                href={data.cta_primary.url}
                target={data.cta_primary.target}
                rel={data.cta_primary.target === '_blank' ? 'noopener noreferrer' : undefined}
                className={`inline-block px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 font-semibold uppercase tracking-wide transition-all duration-200 rounded-full ${
                  data.section_theme === 'accent'
                    ? 'bg-brand-forest text-white hover:bg-brand-forest/90'
                    : 'bg-white text-brand-forest hover:bg-brand-gold hover:text-white'
                }`}
              >
                {data.cta_primary.title}
              </Link>
            )}
            {data.cta_secondary && (
              <Link
                href={data.cta_secondary.url}
                target={data.cta_secondary.target}
                rel={data.cta_secondary.target === '_blank' ? 'noopener noreferrer' : undefined}
                className="inline-block px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 border border-current font-semibold uppercase tracking-wide hover:bg-white hover:text-brand-forest transition-all duration-200 rounded-full"
              >
                {data.cta_secondary.title}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
