import Image from 'next/image';
import Link from 'next/link';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import { BOOKING_URL } from '@/lib/constants';

export const metadata = {
  title: 'Gallery | Ilala Lodge Hotel',
  description:
    'A visual tour of Ilala Lodge Hotel — rooms and suites, Cassia Restaurant, the gardens and pool, and the wildlife that grazes on our lawns at the gateway to Victoria Falls.',
};

export default function GalleryPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/intr0-image.png"
            alt="Ilala Lodge Hotel gallery"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4">
            Gallery
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            A visual tour of Ilala Lodge Hotel
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <GalleryGrid />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-brand-forest text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="font-script text-4xl md:text-6xl text-brand-gold mb-2">See it for yourself</p>
          <h2 className="font-serif text-2xl md:text-3xl uppercase tracking-wider mb-6">
            Plan Your Stay
          </h2>
          <p className="text-white/85 mb-8">
            The closest hotel to Victoria Falls — just an 8-minute walk from one of the Seven Natural Wonders of the World.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 pt-2 pb-1.5 bg-white text-brand-forest font-semibold uppercase tracking-wide hover:bg-brand-gold hover:text-white transition-all duration-200 rounded-full text-sm"
            >
              Book Your Stay
            </a>
            <Link
              href="/contact"
              className="inline-block px-6 pt-2 pb-1.5 border border-white text-white font-semibold uppercase tracking-wide hover:bg-white hover:text-brand-forest transition-all duration-200 rounded-full text-sm"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
