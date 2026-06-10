import Image from 'next/image';
import Link from 'next/link';
import FAQAccordion from '@/components/faqs/FAQAccordion';

export const metadata = {
  title: 'FAQs | Ilala Lodge Hotel',
  description:
    'Frequently asked questions about Ilala Lodge Hotel — airport transfers, room amenities, dining, payment, malaria, what to pack, and everything you need to know before you arrive at Victoria Falls.',
};

// Plain text FAQ data for schema markup
const faqSchemaData = [
  { q: 'Do you offer airport transfers to Ilala Lodge Hotel?', a: 'Yes, we do. Victoria Falls Airport — US$21 per person each way (~30 minute drive). Livingstone Airport (Zambia) — US$50 per person each way (~1 hour). Kasane Airport (Botswana) — US$69 per person each way (~1.5–2 hours).' },
  { q: 'How far is Ilala Lodge Hotel from Victoria Falls?', a: 'It is a gentle 8–10 minute walk, only about 936 steps, from the front door of the hotel. Alternatively, we can arrange a taxi for those less mobile.' },
  { q: 'Do I need to rent a car in Victoria Falls?', a: 'It is not necessary to rent a car in Victoria Falls. We provide airport transfers, and inter-hotel transfers and all activities have transfers to and from the hotel included in the cost.' },
  { q: 'How close is the hotel to the centre of Victoria Falls town?', a: 'Our hotel is situated in the heart of the Victoria Falls town centre — within walking distance of both the town and the Victoria Falls waterfall.' },
  { q: 'Is there a declaration form I need to fill out on entry into Zimbabwe?', a: 'Yes, there is. Stay ahead of the queues by completing the Zimbabwean Immigration Declaration form online before you fly at evisa.gov.zw.' },
  { q: 'Do you have Wi-Fi at the hotel?', a: 'Yes, we have free Wi-Fi access throughout the hotel.' },
  { q: 'Do you host weddings at Ilala Lodge Hotel?', a: 'Regrettably, we do not host weddings at our hotel premises. However, we always welcome accommodation-only bookings for weddings held locally.' },
  { q: 'Do you have mosquito nets over the beds?', a: 'Our Classic Suites and Executive Suites have 4-poster mosquito netting over each bed. Our Classic Rooms and Deluxe Rooms do not, but each room has air conditioning, gauzed sliding doors, and extra mosquito spray and cream available. All rooms are equipped with mosquito control devices, and the hotel undertakes seasonal fogging programmes throughout the property to help minimise mosquito activity.' },
  { q: 'Are there fridges in the rooms?', a: 'Each room is equipped with a minibar fridge.' },
  { q: 'How many rooms do you have?', a: 'We currently have 73 rooms, across the Deluxe, Garden and Pool Wings.' },
  { q: 'Do you have hairdryers in the rooms?', a: 'All rooms have hairdryers available.' },
  { q: 'What type of plug points do you have at the hotel? Should I bring an adaptor?', a: 'We mostly have Type D (round) and Type G (square) plug points. Universal plug points and USB ports are available in all rooms. Plug points are available next to the bed.' },
  { q: 'Is it possible to add an extra bed to a Classic Room?', a: 'Unfortunately we cannot add an extra bed to a Classic Room. Our Classic Suites each have a King-size bed plus an additional ¾ bed. For families with children, we recommend interleading Classic or Deluxe Rooms, or the Strathearn Suite.' },
  { q: 'Do you have family rooms?', a: 'There are a number of family options with interleading rooms. Please contact us to find out more.' },
  { q: 'Do you offer babysitting services?', a: 'A babysitter can be arranged on request. Please advise the hotel at least 24 hours before.' },
  { q: 'Do you offer cots for infants?', a: 'Yes, we have cots for infants available on request, arranged in advance.' },
  { q: 'Do you offer car seats for airport transfers?', a: 'Yes, we have car seats available for children on request, arranged in advance.' },
  { q: 'Does your restaurant cater for vegan / kosher / vegetarian / halaal diets?', a: 'Yes, we can cater for specific dietary needs. Please inform the hotel of your requirements a few weeks in advance so the Chef can ensure we have the correct foods in stock for your arrival. Our general menu also offers vegetarian options.' },
  { q: 'Are there ATMs near the hotel?', a: 'Yes, there are ATMs near Ilala Lodge Hotel. We recommend you bring small denomination USD cash to Victoria Falls for shops, entrance into the Falls, curio markets, etc.' },
  { q: 'What currencies do you accept at the hotel?', a: 'We accept US Dollars, Zimbabwe Dollars, Euros, Pounds Sterling and South African Rand.' },
  { q: 'What credit cards do you accept at the hotel?', a: 'Visa and Mastercard are accepted at the hotel.' },
  { q: 'Should I take malaria medication before travelling to Victoria Falls?', a: 'Although Victoria Falls is not considered a high-risk malarial area, it is advisable to seek advice from your doctor before travelling to be 100% safe.' },
  { q: 'When is the best time to visit Victoria Falls?', a: 'From high-water seasons with hot temperatures to the low-water season offering exceptional visibility of the Falls and cooler days, Victoria Falls is a year-round destination. Get in touch with our team to find out which season best suits your preferences.' },
  { q: 'What do I need to pack for my trip to Victoria Falls?', a: "Light and cool clothing for warmer days, with layers for cooler evenings. Don't forget your hat, sunglasses and sunscreen." },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqSchemaData.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
};

export default function FAQsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/Ilala-Lodge-Accommodation-Deluxe-Twin-03.jpg"
            alt="Ilala Lodge Hotel"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Everything you need to know before you arrive
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <FAQAccordion />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-brand-forest text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="font-script text-4xl md:text-5xl text-brand-gold mb-2">Still have questions?</p>
          <h2 className="font-serif text-2xl md:text-3xl uppercase tracking-wider mb-6">
            Get in Touch
          </h2>
          <p className="text-white/85 mb-8">
            Our team is happy to help with anything else you&rsquo;d like to know about your stay.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 pt-2 pb-1.5 bg-white text-brand-forest font-semibold uppercase tracking-wide hover:bg-brand-gold hover:text-white transition-all duration-200 rounded-full text-sm"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
