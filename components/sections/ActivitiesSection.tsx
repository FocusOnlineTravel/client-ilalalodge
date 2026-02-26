import { ActivitiesBlock } from '@/types/acf';
import {
  Plane,
  Mountain,
  Waves,
  Binoculars,
  Ship,
  Users,
  Wind,
  Zap,
  TreePine,
  Map,
  Camera,
  Fish
} from 'lucide-react';
import React from 'react';

interface Props {
  data: ActivitiesBlock;
}

// Map activity labels to icons
const getActivityIcon = (label: string) => {
  const iconClass = "h-8 w-8 text-brand-forest";

  const iconMap: Record<string, React.ReactElement> = {
    'Helicopter Flights': <Plane className={iconClass} />,
    'Bungee Jumping': <Mountain className={iconClass} />,
    'White Water Rafting': <Waves className={iconClass} />,
    'Game Drives': <Binoculars className={iconClass} />,
    'River Cruises': <Ship className={iconClass} />,
    'Cultural Tours': <Users className={iconClass} />,
    'Gorge Swing': <Wind className={iconClass} />,
    'Zip Lining': <Zap className={iconClass} />,
    'Big Five Safari': <TreePine className={iconClass} />,
    'Chobe Day Trip': <Map className={iconClass} />,
    'Hwange Day Trip': <Camera className={iconClass} />,
    'Fishing': <Fish className={iconClass} />,
  };

  return iconMap[label] || <Camera className={iconClass} />;
};

export default function ActivitiesSection({ data }: Props) {
  return (
    <section className="py-16 lg:py-24 bg-white text-brand-forest" id="activities">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-brand-gold font-script text-6xl lg:text-8xl block mb-2">
            {data.activities_eyebrow}
          </span>
          <h2 className="font-serif text-3xl lg:text-5xl text-brand-forest mb-8">
            {data.activities_heading}
          </h2>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 lg:gap-8 mb-12">
          {data.activities_items.map((activity, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-3 p-4 bg-brand-daisy/20 hover:bg-brand-daisy/30 transition-colors"
            >
              <div className="p-4">
                {getActivityIcon(activity.activity_label)}
              </div>
              <span className="text-sm font-medium text-brand-forest">{activity.activity_label}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href={data.activities_cta.url}
            target={data.activities_cta.target}
            rel={data.activities_cta.target === '_blank' ? 'noopener noreferrer' : undefined}
            className="inline-block bg-brand-gold hover:bg-brand-gold/90 text-brand-forest px-8 py-4 rounded-full font-semibold transition-all duration-200 hover:shadow-lg"
          >
            {data.activities_cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
