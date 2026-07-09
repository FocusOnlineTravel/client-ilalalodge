import Image from 'next/image';
import Link from 'next/link';
import ImageLightbox from '@/components/gallery/ImageLightbox';

export const metadata = {
  title: 'Zambezi River Deck Experience | Ilala Lodge Hotel',
  description: 'Dine on the banks of the Zambezi River with an open-fire barbecue-style dinner under the stars, featuring traditional Zimbabwean flavours.',
};

export default function ZambeziRiverDeckPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <video
            src="https://streamable.com/l/e07f94/mp4.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            aria-label="Zambezi River Deck Experience"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4">
            Zambezi River Deck Experience
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Dinner under the stars on the banks of the Zambezi
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-24 bg-brand-daisy">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-lg text-brand-forest/80 leading-relaxed mb-6">
              Dine on the banks of the Zambezi River, on a multi-level wooden deck in the heart of the Zambezi National Park. Situated just a 5-minute drive from Ilala Lodge Hotel, the Riverside Dining Experience offers an open-fire, barbecue-style dinner under the stars.
            </p>
            <p className="text-lg text-brand-forest/80 leading-relaxed">
              Enjoy freshly prepared dishes inspired by traditional Zimbabwean flavours and a selection of alcoholic and non-alcoholic beverages, served by dedicated staff in an unforgettable natural setting.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Details */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] md:h-[500px]">
              <Image
                src="/images/Ilala-Lodge-Experience-Zambezi-River-Deck-24.jpg"
                alt="Zambezi River Deck"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
                The Experience
              </h2>
              <p className="text-brand-forest/80 leading-relaxed mb-4">
                As the sun sets over the Zambezi, you'll be transported to our exclusive riverside deck where the sounds of the African bush provide the perfect backdrop to your evening.
              </p>
              <p className="text-brand-forest/80 leading-relaxed mb-4">
                Our chefs prepare a selection of grilled meats, fresh fish, and vegetarian options over open flames, accompanied by locally-inspired sides and salads.
              </p>
              <p className="text-brand-forest/80 leading-relaxed mb-6">
                The experience includes transfers from Ilala Lodge Hotel, a welcome drink, a full barbecue dinner, and a selection of beverages throughout the evening.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:activities@palmhospitality.co.zw"
                  className="inline-block px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-brand-forest text-white hover:bg-brand-forest/90"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-24 bg-brand-daisy">
        <div className="max-w-7xl mx-auto px-4">
          <ImageLightbox
            images={[
              { src: '/images/Ilala-Lodge-Experience-Zambezi-River-Deck-27.jpg', alt: 'Zambezi River Deck Experience' },
              { src: '/images/Ilala-Lodge-Experience-Zambezi-River-Deck-25.jpg', alt: 'Zambezi River Deck Experience' },
              { src: '/images/Ilala-Lodge-Experience-Zambezi-River-Deck-21.jpg', alt: 'Zambezi River Deck Experience' },
              { src: '/images/Ilala-Lodge-Experience-Zambezi-River-Deck-19.jpg', alt: 'Zambezi River Deck Experience' },
              { src: '/images/Ilala-Lodge-Experience-Zambezi-River-Deck-17.jpg', alt: 'Zambezi River Deck Experience' },
              { src: '/images/Ilala-Lodge-Experience-Zambezi-River-Deck-10.jpg', alt: 'Zambezi River Deck Experience' },
              { src: '/images/Ilala-Lodge-Experience-Zambezi-River-Deck-29.jpg', alt: 'Zambezi River Deck Experience' },
              { src: '/images/Ilala-Lodge-Experience-Zambezi-River-Deck-30.jpg', alt: 'Zambezi River Deck Experience' },
            ]}
            columns="grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          />
        </div>
      </section>

      {/* Back to Dining */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Link
            href="/dining"
            className="text-sm uppercase tracking-wider text-brand-stem hover:text-brand-gold transition-colors"
          >
            &larr; Back to Dining
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-brand-forest text-white text-center">
        <div className="max-w-[72rem] mx-auto px-4">
          <p className="font-script text-5xl md:text-[6.5rem] text-brand-gold mb-4">
            An Unforgettable Evening
          </p>
          <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-wide mb-6">
            Reserve Your Experience
          </h2>
          <p className="text-white/80 mb-8">
            Contact our team to arrange your Zambezi River Deck dining experience.
          </p>
          <a
            href="mailto:activities@palmhospitality.co.zw"
            className="inline-block px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-white text-brand-forest hover:bg-brand-gold hover:text-white"
          >
            Email Us
          </a>
        </div>
      </section>
    </>
  );
}
