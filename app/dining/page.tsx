import Image from 'next/image';
import Link from 'next/link';
import ServiceCTAs from '@/components/ui/ServiceCTAs';
import ReviewsSection from '@/components/sections/ReviewsSection';
import ImageLightbox from '@/components/gallery/ImageLightbox';
import MenuCarousel from '@/components/dining/MenuCarousel';
import VideoHero from '@/components/accommodation/VideoHero';

const diningReviewsData = {
  acf_fc_layout: 'reviews_section' as const,
  reviews_eyebrow: 'Guest Reviews',
  reviews_heading: 'What Our Guests Say',
  reviews_items: [
    {
      review_title: 'A Wonderful Experience',
      review_body: 'It was a wonderful experience. The food was excellent and we sat on the terrace, serenaded by the sound of the Victoria Falls. Our waitress was so lovely, she pulled the food and the setting together perfectly.',
      review_author: 'Paul D',
      review_source: 'TripAdvisor',
    },
    {
      review_title: 'The Food is Excellent',
      review_body: 'The food is excellent. The service has been fantastic. The atmosphere is perfect. We have really enjoyed our meals here. You are made to feel very welcomed. They accommodated gluten free as well!',
      review_author: 'Kendra',
      review_source: 'Google Reviews',
    },
    {
      review_title: 'The Food is Superb',
      review_body: "We stayed at the wonderful Ilala Lodge Hotel for 3 nights. We ate at the Cassia Restaurant for breakfast and dinner on all 3. The food is superb. The staff lovely. The setting on the terrace amazing. Views of the 'smoke that thunders' during the day, romantic at night. We cannot wait to return! Thank you.",
      review_author: 'Pat',
      review_source: 'TripAdvisor',
    },
    {
      review_title: 'One of the Best Dining Experiences',
      review_body: "One of the best dining experiences I've ever had. The food was absolutely amazing every dish full of flavour and beautifully presented. Tatenda was an outstanding waiter, full of energy and warmth, and really made us feel welcome. Miles is an incredibly talented musician, and his live performance, including our song requests, made the evening truly special. I honestly couldn't fault this place. Highly recommended!",
      review_author: 'Sai',
      review_source: 'Google Reviews',
    },
    {
      review_title: 'Great Food and Lovely Service',
      review_body: 'Great food and lovely service. You have the option to sit on the terrace you will be able to hear the waterfall. You get to choose from a nice variety of African animals for dinner, and there is a large selection available to choose from for breakfast.',
      review_author: 'Frederik Blem',
      review_source: 'Google Reviews',
    },
    {
      review_title: 'One of the Best Restaurants in Victoria Falls',
      review_body: 'One of the best restaurants in Victoria Falls. Food and service is excellent. Live piano music completes the setting.',
      review_author: 'Allan Frost',
      review_source: 'Google Reviews',
    },
    {
      review_title: 'Thoroughly Enjoyed My Meal',
      review_body: 'Great food, great service, lovely ambiance! Thoroughly enjoyed my meal, the food was well presented and beautifully prepared! Absolutely scrumptious!',
      review_author: 'Tichaona Chitsinde',
      review_source: 'Google Reviews',
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
      <VideoHero videoUrl="https://streamable.com/l/gm0ph0/mp4-high.mp4">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4">
          Cassia Restaurant
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
          Refined dining beneath the Cassia trees
        </p>
      </VideoHero>

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

      {/* Dining Experience - Menu Carousel */}
      <section id="menus" className="py-16 md:py-24 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <MenuCarousel />
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
              <Link
                href="/dining/zambezi-river-deck"
                className="inline-block px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-white text-brand-forest border border-white hover:bg-brand-gold hover:text-white hover:border-brand-gold"
              >
                Learn More
              </Link>
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
              <Link
                href="/dining/high-tea"
                className="inline-block px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-white text-brand-forest border border-white hover:bg-brand-gold hover:text-white hover:border-brand-gold"
              >
                Learn More
              </Link>
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
              { src: '/images/Ilala-Lodge-Dining-1-Breakfast-02.jpg', alt: 'Breakfast at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-1-Breakfast-07.jpg', alt: 'Breakfast at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-1-Breakfast-15.jpg', alt: 'Breakfast at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-1-Breakfast-16.jpg', alt: 'Breakfast at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-1-Breakfast-19.jpg', alt: 'Breakfast at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-1-Breakfast-22.jpg', alt: 'Breakfast at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-1-Breakfast-26.jpg', alt: 'Breakfast at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-1-Breakfast-29.jpg', alt: 'Breakfast at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-1-Breakfast-31.jpg', alt: 'Breakfast at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-1-Breakfast-34.jpg', alt: 'Breakfast at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-1-Breakfast-35.jpg', alt: 'Breakfast at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-2-Lunch-02.jpg', alt: 'Lunch at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-2-Lunch-05.jpg', alt: 'Lunch at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-2-Lunch-08.jpg', alt: 'Lunch at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-2-Lunch-09.jpg', alt: 'Lunch at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-3-Dinner-01.jpg', alt: 'Dinner at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-3-Dinner-02.jpg', alt: 'Dinner at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-3-Dinner-05.jpg', alt: 'Dinner at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-3-Dinner-06.jpg', alt: 'Dinner at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-3-Dinner-07.jpg', alt: 'Dinner at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-3-Dinner-09.jpg', alt: 'Dinner at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-3-Dinner-12.jpg', alt: 'Dinner at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-3-Dinner-18.jpg', alt: 'Dinner at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-3-Dinner-19.jpg', alt: 'Dinner at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-3-Dinner-20.jpg', alt: 'Dinner at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-3-Dinner-22.jpg', alt: 'Dinner at Cassia Restaurant' },
              { src: '/images/Ilala-Lodge-Dining-3-Dinner-28.jpg', alt: 'Dinner at Cassia Restaurant' },
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
          <ServiceCTAs theme="dark" email="fnb@ilalalodge.co.zw" />
        </div>
      </section>
    </>
  );
}
