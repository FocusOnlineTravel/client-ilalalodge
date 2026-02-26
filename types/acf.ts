export interface AcfImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface AcfCta {
  label: string;
  url: string;
  target?: '_blank' | '_self';
}

// One interface per ACF flexible content layout:

export interface HeroBlock {
  acf_fc_layout: 'hero_section';
  hero_heading: string;
  hero_subheading?: string;
  hero_background_image: AcfImage;
  hero_cta: AcfCta;
  hero_scroll_label?: string;
}

export interface IntroBlock {
  acf_fc_layout: 'intro_section';
  intro_eyebrow: string;
  intro_heading: string;
  intro_body_copy: string;
  intro_cta: AcfCta;
  intro_image: AcfImage;
}

export interface StayBlock {
  acf_fc_layout: 'stay_section';
  stay_eyebrow: string;
  stay_heading: string;
  stay_subheading?: string;
  stay_rooms: {
    room_name: string;
    room_count: number;
    room_description: string;
    room_price_from: string;
    room_price_suffix?: string;
    room_image: AcfImage;
    room_cta: AcfCta;
  }[];
}

export interface DiningBlock {
  acf_fc_layout: 'dining_section';
  dining_eyebrow: string;
  dining_heading: string;
  dining_subheading: string;
  dining_body_copy: string;
  dining_cta: AcfCta;
  dining_images: AcfImage[];
}

export interface WildlifeBlock {
  acf_fc_layout: 'wildlife_section';
  wildlife_eyebrow: string;
  wildlife_heading: string;
  wildlife_body_copy: string;
  wildlife_cta: AcfCta;
  wildlife_images: AcfImage[];
}

export interface ReviewsBlock {
  acf_fc_layout: 'reviews_section';
  reviews_eyebrow: string;
  reviews_heading: string;
  reviews_items: {
    review_title: string;
    review_body: string;
    review_author: string;
    review_source?: string;
  }[];
}

export interface ActivitiesBlock {
  acf_fc_layout: 'activities_section';
  activities_eyebrow: string;
  activities_heading: string;
  activities_items: {
    activity_icon?: AcfImage;
    activity_label: string;
  }[];
  activities_cta: AcfCta;
}

export interface CtaBannerBlock {
  acf_fc_layout: 'cta_banner_section';
  cta_banner_heading: string;
  cta_banner_subheading?: string;
  cta_banner_image: AcfImage;
  cta_banner_cta: AcfCta;
}

export type AcfBlock =
  | HeroBlock
  | IntroBlock
  | StayBlock
  | DiningBlock
  | WildlifeBlock
  | ReviewsBlock
  | ActivitiesBlock
  | CtaBannerBlock;

export interface HomePage {
  title: string;
  slug: string;
  seo_title: string;
  seo_description: string;
  acf_blocks: AcfBlock[];
}
