import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'High Tea at Palm River Hotel | Ilala Lodge Hotel',
  description: 'Experience refined elegance with High Tea at Palm River Hotel on the Zambezi River. Artisanal treats, prosecco, and tranquil riverside views.',
};

export default function HighTeaPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/Ilala-Lodge-Experience-High-Tea-01.jpg"
            alt="High Tea at Palm River Hotel"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4">
            Palm River Hotel High Tea
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Refined elegance on the banks of the Zambezi
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-24 bg-brand-daisy">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-lg text-brand-forest/80 leading-relaxed mb-6">
              Experience the refined elegance of High Tea at the Palm River Hotel on the Zambezi River. Begin with effervescent hibiscus prosecco or savour artisanal brews, from velvety cappuccinos to aromatic teas.
            </p>
            <p className="text-lg text-brand-forest/80 leading-relaxed">
              Indulge in panna cottas, dainty sandwiches, mini macarons, buttery scones with whipped cream and strawberry preserves and more, all enjoyed under the shade of indigenous trees by the tranquil river.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Details */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2">
              <div className="relative h-[400px] md:h-[500px]">
                <Image
                  src="/images/Ilala-Lodge-Experience-High-Tea-05.jpg"
                  alt="High Tea Selection"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:order-1">
              <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
                The Experience
              </h2>
              <p className="text-brand-forest/80 leading-relaxed mb-4">
                Palm River Hotel, our sister property just minutes from Ilala Lodge, offers a serene riverside setting for an afternoon of indulgence.
              </p>
              <p className="text-brand-forest/80 leading-relaxed mb-4">
                The High Tea experience features a carefully curated selection of sweet and savoury treats, prepared fresh by our pastry chefs. Pair your selection with premium teas, specialty coffees, or a glass of bubbles.
              </p>
              <p className="text-brand-forest/80 leading-relaxed mb-6">
                Relax in comfortable seating beneath the trees as you watch the river flow by, with the chance to spot wildlife along the banks.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:activities@palmhospitality.co.zw"
                  className="inline-block px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-brand-forest text-white hover:bg-brand-forest/90"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 md:py-24 bg-brand-daisy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-8">
            What's Included
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-xl text-brand-forest mb-3">Sweet Treats</h3>
              <p className="text-brand-forest/70 text-sm">
                Mini macarons, panna cottas, buttery scones with cream and preserves
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-brand-forest mb-3">Savoury Selection</h3>
              <p className="text-brand-forest/70 text-sm">
                Dainty finger sandwiches with a variety of refined fillings
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-brand-forest mb-3">Beverages</h3>
              <p className="text-brand-forest/70 text-sm">
                Hibiscus prosecco, aromatic teas, cappuccinos, and specialty coffees
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Dining */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Link
            href="/dining"
            className="text-sm uppercase tracking-wider text-brand-stem hover:text-brand-gold transition-colors"
          >
            &larr; Back to Dining
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-brand-forest text-white text-center">
        <div className="max-w-[72rem] mx-auto px-4">
          <p className="font-script text-5xl md:text-[6.5rem] text-brand-gold mb-4">
            An Afternoon of Elegance
          </p>
          <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-wide mb-6">
            Reserve Your High Tea
          </h2>
          <p className="text-white/80 mb-8">
            Contact our team to arrange your High Tea experience at Palm River Hotel.
          </p>
          <a
            href="mailto:activities@palmhospitality.co.zw"
            className="inline-block px-5 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 bg-white text-brand-forest hover:bg-brand-gold hover:text-white"
          >
            Email Us
          </a>
        </div>
      </section>
    </>
  );
}
