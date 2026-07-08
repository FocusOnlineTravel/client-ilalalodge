import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Ra-Ikane River Cruise | Ilala Lodge Hotel',
  description: 'Explore the Zambezi River aboard the Ra-Ikane, inspired by the journeys of David Livingstone. An intimate cruise experience with a maximum of 24 guests.',
};

export default function RaIkanePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <video
            src="https://streamable.com/l/hutbn2/mp4.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            aria-label="Ra-Ikane River Cruise"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4">
            Ra-Ikane River Cruise
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            An intimate journey on the Zambezi
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-24 bg-brand-daisy">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-lg text-brand-forest/80 leading-relaxed mb-6">
              Explore the Zambezi River aboard the Ra-Ikane, inspired by the journeys of David Livingstone. With a maximum of 24 guests, the cruise offers a more intimate setting to view birdlife and wildlife along the river and surrounding islands.
            </p>
            <p className="text-lg text-brand-forest/80 leading-relaxed">
              Glide along the tranquil waters as the African sun sets, enjoying refreshments and canapés while spotting hippos, crocodiles, elephants, and an abundance of birdlife along the riverbanks.
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
                src="/images/ilala-boats.jpg"
                alt="Ra-Ikane River Cruise"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
                The Experience
              </h2>
              <p className="text-brand-forest/80 leading-relaxed mb-4">
                The Ra-Ikane offers both sunrise and sunset cruises, each providing a unique perspective of the Zambezi River and its diverse ecosystem.
              </p>
              <p className="text-brand-forest/80 leading-relaxed mb-4">
                Our experienced guides share their knowledge of the river's history, wildlife, and the legacy of the great explorers who once navigated these waters.
              </p>
              <p className="text-brand-forest/80 leading-relaxed mb-6">
                The cruise includes transfers from Ilala Lodge Hotel, refreshments, and light snacks, all enjoyed from the comfort of our purpose-built vessel.
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

      {/* Back to Dining */}
      <section className="py-12 bg-brand-daisy">
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
            Set Sail on the Zambezi
          </p>
          <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-wide mb-6">
            Reserve Your Cruise
          </h2>
          <p className="text-white/80 mb-8">
            Contact our team to arrange your Ra-Ikane river cruise experience.
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
