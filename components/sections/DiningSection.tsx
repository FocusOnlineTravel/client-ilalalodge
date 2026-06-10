'use client';

import { useState } from 'react';
import Image from 'next/image';
import { DiningBlock } from '@/types/acf';
import FadeInView from '@/components/animations/FadeInView';
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
  data: DiningBlock;
}

export default function DiningSection({ data }: Props) {
  const [showBookingModal, setShowBookingModal] = useState(false);
  return (
    <section className="py-16 lg:py-24 bg-white" id="dining">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image Grid */}
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              {/* Main large image */}
              <FadeInView className="col-span-2 relative h-[500px] lg:h-[750px] overflow-hidden">
                <Image
                  src={data.dining_images[0]?.url || '/images/dining-1.png'}
                  alt={data.dining_images[0]?.alt || 'Dining'}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </FadeInView>

              {/* Two smaller images */}
              {data.dining_images.slice(1, 3).map((image, index) => (
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
          </div>

          {/* Text Content */}
          <FadeInView direction="right" className="order-1 lg:order-2 space-y-6 px-8 lg:px-20">
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
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="inline-block border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 rounded-full font-semibold transition-all duration-200 uppercase tracking-wide cursor-pointer"
                >
                  {data.dining_cta_secondary.label}
                </button>
              )}
            </div>

            {/* Bottom images */}
            <div className="grid grid-cols-2 gap-4 !mt-[50px]">
              {data.dining_images.slice(3, 5).map((image, index) => (
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
