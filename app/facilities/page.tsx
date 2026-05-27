import Image from 'next/image';
import Link from 'next/link';
import { BOOKING_URL } from '@/lib/constants';
import ServiceCTAs from '@/components/ui/ServiceCTAs';

export const metadata = {
  title: 'Our Facilities | Ilala Lodge Hotel',
  description: 'Discover the facilities at Ilala Lodge Hotel - poolside bar, swimming pools, spa treatments, conferencing, and tours desk.',
};

const roomFacilities = [
  { icon: 'air-conditioning', label: 'Air Conditioning' },
  { icon: 'ceiling-fans', label: 'Ceiling Fans' },
  { icon: 'complimentary-wifi', label: 'Complimentary WiFi' },
  { icon: 'satellite-television', label: 'Satellite Television' },
  { icon: 'in-room-dining', label: 'In-Room Dining' },
  { icon: 'tea-and-coffee-making-facilities', label: 'Tea & Coffee Facilities' },
  { icon: 'min-bar', label: 'Mini Bar' },
  { icon: 'digital-safe', label: 'Digital Safe' },
  { icon: 'writing-desk', label: 'Writing Desk' },
  { icon: 'hair-dryers', label: 'Hair Dryers' },
  { icon: 'laundry-service', label: 'Laundry Service' },
  { icon: 'room-telephones', label: 'Room Telephones' },
  { icon: 'garden-views', label: 'Garden Views' },
  { icon: 'luggage-storage', label: 'Luggage Storage' },
  { icon: 'international-plug-points-and-usb-charging', label: 'International Plugs & USB Charging' },
  { icon: 'daily-serviced-rooms-with-evening-turndown', label: 'Daily Service & Evening Turndown' },
];

export default function FacilitiesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/pool.png"
            alt="Our Facilities"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4">
            Our Facilities
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Ilala Lodge Hotel
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-24 bg-brand-daisy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg text-brand-forest/80 leading-relaxed">
            Ilala Lodge Hotel offers a range of facilities designed to enhance your stay. From relaxed poolside spaces to conferencing and curated activities, each element is designed for comfort and ease.
          </p>
        </div>
      </section>

      {/* Poolside Bar */}
      <section id="poolside-bar" className="bg-gradient-to-b from-white to-brand-daisy scroll-mt-24">
        <div className="grid md:grid-cols-2 items-center">
          <div className="relative h-[400px] md:h-[600px] lg:h-[700px]">
            <Image
              src="/images/mike-preview/Bar-Ilala-Lodge-2026-03-MvR-18.jpg"
              alt="Poolside Bar"
              fill
              className="object-cover"
            />
          </div>
          <div className="px-6 md:px-12 lg:px-20 py-12 md:py-16">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
              Poolside Bar
            </h2>
            <p className="text-brand-forest/80 leading-relaxed">
              Open daily from 10h00 to 22h00, the Poolside Bar is set alongside the hotel's two swimming pools. The teak bar, crafted from locally sourced railway sleepers, creates a relaxed setting for afternoon drinks and sundowners. Guests can enjoy views over the Victoria Falls National Park and the rising mist of the Falls.
            </p>
          </div>
        </div>
      </section>

      {/* Swimming Pools */}
      <section id="swimming-pools" className="bg-brand-daisy scroll-mt-24">
        <div className="grid md:grid-cols-2 items-center">
          <div className="md:order-2 relative h-[400px] md:h-[600px] lg:h-[700px]">
            <Image
              src="/images/wildlife-1.png"
              alt="Swimming Pools"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:order-1 px-6 md:px-12 lg:px-20 py-12 md:py-16">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
              Swimming Pools
            </h2>
            <p className="text-brand-forest/80 leading-relaxed mb-4">
              Guests can choose between two swimming pools: a larger pool with a shallow end and gentle slope, and a plunge pool on a lower deck overlooking the gardens, National Park, and spray from Victoria Falls.
            </p>
            <p className="text-brand-forest/80 leading-relaxed">
              Both pools are surrounded by timber decks with loungers, umbrellas, and cabana day beds. A poolside lounge offers open-plan seating, a writing desk, games table, books, USB chargers, and plug points, all conveniently located next to the Poolside Bar.
            </p>
          </div>
        </div>
      </section>

      {/* Tours & Activities Desk */}
      <section id="activities-desk" className="bg-white scroll-mt-24">
        <div className="grid md:grid-cols-2 items-center">
          <div className="relative h-[400px] md:h-[600px] lg:h-[700px]">
            <Image
              src="/images/wildlife-3.png"
              alt="Tours & Activities Desk"
              fill
              className="object-cover"
            />
          </div>
          <div className="px-6 md:px-12 lg:px-20 py-12 md:py-16">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
              Tours & Activities Desk
            </h2>
            <p className="text-brand-forest/80 leading-relaxed mb-6">
              The Tours & Activities Desk provides assistance with planning and booking experiences in and around Victoria Falls. The team can arrange activities, transfers, and river cruises, offering a convenient in-house service.
            </p>
            <Link
              href="/activities"
              className="inline-block px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-white text-brand-forest border border-brand-stem/30 hover:border-brand-forest hover:bg-brand-daisy"
            >
              View Activities
            </Link>
          </div>
        </div>
      </section>

      {/* Spa Treatments */}
      <section id="spa" className="bg-gradient-to-b from-white to-brand-daisy scroll-mt-24">
        <div className="grid md:grid-cols-2 items-center">
          <div className="md:order-2 relative h-[400px] md:h-[600px] lg:h-[700px]">
            <Image
              src="/images/dining-2.png"
              alt="Spa Treatments"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:order-1 px-6 md:px-12 lg:px-20 py-12 md:py-16">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
              Spa Treatments
            </h2>
            <p className="text-brand-forest/80 leading-relaxed mb-6">
              A dedicated treatment room offers a selection of spa services, including aromatherapy treatments, massages, manicures, and pedicures - providing a convenient space to relax during your stay.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/documents/Ilala-Spa-Menu_Final.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-white text-brand-forest border border-brand-stem/30 hover:border-brand-forest hover:bg-brand-daisy"
              >
                View Menu
              </a>
              <ServiceCTAs theme="light" align="start" />
            </div>
          </div>
        </div>
      </section>

      {/* Conferencing & Event Facilities */}
      <section id="conferencing" className="bg-brand-daisy scroll-mt-24">
        <div className="grid md:grid-cols-2 items-center">
          <div className="relative h-[400px] md:h-[600px] lg:h-[700px]">
            <Image
              src="/images/banner-image.png"
              alt="Conferencing & Event Facilities"
              fill
              className="object-cover"
            />
          </div>
          <div className="px-6 md:px-12 lg:px-20 py-12 md:py-16">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
              Conferencing & Event Facilities
            </h2>
            <p className="text-brand-forest/80 leading-relaxed mb-4">
              The hotel's conferencing space offers a private setting for meetings, events, and small gatherings. Facilities include Wi-Fi, projector screens, USB connection points, and tea and coffee service.
            </p>
            <p className="text-brand-forest/80 leading-relaxed mb-6">
              Within the spacious suite, the conferencing room can be arranged in a variation of formats, from U-shape, boardroom, theatre style and more. The suite is suitable for a maximum of 30 guests.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/gallery?filter=conferencing"
                className="inline-block px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-white text-brand-forest border border-brand-stem/30 hover:border-brand-forest hover:bg-brand-daisy"
              >
                View Gallery
              </Link>
              <ServiceCTAs theme="light" align="start" />
            </div>
          </div>
        </div>
      </section>

      {/* Room Facilities Icons */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest text-center mb-12">
            In-Room Amenities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 lg:gap-10">
            {roomFacilities.map((facility) => (
              <div key={facility.icon} className="flex flex-col items-center text-center gap-4 p-4">
                <Image
                  src={`/icons/icons-facilities-${facility.icon}.png`}
                  alt={facility.label}
                  width={60}
                  height={60}
                  className="w-14 h-14 object-contain"
                />
                <span className="text-brand-forest text-sm">{facility.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-brand-forest text-white text-center">
        <div className="max-w-[72rem] mx-auto px-4">
          <p className="font-script text-5xl md:text-[6.5rem] text-brand-gold mb-4">
            Experience Our Facilities
          </p>
          <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-wide mb-6">
            Book Your Stay Today
          </h2>
          <p className="text-white/80 mb-8">
            Enjoy all the comforts and amenities Ilala Lodge has to offer.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 bg-white text-brand-forest font-semibold uppercase tracking-wide hover:bg-brand-gold hover:text-white transition-all duration-200 rounded-full"
          >
            Book Now
          </a>
        </div>
      </section>
    </>
  );
}
