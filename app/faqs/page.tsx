import Image from 'next/image';
import Link from 'next/link';
import FAQAccordion from '@/components/faqs/FAQAccordion';

export const metadata = {
  title: 'FAQs | Ilala Lodge Hotel',
  description:
    'Frequently asked questions about Ilala Lodge Hotel — airport transfers, room amenities, dining, payment, malaria, what to pack, and everything you need to know before you arrive at Victoria Falls.',
};

export default function FAQsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
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
