import Image from 'next/image';
import { BOOKING_URL, CONTACT } from '@/lib/constants';
import InteractiveMap from '@/components/InteractiveMap';

export const metadata = {
  title: 'Map & Directions | Ilala Lodge Hotel',
  description: 'Find Ilala Lodge Hotel in Victoria Falls, Zimbabwe. Get directions, nearby attractions, and transport information.',
};

export default function MapPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/wildlife-3.png"
            alt="Victoria Falls Location"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4">
            Map & Directions
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Find Us
          </p>
        </div>
      </section>

      {/* Interactive Town Map */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
              Explore Victoria Falls
            </h2>
            <p className="text-lg text-brand-forest/80 leading-relaxed max-w-3xl mx-auto">
              Discover the best attractions, restaurants, and activities around Ilala Lodge Hotel.
            </p>
          </div>

          <InteractiveMap />
        </div>
      </section>

      {/* Google Map Section */}
      <section className="py-16 md:py-24 bg-brand-daisy">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
              Our Location
            </h2>
            <p className="text-lg text-brand-forest/80 leading-relaxed max-w-3xl mx-auto">
              Ilala Lodge Hotel is located in the heart of Victoria Falls town, Zimbabwe, just an 8-minute walk from the magnificent Victoria Falls.
            </p>
          </div>

          {/* Google Map Embed */}
          <div className="w-full h-[400px] md:h-[500px] bg-gray-200 mb-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3795.5087900612083!2d25.83636!3d-17.92583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x194ff150d7b96f6d%3A0x7e59a67e89c5e8a8!2sIlala%20Lodge%20Hotel!5e0!3m2!1sen!2s!4v1699000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ilala Lodge Hotel Location"
            />
          </div>

          {/* Address Card */}
          <div className="bg-white p-8 max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-2xl text-brand-forest mb-4">Address</h3>
            <p className="text-brand-forest/80 leading-relaxed mb-4">
              411 Livingstone Way<br />
              Victoria Falls<br />
              Zimbabwe
            </p>
            <p className="text-brand-forest/80">
              <strong>GPS Coordinates:</strong> -17.9258, 25.8364
            </p>
          </div>
        </div>
      </section>

      {/* Getting Here */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest text-center mb-12">
            Getting Here
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-brand-daisy">
              <h3 className="font-serif text-2xl text-brand-forest mb-4">By Air</h3>
              <p className="text-brand-forest/70 leading-relaxed mb-4">
                Victoria Falls International Airport (VFA) is just 20 minutes from the hotel. We can arrange airport transfers upon request.
              </p>
              <p className="text-sm text-brand-stem font-semibold">20 min from airport</p>
            </div>
            <div className="text-center p-6 bg-brand-daisy">
              <h3 className="font-serif text-2xl text-brand-forest mb-4">By Road</h3>
              <p className="text-brand-forest/70 leading-relaxed mb-4">
                The hotel is easily accessible from Kasane (Botswana) and Livingstone (Zambia). Border crossings are straightforward for day trips.
              </p>
              <p className="text-sm text-brand-stem font-semibold">Easy border access</p>
            </div>
            <div className="text-center p-6 bg-brand-daisy">
              <h3 className="font-serif text-2xl text-brand-forest mb-4">Hotel Transfers</h3>
              <p className="text-brand-forest/70 leading-relaxed mb-4">
                We offer complimentary transfers from Victoria Falls Airport and can arrange transport from Kasane or Livingstone.
              </p>
              <p className="text-sm text-brand-stem font-semibold">Contact us to arrange</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Attractions */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-brand-daisy">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest text-center mb-12">
            Nearby Attractions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white overflow-hidden flex">
              <div className="relative w-32 md:w-[14rem] shrink-0" style={{ aspectRatio: '3/3.5' }}>
                <Image
                  src="/images/wildlife-3.png"
                  alt="Victoria Falls"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex gap-4 p-6">
                <div className="text-4xl font-serif text-brand-gold">1</div>
                <div>
                  <h3 className="font-serif text-xl text-brand-forest mb-2">Victoria Falls</h3>
                  <p className="text-brand-forest/70">8-minute walk from the hotel. The closest accommodation to the falls.</p>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden flex">
              <div className="relative w-32 md:w-[14rem] shrink-0" style={{ aspectRatio: '3/3.5' }}>
                <Image
                  src="/images/banner-image.png"
                  alt="Victoria Falls Bridge"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex gap-4 p-6">
                <div className="text-4xl font-serif text-brand-gold">2</div>
                <div>
                  <h3 className="font-serif text-xl text-brand-forest mb-2">Victoria Falls Bridge</h3>
                  <p className="text-brand-forest/70">15-minute walk. Historic bridge with bungee jumping.</p>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden flex">
              <div className="relative w-32 md:w-[14rem] shrink-0" style={{ aspectRatio: '3/3.5' }}>
                <Image
                  src="/images/wildlife-1.png"
                  alt="Craft Village"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex gap-4 p-6">
                <div className="text-4xl font-serif text-brand-gold">3</div>
                <div>
                  <h3 className="font-serif text-xl text-brand-forest mb-2">Craft Village</h3>
                  <p className="text-brand-forest/70">5-minute walk. Local arts, crafts, and souvenirs.</p>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden flex">
              <div className="relative w-32 md:w-[14rem] shrink-0" style={{ aspectRatio: '3/3.5' }}>
                <Image
                  src="/images/wildlife-2.png"
                  alt="Town Center"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex gap-4 p-6">
                <div className="text-4xl font-serif text-brand-gold">4</div>
                <div>
                  <h3 className="font-serif text-xl text-brand-forest mb-2">Town Center</h3>
                  <p className="text-brand-forest/70">10-minute walk. Shops, restaurants, and banks.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-brand-forest text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-8">
            Need Help Getting Here?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Our team is happy to assist with directions, transfers, and travel arrangements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-block px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 border border-white text-white font-semibold uppercase tracking-wide hover:bg-white hover:text-brand-forest transition-all duration-200 rounded-full"
            >
              Call Us
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 bg-white text-brand-forest font-semibold uppercase tracking-wide hover:bg-brand-gold hover:text-white transition-all duration-200 rounded-full"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
