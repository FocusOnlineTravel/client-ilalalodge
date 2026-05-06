import Image from 'next/image';
import Link from 'next/link';
import InteractiveMap from '@/components/InteractiveMap';

export const metadata = {
  title: 'Victoria Falls | Ilala Lodge Hotel',
  description:
    'Explore Victoria Falls — viewpoints, history, the bridge, and when to visit. Ilala Lodge Hotel sits just 936 steps from the entrance to one of the Seven Natural Wonders of the World.',
};

const viewpoints = [
  {
    number: '01',
    title: "Devil's Cataract & Livingstone's Statue",
    height: '70m high',
    description:
      "The most Western edge of the falls overlooking Devil's Cataract, so named because the local tribes used to perform sacrificial ceremonies from the Cataract Island.",
  },
  {
    number: '02',
    title: 'The "Chain Walk"',
    description:
      'A set of stairs leading down into the gorge, the only viewpoint below the top level of the gorge. Allow for excellent views down the length of the gorge, towards Main Falls.',
  },
  {
    number: '03 – 05',
    title: "Devil's Cataract & Main Falls",
    description:
      "All afford great views looking towards Devil's Cataract and New Falls where you can see the river starting to erode the next fault line. In thousands of years, this will become the new Victoria Falls.",
  },
  {
    number: '06',
    title: 'Approaching Main Falls',
    description:
      "From this long viewpoint, one can look back towards Devil's Cataract, Cataract Island and then Main Falls.",
  },
  {
    number: '07',
    title: "Looking West Towards Devil's Cataract",
    description:
      'You can see it in full length, with views of the gorge and the river far below. Best seen early in the day as this is one of the few viewpoints with a rainbow in the morning.',
  },
  {
    number: '08',
    title: 'Main Falls',
    height: '93m high',
    description:
      "The best views of Main Falls with beautiful rainbows in the afternoon. However, when the river is in flood, little can be seen due to torrents of spray, with a peak flow rate of 700,000 cubic metres per minute. Moving on from Viewpoint 8, you will enter the true 'Rainforest' — large trees in constantly damp soil, this amazing area is one of the only places on Earth to receive 'rain' 24 hours a day, 365 days a year.",
  },
  {
    number: '09 – 11',
    title: 'Main Falls',
    description:
      'These viewpoints will take you out of the rainforest and can be very wet with spray in the high-water seasons.',
  },
  {
    number: '12',
    title: 'Livingstone Island',
    description:
      'Provides wet and intermittent views of Livingstone Island and Rainbow Falls in high water. It is the island on the opposite side of the gorge from which Livingstone is said to have first seen the falls.',
  },
  {
    number: '13',
    title: 'Horseshoe Falls',
    height: '95m high',
    description:
      'Aptly named, the geography of the falls creates a horseshoe-shape on the eastern side of Livingstone Island. This section has the lowest volume of water and is therefore the first to dry up during the dry season.',
  },
  {
    number: '14',
    title: 'Rainbow Falls',
    height: '108m high',
    description:
      'This is the highest section of Victoria Falls at 108m. As the name suggests, beautiful rainbows can be enjoyed in the afternoon and whilst walking on to the next viewpoint.',
  },
  {
    number: '15',
    title: 'Danger Point',
    description:
      "So named as it leads along the cliff edge next to the Rainbow Falls to the most eastern edge of Zimbabwe. This is where the turbulent water from the falls exits and continues downriver. From this point, you can see the Eastern Cataract on the Zambian side and if looking down into the gorge, you will see the 'Boiling Pot' and Rapid number 1, where the commercial White-Water Rafting trips start.",
  },
  {
    number: '16',
    title: 'Victoria Falls Bridge',
    description:
      'This last viewpoint is away from the falls following the gorge south, bringing you to view the famous Victoria Falls Bridge, which links Zimbabwe and Zambia. Keep a lookout for adrenaline seekers taking the 111-metre plunge that is the Victoria Falls Bridge Bungee Jump.',
  },
];

const entryFees = [
  { label: 'International ID', price: '$58 USD' },
  { label: 'SADC ID', price: '$35 USD' },
  { label: 'Zimbabwean ID', price: '$7 USD' },
];

export default function VictoriaFallsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/banner-image-2-cropped.png"
            alt="Victoria Falls"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4">
            Victoria Falls
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            936 steps from one of the Seven Natural Wonders of the World
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24 bg-brand-daisy">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-lg text-brand-forest/80 leading-relaxed mb-6">
            As a holiday destination, Victoria Falls is simply the ultimate all-round experience. The scenery, the wildlife, the activities and the culture and history combine to offer a fantastic adventure. Ilala Lodge Hotel is centrally located, offering guests an ideal place to begin their journey. In fact, the hotel is only 936 steps from the mighty Victoria Falls &mdash; we counted!
          </p>
          <p className="text-lg text-brand-forest/80 leading-relaxed">
            Victoria Falls, located on the border between Zimbabwe and Zambia, has some of the most astounding views of any natural World Wonder. The massive sheet of falling water is mesmerizing and awe-inspiring, as is the view down the chasm itself. The natural rainforest on the Zimbabwean side of the Falls is a unique habitat to over 400 plant species, numerous bird species and small antelope and primates. The nearby Victoria Falls National Park, as well as the towns of Victoria Falls and Livingstone, offers additional activities &mdash; from nature-based experiences and cultural trips to bungee jumping and white-water rafting.
          </p>
        </div>
      </section>

      {/* Interactive Map */}
      <section id="map" className="py-16 md:py-24 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-script text-4xl md:text-5xl text-brand-gold mb-2">Explore the area</p>
            <h2 className="font-serif text-2xl md:text-3xl text-brand-forest uppercase tracking-wider">
              Victoria Falls Town & Surrounds
            </h2>
          </div>
          <InteractiveMap />
        </div>
      </section>

      {/* Viewpoints */}
      <section id="viewpoints" className="py-16 md:py-24 bg-brand-daisy scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="font-script text-4xl md:text-5xl text-brand-gold mb-2">The walk</p>
            <h2 className="font-serif text-2xl md:text-3xl text-brand-forest uppercase tracking-wider mb-4">
              Zimbabwe Viewpoints
            </h2>
            <p className="text-base md:text-lg text-brand-forest/70 max-w-2xl mx-auto">
              Sixteen marked viewpoints take you along the Zimbabwean side of the Falls — from Devil&rsquo;s Cataract in the west to the Victoria Falls Bridge in the east.
            </p>
          </div>

          <div className="space-y-6">
            {viewpoints.map((vp) => (
              <div key={vp.number} className="bg-white p-6 md:p-8 border-l-4 border-brand-gold">
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="font-serif text-3xl md:text-4xl text-brand-gold leading-none flex-shrink-0 min-w-[60px] md:min-w-[80px]">
                    {vp.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 mb-2">
                      <h3 className="font-serif text-xl md:text-2xl text-brand-forest">{vp.title}</h3>
                      {vp.height && (
                        <span className="text-sm text-brand-stem italic">{vp.height}</span>
                      )}
                    </div>
                    <p className="text-brand-forest/70 leading-relaxed">{vp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to Visit */}
      <section id="when-to-visit" className="py-16 md:py-24 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-script text-4xl md:text-5xl text-brand-gold mb-2">Year-round</p>
            <h2 className="font-serif text-2xl md:text-3xl text-brand-forest uppercase tracking-wider">
              When to Visit
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-brand-daisy p-8">
              <h3 className="font-serif text-2xl text-brand-forest mb-4">High Water</h3>
              <p className="text-sm text-brand-stem uppercase tracking-wider mb-4">April – July</p>
              <p className="text-brand-forest/70 leading-relaxed">
                The Falls are full and spectacular at their peak flow, creating an impressive wall of water. Visitors are sure to get wet walking through the dense rainforest from the spray. Photos can be tricky to get from the ground at this time of year.
              </p>
            </div>
            <div className="bg-brand-daisy p-8">
              <h3 className="font-serif text-2xl text-brand-forest mb-4">Low Water</h3>
              <p className="text-sm text-brand-stem uppercase tracking-wider mb-4">Late August – December</p>
              <p className="text-brand-forest/70 leading-relaxed">
                Wildlife is far more visible in the bush, making this the best season for game viewing. The water flow of the Falls diminishes and the rocky cliff face can be seen more clearly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Take */}
      <section id="what-to-take" className="py-16 md:py-24 bg-brand-forest text-white scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-script text-4xl md:text-5xl text-brand-gold mb-2">Before you go</p>
            <h2 className="font-serif text-2xl md:text-3xl uppercase tracking-wider">
              What to Take With You
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-serif text-xl mb-4 text-brand-gold uppercase tracking-wider">Entry Fees</h3>
              <p className="text-white/80 leading-relaxed mb-6">
                Bring your ID and either a credit card or cash. Rates depend on nationality:
              </p>
              <ul className="space-y-3">
                {entryFees.map((fee) => (
                  <li
                    key={fee.label}
                    className="flex items-baseline justify-between gap-4 pb-3 border-b border-white/15"
                  >
                    <span className="text-white/90">{fee.label}</span>
                    <span className="font-serif text-xl text-brand-gold">{fee.price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-xl mb-4 text-brand-gold uppercase tracking-wider">Pack These</h3>
              <ul className="space-y-3 text-white/85">
                <li className="flex gap-3">
                  <span className="text-brand-gold">&bull;</span>
                  <span>Tennis shoes for the walk</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold">&bull;</span>
                  <span>A hat and sunscreen</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold">&bull;</span>
                  <span>A light raincoat or poncho during high-water months (you will get wet)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold">&bull;</span>
                  <span>A waterproof bag or cover for cameras and phones</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section id="history" className="py-16 md:py-24 bg-white scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-script text-4xl md:text-5xl text-brand-gold mb-2">Since 1855</p>
            <h2 className="font-serif text-2xl md:text-3xl text-brand-forest uppercase tracking-wider">
              History of Victoria Falls
            </h2>
          </div>
          <p className="text-lg text-brand-forest/80 leading-relaxed mb-6">
            The history of Victoria Falls is a fascinating one based primarily on the monumental discovery of the Falls by Dr. David Livingstone in 1855. When he and his exploratory team first encountered the &lsquo;Smoke that Thunders&rsquo;, he saw &lsquo;&hellip;scenes so lovely they must have been gazed upon by angels in their flight.&rsquo;
          </p>
          <p className="text-lg text-brand-forest/80 leading-relaxed">
            Livingstone&rsquo;s discovery and the history surrounding it intrigue many Victoria Falls visitors. Tours of this UNESCO World Heritage site give great insight into this history. Ilala Lodge Hotel has compiled a book that tells the story in detail and is available at the hotel.
          </p>
        </div>
      </section>

      {/* Victoria Falls Bridge */}
      <section id="bridge" className="py-16 md:py-24 bg-brand-daisy scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative h-[300px] md:h-[420px]">
              <Image
                src="/images/banner-image.png"
                alt="Victoria Falls Bridge"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-script text-3xl md:text-4xl text-brand-gold mb-2">Built 1905</p>
              <h2 className="font-serif text-2xl md:text-3xl text-brand-forest uppercase tracking-wider mb-6">
                Victoria Falls Bridge
              </h2>
              <p className="text-brand-forest/80 leading-relaxed mb-4">
                The Victoria Falls Bridge was built in 1905 to link what are now Zimbabwe and Zambia. The bridge was the vision of Cecil John Rhodes, who wanted &lsquo;the spray of the Falls on the train carriages&rsquo;.
              </p>
              <p className="text-brand-forest/80 leading-relaxed">
                Constructed from steel, the arch spans <strong>156.50 metres</strong>, with a height of <strong>128 metres</strong> above the valley floor. Apart from cars, trains and foot traffic, it also hosts the world-famous <strong>111-metre Shearwater Bungee Jump</strong>. A railway museum near the Falls is a good source of information for railway enthusiasts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-brand-forest text-white text-center">
        <div className="max-w-[72rem] mx-auto px-4">
          <p className="font-script text-5xl md:text-[6.5rem] text-brand-gold mb-4">
            Ready to explore?
          </p>
          <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-wide mb-6">
            Plan Your Trip to the Falls
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Our Activities Desk can arrange tours, transfers, and every excursion in and around Victoria Falls.
          </p>
          <Link
            href="/activities"
            className="inline-block px-6 pt-2 pb-1.5 bg-white text-brand-forest font-semibold uppercase tracking-wide hover:bg-brand-gold hover:text-white transition-all duration-200 rounded-full"
          >
            View Activities
          </Link>
        </div>
      </section>
    </>
  );
}
