import Image from 'next/image';
import ServiceCTAs from '@/components/ui/ServiceCTAs';

export const metadata = {
  title: 'Special Offers | Ilala Lodge Hotel Victoria Falls',
  description:
    'Discover exclusive offers at Ilala Lodge Hotel. From seasonal savings to value-added stay packages, experience Victoria Falls for less.',
};

const roomRates = [
  { type: 'Classic Room', sharing: 'US$190', single: 'US$271' },
  { type: 'Deluxe Room', sharing: 'US$230', single: 'US$328' },
  { type: 'Classic Suite', sharing: 'US$295', single: 'US$368' },
  { type: 'Executive Suite', sharing: 'US$341', single: 'US$426' },
  { type: 'Strathearn Suite', sharing: 'US$453', single: 'US$566' },
];

const termsConditions = [
  'Offer valid for new bookings only.',
  'Valid for stays between 1 November 2026 and 31 March 2027, excluding 20 December 2026 to 2 January 2027.',
  'Existing two and three-night value adds remain applicable.',
  'A 20% non-refundable deposit is required within 30 days of confirming the booking. Bookings made within 60 days of arrival require full payment.',
  'Rates include 15.5% VAT and 2% Government Tourism Levy.',
  'Offer is subject to availability and may not be combined with any other promotion.',
];

export default function SpecialOffersPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/Ilala-Lodge-Experience-River-Cruise-Sunset-15.jpg"
            alt="Special Offers at Ilala Lodge Hotel"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <p className="font-script text-4xl md:text-6xl text-brand-gold mb-4">
            Special Offers
          </p>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4">
            Experience Victoria Falls for Less
          </h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-24 bg-brand-daisy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg md:text-xl text-brand-forest/80 leading-relaxed">
            Discover exclusive offers designed to help you experience the very best of Victoria Falls for less. From seasonal savings to value-added stay packages, there&rsquo;s never been a better time to enjoy an unforgettable stay at Ilala Lodge Hotel.
          </p>
        </div>
      </section>

      {/* Seasonal Special Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-brand-gold mb-3">Limited Time Offer</p>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
              Seasonal Special
            </h2>
          </div>

          <div className="prose prose-lg max-w-none text-brand-forest/80 mb-12">
            <p className="leading-relaxed mb-6">
              Take advantage of our Seasonal Special and enjoy an unforgettable stay at Ilala Lodge Hotel at exceptional value. Perfectly positioned just a short walk from the iconic Victoria Falls, our boutique hotel offers the ideal base from which to experience one of the world&rsquo;s greatest natural wonders.
            </p>
            <p className="leading-relaxed">
              Whether you&rsquo;re planning a romantic escape, an adventure-filled holiday or a relaxing getaway, this limited-time offer lets you experience the warmth, comfort and personalised service Ilala Lodge Hotel is known for, while enjoying significant savings on your stay.
            </p>
          </div>

          {/* Rates Table */}
          <div className="bg-brand-daisy rounded-lg overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-brand-forest text-white">
                    <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider text-sm">Room Type</th>
                    <th className="px-6 py-4 text-center font-semibold uppercase tracking-wider text-sm">Sharing<br /><span className="font-normal text-xs normal-case opacity-80">(Per Person Per Night)</span></th>
                    <th className="px-6 py-4 text-center font-semibold uppercase tracking-wider text-sm">Single<br /><span className="font-normal text-xs normal-case opacity-80">(Per Person Per Night)</span></th>
                  </tr>
                </thead>
                <tbody>
                  {roomRates.map((room, index) => (
                    <tr
                      key={room.type}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-brand-daisy'}
                    >
                      <td className="px-6 py-4 font-medium text-brand-forest">{room.type}</td>
                      <td className="px-6 py-4 text-center text-brand-forest/80">{room.sharing}</td>
                      <td className="px-6 py-4 text-center text-brand-forest/80">{room.single}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-brand-daisy/50 border border-brand-stem/20 rounded-lg p-6 md:p-8">
            <h3 className="font-serif text-xl text-brand-forest mb-4">Terms &amp; Conditions</h3>
            <ul className="space-y-2 text-brand-forest/70 text-sm md:text-base">
              {termsConditions.map((term, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-brand-gold flex-shrink-0">•</span>
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Download PDF Section */}
      <section className="py-12 md:py-16 bg-brand-daisy">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <a
            href="https://www.ilalalodge.com/wp-content/uploads/2026/06/ILH_Seasonal-Special_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-brand-forest text-white font-semibold uppercase tracking-wider text-sm hover:bg-brand-forest/90 transition-colors rounded-full"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Special Offer PDF
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-brand-forest text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="font-script text-4xl md:text-6xl text-brand-gold mb-4">
            Ready to book?
          </p>
          <h2 className="font-serif text-2xl md:text-4xl uppercase tracking-wide mb-6">
            Enquire Today
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Start planning your Victoria Falls escape. Contact our reservations team to take advantage of this special offer.
          </p>
          <ServiceCTAs theme="dark" email="onlinereservations@ilalalodge.com" />
        </div>
      </section>
    </>
  );
}
