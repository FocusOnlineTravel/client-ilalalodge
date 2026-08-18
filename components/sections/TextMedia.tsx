'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TextMediaSection } from '@/types/sections';
import FadeInView from '@/components/animations/FadeInView';
import ImageSlider from '@/components/ui/ImageSlider';
import ServiceCTAs from '@/components/ui/ServiceCTAs';
import { X, Mail } from 'lucide-react';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    fillRule="evenodd"
    clipRule="evenodd"
    className={className}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.299-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

interface Props {
  data: TextMediaSection;
  pageSlug?: string;
}

export default function TextMedia({ data, pageSlug }: Props) {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const isMediaLeft = data.media_position === 'left';
  const ratio = data.layout_ratio || '50_50';
  const [textWidth, mediaWidth] = ratio === '40_60' ? ['40%', '60%'] : ratio === '60_40' ? ['60%', '40%'] : ['50%', '50%'];

  const bgClass = {
    light: 'bg-white',
    dark: 'bg-brand-forest',
    accent: 'bg-gradient-to-b from-brand-daisy to-white',
    forest: 'bg-brand-forest',
  }[data.section_theme];

  const isDarkTheme = data.section_theme === 'dark' || data.section_theme === 'forest';
  const headingColorClass = isDarkTheme ? 'text-white' : 'text-brand-forest';
  const textColorClass = isDarkTheme ? 'text-white/80' : 'text-brand-forest';
  const contentColorClass = isDarkTheme ? 'text-white/80' : 'text-brand-stem';

  const primaryBtnClass = isDarkTheme
    ? 'bg-white text-brand-forest hover:bg-brand-gold hover:text-white'
    : 'bg-brand-forest text-white hover:bg-brand-forest/90';

  const secondaryBtnClass = isDarkTheme
    ? 'border-white text-white hover:bg-white hover:text-brand-forest'
    : 'border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white';

  // Style class for cta buttons in the grid layout. When the button is a plain
  // link (menu/document/internal page), render as a subtle outlined pill so a
  // sequence of them reads as a uniform group; only tel: / mailto: get the
  // action-emphasis treatment.
  const pillBtnClass =
    'inline-block px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200';
  const ctaStyleClass = (url?: string) => {
    if (!url) return `${pillBtnClass} bg-white text-brand-forest border border-brand-stem/30 hover:border-brand-forest hover:bg-brand-daisy`;
    if (url.startsWith('tel:')) return `${pillBtnClass} bg-brand-forest text-white hover:bg-brand-forest/90`;
    if (url.startsWith('mailto:')) return `${pillBtnClass} border border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-white`;
    return `${pillBtnClass} bg-white text-brand-forest border border-brand-stem/30 hover:border-brand-forest hover:bg-brand-daisy`;
  };

  // Render media based on type - use explicit conditionals for Tailwind to detect classes
  // Default matches original high-tea: h-[400px] md:h-[500px]
  const heightVal = String(data.media_height || '').toLowerCase();
  let mediaHeightClass = 'h-[400px] md:h-[500px]'; // default
  if (heightVal.includes('400')) {
    mediaHeightClass = 'h-[400px] md:h-[400px]';
  } else if (heightVal.includes('500')) {
    mediaHeightClass = 'h-[400px] md:h-[500px]';
  } else if (heightVal.includes('600') || heightVal === 'full') {
    mediaHeightClass = 'h-[400px] lg:h-[600px]';
  } else if (heightVal === 'auto') {
    mediaHeightClass = 'h-auto';
  }

  const renderMedia = () => {
    if (data.media_type === 'image' && data.image) {
      // media_height="auto" means "render at natural aspect ratio". <Image fill>
      // requires the parent to have an explicit height, so use intrinsic sizing
      // instead — otherwise the container collapses to 0 and the image vanishes.
      const isAutoHeight = heightVal === 'auto';
      const imageElement = isAutoHeight ? (
        <div className={`relative w-full overflow-hidden ${data.image_link ? 'group' : ''}`}>
          <Image
            src={data.image.url}
            alt={data.image.alt}
            width={data.image.width || 1600}
            height={data.image.height || 1067}
            className={`w-full h-auto object-cover ${data.image_link ? 'transition-transform duration-500 group-hover:scale-105' : ''}`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ) : (
        <div className={`relative w-full ${mediaHeightClass} overflow-hidden ${data.image_link ? 'group' : ''}`}>
          <Image
            src={data.image.url}
            alt={data.image.alt}
            fill
            className={`object-cover ${data.image_link ? 'transition-transform duration-500 group-hover:scale-105' : ''}`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      );

      if (data.image_link) {
        return (
          <Link href={data.image_link} className="block">
            {imageElement}
          </Link>
        );
      }

      return imageElement;
    }

    if (data.media_type === 'slider' && data.gallery_images && data.gallery_images.length > 0) {
      return (
        <ImageSlider
          images={data.gallery_images.map((img) => ({ src: img.url, alt: img.alt || '' }))}
          className="h-[400px] md:h-[500px]"
        />
      );
    }

    if (data.media_type === 'gallery_grid' && data.gallery_images) {
      // Different grid layouts based on number of images
      if (data.gallery_images.length === 5) {
        // Dining section layout
        return (
          <div className="grid grid-cols-2 gap-4">
            <FadeInView className="col-span-2 relative h-[500px] lg:h-[750px] overflow-hidden">
              <Image
                src={data.gallery_images[0]?.url || ''}
                alt={data.gallery_images[0]?.alt || ''}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </FadeInView>
            {data.gallery_images.slice(1, 3).map((image, index) => (
              <FadeInView
                key={index}
                delay={100 + index * 100}
                className="relative h-[350px] lg:h-[450px] overflow-hidden"
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
        );
      }

      if (data.gallery_images.length === 4) {
        // Wildlife section layout - 2x2 staggered
        return (
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-4">
              {data.gallery_images.filter((_, i) => i % 2 === 0).map((image, index) => (
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
            <div className="flex-1 flex flex-col gap-4 mt-[30px]">
              {data.gallery_images.filter((_, i) => i % 2 === 1).map((image, index) => (
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
        );
      }

      // Default grid
      return (
        <div className="grid grid-cols-2 gap-4">
          {data.gallery_images.map((image, index) => (
            <FadeInView
              key={index}
              delay={index * 100}
              className="relative h-[300px] overflow-hidden"
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </FadeInView>
          ))}
        </div>
      );
    }

    if (data.media_type === 'video' && data.video_url) {
      return (
        <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
          <video
            src={data.video_url}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    return null;
  };

  // Full-width edge-to-edge layout - for 40_60 or 60_40 ratios with image/video,
  // dark/forest-themed sections, or 50_50 on dining page
  const edgeToEdge =
    ratio === '40_60' ||
    ratio === '60_40' ||
    (ratio === '50_50' && pageSlug === 'dining') ||
    ((data.section_theme === 'dark' || data.section_theme === 'forest') &&
      (data.media_type === 'image' || data.media_type === 'video'));
  if (edgeToEdge && (data.media_type === 'image' || data.media_type === 'video')) {
    return (
      <section className={`py-0 ${bgClass} w-full`} id={data.anchor_id}>
        <div className="flex flex-col lg:flex-row w-full">
          {/* Text Content */}
          <div className={`w-full lg:w-[${textWidth}] flex items-center ${isMediaLeft ? 'order-2' : 'order-1 lg:order-1'}`}>
            <FadeInView className="px-12 py-16 md:px-16 md:py-20 lg:px-24 lg:py-24">
              <div className="space-y-6">
                {data.eyebrow && (
                  <span className="text-brand-gold font-serif text-sm lg:text-base uppercase tracking-wider block">
                    {data.eyebrow}
                  </span>
                )}
                <h2 className={`font-serif text-3xl md:text-4xl ${headingColorClass} leading-tight`}>
                  {data.heading}
                </h2>
                <div
                  className={`${contentColorClass} leading-relaxed prose prose-p:my-0`}
                  dangerouslySetInnerHTML={{ __html: data.content }}
                />
                {data.cta_primary && (
                  <Link
                    href={data.cta_primary.url}
                    target={data.cta_primary.target}
                    rel={data.cta_primary.target === '_blank' ? 'noopener noreferrer' : undefined}
                    className={`inline-block ${primaryBtnClass} px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 rounded-full font-semibold transition-all duration-200 uppercase tracking-wide`}
                  >
                    {data.cta_primary.title}
                  </Link>
                )}
              </div>
            </FadeInView>
          </div>

          {/* Media */}
          <div className={`w-full lg:w-[${mediaWidth}] ${isMediaLeft ? 'order-1' : 'order-2'}`}>
            {renderMedia()}
          </div>
        </div>
      </section>
    );
  }

  // Full grid layout (dining/wildlife style)
  const maxWidthMap: Record<string, string> = {
    medium: 'max-w-4xl',
    wide: 'max-w-6xl',
    full: 'max-w-7xl',
  };
  const maxWidthClass = maxWidthMap[data.max_width || ''] || 'max-w-6xl';

  return (
    <section className={`py-16 lg:py-24 ${bgClass}`} id={data.anchor_id}>
      <div className={`${maxWidthClass} mx-auto px-4`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Media */}
          <div className={isMediaLeft ? 'order-2 md:order-1' : 'order-2'}>
            {renderMedia()}
          </div>

          {/* Text Content */}
          <FadeInView
            direction={isMediaLeft ? 'right' : 'left'}
            className={`${isMediaLeft ? 'order-1 md:order-2' : 'order-1'} space-y-6`}
          >
            {data.eyebrow && (
              <span className="text-brand-gold font-serif text-sm lg:text-base uppercase tracking-wider block">
                {data.eyebrow}
              </span>
            )}
            <div className="space-y-1">
              <h2 className={`font-serif text-3xl md:text-4xl ${headingColorClass} leading-tight`}>
                {data.heading}
              </h2>
              {data.subheading && (
                <p className={`text-sm ${contentColorClass}`}>
                  {data.subheading}
                </p>
              )}
              {data.highlight && (
                <p className="text-lg font-semibold text-brand-gold">
                  {data.highlight}
                </p>
              )}
            </div>
            <div
              className={`${contentColorClass} text-[1rem] leading-relaxed [&>p]:mb-4 [&>p:last-child]:mb-0`}
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
            <div className="flex flex-wrap gap-3 mt-8">
              {data.cta_primary && (
                <Link
                  href={data.cta_primary.url}
                  target={data.cta_primary.target}
                  rel={data.cta_primary.target === '_blank' ? 'noopener noreferrer' : undefined}
                  className={ctaStyleClass(data.cta_primary.url)}
                >
                  {data.cta_primary.title}
                </Link>
              )}
              {data.cta_secondary && (
                data.cta_secondary_action === 'booking_modal' ? (
                  <button
                    onClick={() => setShowBookingModal(true)}
                    className={`${ctaStyleClass(data.cta_secondary.url)} cursor-pointer`}
                  >
                    {data.cta_secondary.title}
                  </button>
                ) : (
                  <Link
                    href={data.cta_secondary.url}
                    target={data.cta_secondary.target}
                    rel={data.cta_secondary.target === '_blank' ? 'noopener noreferrer' : undefined}
                    className={ctaStyleClass(data.cta_secondary.url)}
                  >
                    {data.cta_secondary.title}
                  </Link>
                )
              )}
              {data.cta_tertiary && (
                data.cta_tertiary_action === 'booking_modal' ? (
                  <button
                    onClick={() => setShowBookingModal(true)}
                    className={`${ctaStyleClass(data.cta_tertiary.url)} cursor-pointer`}
                  >
                    {data.cta_tertiary.title}
                  </button>
                ) : (
                  <Link
                    href={data.cta_tertiary.url}
                    target={data.cta_tertiary.target}
                    rel={data.cta_tertiary.target === '_blank' ? 'noopener noreferrer' : undefined}
                    className={ctaStyleClass(data.cta_tertiary.url)}
                  >
                    {data.cta_tertiary.title}
                  </Link>
                )
              )}
              {data.show_service_ctas && (
                <ServiceCTAs
                  theme={isDarkTheme ? 'dark' : 'light'}
                  align="start"
                  email={data.service_email}
                />
              )}
            </div>

            {/* Bottom images for 5-image layouts */}
            {data.gallery_images && data.gallery_images.length === 5 && (
              <div className="grid grid-cols-2 gap-4 !mt-[50px]">
                {data.gallery_images.slice(3, 5).map((image, index) => (
                  <FadeInView
                    key={index}
                    delay={index * 100}
                    className={`relative h-[320px] lg:h-[400px] overflow-hidden ${index === 0 ? 'mt-[80px]' : ''}`}
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
            )}
          </FadeInView>
        </div>
      </div>

      {/* Book a Table Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white rounded-lg p-6 lg:p-8 max-w-md mx-4 shadow-2xl">
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 text-brand-stem hover:text-brand-forest transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="font-serif text-2xl text-brand-forest mb-2">
              Book a Table
            </h3>
            <p className="text-brand-stem mb-6 text-sm">
              Contact us to make a reservation:
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/263788097346"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-4 rounded-lg transition-all duration-200 group"
                onClick={() => setShowBookingModal(false)}
              >
                <div>
                  <div className="font-semibold">WhatsApp</div>
                  <div className="text-xs text-white/80">+263 788 097 346</div>
                </div>
                <WhatsAppIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="mailto:fnb@ilalalodge.co.zw"
                className="flex items-center justify-between bg-brand-forest hover:bg-brand-forest/90 text-white px-6 py-4 rounded-lg transition-all duration-200 group"
                onClick={() => setShowBookingModal(false)}
              >
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-xs text-white/80">fnb@ilalalodge.co.zw</div>
                </div>
                <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
