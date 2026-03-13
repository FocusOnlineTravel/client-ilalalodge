import Image from 'next/image';
import { BOOKING_URL } from '@/lib/constants';

export const metadata = {
  title: 'Location & Victoria Falls | Ilala Lodge Hotel',
  description: 'Discover the closest hotel to Victoria Falls. Located just an 8-minute walk from one of the Seven Natural Wonders of the World.',
};

const viewpoints = [
  {
    number: '1',
    name: 'Devils Cataract',
    description: 'The westernmost viewpoint offers dramatic views of the powerful Devils Cataract, where the Zambezi River begins its spectacular plunge.',
  },
  {
    number: '2',
    name: 'Cataract Island',
    description: 'A peaceful vantage point providing unique perspectives of the falls and the surrounding gorge.',
  },
  {
    number: '3',
    name: 'Main Falls',
    description: 'The centerpiece of Victoria Falls, where the majority of the Zambezi River crashes down in thunderous glory.',
  },
  {
    number: '4',
    name: 'Horseshoe Falls',
    description: 'Named for its distinctive curved shape, this section offers some of the most photogenic views of the falls.',
  },
  {
    number: '5',
    name: 'Rainbow Falls',
    description: 'Famous for the spectacular rainbows created by the mist, especially stunning in the afternoon light.',
  },
  {
    number: '6',
    name: 'Armchair',
    description: 'A comfortable viewing spot that allows you to take in the majesty of the falls at your leisure.',
  },
  {
    number: '7',
    name: 'Eastern Cataract',
    description: 'The easternmost section of the Zimbabwe side, offering a different perspective of the falls.',
  },
  {
    number: '8',
    name: 'Danger Point',
    description: 'An aptly named viewpoint that gets you incredibly close to the edge for thrilling views.',
  },
];

export default function LocationPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/wildlife-3.png"
            alt="Victoria Falls"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <p className="font-serif text-[1.25rem] uppercase tracking-[0.3em] mb-1">
            The Closest Hotel to the Falls
          </p>
          <h1 className="font-script text-[6rem] text-brand-gold leading-none">
            Our Location
          </h1>
        </div>
      </section>

      {/* Location Overview */}
      <section className="py-16 md:py-24 bg-brand-daisy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
            In the Heart of Victoria Falls
          </h2>
          <p className="text-lg text-brand-forest/80 leading-relaxed mb-6">
            Ilala Lodge Hotel is a family-run luxury hotel offering accommodation in the heart of Victoria Falls, Zimbabwe. Nestled in attractive gardens, the well-appointed hotel is a mere eight-minute walk from Victoria Falls, one of the Seven Natural Wonders of the World.
          </p>
          <p className="text-lg text-brand-forest/80 leading-relaxed">
            The Victoria Falls National Park borders the front of the property and, as such, wild animals often graze on the hotel lawns. You might even be lucky enough to witness a herd of elephants feasting on the trees while you relax on your private balcony.
          </p>
        </div>
      </section>

      {/* Victoria Falls Viewpoints */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-4">
              Victoria Falls Viewpoints
            </h2>
            <p className="text-lg text-brand-forest/70">
              Explore the magnificent Victoria Falls from multiple vantage points along the Zimbabwe side
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {viewpoints.map((viewpoint) => (
              <div key={viewpoint.number} className="bg-brand-daisy p-6 border-l-4 border-brand-gold">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl font-serif text-brand-gold">{viewpoint.number}</span>
                  <h3 className="font-serif text-xl text-brand-forest">{viewpoint.name}</h3>
                </div>
                <p className="text-brand-forest/70 text-sm leading-relaxed">{viewpoint.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Victoria Falls */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-brand-daisy">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
                The Smoke That Thunders
              </h2>
              <p className="text-brand-forest/80 leading-relaxed mb-4">
                Victoria Falls, known locally as Mosi-oa-Tunya (The Smoke That Thunders), is one of the world's most spectacular waterfalls. At over 1,700 meters wide and 108 meters high, it creates the largest sheet of falling water in the world.
              </p>
              <p className="text-brand-forest/80 leading-relaxed mb-4">
                The falls were named after Queen Victoria by Scottish explorer David Livingstone, who was the first European to view the falls in 1855. Today, they remain one of Africa's most iconic natural attractions.
              </p>
              <p className="text-brand-forest/80 leading-relaxed">
                The spray from the falls can be seen from up to 50 kilometers away, and during peak flow, over 500 million liters of water cascade over the edge every minute.
              </p>
            </div>
            <div className="relative h-[400px] md:h-[500px]">
              <Image
                src="/images/wildlife-1.png"
                alt="Victoria Falls"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Victoria Falls Bridge */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] md:h-[500px] md:order-1">
              <Image
                src="/images/banner-image.png"
                alt="Victoria Falls Bridge"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:order-2">
              <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
                The Historic Victoria Falls Bridge
              </h2>
              <p className="text-brand-forest/80 leading-relaxed mb-4">
                Spanning the Zambezi River just below the falls, the Victoria Falls Bridge is an engineering marvel completed in 1905. The bridge connects Zimbabwe and Zambia and offers breathtaking views of the gorge.
              </p>
              <p className="text-brand-forest/80 leading-relaxed mb-4">
                Today, the bridge is famous for hosting one of the world's highest bungee jumps at 111 meters. Whether you're seeking adventure or simply want to admire the architecture, the bridge is a must-visit landmark.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Best Time to Visit */}
      <section className="py-16 md:py-24 bg-brand-forest text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-8">
            Best Time to Visit
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-xl text-brand-gold mb-3">High Water</h3>
              <p className="text-sm text-white/90 mb-2 font-semibold">February - May</p>
              <p className="text-white/80 text-sm">
                Peak flow with maximum spray. The falls are at their most powerful, though mist can sometimes obscure views.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-brand-gold mb-3">Medium Water</h3>
              <p className="text-sm text-white/90 mb-2 font-semibold">June - August</p>
              <p className="text-white/80 text-sm">
                Excellent viewing conditions with clear skies and moderate flow. Ideal for photography and sightseeing.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-brand-gold mb-3">Low Water</h3>
              <p className="text-sm text-white/90 mb-2 font-semibold">September - January</p>
              <p className="text-white/80 text-sm">
                Lower water levels reveal the impressive rock formations. Perfect for swimming at Devil's Pool.
              </p>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
