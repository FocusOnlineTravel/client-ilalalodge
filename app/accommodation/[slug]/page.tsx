import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { accommodationData } from '@/data/accommodation';
import { BOOKING_URL } from '@/lib/constants';
import RoomGallery from '@/components/accommodation/RoomGallery';
import OtherRoomsCarousel from '@/components/accommodation/OtherRoomsCarousel';
import { Maximize2, Users } from 'lucide-react';

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

  const otherRooms = accommodationData.rooms.filter((r) => r.slug !== slug);

  return (
    <>
      {/* Hero Section with Breadcrumb */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={room.image}
            alt={room.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <Link
            href="/accommodation"
            className="inline-block text-sm uppercase tracking-wider text-white/80 hover:text-brand-gold transition-colors mb-4"
          >
            &larr; Back to All Accommodation
          </Link>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4">
            {room.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            {room.shortDescription}
          </p>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-white border-b border-brand-stem/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-12 md:gap-20">
            <div className="text-center">
              <div className="text-xs uppercase tracking-wider text-brand-stem/60 mb-2">Room Size</div>
              <div className="text-2xl font-light text-brand-forest font-serif">{room.size}</div>
            </div>
            <div className="text-center">
              <div className="text-xs uppercase tracking-wider text-brand-stem/60 mb-2">
                {room.roomCount === 1 ? 'Suite' : 'Available Rooms'}
              </div>
              <div className="text-2xl font-light text-brand-forest font-serif">
                {room.roomCount} {room.roomCount === 1 ? 'Suite' : 'Rooms'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs uppercase tracking-wider text-brand-stem/60 mb-2">From Price</div>
              <div className="text-2xl font-light text-brand-forest font-serif">{room.priceFrom}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-brand-daisy">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-8 text-center">
            Our {room.title}
          </h2>
          <div className="prose prose-lg max-w-none">
            {room.description.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-brand-stem text-lg leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16 md:py-20 bg-brand-daisy">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest text-center mb-12">
            Room Amenities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {room.amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-2 h-2 bg-brand-gold rounded-full flex-shrink-0" />
                <span className="text-brand-forest">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest text-center mb-8">
            Gallery
          </h2>
          <RoomGallery images={room.gallery} title={room.title} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-5xl text-brand-forest mb-6">
            Ready to Book Your Stay?
          </h2>
          <p className="text-brand-stem text-lg mb-8 max-w-2xl mx-auto">
            Experience luxury and comfort at {room.title}. Book directly for the best rates and exclusive benefits.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-forest hover:bg-brand-forest/90 text-white px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 rounded-full font-semibold transition-all duration-200 hover:shadow-lg uppercase tracking-wide"
            >
              Book This Room
            </a>
            <Link
              href="/accommodation"
              className="inline-block border border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-white px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 rounded-full font-semibold transition-all duration-200 uppercase tracking-wide"
            >
              View All Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* Other Rooms Carousel */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-brand-daisy">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-brand-gold font-serif text-sm lg:text-base uppercase tracking-wider block mb-2">
              Explore More
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-forest">
              Other Accommodation Options
            </h2>
          </div>
          <OtherRoomsCarousel rooms={otherRooms} />
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/pool.png"
            alt="Ilala Lodge Hotel"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-forest/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <p className="font-script text-5xl md:text-7xl text-brand-gold mb-4">
            Book Your Stay
          </p>
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            The Closest Hotel to Victoria Falls
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Just an 8-minute walk from one of the Seven Natural Wonders of the World
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand-gold hover:bg-brand-gold/90 text-white px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 rounded-full font-semibold uppercase tracking-wide hover:shadow-lg transition-all duration-200"
          >
            Book Now
          </a>
        </div>
      </section>
    </>
  );
}
