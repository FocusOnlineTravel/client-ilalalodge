import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { accommodationData } from '@/data/accommodation';
import { BOOKING_URL } from '@/lib/constants';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return accommodationData.rooms.map((room) => ({
    slug: room.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const room = accommodationData.rooms.find((r) => r.slug === slug);

  if (!room) {
    return {
      title: 'Room Not Found | Ilala Lodge Hotel',
    };
  }

  return {
    title: `${room.title} | Ilala Lodge Hotel Victoria Falls`,
    description: room.shortDescription,
  };
}

export default async function RoomPage({ params }: Props) {
  const { slug } = await params;
  const room = accommodationData.rooms.find((r) => r.slug === slug);

  if (!room) {
    notFound();
  }

  const currentIndex = accommodationData.rooms.findIndex((r) => r.slug === slug);
  const nextRoom = accommodationData.rooms[currentIndex + 1];
  const prevRoom = accommodationData.rooms[currentIndex - 1];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={room.image}
            alt={room.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <Link
            href="/accommodation"
            className="inline-block text-sm uppercase tracking-wider text-white/80 hover:text-brand-gold transition-colors mb-4"
          >
            &larr; Back to Accommodation
          </Link>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl uppercase tracking-wide">
            {room.title}
          </h1>
        </div>
      </section>

      {/* Room Description */}
      <section className="py-16 md:py-24 bg-brand-daisy">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            {room.description.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-brand-forest/80 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-8">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 bg-brand-forest text-white font-semibold uppercase tracking-wide text-lg hover:bg-brand-forest/90 transition-all duration-200 hover:shadow-lg rounded-full"
            >
              Book This Room
            </a>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest uppercase tracking-wide text-center mb-12">
            Amenities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {room.amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-brand-forest/80"
              >
                <span className="w-2 h-2 bg-brand-gold rounded-full flex-shrink-0" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation to Other Rooms */}
      <section className="py-12 bg-brand-daisy border-t border-brand-stem/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {prevRoom ? (
              <Link
                href={`/accommodation/${prevRoom.slug}`}
                className="group flex items-center gap-2 text-brand-forest hover:text-brand-gold transition-colors"
              >
                <span>&larr;</span>
                <span className="font-serif uppercase tracking-wide">{prevRoom.title}</span>
              </Link>
            ) : (
              <div />
            )}
            {nextRoom ? (
              <Link
                href={`/accommodation/${nextRoom.slug}`}
                className="group flex items-center gap-2 text-brand-forest hover:text-brand-gold transition-colors"
              >
                <span className="font-serif uppercase tracking-wide">{nextRoom.title}</span>
                <span>&rarr;</span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-brand-forest text-white text-center">
        <div className="max-w-[72rem] mx-auto px-4">
          <p className="font-script text-5xl md:text-[6.5rem] text-brand-gold mb-4">
            Experience True African Hospitality
          </p>
          <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-wide mb-6">
            Book Your Stay at Ilala Lodge
          </h2>
          <p className="text-white/80 mb-8">
            Just 936 steps from the magnificent Victoria Falls
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
