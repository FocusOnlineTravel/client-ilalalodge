import Image from 'next/image';
import Link from 'next/link';
import { CardGridSection, Card } from '@/types/sections';
import FadeInView from '@/components/animations/FadeInView';
import CardCarousel from '@/components/activities/CardCarousel';

// Map room names to their slugs
const roomSlugMap: Record<string, string> = {
  'Classic Rooms': 'classic-rooms',
  'Classic Suites': 'classic-suites',
  'Deluxe Rooms': 'deluxe-rooms',
  'Executive Suites': 'executive-suites',
  'Strathearn Suite': 'strathearn-suite',
};

interface Props {
  data: CardGridSection;
}

function RoomCard({ card, index, isLast, isOdd }: { card: Card; index: number; isLast: boolean; isOdd: boolean }) {
  const slug = roomSlugMap[card.title] || card.title.toLowerCase().replace(/\s+/g, '-');
  const priceDetail = card.details?.find(d => d.icon === 'price');

  return (
    <FadeInView
      delay={index * 100}
      className={`flex flex-col ${isLast && isOdd ? 'md:col-span-2' : ''}`}
    >
      {/* Image with Price Pill */}
      <Link
        href={card.cta_primary?.url || `/our-rooms/${slug}`}
        className={`relative mb-6 block ${isLast && isOdd ? 'aspect-[8/3]' : 'aspect-[4/3]'}`}
      >
        {card.image && (
          <Image
            src={card.image.url}
            alt={card.image.alt}
            fill
            className="object-cover"
          />
        )}
        {/* Price Pill */}
        {priceDetail && (
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg">
            <div className="text-lg lg:text-xl font-serif text-brand-forest">
              <span className="text-sm uppercase tracking-wider text-brand-stem/60 mr-1">{priceDetail.label}</span>
              <span className="font-semibold">{priceDetail.value}</span>
              <span className="text-sm text-brand-stem/70"> pn</span>
            </div>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <h3 className="font-serif text-2xl lg:text-3xl text-brand-forest mb-2">
          {card.title}
        </h3>

        {/* Single line description */}
        {card.description && (
          <p className="text-brand-forest/70 text-sm lg:text-base mb-6 line-clamp-1">
            {card.description}
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-auto">
          {card.cta_primary && (
            <Link
              href={card.cta_primary.url}
              target={card.cta_primary.target}
              rel={card.cta_primary.target === '_blank' ? 'noopener noreferrer' : undefined}
              className="px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 border border-brand-forest text-brand-forest font-semibold uppercase tracking-wide hover:bg-brand-forest hover:text-white transition-all duration-200 rounded-full"
            >
              {card.cta_primary.title}
            </Link>
          )}
          {card.cta_secondary && (
            <a
              href={card.cta_secondary.url}
              target={card.cta_secondary.target}
              rel={card.cta_secondary.target === '_blank' ? 'noopener noreferrer' : undefined}
              className="px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 bg-brand-forest text-white font-semibold uppercase tracking-wide hover:bg-brand-forest/90 transition-all duration-200 rounded-full"
            >
              {card.cta_secondary.title}
            </a>
          )}
        </div>
      </div>
    </FadeInView>
  );
}

export default function CardGrid({ data }: Props) {
  const bgClass = {
    light: 'bg-white',
    dark: 'bg-brand-forest',
    accent: 'bg-gradient-to-b from-white to-brand-daisy',
    forest: 'bg-brand-forest',
  }[data.section_theme];

  const columns = data.columns || '2';
  const columnClass = {
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns];

  const maxWidthClass = {
    medium: 'max-w-4xl',
    wide: 'max-w-6xl',
    full: 'max-w-7xl',
  }[data.max_width || 'full'];

  const sectionHeadingSizeClass = {
    small: 'text-3xl md:text-4xl',
    default: 'text-3xl lg:text-5xl',
    large: 'text-4xl lg:text-6xl',
  }[data.card_size || 'default'];

  return (
    <section className={`py-16 lg:py-24 ${bgClass}`} id={data.anchor_id || 'accommodation'}>
      <div className={`${maxWidthClass} mx-auto px-4`}>
        {/* Section Header */}
        {(data.eyebrow || data.heading) && (
          <FadeInView>
            {data.card_type === 'image_carousel' ? (
              <div className="text-center mb-12 max-w-3xl mx-auto">
                {data.eyebrow && (
                  <p className="text-sm uppercase tracking-[0.2em] text-brand-gold mb-3">
                    {data.eyebrow}
                  </p>
                )}
                {data.heading && (
                  <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
                    {data.heading}
                  </h2>
                )}
                {data.subheading && (
                  <p className="text-lg text-brand-forest/70 leading-relaxed">
                    {data.subheading}
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center mb-8 lg:mb-12">
                {data.eyebrow && (
                  <span className="text-brand-script font-script text-6xl lg:text-8xl block mb-2">
                    {data.eyebrow}
                  </span>
                )}
                {data.heading && (
                  <h2 className={`font-serif ${sectionHeadingSizeClass} text-brand-forest mb-4`}>
                    {data.heading}
                  </h2>
                )}
                {data.subheading && (
                  <p className="text-brand-stem text-lg max-w-2xl mx-auto">
                    {data.subheading}
                  </p>
                )}
              </div>
            )}
          </FadeInView>
        )}

        {/* Cards Grid */}
        <div className="mx-auto">
          <div className={`grid ${columnClass} gap-8 lg:gap-12`}>
            {data.cards?.map((card, index) => {
              const isLast = index === data.cards!.length - 1;
              const isOdd = data.cards!.length % 2 !== 0;

              if (data.card_type === 'room') {
                return (
                  <RoomCard
                    key={index}
                    card={card}
                    index={index}
                    isLast={isLast}
                    isOdd={isOdd}
                  />
                );
              }

              if (data.card_type === 'image_carousel') {
                const cardBg = data.section_theme === 'light' ? 'bg-brand-daisy' : 'bg-white';
                const imageUrls = (card.carousel_images || []).map((img) => img.url);
                return (
                  <FadeInView key={index} delay={index * 100} className={`${cardBg} overflow-hidden`}>
                    <CardCarousel
                      images={imageUrls}
                      title={card.title}
                      video={card.video_url}
                    />
                    <div className="p-6 lg:p-8">
                      <h3 className="font-serif text-xl lg:text-2xl text-brand-forest mb-3">{card.title}</h3>
                      {card.description && (
                        <p className="text-brand-forest/70 leading-relaxed text-sm lg:text-base">{card.description}</p>
                      )}
                    </div>
                  </FadeInView>
                );
              }

              // Generic card
              const textAlignClass = {
                left: 'text-left',
                center: 'text-center',
                right: 'text-right',
              }[data.text_align || 'left'];

              const headingSizeClass = {
                small: 'text-xl',
                default: 'text-xl lg:text-2xl',
                large: 'text-2xl lg:text-3xl',
              }[data.card_size || 'default'];

              const descriptionSizeClass = {
                small: 'text-sm',
                default: 'text-sm lg:text-base',
                large: 'text-base lg:text-lg',
              }[data.card_size || 'default'];

              const descriptionColorClass = {
                small: 'text-brand-forest/70',
                default: 'text-brand-stem',
                large: 'text-brand-stem',
              }[data.card_size || 'default'];

              return (
                <FadeInView key={index} delay={index * 100} className={`flex flex-col ${textAlignClass}`}>
                  {card.image && (
                    <div className="relative aspect-[4/3] mb-4 overflow-hidden">
                      <Image
                        src={card.image.url}
                        alt={card.image.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3 className={`font-serif ${headingSizeClass} text-brand-forest mb-3`}>
                    {card.title}
                  </h3>
                  {card.description && (
                    <p className={`${descriptionColorClass} ${descriptionSizeClass} mb-4`}>
                      {card.description}
                    </p>
                  )}
                  {card.cta_primary && (
                    <Link
                      href={card.cta_primary.url}
                      className={`text-brand-gold hover:text-brand-forest transition-colors font-semibold uppercase tracking-wide text-sm mt-auto ${textAlignClass === 'text-center' ? 'mx-auto' : ''}`}
                    >
                      {card.cta_primary.title} →
                    </Link>
                  )}
                </FadeInView>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
