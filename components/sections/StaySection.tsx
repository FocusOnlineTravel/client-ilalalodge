import Image from 'next/image';
import Link from 'next/link';
import { StayBlock } from '@/types/acf';
import FadeInView from '@/components/animations/FadeInView';

// Map room names to their slugs
const roomSlugMap: Record<string, string> = {
  'Classic Rooms': 'classic-rooms',
  'Classic Suites': 'classic-suites',
  'Deluxe Rooms': 'deluxe-rooms',
  'Executive Suites': 'executive-suites',
  'Strathearn Suite': 'strathearn-suite',
};

interface Props {
  data: StayBlock;
}

export default function StaySection({ data }: Props) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-brand-daisy" id="accommodation">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <FadeInView>
          <div className="text-center mb-12 lg:mb-16">
            <span className="text-brand-script font-script text-6xl lg:text-8xl block mb-2">
              {data.stay_eyebrow}
            </span>
            <h2 className="font-serif text-3xl lg:text-5xl text-brand-forest mb-4">
              {data.stay_heading}
            </h2>
            {data.stay_subheading && (
              <p className="text-brand-stem text-lg max-w-2xl mx-auto">
                {data.stay_subheading}
              </p>
            )}
          </div>
        </FadeInView>

        {/* Room Listings */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {data.stay_rooms.map((room, index) => (
              <FadeInView
                key={index}
                delay={index * 100}
                className={`flex flex-col ${
                  index === data.stay_rooms.length - 1 && data.stay_rooms.length % 2 !== 0
                    ? 'md:col-span-2'
                    : ''
                }`}
              >
                {/* Image with Price Pill */}
                <div className={`relative mb-6 ${
                  index === data.stay_rooms.length - 1 && data.stay_rooms.length % 2 !== 0
                    ? 'aspect-[8/3]'
                    : 'aspect-[4/3]'
                }`}>
                  <Image
                    src={room.room_image.url}
                    alt={room.room_image.alt}
                    fill
                    className="object-cover"
                  />
                  {/* Price Pill */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg">
                    <div className="text-lg lg:text-xl font-serif text-brand-forest">
                      <span className="text-sm uppercase tracking-wider text-brand-stem/60 mr-1">From</span>
                      <span className="font-semibold">{room.room_price_from.replace('From ', '')}</span>
                      {room.room_price_suffix && (
                        <span className="text-sm text-brand-stem/70"> {room.room_price_suffix.replace('per night', 'pn')}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                  <h3 className="font-serif text-2xl lg:text-3xl text-brand-forest mb-2">
                    {room.room_name}
                  </h3>

                  {/* Single line description */}
                  <p className="text-brand-forest/70 text-sm lg:text-base mb-6 line-clamp-1">
                    {room.room_description}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-4 mt-auto">
                    <Link
                      href={`/accommodation/${roomSlugMap[room.room_name] || '#'}`}
                      className="px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 border border-brand-forest text-brand-forest font-semibold uppercase tracking-wide hover:bg-brand-forest hover:text-white transition-all duration-200 rounded-full"
                    >
                      View Details
                    </Link>
                    <a
                      href={room.room_cta.url}
                      target={room.room_cta.target}
                      rel={room.room_cta.target === '_blank' ? 'noopener noreferrer' : undefined}
                      className="px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 bg-brand-forest text-white font-semibold uppercase tracking-wide hover:bg-brand-forest/90 transition-all duration-200 rounded-full"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
