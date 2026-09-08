import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/Ilala-Lodge-Exteriors-09.jpg"
          alt="Ilala Lodge Hotel"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="font-serif text-6xl md:text-8xl mb-4">404</h1>
        <p className="text-xl md:text-2xl mb-2">This is not what you were looking for.</p>
        <p className="text-white/80 mb-8 max-w-md mx-auto">
          That page may have moved or no longer exists.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-2 bg-white text-brand-forest font-semibold uppercase tracking-wide hover:bg-brand-gold hover:text-white transition-all duration-200 rounded-full"
          >
            Return Home
          </Link>
          <Link
            href="/contact"
            className="px-6 py-2 border border-white text-white font-semibold uppercase tracking-wide hover:bg-white hover:text-brand-forest transition-all duration-200 rounded-full"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
