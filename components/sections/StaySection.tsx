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
          <div className="grid gap-12 md:gap-16">
            {data.stay_rooms.map((room, index) => (
              <div
                key={index}
                className={`grid gap-8 items-center ${
                  index % 2 === 1 ? 'md:grid-cols-[1.5fr_1fr] md:grid-flow-dense' : 'md:grid-cols-[1fr_1.5fr]'
                }`}
              >
                {/* Image */}
                <div className={`relative aspect-[4/3] md:aspect-[1/1] ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                  <Image
                    src={room.room_image.url}
                    alt={room.room_image.alt}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className={`px-4 md:px-8 lg:px-12 ${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                  <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-4">
                    {room.room_name}
                  </h2>
                  <p className="text-brand-forest/70 leading-relaxed mb-6">
                    {room.room_description}
                  </p>

                  {/* Room Details */}
                  <div className="mb-6">
                    <div className="text-lg font-serif text-brand-forest">
                      <span className="text-xs uppercase tracking-wider text-brand-stem/60 mr-2">From</span>
                      {room.room_price_from.replace('From ', '')}
                      {room.room_price_suffix && (
                        <span className="text-sm text-brand-stem/70"> {room.room_price_suffix.replace('per night', 'pn')}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
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
                      className="px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 bg-brand-forest text-white font-semibold uppercase tracking-wide hover:bg-brand-forest/90 transition-all duration-200 hover:shadow-lg rounded-full"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
