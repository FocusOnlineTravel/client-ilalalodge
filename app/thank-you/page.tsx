import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Thank You | Ilala Lodge Hotel',
  description:
    'Thank you for contacting Ilala Lodge Hotel. We have received your enquiry and will respond within one business day.',
};

type ThankYouPageProps = {
  searchParams: Promise<{ type?: string }>;
};

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const { type } = await searchParams;
  const isAccommodation = type === 'accommodation';

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/Ilala-Lodge-Exteriors-16.jpg"
            alt="Ilala Lodge Hotel"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <p className="font-script text-4xl md:text-6xl text-brand-gold mb-3">Thank you</p>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4">
            Your Enquiry Has Been Received
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            {isAccommodation
              ? 'Our reservations team will be in touch within one business day.'
              : 'Our team will be in touch within one business day.'}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 md:py-24 bg-brand-daisy">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-lg text-brand-forest/85 leading-relaxed mb-6">
            We&rsquo;ve sent you a confirmation email with a copy of your enquiry for your records. If
            you don&rsquo;t see it in your inbox within a few minutes, please check your spam folder.
          </p>
          <p className="text-lg text-brand-forest/85 leading-relaxed mb-10">
            In the meantime, feel free to explore more about Ilala Lodge and Victoria Falls.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="inline-block px-6 pt-2 pb-1.5 bg-brand-forest text-white font-semibold uppercase tracking-wide hover:bg-brand-gold transition-all duration-200 rounded-full text-sm"
            >
              Back to Home
            </Link>
            {isAccommodation ? (
              <Link
                href="/our-rooms"
                className="inline-block px-6 pt-2 pb-1.5 border border-brand-forest text-brand-forest font-semibold uppercase tracking-wide hover:bg-brand-forest hover:text-white transition-all duration-200 rounded-full text-sm"
              >
                Explore Our Rooms
              </Link>
            ) : (
              <Link
                href="/activities"
                className="inline-block px-6 pt-2 pb-1.5 border border-brand-forest text-brand-forest font-semibold uppercase tracking-wide hover:bg-brand-forest hover:text-white transition-all duration-200 rounded-full text-sm"
              >
                Discover Activities
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
