import Image from 'next/image';
import { BOOKING_URL } from '@/lib/constants';

export const metadata = {
  title: 'Activities & Adventures | Ilala Lodge Hotel Victoria Falls',
  description: 'Experience the adventure capital of Africa. From helicopter flights to bungee jumping, white water rafting to sunset cruises, discover unforgettable activities at Victoria Falls.',
};

const adrenalineActivities = [
  {
    title: 'Bungee Jumping',
    description: 'Take the ultimate leap of faith from the historic Victoria Falls Bridge. At 111 meters, this is one of the world\'s highest commercial bungee jumps.',
  },
  {
    title: 'White Water Rafting',
    description: 'Navigate the mighty Zambezi River through Grade 5 rapids. This world-class rafting experience is not for the faint-hearted.',
  },
  {
    title: 'Gorge Swing',
    description: 'Experience a 70-meter free fall followed by a massive swing across the gorge. An adrenaline rush like no other.',
  },
  {
    title: 'Zip Lining',
    description: 'Soar across the Batoka Gorge on a high-speed zip line, taking in breathtaking views of the Zambezi River below.',
  },
  {
    title: 'Abseiling',
    description: 'Descend into the gorge on a controlled rope descent. A thrilling way to experience the raw beauty of the Batoka Gorge.',
  },
];

const scenicActivities = [
  {
    title: 'Helicopter Flights',
    description: 'The Flight of Angels offers unparalleled aerial views of Victoria Falls and the Zambezi River. Available in 15, 25, or 45-minute flights.',
    icon: '🚁',
  },
  {
    title: 'Microlight Flights',
    description: 'Experience the freedom of open-air flying as you soar above the falls in a microlight aircraft.',
    icon: '✈️',
  },
  {
    title: 'Sunset Cruises',
    description: 'Drift along the Upper Zambezi as the sun sets, enjoying drinks and snacks while spotting hippos and elephants.',
    icon: '🌅',
  },
  {
    title: 'Ra-Ikane River Cruise',
    description: 'Enjoy a luxury cruise on the Zambezi River aboard the elegant Ra-Ikane vessel, with gourmet dining and premium beverages.',
    icon: '⛵',
  },
];

const wildlifeActivities = [
  {
    title: 'Game Drives',
    description: 'Explore the Zambezi National Park on morning or evening game drives. Spot elephants, lions, buffalo, and more in their natural habitat.',
  },
  {
    title: 'Big Five Safari',
    description: 'Venture to nearby national parks for the chance to see all of Africa\'s Big Five: lion, leopard, elephant, rhino, and buffalo.',
  },
  {
    title: 'Chobe Day Trip',
    description: 'Cross into Botswana for a day trip to Chobe National Park, home to one of Africa\'s largest elephant populations.',
  },
  {
    title: 'Walking Safaris',
    description: 'Get up close to nature on guided walking safaris through the bush, learning about tracks, plants, and smaller wildlife.',
  },
];

const culturalActivities = [
  {
    title: 'Village Tours',
    description: 'Visit local villages to learn about traditional Zimbabwean life, crafts, and customs.',
  },
  {
    title: 'Boma Dinner',
    description: 'Experience a traditional African feast with drumming, dancing, and entertainment under the stars.',
  },
  {
    title: 'Craft Markets',
    description: 'Browse local craft markets for handmade souvenirs, from wooden carvings to traditional textiles.',
  },
];

export default function ActivitiesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
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
          <p className="font-serif text-[1.25rem] uppercase tracking-[0.3em] mb-1">
            Adventure Capital of Africa
          </p>
          <h1 className="font-script text-[6rem] text-brand-gold leading-none">
            Activities
          </h1>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-24 bg-brand-daisy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
            Unforgettable Experiences Await
          </h2>
          <p className="text-lg text-brand-forest/80 leading-relaxed">
            Victoria Falls is renowned as the adventure capital of Africa, offering an incredible array of activities for every type of traveler. From heart-pounding adrenaline adventures to serene sunset cruises, cultural experiences to wildlife encounters, there's something for everyone.
          </p>
        </div>
      </section>

      {/* Adrenaline Activities */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-4">
              Adrenaline Adventures
            </h2>
            <p className="text-lg text-brand-forest/70">
              For the thrill-seekers and adventure enthusiasts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adrenalineActivities.map((activity) => (
              <div key={activity.title} className="bg-brand-daisy p-6 transition-colors">
                <h3 className="font-serif text-2xl text-brand-forest mb-4">{activity.title}</h3>
                <p className="text-brand-forest/70 leading-relaxed">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenic Activities */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-brand-daisy">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-4">
              Scenic Experiences
            </h2>
            <p className="text-lg text-brand-forest/70">
              Take in the beauty of Victoria Falls from unique perspectives
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {scenicActivities.map((activity) => (
              <div key={activity.title} className="bg-white p-8 flex gap-6">
                <div className="text-5xl">{activity.icon}</div>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl text-brand-forest mb-3">{activity.title}</h3>
                  <p className="text-brand-forest/70 leading-relaxed">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wildlife Activities */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-4">
              Wildlife Encounters
            </h2>
            <p className="text-lg text-brand-forest/70">
              Get close to Africa's magnificent wildlife
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {wildlifeActivities.map((activity) => (
              <div key={activity.title} className="border-l-4 border-brand-gold bg-brand-daisy p-6">
                <h3 className="font-serif text-2xl text-brand-forest mb-3">{activity.title}</h3>
                <p className="text-brand-forest/70 leading-relaxed">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Activities */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-brand-daisy">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-4">
              Cultural Experiences
            </h2>
            <p className="text-lg text-brand-forest/70">
              Immerse yourself in local culture and traditions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {culturalActivities.map((activity) => (
              <div key={activity.title} className="bg-white p-6 text-center">
                <h3 className="font-serif text-xl text-brand-forest mb-3">{activity.title}</h3>
                <p className="text-brand-forest/70 text-sm leading-relaxed">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ra-Ikane River Cruise Highlight */}
      <section className="py-16 md:py-24 bg-brand-forest text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">
                Ra-Ikane River Cruise
              </h2>
              <p className="text-white/90 leading-relaxed mb-4">
                Experience the ultimate luxury on the Zambezi River aboard the elegant Ra-Ikane vessel. This premium cruise offers an intimate setting with gourmet canapés, premium beverages, and exceptional service.
              </p>
              <p className="text-white/90 leading-relaxed mb-6">
                As you glide along the river, watch the sun set over the African horizon while elephants, hippos, and crocodiles make appearances along the riverbanks. The perfect way to end an adventurous day.
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 bg-brand-gold text-white font-semibold uppercase tracking-wide hover:bg-brand-gold/90 transition-all duration-200 rounded-full"
              >
                Book Your Cruise
              </a>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/images/wildlife-2.png"
                alt="Ra-Ikane River Cruise"
                fill
                className="object-cover"
              />
            </div>
          </div>
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
            Our concierge team can arrange all activities and excursions, ensuring you make the most of your time in Victoria Falls. Contact us to start planning your adventure.
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
