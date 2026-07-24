'use client';

import { useState } from 'react';
import { AccordionSection } from '@/types/sections';
import { ChevronDown } from 'lucide-react';

interface Props {
  data: AccordionSection;
}

export default function Accordion({ data }: Props) {
  const [openItems, setOpenItems] = useState<number[]>(
    data.default_open ? [data.default_open] : []
  );

  const bgClass = {
    light: 'bg-white',
    dark: 'bg-brand-forest',
    accent: 'bg-brand-daisy',
    forest: 'bg-brand-forest',
  }[data.section_theme];

  const textColorClass = data.section_theme === 'dark' || data.section_theme === 'forest' ? 'text-white' : 'text-brand-forest';

  const toggleItem = (index: number) => {
    if (data.allow_multiple) {
      setOpenItems((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenItems((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <section className={`py-16 md:py-24 ${bgClass}`} id={data.anchor_id}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        {(data.heading || data.description) && (
          <div className="text-center mb-12">
            {data.heading && (
              <h2 className={`font-serif text-3xl md:text-4xl ${textColorClass} mb-4`}>
                {data.heading}
              </h2>
            )}
            {data.description && (
              <p className={`${textColorClass}/80 max-w-2xl mx-auto`}>
                {data.description}
              </p>
            )}
          </div>
        )}

        {/* Accordion Items */}
        <div className="space-y-4">
          {data.items.map((item, index) => {
            const isOpen = openItems.includes(index);
            return (
              <div
                key={index}
                className="border border-brand-stem/20 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className={`w-full flex items-center justify-between p-4 lg:p-6 text-left ${
                    isOpen ? 'bg-brand-forest text-white' : 'bg-white text-brand-forest hover:bg-brand-daisy'
                  } transition-colors`}
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg lg:text-xl pr-4">{item.title}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-[2000px]' : 'max-h-0'
                  }`}
                >
                  <div
                    className="p-4 lg:p-6 text-brand-stem bg-white prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Schema */}
        {data.enable_schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: data.items.map((item) => ({
                  '@type': 'Question',
                  name: item.title,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.content.replace(/<[^>]*>/g, ''),
                  },
                })),
              }),
            }}
          />
        )}
      </div>
    </section>
  );
}
