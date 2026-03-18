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
          <p className="font-sans text-[1.25rem] uppercase tracking-[0.3em] mb-1">
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
              Welcome to Cassia Restaurant
            </h2>
            <p className="text-lg text-brand-forest/80 leading-relaxed mb-6">
              Located at Ilala Lodge Hotel, Cassia Restaurant offers a refined dining experience with a focus on quality cuisine and a carefully selected wine list from South Africa's leading vineyards. The setting is relaxed and traditional, with indoor and outdoor dining available.
            </p>
            <p className="text-lg text-brand-forest/80 leading-relaxed mb-6">
              Set within the hotel's gardens and within earshot of Victoria Falls, the award-winning restaurant takes its name from the Cassia Fistula trees positioned in front of the property, facing towards the Falls.
            </p>
            <p className="text-lg text-brand-forest/80 leading-relaxed mb-6">
              Guests can enjoy breakfast, lunch, and dinner daily. Mornings begin with a continental buffet, complemented by a cooked breakfast menu. Lunch is served beneath the shade of the Cassia trees or around the poolside bar, with a selection of lighter dishes and more substantial options.
            </p>
            <p className="text-lg text-brand-forest/80 leading-relaxed">
              In the evening, guests can dine al fresco under African skies, with the sound of the Falls in the background. The menu is supported by a curated wine list, along with a selection of beers, gins, and cocktails.
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
              <h3 className="font-serif text-3xl md:text-4xl text-brand-forest mb-1">Breakfast</h3>
              <p className="text-lg text-brand-stem font-semibold mb-4">06:30 - 10:00</p>
              <p className="text-brand-forest/70 leading-relaxed">
                Start your day with our sumptuous breakfast buffet, featuring a variety of hot and cold options. From fresh tropical fruits to traditional cooked breakfasts, we cater to every taste.
              </p>
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
              <h3 className="font-serif text-3xl md:text-4xl text-brand-forest mb-1">Lunch</h3>
              <p className="text-lg text-brand-stem font-semibold mb-4">12:00 - 14:00</p>
              <p className="text-brand-forest/70 leading-relaxed">
                Enjoy a leisurely lunch in our beautiful garden setting. Our menu features light meals, salads, and grilled specialties, perfect for refueling after morning adventures.
              </p>
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
              <h3 className="font-serif text-3xl md:text-4xl text-brand-forest mb-1">Dinner</h3>
              <p className="text-lg text-brand-stem font-semibold mb-4">18:30 - 21:30</p>
              <p className="text-brand-forest/70 leading-relaxed">
                Experience fine dining under the African stars. Our chef crafts exquisite dishes using the finest local and international ingredients, paired with exceptional wines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Riverside Dining Experience */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-brand-daisy">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] md:h-[500px]">
              <Image
                src="/images/wildlife-3.png"
                alt="Riverside Dining Experience"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
                Riverside Dining Experience
              </h2>
              <p className="text-brand-forest/80 leading-relaxed">
                Dine on the banks of the Zambezi River, on a multi-level wooden deck in the heart of the Zambezi National Park. Situated just a 5-minute drive from Ilala Lodge Hotel, the Riverside Dining Experience offers an open-fire, barbecue-style dinner under the stars, with freshly prepared dishes inspired by traditional Zimbabwean flavours and a selection of alcoholic and non-alcoholic beverages, served by dedicated staff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-brand-daisy">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest text-center mb-12">
            What Our Guests Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8">
              <h3 className="font-serif text-xl text-brand-forest mb-4">
                Great evening with friends opposite entrance to Victoria Falls Hotel
              </h3>
              <p className="text-brand-forest/70 leading-relaxed text-sm">
                What a wonderful restaurant in a beautiful garden setting with professional and courteous staff. There were 6 of us and everyone commented on how delicious their food was and the good service. Menu was very inventive…had the best oxtail main course ever.
              </p>
            </div>
            <div className="bg-white p-8">
              <h3 className="font-serif text-xl text-brand-forest mb-4">
                Highly Recommended
              </h3>
              <p className="text-brand-forest/70 leading-relaxed text-sm">
                We have been blessed to have eaten in some incredible restaurants world wide and still we are particularly impressed with the quality of cuisine at this restaurant in Victoria Falls. Kudos to the Head Chef!! The ambiance is fabulous and the staff most attentive and friendly. A must for that romantic dinner for 2 whilst in the Falls. Highly recommended.
              </p>
            </div>
            <div className="bg-white p-8">
              <h3 className="font-serif text-xl text-brand-forest mb-4">
                Out of Africa feels the moment we walked in
              </h3>
              <p className="text-brand-forest/70 leading-relaxed text-sm">
                The service we received was world class, to have dinner in a candle-lit setting with the roar of the Victoria falls in the background is truly magical. The chef is amazing and our food exceptional.
              </p>
            </div>
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
            className="inline-block px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 bg-white text-brand-forest font-semibold uppercase tracking-wide hover:bg-brand-gold hover:text-white transition-all duration-200 hover: rounded-full"
          >
            Make a Reservation
          </a>
        </div>
      </section>
    </>
  );
}
