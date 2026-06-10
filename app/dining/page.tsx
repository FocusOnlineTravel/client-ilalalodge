import Image from 'next/image';
import ServiceCTAs from '@/components/ui/ServiceCTAs';
import ReviewsSection from '@/components/sections/ReviewsSection';
import ImageLightbox from '@/components/gallery/ImageLightbox';

const diningReviewsData = {
  acf_fc_layout: 'reviews_section' as const,
  reviews_eyebrow: 'Guest Reviews',
  reviews_heading: 'What Our Guests Say',
  reviews_items: [
    {
      review_title: 'Great evening with friends opposite entrance to Victoria Falls Hotel',
      review_body: 'What a wonderful restaurant in a beautiful garden setting with professional and courteous staff. There were 6 of us and everyone commented on how delicious their food was and the good service. Menu was very inventive…had the best oxtail main course ever.',
      review_author: 'TripAdvisor Guest',
      review_source: 'TripAdvisor',
    },
    {
      review_title: 'Highly Recommended',
      review_body: "We have been blessed to have eaten in some incredible restaurants world wide and still we are particularly impressed with the quality of cuisine at this restaurant in Victoria Falls. Kudos to the Head Chef!! The ambiance is fabulous and the staff most attentive and friendly. A must for that romantic dinner for 2 whilst in the Falls. Highly recommended.",
      review_author: 'TripAdvisor Guest',
      review_source: 'TripAdvisor',
    },
    {
      review_title: 'Out of Africa feels the moment we walked in',
      review_body: 'The service we received was world class, to have dinner in a candle-lit setting with the roar of the Victoria falls in the background is truly magical. The chef is amazing and our food exceptional.',
      review_author: 'TripAdvisor Guest',
      review_source: 'TripAdvisor',
    },
  ],
};

export const metadata = {
  title: 'Dining at Cassia Restaurant | Ilala Lodge Hotel',
  description: 'Experience elevated comfort food at Cassia Restaurant. Enjoy breakfast, lunch, and dinner with stunning views of Victoria Falls.',
};

export default function DiningPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/Ilala-Lodge-Dining-1-Breakfast-07.jpg"
            alt="Cassia Restaurant"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4">
            Cassia Restaurant
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Refined dining beneath the Cassia trees
          </p>
        </div>
      </section>

      {/* Restaurant Story */}
      <section id="cassia-restaurant" className="py-16 md:py-24 bg-brand-daisy scroll-mt-24">
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
      <section id="menus" className="py-16 md:py-24 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Breakfast */}
            <div className="text-center">
              <div className="relative h-64 mb-6 overflow-hidden">
                <Image
                  src="/images/Ilala-Lodge-Dining-1-Breakfast-25.jpg"
                  alt="Breakfast at Cassia Restaurant"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-brand-forest mb-1">Breakfast</h3>
              <p className="text-lg text-brand-stem font-semibold mb-4">06:30 - 10:00</p>
              <p className="text-brand-forest/70 leading-relaxed mb-4">
                Begin the day with a continental buffet, complemented by a cooked breakfast menu, served in the relaxed setting of Cassia Restaurant.
              </p>
              <a
                href="/documents/ILH_BreakfastMenu_2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-white text-brand-forest border border-brand-stem/30 hover:border-brand-forest hover:bg-brand-daisy"
              >
                View Menu
              </a>
            </div>

            {/* Lunch */}
            <div className="text-center">
              <div className="relative h-64 mb-6 overflow-hidden">
                <Image
                  src="/images/Ilala-Lodge-Dining-2-Lunch-03.jpg"
                  alt="Lunch at Cassia Restaurant"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-brand-forest mb-1">Lunch</h3>
              <p className="text-lg text-brand-stem font-semibold mb-4">12:00 - 14:00</p>
              <p className="text-brand-forest/70 leading-relaxed mb-4">
                Served beneath the shade of the Cassia trees or around the poolside bar, with a selection of lighter dishes and more substantial options.
              </p>
              <a
                href="/documents/ILH_LunchMenu_2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-white text-brand-forest border border-brand-stem/30 hover:border-brand-forest hover:bg-brand-daisy"
              >
                View Menu
              </a>
            </div>

            {/* Dinner */}
            <div className="text-center">
              <div className="relative h-64 mb-6 overflow-hidden">
                <Image
                  src="/images/Ilala-Lodge-Dining-3-Dinner-05.jpg"
                  alt="Dinner at Cassia Restaurant"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-brand-forest mb-1">Dinner</h3>
              <p className="text-lg text-brand-stem font-semibold mb-4">18:30 - 21:30</p>
              <p className="text-brand-forest/70 leading-relaxed mb-4">
                Dine al fresco under African skies with the sound of the Falls in the background, supported by a curated wine list, beers, gins, and cocktails.
              </p>
              <a
                href="/documents/ILH_Dinner-Menu_2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-white text-brand-forest border border-brand-stem/30 hover:border-brand-forest hover:bg-brand-daisy"
              >
                View Menu
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Zambezi River Deck Experience */}
      <section id="zambezi-river-deck" className="bg-brand-forest scroll-mt-24">
        <div className="grid md:grid-cols-2">
          <div className="relative h-[400px] md:h-[500px] overflow-hidden">
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
          </div>
          <div className="flex items-center px-12 py-16 md:px-16 md:py-20 lg:px-24 lg:py-24">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                Zambezi River Deck Experience
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                Dine on the banks of the Zambezi River, on a multi-level wooden deck in the heart of the Zambezi National Park. Situated just a 5-minute drive from Ilala Lodge Hotel, the Riverside Dining Experience offers an open-fire, barbecue-style dinner under the stars, with freshly prepared dishes inspired by traditional Zimbabwean flavours and a selection of alcoholic and non-alcoholic beverages, served by dedicated staff.
              </p>
              <a
                href="https://www.palmriverhotel.com/dining/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-white text-brand-forest border border-white hover:bg-brand-gold hover:text-white hover:border-brand-gold"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* High Tea at Palm River Hotel */}
      <section id="high-tea" className="bg-brand-forest scroll-mt-24">
        <div className="grid md:grid-cols-2 md:[&>*:first-child]:order-last">
          <div className="relative h-[400px] md:h-[500px]">
            <Image
              src="/images/Ilala-Lodge-Experience-High-Tea-01.jpg"
              alt="High Tea at Palm River Hotel"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center px-12 py-16 md:px-16 md:py-20 lg:px-24 lg:py-24">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                High Tea at Palm River Hotel
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                Experience the refined elegance of High Tea at the Palm River Hotel on the Zambezi River. Begin with effervescent hibiscus prosecco or savour artisanal brews, from velvety cappuccinos to aromatic teas. Indulge in panna cottas, dainty sandwiches, mini macarons, buttery scones with whipped cream and strawberry preserves and more, all enjoyed under the shade of indigenous trees by the tranquil river.
              </p>
              <a
                href="https://www.palmriverhotel.com/experiences/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-white text-brand-forest border border-white hover:bg-brand-gold hover:text-white hover:border-brand-gold"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <ReviewsSection data={diningReviewsData} />

      {/* Dining Gallery */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <ImageLightbox
            images={[
              { src: '/images/Ilala-Lodge-Dining-1-Breakfast-07.jpg', alt: 'Breakfast at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-1-Breakfast-28.jpg', alt: 'Breakfast at Cassia Restaurant' },
              { src: '/images/dining-4.png', alt: 'Dining at Cassia Restaurant' },
              { src: '/images/dining-3.png', alt: 'Dining at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-3-Dinner-21.jpg', alt: 'Dinner at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-3-Dinner-01.jpg', alt: 'Dinner at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-1-Breakfast-13.jpg', alt: 'Breakfast at Cassia Restaurant' },
              { src: '/images/CassiaRestaurant (1).jpg', alt: 'Cassia Restaurant' },
            ]}
            columns="grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          />
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
          <ServiceCTAs theme="dark" />
        </div>
      </section>
    </>
  );
}
