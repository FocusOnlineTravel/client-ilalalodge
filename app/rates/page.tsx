import Link from 'next/link';
import { BOOKING_URL } from '@/lib/constants';
import ServiceCTAs from '@/components/ui/ServiceCTAs';
import TermsAccordion from '@/components/rates/TermsAccordion';

export const metadata = {
  title: 'Rates | Ilala Lodge Hotel Victoria Falls',
  description:
    'View accommodation rates at Ilala Lodge Hotel Victoria Falls. Classic Rooms, Deluxe Rooms, Suites and transfer prices.',
};

const roomRates = [
  {
    category: 'Classic Rooms',
    rooms: [
      {
        name: 'Classic Room',
        sharing: 246,
        single: 351,
        viewLink: '/our-rooms/classic-rooms',
        viewLabel: 'View Rooms',
      },
    ],
  },
  {
    category: 'Deluxe Rooms',
    rooms: [
      {
        name: 'Deluxe Room',
        sharing: 284,
        single: 405,
        viewLink: '/our-rooms/deluxe-rooms',
        viewLabel: 'View Rooms',
      },
    ],
  },
  {
    category: 'Classic Suites',
    rooms: [
      {
        name: 'Classic Suite',
        sharing: 351,
        single: 439,
        viewLink: '/our-rooms/classic-suites',
        viewLabel: 'View Suites',
      },
    ],
  },
  {
    category: 'Executive Suite',
    rooms: [
      {
        name: 'Executive Suite',
        sharing: 406,
        single: 508,
        viewLink: '/our-rooms/executive-suites',
        viewLabel: 'View Suites',
      },
    ],
  },
  {
    category: 'Strathearn Suite',
    rooms: [
      {
        name: 'Strathearn Suite',
        sharing: 540,
        single: 675,
        viewLink: '/our-rooms/strathearn-suite',
        viewLabel: 'View Suite',
      },
    ],
  },
];

const transferPrices = [
  {
    route: 'Victoria Falls Airport to Victoria Falls Town',
    price: 'US$21pp one way',
  },
  {
    route: 'Victoria Falls Inter Hotel Transfer',
    price: 'US$9pp one way',
  },
  {
    route: 'Victoria Falls Town to Livingstone Town / Airport (including $2.50 toll fee)',
    price: 'US$50pp one way',
  },
  {
    route: 'Victoria Falls Town to Kasane Town / Airport, Botswana',
    price: 'US$69pp one way',
  },
];

export default function RatesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-brand-forest">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-forest/80 to-brand-forest" />
        <div className="relative z-10 text-center text-white px-4">
          <p className="font-script text-4xl md:text-6xl text-brand-gold mb-4">
            Accommodation
          </p>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl">
            Rates
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 md:py-16 bg-brand-daisy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg text-brand-forest/80 leading-relaxed">
            All rates are quoted in US Dollars and include breakfast, 15.5% VAT, and 2% Government Tourism Levy.
          </p>
        </div>
      </section>

      {/* Room Rates */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="space-y-8">
            {roomRates.map((category) => (
              <div key={category.category} className="bg-brand-daisy rounded-lg overflow-hidden">
                {/* Category Header */}
                <div className="bg-brand-forest text-white px-6 py-4">
                  <h2 className="font-serif text-xl md:text-2xl">{category.category}</h2>
                </div>

                {/* Rates Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-brand-stem/20">
                        <th className="px-6 py-3 text-left text-sm font-semibold text-brand-forest uppercase tracking-wider"></th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-brand-forest uppercase tracking-wider">US$</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-brand-forest uppercase tracking-wider"></th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-brand-forest uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.rooms.map((room) => (
                        <>
                          <tr key={`${room.name}-sharing`} className="border-b border-brand-stem/10">
                            <td className="px-6 py-4 text-brand-forest">Sharing per person per night</td>
                            <td className="px-6 py-4 text-center text-brand-forest font-semibold">{room.sharing}</td>
                            <td className="px-6 py-4 text-center">
                              <Link
                                href={room.viewLink}
                                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 border border-brand-stem/30 text-brand-forest hover:border-brand-forest hover:bg-white"
                              >
                                {room.viewLabel}
                              </Link>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <a
                                href={BOOKING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 bg-brand-forest text-white hover:bg-brand-forest/90"
                              >
                                Book Now
                              </a>
                            </td>
                          </tr>
                          <tr key={`${room.name}-single`} className="border-b border-brand-stem/10 bg-white">
                            <td className="px-6 py-4 text-brand-forest">Single per person per night</td>
                            <td className="px-6 py-4 text-center text-brand-forest font-semibold">{room.single}</td>
                            <td className="px-6 py-4 text-center">
                              <Link
                                href={room.viewLink}
                                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 border border-brand-stem/30 text-brand-forest hover:border-brand-forest hover:bg-white"
                              >
                                {room.viewLabel}
                              </Link>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <a
                                href={BOOKING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 bg-brand-forest text-white hover:bg-brand-forest/90"
                              >
                                Book Now
                              </a>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transfer Prices */}
      <section className="py-16 md:py-24 bg-brand-daisy">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-forest">Transfer Prices</h2>
          </div>

          <div className="bg-white rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-brand-forest text-white">
                    <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider text-sm">Transfer</th>
                    <th className="px-6 py-4 text-right font-semibold uppercase tracking-wider text-sm">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {transferPrices.map((transfer, index) => (
                    <tr
                      key={transfer.route}
                      className={index % 2 === 0 ? 'bg-brand-daisy/50' : 'bg-white'}
                    >
                      <td className="px-6 py-4 text-brand-forest">{transfer.route}</td>
                      <td className="px-6 py-4 text-right text-brand-forest font-semibold whitespace-nowrap">{transfer.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Terms & Conditions */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <TermsAccordion />
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="py-16 md:py-20 bg-brand-gold">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-brand-forest mb-4">
            Looking for a Better Deal?
          </h2>
          <p className="text-brand-forest/80 mb-8 max-w-2xl mx-auto">
            Check out our special offers for seasonal savings and value-added packages.
          </p>
          <Link
            href="/special-offers"
            className="inline-block px-8 py-3 rounded-full font-semibold uppercase tracking-wider text-sm transition-all duration-200 bg-brand-forest text-white hover:bg-brand-forest/90"
          >
            View Special Offers
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-brand-forest text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="font-script text-4xl md:text-6xl text-brand-gold mb-4">
            Questions?
          </p>
          <h2 className="font-serif text-2xl md:text-4xl uppercase tracking-wide mb-6">
            Contact Our Reservations Team
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Our team is ready to assist with any queries about rates, availability, or special requests.
          </p>
          <ServiceCTAs theme="dark" email="onlinereservations@ilalalodge.com" />
        </div>
      </section>
    </>
  );
}
