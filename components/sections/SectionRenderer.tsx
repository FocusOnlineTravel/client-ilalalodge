'use client';

import { PageSection, LayoutName } from '@/types/sections';
import dynamic from 'next/dynamic';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SectionComponent = React.ComponentType<{ data: any; pageSlug?: string }>;

// Dynamically import section components
const Hero = dynamic(() => import('./Hero'));
const TextMedia = dynamic(() => import('./TextMedia'));
const CardGrid = dynamic(() => import('./CardGrid'));
const IconGrid = dynamic(() => import('./IconGrid'));
const TestimonialCarousel = dynamic(() => import('./TestimonialCarousel'));
const CtaBanner = dynamic(() => import('./CtaBanner'));
const TextBlock = dynamic(() => import('./TextBlock'));
const Gallery = dynamic(() => import('./Gallery'));
const Accordion = dynamic(() => import('./Accordion'));
const Timeline = dynamic(() => import('./Timeline'));
const RateTable = dynamic(() => import('./RateTable'));
const InfoBar = dynamic(() => import('./InfoBar'));
const MediaCarousel = dynamic(() => import('./MediaCarousel'));

// Homepage bespoke layouts
const HeroSection = dynamic(() => import('./HeroSection'));
const IntroSection = dynamic(() => import('./IntroSection'));
const StaySection = dynamic(() => import('./StaySection'));
const DiningSection = dynamic(() => import('./DiningSection'));
const WildlifeSection = dynamic(() => import('./WildlifeSection'));
const ActivitiesSection = dynamic(() => import('./ActivitiesSection'));
const ReviewsSection = dynamic(() => import('./ReviewsSection'));
const CtaBannerSection = dynamic(() => import('./CtaBannerSection'));

// Component map keyed by acf_fc_layout
const SECTION_COMPONENTS: Record<LayoutName, SectionComponent> = {
  hero: Hero,
  text_block: TextBlock,
  text_media: TextMedia,
  card_grid: CardGrid,
  icon_grid: IconGrid,
  testimonial_carousel: TestimonialCarousel,
  media_carousel: MediaCarousel,
  gallery: Gallery,
  accordion: Accordion,
  cta_banner: CtaBanner,
  timeline: Timeline,
  rate_table: RateTable,
  info_bar: InfoBar,
  hero_section: HeroSection,
  intro_section: IntroSection,
  stay_section: StaySection,
  dining_section: DiningSection,
  wildlife_section: WildlifeSection,
  activities_section: ActivitiesSection,
  reviews_section: ReviewsSection,
  cta_banner_section: CtaBannerSection,
};

interface UnknownLayoutWarningProps {
  layout: string;
}

function UnknownLayoutWarning({ layout }: UnknownLayoutWarningProps) {
  // Only show warning in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 my-4 rounded">
      <strong className="font-bold">Warning:</strong>
      <span className="block sm:inline"> Unknown layout type: <code className="bg-yellow-200 px-1">{layout}</code></span>
    </div>
  );
}

interface SectionRendererProps {
  sections: PageSection[];
  pageSlug?: string;
}

export default function SectionRenderer({ sections, pageSlug }: SectionRendererProps) {
  const content = sections.map((section, index) => {
    const Component = SECTION_COMPONENTS[section.acf_fc_layout];

    if (!Component) {
      return <UnknownLayoutWarning key={index} layout={section.acf_fc_layout} />;
    }

    return <Component key={index} data={section} pageSlug={pageSlug} />;
  });

  if (pageSlug) {
    return <div className={`page-${pageSlug}`}>{content}</div>;
  }

  return <>{content}</>;
}
