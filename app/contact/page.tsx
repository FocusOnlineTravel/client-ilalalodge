import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '@/components/contact/ContactForm';

export const metadata = {
  title: 'Contact Us | Ilala Lodge Hotel',
  description:
    'Get in touch with Ilala Lodge Hotel. General enquiries, accommodation bookings, and reservations — speak with our team for a personalised travel itinerary at Victoria Falls.',
};

const WhatsAppIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    fillRule="evenodd"
    clipRule="evenodd"
    aria-hidden="true"
    className="flex-shrink-0"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.299-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const contactCards = [
  {
    title: 'Direct Bookings',
    intent: 'Accommodation enquiries and online reservations.',
    email: 'onlinereservations@ilalalodge.com',
    phones: ['+263 719 384 920'],
    whatsapp: '263719384920',
  },
  {
    title: 'Hotel Reception & Restaurant',
    intent: 'Front desk, restaurant bookings, and in-house enquiries.',
    email: 'guestrelations@ilalalodge.co.zw',
    phones: ['+263 83 2844737', '+263 83 2844738', '+263 83 2844739'],
    whatsapp: '263832844737',
  },
  {
    title: 'Agent Reservations',
    intent: 'Travel agents and tour operators.',
    email: 'reservations@ilalalodge.co.zw',
    phones: ['+263 83 2844737', '+263 83 2842650', '+263 712 401 814'],
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[450px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/intr0-image.png"
            alt="Ilala Lodge Hotel"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Our team is here to help plan your stay at Victoria Falls
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-20 bg-brand-daisy">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-lg text-brand-forest/80 leading-relaxed">
            Whether it&rsquo;s your first time to Africa or you&rsquo;re a seasoned traveller, our team are here to help compile a personalised travel itinerary and provide all the information you need for an unforgettable holiday. We can offer interesting, informative and helpful advice to make your stay in Victoria Falls perfect in every way.
          </p>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16">
            {/* Form Column */}
            <div>
              <p className="font-script text-4xl md:text-5xl text-brand-gold mb-2">Get in touch</p>
              <h2 className="font-serif text-2xl md:text-3xl text-brand-forest uppercase tracking-wider mb-8">
                Send Us a Message
              </h2>
              <ContactForm />
              <p className="text-xs text-brand-stem/60 mt-6 leading-relaxed">
                Submitting will open your email client with your enquiry pre-filled. We aim to respond within one business day.
              </p>
            </div>

            {/* Contact Info Column */}
            <div className="space-y-6">
              <div>
                <p className="font-script text-4xl md:text-5xl text-brand-gold mb-2">Or reach us directly</p>
                <h2 className="font-serif text-2xl md:text-3xl text-brand-forest uppercase tracking-wider">
                  Direct Channels
                </h2>
              </div>

              {contactCards.map((card) => (
                <div key={card.title} className="bg-brand-daisy p-6 border-l-4 border-brand-gold">
                  <h3 className="font-serif text-xl text-brand-forest mb-1">{card.title}</h3>
                  <p className="text-sm text-brand-stem/80 mb-4">{card.intent}</p>
                  <div className="space-y-2 text-sm">
                    <a
                      href={`mailto:${card.email}`}
                      className="block text-brand-forest hover:text-brand-gold transition-colors break-all"
                    >
                      {card.email}
                    </a>
                    {card.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/\s+/g, '')}`}
                        className="block text-brand-forest hover:text-brand-gold transition-colors"
                      >
                        {p}
                      </a>
                    ))}
                    {card.whatsapp && (
                      <a
                        href={`https://wa.me/${card.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#20BA5A] hover:opacity-80 transition-opacity pt-1"
                      >
                        <WhatsAppIcon size={16} />
                        <span>Chat on WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Find Us */}
      <section className="py-16 md:py-24 bg-brand-forest text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="font-script text-4xl md:text-5xl text-brand-gold mb-2">Find us</p>
          <h2 className="font-serif text-2xl md:text-3xl uppercase tracking-wider mb-6">
            Closest Hotel to Victoria Falls
          </h2>
          <p className="text-white/85 leading-relaxed mb-8 max-w-2xl mx-auto">
            411 Livingstone Way, Victoria Falls, Zimbabwe &mdash; on the A8 (Mosi-Oa-Tunya Road), just before the Victoria Falls Bridge. Eight minutes&rsquo; walk from the entrance gate to the Falls.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/location"
              className="inline-block px-6 pt-2 pb-1.5 bg-white text-brand-forest font-semibold uppercase tracking-wide hover:bg-brand-gold hover:text-white transition-all duration-200 rounded-full text-sm"
            >
              Location & Directions
            </Link>
            <Link
              href="/map"
              className="inline-block px-6 pt-2 pb-1.5 border border-white text-white font-semibold uppercase tracking-wide hover:bg-white hover:text-brand-forest transition-all duration-200 rounded-full text-sm"
            >
              View Map
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
