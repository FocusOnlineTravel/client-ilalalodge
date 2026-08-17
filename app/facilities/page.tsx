import Image from 'next/image';
import Link from 'next/link';
import { BOOKING_URL } from '@/lib/constants';
import ServiceCTAs from '@/components/ui/ServiceCTAs';
import ImageSlider from '@/components/ui/ImageSlider';
import VideoHero from '@/components/accommodation/VideoHero';

export const metadata = {
  title: 'Our Facilities | Ilala Lodge Hotel',
  description: 'Discover the facilities at Ilala Lodge Hotel - poolside bar, swimming pools, spa treatments, conferencing, and tours desk.',
};

const poolsideBarImages = [
  { src: '/images/Ilala-Lodge-Facilities-Poolside-Bar-06.jpg', alt: 'Poolside Bar' },
  { src: '/images/Ilala-Lodge-Facilities-Poolside-Bar-05.jpg', alt: 'Poolside Bar' },
  { src: '/images/Ilala-Lodge-Facilities-Poolside-Bar-02.jpg', alt: 'Poolside Bar' },
  { src: '/images/IlalaLodgeHotel Poolside Lounge (2).jpg', alt: 'Poolside Lounge' },
];

const activitiesDeskImages = [
  { src: '/images/Ilala-Lodge-Facilities-Activity-Desk-01.jpg', alt: 'Tours & Activities Desk' },
  { src: '/images/Ilala-Lodge-Facilities-Activity-Desk-02.jpg', alt: 'Tours & Activities Desk' },
];

const swimmingPoolsImages = [
  { src: '/images/Ilala-Lodge-Facilities-Pools-05.jpg', alt: 'Swimming Pools' },
  { src: '/images/Ilala-Lodge-Facilities-Pools-30.jpg', alt: 'Swimming Pools' },
  { src: '/images/Ilala-Lodge-Facilities-Pools-01.jpg', alt: 'Swimming Pools' },
];

const conferencingImages = [
  { src: '/images/Ilala-Lodge-Facilities-Conference-Room-01.jpg', alt: 'Conference Room' },
  { src: '/images/Ilala-Lodge-Facilities-Conference-Room-02.jpg', alt: 'Conference Room' },
  { src: '/images/Ilala-Lodge-Facilities-Conference-Room-04.jpg', alt: 'Conference Room' },
  { src: '/images/Ilala-Lodge-Facilities-Conference-Room-05.jpg', alt: 'Conference Room' },
];

const spaImages = [
  { src: '/images/Ilala-Lodge-Facilities-Spa-01.jpg', alt: 'Spa Treatments' },
  { src: '/images/Ilala-Lodge-Facilities-Spa-04.jpg', alt: 'Spa Treatments' },
  { src: '/images/Ilala-Lodge-Facilities-Spa-05.jpg', alt: 'Spa Treatments' },
  { src: '/images/Ilala-Lodge-Facilities-Spa-10.jpg', alt: 'Spa Treatments' },
  { src: '/images/Ilala-Lodge-Facilities-Spa-11.jpg', alt: 'Spa Treatments' },
  { src: '/images/Ilala-Lodge-Facilities-Spa-12.jpg', alt: 'Spa Treatments' },
];

export default function FacilitiesPage() {
  return (
    <>
      {/* Hero Section */}
      <VideoHero videoUrl="https://streamable.com/l/683t2l/mp4-high.mp4">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4">
          Our Facilities
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
          Ilala Lodge Hotel
        </p>
      </VideoHero>

      {/* Introduction */}
      <section className="py-16 md:py-24 bg-brand-daisy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg text-brand-forest/80 leading-relaxed">
            Ilala Lodge Hotel offers a range of facilities designed to enhance your stay. From relaxed poolside spaces to conferencing and curated activities, each element is designed for comfort and ease.
          </p>
        </div>
      </section>

      {/* Poolside Bar */}
      <section id="poolside-bar" className="py-12 md:py-16 bg-gradient-to-b from-white to-brand-daisy scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ImageSlider images={poolsideBarImages} className="h-[400px] md:h-[500px]" />
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
                Poolside Bar
              </h2>
              <p className="text-brand-forest/80 leading-relaxed mb-6">
                Open daily from 10h00 to 22h00, the Poolside Bar is set alongside the hotel's two swimming pools. The teak bar, crafted from locally sourced railway sleepers, creates a relaxed setting for afternoon drinks and sundowners. Guests can enjoy views over the Victoria Falls National Park and the rising mist of the Falls.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://client-ilalalodge.vercel.app/documents/ILH_BeverageList_2026%20(Online).pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-white text-brand-forest border border-brand-stem/30 hover:border-brand-forest hover:bg-brand-daisy"
                >
                  Bar Menu
                </a>
                <a
                  href="https://client-ilalalodge.vercel.app/documents/ILH_SnackMenu_2025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-white text-brand-forest border border-brand-stem/30 hover:border-brand-forest hover:bg-brand-daisy"
                >
                  Snack Menu
                </a>
                <a
                  href="https://client-ilalalodge.vercel.app/documents/ILH_WineList_2026%20(Online).pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-white text-brand-forest border border-brand-stem/30 hover:border-brand-forest hover:bg-brand-daisy"
                >
                  Wine Menu
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Swimming Pools */}
      <section id="swimming-pools" className="py-12 md:py-16 bg-brand-daisy scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2">
              <ImageSlider images={swimmingPoolsImages} className="h-[400px] md:h-[500px]" />
            </div>
            <div className="md:order-1">
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
        </div>
      </section>

      {/* Tours & Activities Desk */}
      <section id="activities-desk" className="py-12 md:py-16 bg-white scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ImageSlider images={activitiesDeskImages} className="h-[400px] md:h-[500px]" />
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
                Tours & Activities Desk
              </h2>
              <p className="text-brand-forest/80 leading-relaxed mb-6">
                The Tours & Activities Desk provides assistance with planning and booking experiences in and around Victoria Falls. The team can arrange activities, transfers, and river cruises, offering a convenient in-house service.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/activities"
                  className="inline-block px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-white text-brand-forest border border-brand-stem/30 hover:border-brand-forest hover:bg-brand-daisy"
                >
                  View Activities
                </Link>
                <a
                  href="tel:+263788097346"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-brand-forest text-white hover:bg-brand-forest/90"
                >
                  Call Us
                </a>
                <a
                  href="mailto:activities@palmhospitality.co.zw"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 border border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-white"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spa Treatments */}
      <section id="spa" className="py-12 md:py-16 bg-gradient-to-b from-white to-brand-daisy scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2">
              <ImageSlider images={spaImages} className="h-[400px] md:h-[500px]" />
            </div>
            <div className="md:order-1">
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
                <ServiceCTAs theme="light" align="start" email="activities@palmhospitality.co.zw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conferencing & Event Facilities */}
      <section id="conferencing" className="py-12 md:py-16 bg-brand-daisy scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ImageSlider images={conferencingImages} className="h-[400px] md:h-[500px]" />
            <div>
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
                <a
                  href="/documents/ILALA-Conferencing-and-Meeting-Suites-Flyer.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-white text-brand-forest border border-brand-stem/30 hover:border-brand-forest hover:bg-brand-daisy"
                >
                  Download Factsheet
                </a>
                <a
                  href="tel:+263788097346"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-brand-forest text-white hover:bg-brand-forest/90"
                >
                  Call Us
                </a>
                <a
                  href="mailto:fnb@ilalalodge.co.zw"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 border border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-white"
                >
                  Email Us
                </a>
              </div>
            </div>
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
