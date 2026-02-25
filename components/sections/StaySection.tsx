import Image from 'next/image';
import { StayBlock } from '@/types/acf';

interface Props {
  data: StayBlock;
}

export default function StaySection({ data }: Props) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-brand-daisy" id="accommodation">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-brand-gold font-script text-6xl lg:text-8xl block mb-2">
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

        {/* Room Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {data.stay_rooms.map((room, index) => (
            <div
              key={index}
              className="bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Room Image */}
              <div className="relative h-[300px] lg:h-[350px]">
                <Image
                  src={room.room_image.url}
                  alt={room.room_image.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Room Info */}
              <div className="p-6 lg:p-8 space-y-4">
                <h3 className="font-serif text-2xl lg:text-3xl text-brand-forest">
                  {room.room_name}
                </h3>
                <p className="text-brand-stem leading-relaxed">
                  {room.room_description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-brand-stem/20">
                  <div>
                    <div className="text-2xl font-bold text-brand-forest">
                      {room.room_price_from}
                    </div>
                    {room.room_price_suffix && (
                      <div className="text-sm text-brand-stem">
                        {room.room_price_suffix}
                      </div>
                    )}
                  </div>
                  <a
                    href={room.room_cta.url}
                    target={room.room_cta.target}
                    rel={room.room_cta.target === '_blank' ? 'noopener noreferrer' : undefined}
                    className="bg-brand-gold hover:bg-brand-gold/90 text-brand-forest px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:shadow-lg"
                  >
                    {room.room_cta.label}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
