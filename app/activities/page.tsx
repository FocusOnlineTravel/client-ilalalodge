import Image from 'next/image';
import { BOOKING_URL } from '@/lib/constants';

export const metadata = {
  title: 'Activities & Experiences | Ilala Lodge Hotel Victoria Falls',
  description:
    'Adventure, wildlife, relaxation and culture at Victoria Falls. From rafting and helicopter flights to game drives, river cruises and high tea — all bookable through the Activities Desk at Ilala Lodge Hotel.',
};

const adventureActivities = [
  {
    title: 'White-water Rafting',
    description: "Navigate the Zambezi's Grade 5 rapids — a world-class rafting experience and a Victoria Falls standout.",
  },
  {
    title: 'Bungee Jumping',
    description: "Take the leap from the Victoria Falls Bridge — one of the world's highest commercial bungee jumps at 111 metres.",
  },
  {
    title: 'Gorge Swing',
    description: 'A 70-metre free fall followed by a swing across the Batoka Gorge.',
  },
  {
    title: 'Zip Lines & Canopy Tours',
    description: 'Soar across the Batoka Gorge on a high-speed zip line, or follow walkways through the rainforest canopy.',
  },
  {
    title: 'Helicopter Flights',
    description: 'The Flight of Angels offers sweeping aerial views of the Falls and surrounding landscape — among the most popular ways to take in the scale of the region.',
  },
  {
    title: "Devil's Pool",
    description: 'Accessible during lower water months — a unique vantage point at the very edge of the Falls.',
  },
];

const wildlifeActivities = [
  {
    title: 'Game Drives',
    description: 'Morning, afternoon, or evening drives in nearby national parks — opportunities for both short excursions and full-day safaris.',
  },
  {
    title: 'Chobe National Park',
    description: "Day trips into Botswana to one of Africa's densest elephant populations.",
  },
  {
    title: 'Hwange National Park',
    description: "Extended trips for exceptional game viewing in Zimbabwe's largest national park, within 100km of the hotel.",
  },
  {
    title: 'Zambezi Wildlife Cruises',
    description: 'Wildlife often seen along the riverbanks during cruises and other water-based activities.',
  },
];

const relaxationActivities = [
  {
    title: 'Sunrise River Cruise',
    description: 'A quiet way to start the day on the Zambezi, with the landscape unfolding around you.',
  },
  {
    title: 'Lunch Cruise',
    description: 'A leisurely cruise over lunch, taking in the river at a relaxed pace.',
  },
  {
    title: 'Sunset Cruise',
    description: 'Drift along the Upper Zambezi as the sun sets, with drinks and snacks served on board.',
  },
  {
    title: 'Intimate Cruises',
    description: 'Smaller, more private cruise options for a quieter setting on the river.',
  },
];

const culturalActivities = [
  {
    title: 'Rainforest Tour',
    description: 'Guided tours of the Victoria Falls rainforest — historical and environmental context for the World Heritage site.',
  },
  {
    title: 'Village Visits',
    description: 'Insight into local life and traditions in surrounding communities.',
  },
  {
    title: 'Township Dining',
    description: "An introduction to the region's communities through shared meals.",
  },
  {
    title: 'Traditional Performances',
    description: 'Evening experiences combining traditional dinners with music and dance.',
  },
];

const featuredExperiences = [
  {
    id: 'high-tea',
    title: 'High Tea Experience',
    description:
      'Enjoy High Tea at Palm River Hotel on the banks of the Zambezi River. Set beneath indigenous trees, this riverside experience offers a relaxed setting to enjoy a selection of sweet and savoury treats. Advanced reservations are essential.',
    contact: 'fnb@palmriverhotel.com',
    image: '/images/dining-5.png',
  },
  {
    id: 'riverside-dining',
    title: 'Riverside Dining Experience',
    description:
      'An African-style barbecue dinner beside the Zambezi River at Palm River Hotel. The three-course menu includes locally sourced options such as crocodile and kudu, prepared over open coals. Dine outdoors in a lantern-lit riverside setting.',
    contact: 'fnb@palmriverhotel.com',
    image: '/images/night5.jpg',
  },
  {
    id: 'ra-ikane',
    title: 'Ra-Ikane River Cruise',
    description:
      'Explore the Zambezi River aboard the Ra-Ikane, inspired by the journeys of David Livingstone. With a maximum of 24 guests, the cruise offers a more intimate setting to view birdlife and wildlife along the river and surrounding islands.',
    image: '/images/wildlife-2.png',
  },
  {
    id: 'day-trips',
    title: 'Day Trips',
    description:
      'Victoria Falls lies at the meeting point of Zimbabwe, Zambia, and Botswana, with Hwange National Park also within easy reach. Day trips to Chobe National Park and Hwange offer extended game viewing, along with cultural experiences across the region.',
    image: '/images/wildlife-3.png',
  },
];

interface CategoryProps {
  id: string;
  eyebrow: string;
  heading: string;
  intro: string;
  items: { title: string; description: string }[];
  bg: string;
  cardBg: string;
}

function CategorySection({ id, eyebrow, heading, intro, items, bg, cardBg }: CategoryProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${bg} scroll-mt-24`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-[0.2em] text-brand-gold mb-3">{eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">{heading}</h2>
          <p className="text-lg text-brand-forest/70 leading-relaxed">{intro}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((item) => (
            <div key={item.title} className={`${cardBg} p-6 lg:p-8`}>
              <h3 className="font-serif text-xl lg:text-2xl text-brand-forest mb-3">{item.title}</h3>
              <p className="text-brand-forest/70 leading-relaxed text-sm lg:text-base">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ActivitiesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/pool.png"
            alt="Victoria Falls Activities"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4">
            Activities
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Adventure Capital of Africa
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24 bg-brand-daisy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
            Victoria Falls Activities
          </h2>
          <p className="text-lg text-brand-forest/80 leading-relaxed mb-6">
            Victoria Falls is one of Africa&rsquo;s leading destinations for adventure, wildlife, and culture, and Ilala Lodge Hotel is ideally positioned to experience it all.
          </p>
          <p className="text-lg text-brand-forest/80 leading-relaxed mb-6">
            From the Zambezi River to the surrounding national parks, the region offers a wide range of experiences to suit every pace of travel. Our Activities Desk is available to assist with planning and booking, including transfers and cross-border excursions.
          </p>
          <p className="text-lg text-brand-forest/80 leading-relaxed">
            Among the most popular experiences are Zambezi River cruises, helicopter flights over the Falls, Chobe Day Trips, and guided game drives &mdash; each offering a different perspective of this remarkable destination.
          </p>
        </div>
      </section>

      <CategorySection
        id="adventure"
        eyebrow="Adventure"
        heading="Africa's Adventure Capital"
        intro="High-adrenaline experiences set against a dramatic natural backdrop — from white-water rafting on the Zambezi to bungee, gorge swings, zip lines, helicopter flights, and Devil's Pool."
        items={adventureActivities}
        bg="bg-white"
        cardBg="bg-brand-daisy"
      />

      <CategorySection
        id="wildlife"
        eyebrow="Wildlife"
        heading="Game viewing in every direction"
        intro="The area surrounding Victoria Falls is rich in wildlife, with opportunities for both short excursions and full-day safaris. Game drives, cross-border trips to Chobe and Hwange, and Zambezi cruises each open up a different angle on the region's wildlife."
        items={wildlifeActivities}
        bg="bg-gradient-to-b from-white to-brand-daisy"
        cardBg="bg-white border-l-4 border-brand-gold"
      />

      <CategorySection
        id="relaxation"
        eyebrow="Relaxation"
        heading="A slower pace on the Zambezi"
        intro="River cruises at sunrise, over lunch, or at sunset allow guests to take in the landscape at leisure. Smaller, more intimate cruise options offer a quieter setting still — see the Featured Experiences below for riverside dining and high tea."
        items={relaxationActivities}
        bg="bg-white"
        cardBg="bg-brand-daisy"
      />

      <CategorySection
        id="cultural"
        eyebrow="Cultural"
        heading="A strong sense of place"
        intro="Cultural experiences that provide insight into local life and traditions — from guided rainforest tours and village visits to township dining and traditional evening performances."
        items={culturalActivities}
        bg="bg-gradient-to-b from-white to-brand-daisy"
        cardBg="bg-white"
      />

      {/* Featured Experiences */}
      <section id="featured-experiences" className="py-20 md:py-32 bg-brand-forest text-white scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="font-script text-4xl md:text-6xl text-brand-gold mb-2">
              Featured experiences
            </p>
            <h2 className="font-serif text-2xl md:text-3xl uppercase tracking-wider">
              Plan Something Special
            </h2>
          </div>

          <div className="space-y-12 md:space-y-16">
            {featuredExperiences.map((exp, i) => (
              <div
                key={exp.id}
                id={exp.id}
                className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center scroll-mt-24 ${
                  i % 2 === 1 ? 'md:[&>*:first-child]:order-last' : ''
                }`}
              >
                <div className="relative h-[300px] md:h-[400px]">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl mb-4">{exp.title}</h3>
                  <p className="text-white/80 leading-relaxed mb-4">{exp.description}</p>
                  {exp.contact && (
                    <p className="text-sm text-white/60">
                      Contact: <a href={`mailto:${exp.contact}`} className="text-brand-gold hover:underline">{exp.contact}</a>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan Your Stay / Activities Desk */}
      <section id="plan-your-stay" className="py-16 md:py-24 bg-brand-daisy scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
            Plan Your Stay
          </h2>
          <p className="text-lg text-brand-forest/80 leading-relaxed mb-4">
            All activities can be arranged through the Activities Desk at Ilala Lodge Hotel, where the team can assist with recommendations, bookings, and logistics.
          </p>
          <p className="text-lg text-brand-forest/80 leading-relaxed">
            Advance booking is recommended, particularly for popular experiences and during peak travel periods.
          </p>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-24 md:py-32 bg-white text-center">
        <div className="max-w-[72rem] mx-auto px-4">
          <p className="font-script text-5xl md:text-[6.5rem] text-brand-gold mb-4">
            Start Your Adventure
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest uppercase tracking-wide mb-6">
            Let Us Help Plan Your Perfect Experience
          </h2>
          <p className="text-brand-forest/70 mb-8 max-w-2xl mx-auto">
            Our Activities Desk can arrange every excursion, transfer, and cross-border trip — get in touch to start planning your stay.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 bg-brand-forest text-white font-semibold uppercase tracking-wide hover:bg-brand-forest/90 transition-all duration-200 rounded-full"
            >
              Book Your Stay
            </a>
            <a
              href="/contact"
              className="px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 border border-brand-forest text-brand-forest font-semibold uppercase tracking-wide hover:bg-brand-forest hover:text-white transition-all duration-200 rounded-full"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
