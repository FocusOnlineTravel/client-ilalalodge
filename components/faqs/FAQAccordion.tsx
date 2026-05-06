'use client';

import { useState, ReactNode } from 'react';
import { Plus } from 'lucide-react';

interface FAQ {
  q: string;
  a: ReactNode;
}

interface FAQCategory {
  id: string;
  title: string;
  faqs: FAQ[];
}

const categories: FAQCategory[] = [
  {
    id: 'getting-here',
    title: 'Getting Here & Transfers',
    faqs: [
      {
        q: 'Do you offer airport transfers to Ilala Lodge Hotel?',
        a: (
          <>
            <p className="mb-3">Yes, we do.</p>
            <ul className="space-y-1.5 list-none">
              <li>
                <strong>Victoria Falls Airport</strong> — US$21 per person each way (~30 minute drive)
              </li>
              <li>
                <strong>Livingstone Airport (Zambia)</strong> — US$50 per person each way (~1 hour)
              </li>
              <li>
                <strong>Kasane Airport (Botswana)</strong> — US$69 per person each way (~1.5–2 hours)
              </li>
            </ul>
          </>
        ),
      },
      {
        q: 'How far is Ilala Lodge Hotel from Victoria Falls?',
        a: 'It is a gentle 8–10 minute walk, only about 936 steps, from the front door of the hotel. Alternatively, we can arrange a taxi for those less mobile.',
      },
      {
        q: 'Do I need to rent a car in Victoria Falls?',
        a: 'It is not necessary to rent a car in Victoria Falls. We provide airport transfers, and inter-hotel transfers and all activities have transfers to and from the hotel included in the cost.',
      },
      {
        q: 'How close is the hotel to the centre of Victoria Falls town?',
        a: 'Our hotel is situated in the heart of the Victoria Falls town centre — within walking distance of both the town and the Victoria Falls waterfall.',
      },
      {
        q: 'Is there a declaration form I need to fill out on entry into Zimbabwe?',
        a: (
          <>
            Yes, there is. Stay ahead of the queues by completing the Zimbabwean Immigration Declaration form online before you fly. Find the form{' '}
            <a
              href="https://evisa.gov.zw/app/index.html#/standby-kiosk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:underline"
            >
              here
            </a>
            .
          </>
        ),
      },
    ],
  },
  {
    id: 'the-hotel',
    title: 'The Hotel & Rooms',
    faqs: [
      {
        q: 'Do you have Wi-Fi at the hotel?',
        a: 'Yes, we have free Wi-Fi access throughout the hotel.',
      },
      {
        q: 'Do you host weddings at Ilala Lodge Hotel?',
        a: 'Regrettably, we do not host weddings at our hotel premises. However, we always welcome accommodation-only bookings for weddings held locally.',
      },
      {
        q: 'Do you have mosquito nets over the beds?',
        a: 'Our Classic Suites and Executive Suites have 4-poster mosquito netting over each bed. Our Classic Rooms and Deluxe Rooms do not, but each room has air conditioning, gauzed sliding doors, and extra mosquito spray and cream available.',
      },
      {
        q: 'Are there fridges in the rooms?',
        a: 'Each room is equipped with a minibar fridge.',
      },
      {
        q: 'How many rooms do you have?',
        a: 'We currently have 73 rooms, across the Deluxe, Garden and Pool Wings.',
      },
      {
        q: 'Do you have hairdryers in the rooms?',
        a: 'All rooms have hairdryers available.',
      },
      {
        q: 'What type of plug points do you have at the hotel? Should I bring an adaptor?',
        a: 'We mostly have Type D (round) and Type G (square) plug points. Universal plug points and USB ports are available in all rooms.',
      },
    ],
  },
  {
    id: 'rooms-families',
    title: 'Rooms & Families',
    faqs: [
      {
        q: 'Is it possible to add an extra bed to a Classic Room?',
        a: 'Unfortunately we cannot add an extra bed to a Classic Room. Our Classic Suites each have a King-size bed plus an additional ¾ bed. For families with children, we recommend interleading Classic or Deluxe Rooms, or the Strathearn Suite.',
      },
      {
        q: 'Do you have family rooms?',
        a: 'There are a number of family options with interleading rooms. Please contact us to find out more.',
      },
      {
        q: 'Do you offer babysitting services?',
        a: 'A babysitter can be arranged on request. Please advise the hotel at least 24 hours before.',
      },
    ],
  },
  {
    id: 'dining',
    title: 'Dining',
    faqs: [
      {
        q: 'Does your restaurant cater for vegan / kosher / vegetarian / halaal diets?',
        a: 'Yes, we can cater for specific dietary needs. Please inform the hotel of your requirements a few weeks in advance so the Chef can ensure we have the correct foods in stock for your arrival. Our general menu also offers vegetarian options.',
      },
    ],
  },
  {
    id: 'money',
    title: 'Money & Payments',
    faqs: [
      {
        q: 'Are there ATMs near the hotel?',
        a: 'Yes, there are ATMs near Ilala Lodge Hotel. We recommend you bring small denomination USD cash to Victoria Falls for shops, entrance into the Falls, curio markets, etc.',
      },
      {
        q: 'What currencies do you accept at the hotel?',
        a: 'We accept US Dollars, Zimbabwe Dollars, Euros, Pounds Sterling and South African Rand.',
      },
      {
        q: 'What credit cards do you accept at the hotel?',
        a: 'Visa and Mastercard are accepted at the hotel.',
      },
    ],
  },
  {
    id: 'health-travel',
    title: 'Health, Safety & Travel',
    faqs: [
      {
        q: 'Should I take malaria medication before travelling to Victoria Falls?',
        a: 'Although Victoria Falls is not considered a high-risk malarial area, it is advisable to seek advice from your doctor before travelling to be 100% safe.',
      },
      {
        q: 'When is the best time to visit Victoria Falls?',
        a: 'From high-water seasons with hot temperatures to the low-water season offering exceptional visibility of the Falls and cooler days, Victoria Falls is a year-round destination. Get in touch with our team to find out which season best suits your preferences.',
      },
      {
        q: 'What do I need to pack for my trip to Victoria Falls?',
        a: "Light and cool clothing for warmer days, with layers for cooler evenings. Don't forget your hat, sunglasses and sunscreen.",
      },
    ],
  },
];

interface FAQItemProps {
  faq: FAQ;
  itemId: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ faq, itemId, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-brand-stem/20">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${itemId}-panel`}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
      >
        <span className="font-serif text-lg md:text-xl text-brand-forest group-hover:text-brand-gold transition-colors">
          {faq.q}
        </span>
        <span className="flex-shrink-0 mt-1.5">
          <Plus
            className={`w-5 h-5 text-brand-gold transition-transform duration-300 ${
              isOpen ? 'rotate-45' : ''
            }`}
            strokeWidth={2}
          />
        </span>
      </button>
      <div
        id={`${itemId}-panel`}
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="text-brand-forest/75 leading-relaxed">{faq.a}</div>
        </div>
      </div>
    </div>
  );
}

export default function FAQAccordion() {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-16 md:space-y-20">
      {/* Quick Jump Links */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 -mt-4 mb-12">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            className="px-4 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider text-brand-forest bg-white border border-brand-stem/30 hover:border-brand-forest hover:bg-brand-daisy transition-all"
          >
            {cat.title}
          </a>
        ))}
      </div>

      {/* Categories */}
      {categories.map((cat) => (
        <section key={cat.id} id={cat.id} className="scroll-mt-24">
          <h2 className="font-serif text-2xl md:text-3xl text-brand-forest uppercase tracking-wider mb-6 pb-3 border-b-2 border-brand-gold inline-block">
            {cat.title}
          </h2>
          <div>
            {cat.faqs.map((faq, i) => {
              const itemId = `${cat.id}-${i}`;
              return (
                <FAQItem
                  key={itemId}
                  faq={faq}
                  itemId={itemId}
                  isOpen={openIds.has(itemId)}
                  onToggle={() => toggle(itemId)}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
