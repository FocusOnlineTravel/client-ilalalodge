import Image from 'next/image';
import Link from 'next/link';
import { accommodationData } from '@/data/accommodation';
import { BOOKING_URL } from '@/lib/constants';

export const metadata = {
  title: 'Accommodation | Ilala Lodge Hotel Victoria Falls',
  description: 'Explore our luxurious rooms and suites at Ilala Lodge Hotel. From Classic Rooms to the exclusive Strathearn Suite, find your perfect Victoria Falls accommodation.',
};

export default function AccommodationPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/STAY.png"
            alt="Ilala Lodge Accommodation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <p className="font-script text-3xl md:text-4xl text-brand-gold mb-4">
            {accommodationData.subtitle}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl uppercase tracking-wide">
            {accommodationData.title}
          </h1>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 md:py-24 bg-brand-daisy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg md:text-xl text-brand-forest/80 leading-relaxed">
            {accommodationData.overview}
          </p>
        </div>
      </section>

      {/* Room Listings */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid gap-12 md:gap-16">
            {accommodationData.rooms.map((room, index) => (
              <div
                key={room.slug}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'md:grid-flow-dense' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative aspect-[4/3] ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                  <Image
                    src={room.image}
                    alt={room.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                  <h2 className="font-serif text-3xl md:text-4xl text-brand-forest uppercase tracking-wide mb-4">
                    {room.title}
                  </h2>
                  <p className="text-brand-forest/70 leading-relaxed mb-6">
                    {room.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={`/accommodation/${room.slug}`}
                      className="inline-block px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 border-2 border-brand-forest text-brand-forest font-semibold uppercase tracking-wide text-lg hover:bg-brand-forest hover:text-white transition-all duration-200 rounded-full"
                    >
                      View Details
                    </Link>
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 bg-brand-forest text-white font-semibold uppercase tracking-wide text-lg hover:bg-brand-forest/90 transition-all duration-200 hover:shadow-lg rounded-full"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-brand-forest text-white text-center">
        <div className="max-w-[72rem] mx-auto px-4">
          <p className="font-script text-5xl md:text-[6.5rem] text-brand-gold mb-4">
            Ready to Experience Victoria Falls?
          </p>
          <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-wide mb-6">
            Book Your Stay Today
          </h2>
          <p className="text-white/80 mb-8">
            Contact our reservations team or book directly online for the best rates.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 bg-white text-brand-forest font-semibold uppercase tracking-wide text-lg hover:bg-brand-gold hover:text-white transition-all duration-200 hover:shadow-lg rounded-full"
          >
            Book Now
          </a>
        </div>
      </section>
    </>
  );
}
