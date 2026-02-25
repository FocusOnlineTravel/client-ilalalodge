import { homePage } from '@/data/homepage';
import HeroSection from '@/components/sections/HeroSection';
import IntroSection from '@/components/sections/IntroSection';
import StaySection from '@/components/sections/StaySection';
import DiningSection from '@/components/sections/DiningSection';
import WildlifeSection from '@/components/sections/WildlifeSection';
import ActivitiesSection from '@/components/sections/ActivitiesSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import CtaBannerSection from '@/components/sections/CtaBannerSection';

export default function HomePage() {
  return (
    <>
      {homePage.acf_blocks.map((block, index) => {
        switch (block.acf_fc_layout) {
          case 'hero_section':
            return <HeroSection key={index} data={block} />;
          case 'intro_section':
            return <IntroSection key={index} data={block} />;
          case 'stay_section':
            return <StaySection key={index} data={block} />;
          case 'dining_section':
            return <DiningSection key={index} data={block} />;
          case 'wildlife_section':
            return <WildlifeSection key={index} data={block} />;
          case 'activities_section':
            return <ActivitiesSection key={index} data={block} />;
          case 'reviews_section':
            return <ReviewsSection key={index} data={block} />;
          case 'cta_banner_section':
            return <CtaBannerSection key={index} data={block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
