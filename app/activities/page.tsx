import Image from 'next/image';
import Link from 'next/link';
import ServiceCTAs from '@/components/ui/ServiceCTAs';
import CardCarousel from '@/components/activities/CardCarousel';
import VideoHero from '@/components/accommodation/VideoHero';

export const metadata = {
  title: 'Activities & Experiences | Ilala Lodge Hotel Victoria Falls',
  description:
    'Adventure, wildlife, relaxation and culture at Victoria Falls. From rafting and helicopter flights to game drives, river cruises and high tea — all bookable through the Activities Desk at Ilala Lodge Hotel.',
};

const adventureActivities = [
  {
    title: 'White Water Rafting',
    description: "Navigate the Zambezi's Grade 5 rapids — a world-class rafting experience and a Victoria Falls standout.",
    images: [
      '/images/anna-sullivan-c_w_Q3kxgic-unsplash.jpg',
      '/images/White Water Rafting-1.jpg',
      '/images/White Water Rafting-2.jpg',
      '/images/White Water Rafting-3.jpg',
      '/images/White Water Rafting-4.jpg',
    ],
  },
  {
    title: 'Bungee Jumping & Gorge Swing',
    description: "Take the leap from the Victoria Falls Bridge — one of the world's highest commercial bungee jumps at 111 metres — or experience a 70-metre free fall followed by a swing across the Batoka Gorge.",
    images: [
      '/images/Bungee Jumping.jpg',
      '/images/Bungee & Gorge Swing-1.jpg',
      '/images/Bungee & Gorge Swing-2.jpg',
      '/images/Bungee & Gorge Swing-3.jpg',
      '/images/Bungee & Gorge Swing-4.jpg',
    ],
  },
  {
    title: 'Zip Lining',
    description: 'Soar across the Batoka Gorge on a high-speed zip line, taking in dramatic views of the gorge below.',
    images: [
      '/images/Ziplining.jpg',
      '/images/Zipline-2.jpg',
      '/images/Zipline-3.jpg',
      '/images/Zipline-4.jpg',
    ],
  },
  {
    title: 'Helicopter Flights',
    description: 'The Flight of Angels offers sweeping aerial views of the Falls and surrounding landscape — among the most popular ways to take in the scale of the region.',
    images: [
      '/images/Ilala-Lodge-Experience-Helicopter-Tour-10.jpg',
      '/images/Helicopter-1.jpg',
      '/images/Helicopter-2.jpg',
      '/images/Helicopter-3.jpg',
      '/images/Helicopter-4.jpg',
    ],
  },
];

const wildlifeActivities = [
  {
    title: 'Game Drives',
    description: 'Morning, afternoon, or evening drives in nearby national parks — opportunities for both short excursions and full-day safaris.',
    images: [
      '/images/tourists-on-land-cruise-victoria-falls-zimbabwe-2026-03-25-02-18-59-utc.jpg',
      '/images/Game Drives-2.jpg',
      '/images/Game Drives-3.jpg',
      '/images/Game Drives-4.jpg',
    ],
  },
  {
    title: 'Chobe & Hwange National Parks',
    description: "Day trips into Botswana to Chobe National Park, home to one of Africa's densest elephant populations, or extended trips for exceptional game viewing in Zimbabwe's largest national park, Hwange, within 100km of the hotel.",
    images: [
      '/images/pexels-twilight-kenya-7280783.jpg',
      '/images/Day Trips to Chobe & Hwange-1.jpg',
      '/images/Day Trips to Chobe & Hwange-2.jpg',
      '/images/Day Trips to Chobe & Hwange-3.jpg',
      '/images/Day Trips to Chobe & Hwange-4.jpg',
    ],
  },
  {
    title: 'Walk with Elephants',
    description: 'An unforgettable opportunity to walk alongside these gentle giants, learning about their behaviour and conservation in a natural setting.',
    images: ['/images/Ilala-Lodge-Experience-Elephant-Walk-12.jpg'],
    video: 'https://streamable.com/l/qfdqdi/mp4.mp4',
  },
  {
    title: 'Cruises on the Zambezi River',
    description: 'Wildlife often seen along the riverbanks during cruises and other water-based activities, with opportunities to spot hippos, crocodiles, and diverse birdlife.',
    images: [
      '/images/Cruises on the Zambezi-1.jpg',
      '/images/Cruises on the Zambezi-2.jpg',
      '/images/Cruises on the Zambezi-3.jpg',
      '/images/Cruises on the Zambezi-4.jpg',
    ],
  },
];

const relaxationActivities = [
  {
    title: 'Sunrise River Cruise',
    description: 'Begin the day on the Zambezi River as the sun rises, with tea, coffee, and pastries served on board while the bush comes alive around you.',
    images: [
      '/images/Breakfast_Birdwathing Cruise-1.JPG',
      '/images/Breakfast_Birdwathing Cruise-2.jpg',
      '/images/Breakfast_Birdwathing Cruise-3.jpg',
      '/images/Breakfast_Birdwathing Cruise-4.jpg',
    ],
  },
  {
    title: 'Sunset Cruise',
    description: 'Drift along the Upper Zambezi as the sun sets, with drinks and snacks served on board.',
    images: [
      '/images/Sunset Cruise-1.jpg',
      '/images/Sunset Cruise-2.jpg',
      '/images/Sunset Cruise-3.jpg',
      '/images/Sunset Cruise-4.jpg',
    ],
  },
  {
    title: 'Lunch Cruise',
    description: 'A leisurely cruise over lunch, taking in the river at a relaxed pace.',
    images: [
      '/images/Lunch Cruise-1.jpg',
      '/images/Lunch Cruise-2.jpg',
      '/images/Lunch Cruise-3.jpg',
      '/images/Lunch Cruise-4.jpg',
    ],
  },
  {
    title: 'Intimate Cruises',
    description: 'Private or small-group cruises on the Zambezi for a more exclusive experience, ideal for special occasions or those seeking a quieter setting.',
    images: [
      '/images/Intimate Cruises-1.jpg',
      '/images/Intimate Cruises-2.jpg',
      '/images/Intimate Cruises-3.jpg',
      '/images/Intimate Cruises-4.jpg',
    ],
  },
];

const culturalActivities = [
  {
    title: 'Curio Shopping',
    description: 'Browse local crafts, artwork, and souvenirs at markets and shops throughout Victoria Falls.',
    images: [
      '/images/Ilala-Lodge-Experience-Shopping-02.jpg',
      '/images/Curio Shopping-1.jpg',
      '/images/Curio Shopping-2.jpg',
      '/images/Curio Shopping-3.jpg',
      '/images/Curio Shopping-4.jpg',
    ],
  },
  {
    title: 'Traditional Dining & Performances',
    description: 'Evening experiences combining traditional dinners with music and dance.',
    images: [
      '/images/Ilala-Lodge-Experience-Zambezi-River-Deck-17.jpg',
      '/images/Traditional Dining & Performance-1.jpg',
      '/images/Traditional Dining & Performance-2.jpg',
      '/images/Traditional Dining & Performance-3.jpg',
      '/images/Traditional Dining & Performance-4.jpg',
    ],
  },
  {
    title: 'Township Dining',
    description: "An introduction to the region's communities through shared meals at Dusty Road Township.",
    images: [
      '/images/Dusty Road.jpg',
      '/images/Township Dining-1.jpg',
      '/images/Township Dining-2.jpg',
      '/images/Township Dining-3.jpg',
      '/images/Township Dining-4.jpg',
    ],
  },
  {
    title: 'Rainforest Tour',
    description: 'A guided walk through the Victoria Falls rainforest, exploring its unique ecosystem and the heritage of the region.',
    images: [
      '/images/Ilala-Lodge-Experience-Vic-Falls-02.jpg',
      '/images/Rainforest Tour-1.jpg',
      '/images/Rainforest Tour-2.jpg',
      '/images/Rainforest Tour-3.jpg',
      '/images/Rainforest Tour-4.jpg',
    ],
    video: 'https://streamable.com/l/n73084/mp4.mp4',
  },
];

const featuredExperiences = [
  {
    id: 'high-tea',
    title: 'High Tea Experience',
    description:
      'Enjoy High Tea at Palm River Hotel on the banks of the Zambezi River. Set beneath indigenous trees, this riverside experience offers a relaxed setting to enjoy a selection of sweet and savoury treats. Advanced reservations are essential.',
    contact: 'fnb@palmriverhotel.com',
    image: '/images/High-Tea-Sep24-6-1350x900.jpg',
    href: '/dining/high-tea',
  },
  {
    id: 'riverside-dining',
    title: 'Zambezi River Deck Experience',
    description:
      'An African-style barbecue dinner beside the Zambezi River at Palm River Hotel. The three-course menu includes locally sourced options such as crocodile and kudu, prepared over open coals. Dine outdoors in a lantern-lit riverside setting.',
    contact: 'fnb@palmriverhotel.com',
    image: '/images/night5.jpg',
    video: 'https://streamable.com/l/e07f94/mp4.mp4',
    href: '/dining/zambezi-river-deck',
  },
  {
    id: 'ra-ikane',
    title: 'Ra-Ikane River Cruise',
    description:
      'Explore the Zambezi River aboard the Ra-Ikane, inspired by the journeys of David Livingstone. With a maximum of 24 guests, the cruise offers a more intimate setting to view birdlife and wildlife along the river and surrounding islands.',
    image: '/images/ilala-boats.jpg',
    video: 'https://streamable.com/l/hutbn2/mp4.mp4',
    href: '/activities/ra-ikane',
  },
];

interface CategoryProps {
  id: string;
  eyebrow: string;
  heading: string;
  intro: string;
  items: { title: string; description: string; images: string[]; video?: string }[];
  bg: string;
  cardBg: string;
  columns?: 2 | 3;
}

function CategorySection({ id, eyebrow, heading, intro, items, bg, cardBg, columns = 3 }: CategoryProps) {
  const gridCols = columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3';
  return (
    <section id={id} className={`py-16 md:py-24 ${bg} scroll-mt-24`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-[0.2em] text-brand-gold mb-3">{eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">{heading}</h2>
          <p className="text-lg text-brand-forest/70 leading-relaxed">{intro}</p>
        </div>
        <div className={`grid ${gridCols} gap-6 lg:gap-8`}>
          {items.map((item) => (
            <div key={item.title} className={`${cardBg} overflow-hidden`}>
              <CardCarousel images={item.images} title={item.title} video={item.video} />
              <div className="p-6 lg:p-8">
                <h3 className="font-serif text-xl lg:text-2xl text-brand-forest mb-3">{item.title}</h3>
                <p className="text-brand-forest/70 leading-relaxed text-sm lg:text-base">{item.description}</p>
              </div>
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
      <VideoHero videoUrl="https://streamable.com/l/0sspng/mp4-high.mp4">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4">
          Activities
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
          Adventure Capital of Africa
        </p>
      </VideoHero>

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

      {/* Anchor Links */}
      <section className="py-8 md:py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {[
              { id: 'relaxation', label: 'Relaxation' },
              { id: 'wildlife', label: 'Wildlife' },
              { id: 'cultural', label: 'Cultural' },
              { id: 'adventure', label: 'Adventure' },
              { id: 'featured-experiences', label: 'Featured Experiences' },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-white text-brand-forest border border-brand-stem/30 hover:border-brand-forest hover:bg-brand-daisy"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <CategorySection
        id="relaxation"
        eyebrow="A slower pace on the Zambezi"
        heading="Relaxation"
        intro="River cruises at sunrise, over lunch, or at sunset allow guests to take in the landscape at leisure. Smaller, more intimate cruise options offer a quieter setting still — see the Featured Experiences below for riverside dining and high tea."
        items={relaxationActivities}
        bg="bg-white"
        cardBg="bg-brand-daisy"
        columns={2}
      />

      <CategorySection
        id="wildlife"
        eyebrow="Game viewing in every direction"
        heading="Wildlife"
        intro="The area surrounding Victoria Falls is rich in wildlife, with opportunities for both short excursions and full-day safaris. Explore nearby game reserves, take a day trip to Hwange National Park in Zimbabwe, cross into Botswana for a safari in the Chobe National Park, or enjoy a cruise on the Zambezi River—each showcasing the region's exceptional wildlife."
        items={wildlifeActivities}
        bg="bg-gradient-to-b from-white to-brand-daisy"
        cardBg="bg-white"
        columns={2}
      />

      <CategorySection
        id="cultural"
        eyebrow="A strong sense of place"
        heading="Cultural"
        intro="Cultural experiences that provide insight into local life and traditions — from guided rainforest tours and village visits to township dining and traditional evening performances."
        items={culturalActivities}
        bg="bg-white"
        cardBg="bg-brand-daisy"
        columns={2}
      />

      <CategorySection
        id="adventure"
        eyebrow="Africa's Adventure Capital"
        heading="Adventure"
        intro="High-adrenaline experiences set against a dramatic natural backdrop — from white-water rafting on the Zambezi to bungee, gorge swings, zip lines, helicopter flights, and canopy tours."
        items={adventureActivities}
        bg="bg-gradient-to-b from-white to-brand-daisy"
        cardBg="bg-white"
        columns={2}
      />

      {/* Download PDF */}
      <section className="py-12 md:py-16 bg-brand-daisy">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <a
            href="/downloads/activities.pdf"
            download
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-forest text-white font-semibold uppercase tracking-wider text-sm hover:bg-brand-forest/90 transition-colors"
          >
            Download Activities PDF
          </a>
        </div>
      </section>

      {/* Featured Experiences Header */}
      <section id="featured-experiences" className="py-16 md:py-20 bg-brand-forest text-white scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="font-script text-4xl md:text-6xl text-brand-gold mb-2">
            Featured experiences
          </p>
          <h2 className="font-serif text-2xl md:text-3xl uppercase tracking-wider">
            Plan Something Special
          </h2>
        </div>
      </section>

      {/* Featured Experience Blocks (full-bleed, alternating) */}
      {featuredExperiences.map((exp, i) => (
        <section key={exp.id} id={exp.id} className="bg-brand-forest scroll-mt-24">
          <div className={`grid md:grid-cols-2 ${i % 2 === 1 ? 'md:[&>*:first-child]:order-last' : ''}`}>
            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
              {exp.video ? (
                <video
                  src={exp.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover"
                  aria-label={exp.title}
                />
              ) : (
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex items-center px-8 py-12 md:px-16 md:py-20 lg:px-24 lg:py-24">
              <div>
                <h3 className="font-serif text-3xl md:text-4xl text-white mb-6">{exp.title}</h3>
                <p className="text-white/80 leading-relaxed mb-4">{exp.description}</p>
                {exp.contact && (
                  <p className="text-sm text-white/60 mb-6">
                    Contact: <a href={`mailto:${exp.contact}`} className="text-brand-gold hover:underline">{exp.contact}</a>
                  </p>
                )}
                {exp.href && (
                  <Link
                    href={exp.href}
                    className="inline-block px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-white text-brand-forest hover:bg-brand-gold hover:text-white"
                  >
                    Explore
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Booking CTA */}
      <section className="py-24 md:py-32 bg-brand-forest text-white text-center">
        <div className="max-w-[72rem] mx-auto px-4">
          <p className="font-script text-5xl md:text-[6.5rem] text-brand-gold mb-4">
            Start Your Adventure
          </p>
          <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-wide mb-6">
            Let Us Help Plan Your Perfect Experience
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Our Activities Desk can arrange every excursion, transfer, and cross-border trip &mdash; get in touch to start planning your stay.
          </p>
          <ServiceCTAs theme="dark" email="activities@palmhospitality.co.zw" />
        </div>
      </section>
    </>
  );
}
