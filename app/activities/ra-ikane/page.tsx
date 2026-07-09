import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Ra-Ikane River Cruise | Ilala Lodge Hotel',
  description: 'Relive David Livingstone\'s historical journey aboard the Ra-Ikane, one of Victoria Falls\' most exclusive river cruisers with a maximum of 16 guests.',
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
              Relive the historical journey taken by David Livingstone aboard the Ra-Ikane, one of Victoria Falls' most exclusive river cruisers. Accommodating a maximum of just 16 guests, the Ra-Ikane boats offer a more intimate experience of the Zambezi River, personalised service and uninterrupted views.
            </p>
            <p className="text-lg text-brand-forest/80 leading-relaxed">
              Inspired by the riverboats of the early explorers and named after one of David Livingstone's trusted guides, the Ra-Ikane combines classic design with modern comforts. Cruises meander through the channels and islands above Victoria Falls, providing excellent opportunities to spot elephants, hippos, crocodiles and an abundance of birdlife, accompanied by experienced guides who share insights into the river's history, wildlife and ecology.
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

      {/* Cruise Options */}
      <section className="py-16 md:py-24 bg-brand-daisy">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-12">
            {/* Sunset Cruise */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[300px] md:h-[350px]">
                <Image
                  src="/images/Sunset Cruise-1.jpg"
                  alt="Ra-Ikane Luxury Sunset Cruise"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl text-brand-forest mb-2">
                  Ra-Ikane Luxury Sunset Cruise
                </h3>
                <p className="text-sm text-brand-stem mb-1">16:00 – 18:00</p>
                <p className="text-lg font-semibold text-brand-gold mb-4">US$110 per person</p>
                <p className="text-brand-forest/80 leading-relaxed">
                  Enjoy a two-hour sunset cruise on the Zambezi River with premium beverages and canapés while taking in the changing colours of the landscape and watching for wildlife along the riverbanks.
                </p>
              </div>
            </div>

            {/* Breakfast & Birdwatching Cruise */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[300px] md:h-[350px] md:order-2">
                <Image
                  src="/images/Breakfast_Birdwathing Cruise-1.JPG"
                  alt="Ra-Ikane Luxury Breakfast & Birdwatching Cruise"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:order-1">
                <h3 className="font-serif text-2xl md:text-3xl text-brand-forest mb-2">
                  Ra-Ikane Luxury Breakfast & Birdwatching Cruise
                </h3>
                <p className="text-sm text-brand-stem mb-1">07:00 – 09:00</p>
                <p className="text-lg font-semibold text-brand-gold mb-4">US$100 per person</p>
                <p className="text-brand-forest/80 leading-relaxed">
                  Start your day with breakfast on the Zambezi River during one of the best times for birdwatching. The peaceful morning setting offers excellent opportunities to observe the river's abundant birdlife and resident wildlife.
                </p>
              </div>
            </div>

            {/* Lunch Cruise */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[300px] md:h-[350px]">
                <Image
                  src="/images/Lunch Cruise-1.jpg"
                  alt="Ra-Ikane Luxury Lunch Cruise"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl text-brand-forest mb-2">
                  Ra-Ikane Luxury Lunch Cruise
                </h3>
                <p className="text-sm text-brand-stem mb-1">12:00 – 14:00</p>
                <p className="text-lg font-semibold text-brand-gold mb-4">US$100 per person</p>
                <p className="text-brand-forest/80 leading-relaxed">
                  Enjoy a leisurely lunch while cruising the upper Zambezi River. This relaxed midday experience combines freshly prepared cuisine with scenic views and opportunities to spot wildlife in its natural habitat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Dining */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Link
            href="/activities"
            className="text-sm uppercase tracking-wider text-brand-stem hover:text-brand-gold transition-colors"
          >
            &larr; Back to Activities
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
