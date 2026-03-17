import Image from 'next/image';
import Link from 'next/link';
import { BOOKING_URL } from '@/lib/constants';

export const metadata = {
  title: 'Dining at Cassia Restaurant | Ilala Lodge Hotel',
  description: 'Experience elevated comfort food at Cassia Restaurant. Enjoy breakfast, lunch, and dinner with stunning views of Victoria Falls.',
};

export default function DiningPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/dining-1.png"
            alt="Cassia Restaurant"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <p className="font-serif text-[1.25rem] uppercase tracking-[0.3em] mb-1">
            Elevated Comfort Food
          </p>
          <h1 className="font-script text-[6rem] text-brand-gold leading-none">
            Cassia Restaurant
          </h1>
        </div>
      </section>

      {/* Restaurant Story */}
      <section className="py-16 md:py-24 bg-brand-daisy">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
              Welcome to the Cassia Restaurant
            </h2>
            <p className="text-lg text-brand-forest/80 leading-relaxed mb-6">
              The Cassia Restaurant, located at Ilala Lodge Hotel, offers an unmatched menu and an extensive wine list featuring carefully selected wines from South Africa's top vineyards. The calming and tranquil ambience sets the stage for a truly unforgettable dining experience at one of the finest Victoria Falls restaurants, within earshot of the gentle rumble of Victoria Falls.
            </p>
            <p className="text-lg text-brand-forest/80 leading-relaxed">
              The restaurant is named after the African flowering trees, Cassia Fistula, which grow abundantly in the hotel gardens. The Cassia, or Golden Shower Tree as it is often called, displays a beautiful spray of sunshine-yellow flowers that cascade down the branches between February and May, resembling the majestic Victoria Falls in miniature and playing their own part in the hotel's special blend of nature and comfort.
            </p>
          </div>
        </div>
      </section>

      {/* Dining Experience */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Breakfast */}
            <div className="text-center">
              <div className="relative h-64 mb-6 overflow-hidden">
                <Image
                  src="/images/dining-2.png"
                  alt="Breakfast at Cassia Restaurant"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-serif text-2xl text-brand-forest mb-4">Breakfast</h3>
              <p className="text-brand-forest/70 mb-4 leading-relaxed">
                Start your day with our sumptuous breakfast buffet, featuring a variety of hot and cold options. From fresh tropical fruits to traditional cooked breakfasts, we cater to every taste.
              </p>
              <p className="text-sm text-brand-stem font-semibold">06:30 - 10:00</p>
            </div>

            {/* Lunch */}
            <div className="text-center">
              <div className="relative h-64 mb-6 overflow-hidden">
                <Image
                  src="/images/dining-3.png"
                  alt="Lunch at Cassia Restaurant"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-serif text-2xl text-brand-forest mb-4">Lunch</h3>
              <p className="text-brand-forest/70 mb-4 leading-relaxed">
                Enjoy a leisurely lunch in our beautiful garden setting. Our menu features light meals, salads, and grilled specialties, perfect for refueling after morning adventures.
              </p>
              <p className="text-sm text-brand-stem font-semibold">12:00 - 14:00</p>
            </div>

            {/* Dinner */}
            <div className="text-center">
              <div className="relative h-64 mb-6 overflow-hidden">
                <Image
                  src="/images/dining-4.png"
                  alt="Dinner at Cassia Restaurant"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-serif text-2xl text-brand-forest mb-4">Dinner</h3>
              <p className="text-brand-forest/70 mb-4 leading-relaxed">
                Experience fine dining under the African stars. Our chef crafts exquisite dishes using the finest local and international ingredients, paired with exceptional wines.
              </p>
              <p className="text-sm text-brand-stem font-semibold">18:30 - 21:30</p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Dining Options */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-brand-daisy">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest text-center mb-12">
            More Dining Experiences
          </h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
            {/* High Tea */}
            <div className="bg-white p-8 shadow-lg">
              <h3 className="font-serif text-2xl text-brand-forest mb-4">High Tea Experience</h3>
              <p className="text-brand-forest/70 leading-relaxed mb-4">
                Indulge in a traditional afternoon tea experience with a selection of finger sandwiches, freshly baked scones with cream and jam, and an assortment of sweet treats. Perfectly complemented by your choice of fine teas or coffee.
              </p>
              <p className="text-sm text-brand-stem font-semibold">Available daily by reservation</p>
            </div>

            {/* Riverside Dining */}
            <div className="bg-white p-8 shadow-lg">
              <h3 className="font-serif text-2xl text-brand-forest mb-4">Riverside Dining</h3>
              <p className="text-brand-forest/70 leading-relaxed mb-4">
                Experience the magic of dining by the Zambezi River. Our riverside dining setup offers an intimate atmosphere with the sounds of nature as your soundtrack and the stars as your canopy.
              </p>
              <p className="text-sm text-brand-stem font-semibold">Available on request</p>
            </div>
          </div>

          <div className="text-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 bg-brand-forest text-white font-semibold uppercase tracking-wide hover:bg-brand-forest/90 transition-all duration-200 hover:shadow-lg rounded-full"
            >
              Book a Table
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-brand-forest text-white text-center">
        <div className="max-w-[72rem] mx-auto px-4">
          <p className="font-script text-5xl md:text-[6.5rem] text-brand-gold mb-4">
            An Unforgettable Dining Experience
          </p>
          <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-wide mb-6">
            Reserve Your Table Today
          </h2>
          <p className="text-white/80 mb-8">
            Join us at Cassia Restaurant for an exceptional culinary journey in the heart of Victoria Falls.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 bg-white text-brand-forest font-semibold uppercase tracking-wide hover:bg-brand-gold hover:text-white transition-all duration-200 hover:shadow-lg rounded-full"
          >
            Make a Reservation
          </a>
        </div>
      </section>
    </>
  );
}
