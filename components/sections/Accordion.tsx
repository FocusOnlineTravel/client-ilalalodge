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

  // Static display: single always-open boxed block (e.g. Terms & Conditions).
  // The item content is treated as prose with gold bullet points; no toggle.
  if (data.static_display) {
    return (
      <section className={`py-16 md:py-24 ${bgClass}`} id={data.anchor_id}>
        <div className="max-w-4xl mx-auto px-4">
          {data.items.map((item, index) => (
            <div
              key={index}
              className="bg-brand-daisy/50 border border-brand-stem/20 rounded-lg p-6 md:p-8"
            >
              <h3 className="font-serif text-xl text-brand-forest mb-4">{item.title}</h3>
              <div
                className="text-brand-forest/70 text-sm md:text-base leading-relaxed prose prose-sm max-w-none [&_ul]:list-none [&_ul]:pl-0 [&_ul]:space-y-2 [&_li]:relative [&_li]:pl-6 [&_li:before]:content-['•'] [&_li:before]:absolute [&_li:before]:left-0 [&_li:before]:text-brand-gold [&_p]:mb-4 [&_p:last-child]:mb-0"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

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
                    className="p-4 lg:p-6 text-brand-stem bg-white prose prose-sm max-w-none [&>p]:mb-4 [&>p:last-child]:mb-0"
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
