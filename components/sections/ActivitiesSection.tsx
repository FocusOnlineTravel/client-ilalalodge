import { ActivitiesBlock } from '@/types/acf';
import Image from 'next/image';
import React from 'react';
import FadeInView from '@/components/animations/FadeInView';

interface Props {
  data: ActivitiesBlock;
}

// Map activity labels to custom icons
const getActivityIcon = (label: string) => {
  const iconMap: Record<string, string> = {
    'Helicopter Flights': '/icons/icon-chopper 1.png',
    'Bungee Jumping': '/icons/waterfall 1.png',
    'White Water Rafting': '/icons/icon-boat 1.png',
    'Game Drives': '/icons/family-car 2.png',
    'River Cruises': '/icons/icon-boat 1.png',
    'Cultural Tours': '/icons/quiver 1.png',
    'Gorge Swing': '/icons/walk 1.png',
    'Zip Lining': '/icons/waterfall 1.png',
    'Big Five Safari': '/icons/pawprint 1.png',
    'Chobe Day Trip': '/icons/family-car 2.png',
    'Hwange Day Trip': '/icons/family-car 2.png',
    'Fishing': '/icons/icon-boat 1.png',
  };

  const iconSrc = iconMap[label] || '/icons/waterfall 1.png';

  return (
    <Image
      src={iconSrc}
      alt={label}
      width={60}
      height={60}
      className="w-16 h-16 object-contain"
    />
  );
};

export default function ActivitiesSection({ data }: Props) {
  return (
    <section className="py-16 lg:py-24 bg-white text-brand-forest" id="activities">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <FadeInView>
          <div className="text-center mb-12 lg:mb-16">
            <span className="text-brand-script font-script text-6xl lg:text-8xl block mb-2">
              {data.activities_eyebrow}
            </span>
            <h2 className="font-serif text-3xl lg:text-5xl text-brand-forest mb-8">
              {data.activities_heading}
            </h2>
          </div>
        </FadeInView>

        {/* Activities Grid */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12 my-16 max-w-6xl mx-auto">
          {data.activities_items.map((activity, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-3 w-32 group cursor-pointer"
            >
              <div className="transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300">
                {getActivityIcon(activity.activity_label)}
              </div>
              <span className="text-sm font-medium text-brand-forest group-hover:text-brand-gold transition-colors duration-200">{activity.activity_label}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href={data.activities_cta.url}
            target={data.activities_cta.target}
            rel={data.activities_cta.target === '_blank' ? 'noopener noreferrer' : undefined}
            className="inline-block bg-brand-forest hover:bg-brand-forest/90 text-white px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 rounded-full font-semibold transition-all duration-200 uppercase tracking-wide"
          >
            {data.activities_cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
