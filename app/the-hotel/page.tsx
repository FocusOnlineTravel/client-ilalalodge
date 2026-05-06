import Image from 'next/image';
import { BOOKING_URL } from '@/lib/constants';

export const metadata = {
  title: 'The Hotel | Ilala Lodge Hotel',
  description: 'Discover Ilala Lodge Hotel, a family-run luxury hotel in the heart of Victoria Falls, Zimbabwe. Experience comfort and hospitality just minutes from the falls.',
};

export default function TheHotelPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/banner-image.png"
            alt="Ilala Lodge Hotel"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4">
            The Hotel
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            A Family-Run Luxury Hotel
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-brand-daisy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
            Our Story
          </h2>
          <p className="text-lg text-brand-forest/80 leading-relaxed mb-6">
            Ilala Lodge Hotel is a family-run luxury hotel offering accommodation in the heart of Victoria Falls, Zimbabwe. Nestled in attractive gardens, the well-appointed hotel is a mere eight-minute walk from Victoria Falls, one of the Seven Natural Wonders of the World.
          </p>
          <p className="text-lg text-brand-forest/80 leading-relaxed">
            Named after the iconic Ilala Palm, our hotel has been welcoming guests for over three decades, providing a perfect blend of comfort, elegance, and authentic African hospitality.
          </p>
        </div>
      </section>

      {/* What Makes Us Special */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest text-center mb-12">
            What Makes Us Special
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="font-serif text-2xl text-brand-forest mb-4">Prime Location</h3>
              <p className="text-brand-forest/70 leading-relaxed">
                Just an 8-minute walk from Victoria Falls, we are the closest hotel to one of the Seven Natural Wonders of the World.
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="font-serif text-2xl text-brand-forest mb-4">Family Heritage</h3>
              <p className="text-brand-forest/70 leading-relaxed">
                As a family-run establishment, we pride ourselves on providing warm, personalized service that makes every guest feel at home.
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="font-serif text-2xl text-brand-forest mb-4">Wildlife Encounters</h3>
              <p className="text-brand-forest/70 leading-relaxed">
                Bordering the Victoria Falls National Park, our gardens often welcome wild animals including elephants grazing on our lawns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Features */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-brand-daisy">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] md:h-[500px]">
              <Image
                src="/images/accommodation-luxury.png"
                alt="Ilala Lodge Room"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
                Comfort & Elegance
              </h2>
              <p className="text-brand-forest/80 leading-relaxed mb-4">
                Our beautifully appointed rooms and suites offer the perfect sanctuary after a day of adventure. Each room features modern amenities while maintaining the charm and character that defines Ilala Lodge.
              </p>
              <p className="text-brand-forest/80 leading-relaxed mb-4">
                Wake up to the sound of birdsong, enjoy breakfast on your private balcony, and watch the spray from Victoria Falls rise in the distance.
              </p>
              <ul className="text-brand-forest/80 space-y-2">
                <li>• Air-conditioned rooms with en-suite bathrooms</li>
                <li>• Private balconies with garden views</li>
                <li>• Complimentary WiFi throughout</li>
                <li>• 24-hour room service</li>
                <li>• Swimming pool and sun deck</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 md:py-24 bg-white" id="facilities">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest text-center mb-12">
            Hotel Facilities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: '24h-concierge', label: '24h Concierge' },
              { icon: 'cassia-restaurant', label: 'Cassia Restaurant' },
              { icon: 'swimming-pools', label: 'Swimming Pools' },
              { icon: 'poolside-bar', label: 'Poolside Bar' },
              { icon: 'beauty-spa', label: 'Beauty Spa' },
              { icon: 'tours-and-activities-desk', label: 'Tours & Activities Desk' },
              { icon: 'conferencing-facilities', label: 'Conferencing Facilities' },
              { icon: 'complimentary-shuttle-service', label: 'Complimentary Shuttle' },
              { icon: 'complimentary-porter-service', label: 'Complimentary Porter' },
              { icon: 'compimentary-welcome-drink', label: 'Complimentary Welcome Drink' },
              { icon: 'safe-and-secure-parking', label: 'Safe & Secure Parking' },
            ].map((facility) => (
              <div key={facility.icon} className="flex items-center gap-3 p-3">
                <Image
                  src={`/icons/icons-hotel-${facility.icon}.png`}
                  alt={facility.label}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
                <span className="text-brand-forest text-sm">{facility.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16 md:py-24 bg-brand-daisy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
            Awards & Recognition
          </h2>
          <p className="text-lg text-brand-forest/80 leading-relaxed mb-8">
            Over the years, Ilala Lodge has been recognized for its exceptional service, hospitality, and commitment to sustainability. We are proud to be consistently rated as one of the top hotels in Victoria Falls.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-brand-forest text-white text-center">
        <div className="max-w-[72rem] mx-auto px-4">
          <p className="font-script text-5xl md:text-[6.5rem] text-brand-gold mb-4">
            Experience Ilala Lodge
          </p>
          <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-wide mb-6">
            Book Your Stay Today
          </h2>
          <p className="text-white/80 mb-8">
            Discover why guests return to Ilala Lodge year after year.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 bg-white text-brand-forest font-semibold uppercase tracking-wide hover:bg-brand-gold hover:text-white transition-all duration-200 rounded-full"
          >
            Book Now
          </a>
        </div>
      </section>
    </>
  );
}
