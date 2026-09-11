'use client';

import { PageSection, LayoutName } from '@/types/sections';
import dynamic from 'next/dynamic';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SectionComponent = React.ComponentType<{ data: any; pageSlug?: string }>;

// Critical above-the-fold components - SSR enabled
const Hero = dynamic(() => import('./Hero'));
const HeroSection = dynamic(() => import('./HeroSection'));
const TextMedia = dynamic(() => import('./TextMedia'));
const TextBlock = dynamic(() => import('./TextBlock'));
const IntroSection = dynamic(() => import('./IntroSection'));

// Below-the-fold components - defer JS loading with ssr: false
const CardGrid = dynamic(() => import('./CardGrid'), { ssr: false });
const IconGrid = dynamic(() => import('./IconGrid'), { ssr: false });
const TestimonialCarousel = dynamic(() => import('./TestimonialCarousel'), { ssr: false });
const CtaBanner = dynamic(() => import('./CtaBanner'), { ssr: false });
const Gallery = dynamic(() => import('./Gallery'), { ssr: false });
const Accordion = dynamic(() => import('./Accordion'), { ssr: false });
const Timeline = dynamic(() => import('./Timeline'), { ssr: false });
const RateTable = dynamic(() => import('./RateTable'), { ssr: false });
const InfoBar = dynamic(() => import('./InfoBar'), { ssr: false });
const MediaCarousel = dynamic(() => import('./MediaCarousel'), { ssr: false });
const StaySection = dynamic(() => import('./StaySection'), { ssr: false });
const DiningSection = dynamic(() => import('./DiningSection'), { ssr: false });
const WildlifeSection = dynamic(() => import('./WildlifeSection'), { ssr: false });
const ActivitiesSection = dynamic(() => import('./ActivitiesSection'), { ssr: false });
const ReviewsSection = dynamic(() => import('./ReviewsSection'), { ssr: false });
const CtaBannerSection = dynamic(() => import('./CtaBannerSection'), { ssr: false });

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
