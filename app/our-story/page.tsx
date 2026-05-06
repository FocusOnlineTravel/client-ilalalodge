import Image from 'next/image';
import { BOOKING_URL } from '@/lib/constants';

export const metadata = {
  title: 'Our Story | Ilala Lodge Hotel',
  description:
    'The history of Ilala Lodge Hotel — a Zimbabwean family legacy that began in 1989 and continues to welcome guests at the gateway to Victoria Falls.',
};

const milestones = [
  { year: '1989', label: 'Construction begins' },
  { year: '1991', label: 'Hotel opens with 16 rooms' },
  { year: '1994', label: 'Expanded to 34 rooms' },
  { year: '2015', label: '56 rooms' },
  { year: '2018', label: '73 rooms today' },
];

export default function OurStoryPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/banner-image.png"
            alt="Ilala Lodge Hotel"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4">
            Our Story
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            A Zimbabwean family legacy at the gateway to Victoria Falls
          </p>
        </div>
      </section>

      {/* Our Story Narrative - Part 1 */}
      <section className="pt-16 md:pt-24 pb-12 md:pb-16 bg-brand-daisy">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-lg text-brand-forest/80 leading-relaxed mb-6">
            The history of Ilala Lodge Hotel is an interesting one that ties a Zimbabwean family&rsquo;s background and business to the property that houses the popular and beautiful hotel today.
          </p>
          <p className="text-lg text-brand-forest/80 leading-relaxed mb-6">
            In 1989, the site, which was originally the Sprayview Restaurant, was offered to the then owners of the crocodile farm, Strath Brown and his partner, Rob Gee. Along with Strath&rsquo;s wife Beryl, they chose to open a boutique hotel that had 16 bedrooms; at that time, the number of rooms and the hotel rating dictated the price of beer in hotel bars and restaurants. Ironically, the original size of Ilala Lodge Hotel was based on this criterion!
          </p>
          <p className="text-lg text-brand-forest/80 leading-relaxed">
            In October 1989, the ground was officially broken and construction was underway. Architect Richard Beattie and Interior Designer Thelma Newmarch worked tirelessly with the builder, Biffen, to create an inviting atmosphere that was the foundation for the success that Ilala Lodge Hotel still enjoys. Strath and his son Keith were personally involved in the building of the hotel, thatching the roof themselves. Hand-selected gum poles and thatching grass from the family farm in Darwendale were used in the original structure.
          </p>
        </div>
      </section>

      {/* Image Grid Break */}
      <section className="grid grid-cols-4">
        {[
          { src: '/images/intr0-image.png', alt: 'Ilala Lodge Hotel gardens' },
          { src: '/images/pool.png', alt: 'Hotel poolside' },
          { src: '/images/wildlife-1.png', alt: 'Wildlife on the hotel lawns' },
          { src: '/images/Classic-Suite-ILH--1334x1000.jpg', alt: 'Classic Suite at Ilala Lodge Hotel' },
        ].map((img) => (
          <div key={img.src} className="relative aspect-square">
            <Image src={img.src} alt={img.alt} fill className="object-cover" />
          </div>
        ))}
      </section>

      {/* Our Story Narrative - Part 2 */}
      <section className="pt-12 md:pt-16 pb-16 md:pb-24 bg-brand-daisy">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-lg text-brand-forest/80 leading-relaxed mb-6">
            Beryl Brown, a passionate gardener, established the hotel&rsquo;s gardens, which remain a defining feature today. The unique Indian Laburnum trees &mdash; known as the &lsquo;Golden Tree&rsquo; &mdash; were part of her vision and continue to brighten the front of the property when in bloom. The name Ilala Lodge was suggested by Thelma, inspired by the Ilala palms in the area; &lsquo;Ilala&rsquo; is also the Ndebele word for &lsquo;lie down&rsquo;.
          </p>
          <p className="text-lg text-brand-forest/80 leading-relaxed">
            In 1991, the opening ceremony was a resounding success with the local Chief &mdash; a highly respected member of the Victoria Falls community &mdash; presiding over the show. As tradition allows, the Chief blessed the hotel, signifying what was to be a great start for Ilala Lodge Hotel. In April 1991, the first guests to stay at the hotel were family friends from Darwendale.
          </p>
        </div>
      </section>

      {/* Milestone Timeline */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <p className="font-script text-4xl md:text-6xl text-brand-gold text-center mb-2">
            Through the years
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-brand-forest text-center uppercase tracking-wider mb-16 md:mb-20">
            Our Journey
          </h2>

          {/* Desktop: Horizontal Timeline */}
          <div className="hidden md:block relative">
            <div className="absolute top-[5px] left-[10%] right-[10%] h-px bg-brand-gold/40" />
            <div className="grid grid-cols-5 relative">
              {milestones.map((m) => (
                <div key={m.year} className="flex flex-col items-center text-center px-2">
                  <div className="w-[11px] h-[11px] rounded-full bg-brand-gold relative z-10" />
                  <div className="font-serif text-2xl lg:text-3xl text-brand-forest mt-6 mb-2">
                    {m.year}
                  </div>
                  <div className="text-sm text-brand-forest/70 max-w-[160px]">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Vertical Timeline */}
          <div className="md:hidden">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-5">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-brand-gold mt-3" />
                  {i < milestones.length - 1 && (
                    <div className="w-px flex-1 bg-brand-gold/40 my-1" />
                  )}
                </div>
                <div className="pb-8">
                  <div className="font-serif text-2xl text-brand-forest mb-1">{m.year}</div>
                  <div className="text-sm text-brand-forest/70">{m.label}</div>
                </div>
              </div>
            ))}
          </div>

          <p className="max-w-3xl mx-auto text-base md:text-lg text-brand-forest/70 leading-relaxed text-center mt-16 md:mt-20 italic">
            In 1994, Strathearn&rsquo;s daughter, Laura, oversaw the expansion to 34 rooms. The hotel today offers 73 rooms across a range of Classic and Deluxe Rooms and Suites &mdash; the result of further renovations completed in 2015 and 2018.
          </p>
        </div>
      </section>

      {/* Family Legacy */}
      <section className="py-16 md:py-24 bg-brand-daisy">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest mb-6">
            A Family Legacy
          </h2>
          <p className="text-lg text-brand-forest/80 leading-relaxed">
            Today, Strath&rsquo;s sons, Andrew and Jim, along with their families, remain actively involved, continuing the legacy of a family-run hotel shaped by care, character, and a strong sense of place.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-brand-forest text-white text-center">
        <div className="max-w-[72rem] mx-auto px-4">
          <p className="font-script text-5xl md:text-[6.5rem] text-brand-gold mb-4">
            Experience Ilala Lodge
          </p>
          <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-wide mb-6">
            Book Your Stay Today
          </h2>
          <p className="text-white/80 mb-8">
            Discover why guests return to Ilala Lodge year after year.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 bg-white text-brand-forest font-semibold uppercase tracking-wide hover:bg-brand-gold hover:text-white transition-all duration-200 rounded-full"
          >
            Book Now
          </a>
        </div>
      </section>
    </>
  );
}
