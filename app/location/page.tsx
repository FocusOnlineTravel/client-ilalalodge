import Image from 'next/image';

export const metadata = {
  title: 'Location & Victoria Falls | Ilala Lodge Hotel',
  description: 'Discover the closest hotel to Victoria Falls. Located just an 8-minute walk from one of the Seven Natural Wonders of the World.',
};

export default function LocationPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/banner-image-2-cropped.png"
            alt="Victoria Falls landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4">
            Our Location
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            The Closest Hotel to the Falls
          </p>
        </div>
      </section>

      {/* Location Overview */}
      <section className="py-16 md:py-24 bg-brand-daisy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
            Closest Hotel to Victoria Falls
          </h2>
          <p className="text-lg text-brand-forest/80 leading-relaxed mb-6">
            Ilala Lodge Hotel is the closest hotel to Victoria Falls—just an eight-minute walk (approximately 936 steps) from the hotel lobby to the entrance gate.
          </p>
          <p className="text-lg text-brand-forest/80 leading-relaxed mb-6">
            Positioned on the A8 (Mosi-Oa-Tunya Road), just before the Victoria Falls Bridge, the hotel offers easy access to both the Falls and the town centre, with restaurants, activities, and key attractions all within walking distance.
          </p>
          <p className="text-lg text-brand-forest/80 leading-relaxed">
            For those in search of hotels near Victoria Falls Zimbabwe, Ilala Lodge Hotel offers both convenience and a strategic location for exploring the wonders of this renowned destination.
          </p>
        </div>
      </section>

      {/* Getting Here */}
      <section id="getting-here" className="py-16 md:py-24 bg-white scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest text-center mb-12">
            Getting Here
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="font-serif text-2xl text-brand-forest mb-4">By Air</h3>
              <p className="text-brand-forest/70 leading-relaxed">
                Victoria Falls International Airport is located 25km from the hotel, with a transfer time of approximately 25 minutes. The airport connects to major regional hubs including Johannesburg, Cape Town, Harare, Nairobi, and Windhoek.
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="font-serif text-2xl text-brand-forest mb-4">Transfers</h3>
              <p className="text-brand-forest/70 leading-relaxed">
                Airport and local transfers can be arranged through the hotel's Activities Desk. Please note that transfers are not included and must be booked in advance.
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="font-serif text-2xl text-brand-forest mb-4">By Road</h3>
              <p className="text-brand-forest/70 leading-relaxed">
                Victoria Falls is accessible by road from neighbouring countries, including Botswana, South Africa, and Namibia, making it a convenient stop within a wider Southern Africa itinerary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Context */}
      <section id="regional-context" className="py-16 md:py-24 bg-gradient-to-b from-white to-brand-daisy scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest text-center mb-6">
            Regional Context
          </h2>
          <p className="text-lg text-brand-forest/80 leading-relaxed text-center mb-8">
            Victoria Falls is a central hub for exploring Southern Africa, with access to five national parks within 100km.
          </p>
          <ul className="space-y-3 max-w-xl mx-auto mb-8">
            <li className="text-brand-forest/80 flex items-start gap-3">
              <span className="text-brand-gold">•</span>
              Victoria Falls National Park (Zimbabwe)
            </li>
            <li className="text-brand-forest/80 flex items-start gap-3">
              <span className="text-brand-gold">•</span>
              Mosi-oa-Tunya National Park (Zambia)
            </li>
            <li className="text-brand-forest/80 flex items-start gap-3">
              <span className="text-brand-gold">•</span>
              Zambezi National Park (Zimbabwe)
            </li>
            <li className="text-brand-forest/80 flex items-start gap-3">
              <span className="text-brand-gold">•</span>
              Chobe National Park (Botswana) – approximately 80 - 90km away
            </li>
            <li className="text-brand-forest/80 flex items-start gap-3">
              <span className="text-brand-gold">•</span>
              Hwange National Park (Zimbabwe) – within 100km
            </li>
          </ul>
          <p className="text-lg text-brand-forest/80 leading-relaxed text-center">
            Day trips and excursions to these destinations, including cross-border visits to Zambia and safaris in Botswana and Zimbabwe, can be arranged through the Activities Desk.
          </p>
        </div>
      </section>

      {/* Best Time to Visit */}
      <section id="best-time" className="py-16 md:py-24 bg-brand-forest text-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-8">
            Best Time to Visit
          </h2>
          <p className="text-lg text-white/90 leading-relaxed mb-8">
            Victoria Falls is a year-round destination, with each season offering a different experience.
          </p>
          <p className="text-white/80 leading-relaxed mb-4">
            High water months (typically February to July) bring dramatic views of the Falls, with increased spray and volume. Lower water months (typically August to January) provide clearer visibility of the rock face and are ideal for activities such as Devil's Pool.
          </p>
        </div>
      </section>

    </>
  );
}
