/**
 * TypeScript types for ACF Flexible Content sections
 * Matches SECTIONS.md contract exactly
 */

// =============================================================================
// SHARED TYPES
// =============================================================================

/** ACF Link field shape */
export interface AcfLink {
  url: string;
  title: string;
  target?: '_blank' | '_self';
}

/** ACF Image field shape (return format = ID, but we use URL in JSON for now) */
export interface AcfImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

/** Shared section settings (ACF clone field) */
export interface SectionSettings {
  section_theme: 'light' | 'dark' | 'accent' | 'forest';
  spacing_top: 'none' | 'small' | 'default' | 'large';
  spacing_bottom: 'none' | 'small' | 'default' | 'large';
  anchor_id?: string;
  custom_background?: AcfImage;
}

// =============================================================================
// LAYOUT 1: HERO
// =============================================================================

export interface HeroSection extends SectionSettings {
  acf_fc_layout: 'hero';
  media_type: 'image' | 'video' | 'carousel';
  image?: AcfImage;
  video_url?: string;
  carousel_images?: AcfImage[];
  eyebrow?: string;
  heading: string;
  subheading?: string;
  overlay_opacity?: number;
  height?: 'tall' | 'medium' | 'compact';
  text_position?: 'center' | 'bottom';
  cta?: AcfLink;
  show_play_button?: boolean;
  video_modal_url?: string;
}

// =============================================================================
// LAYOUT 2: TEXT_BLOCK
// =============================================================================

export interface TextBlockSection extends SectionSettings {
  acf_fc_layout: 'text_block';
  eyebrow?: string;
  heading?: string;
  content: string;
  max_width?: 'narrow' | 'medium' | 'wide';
  text_align?: 'left' | 'center';
}

// =============================================================================
// LAYOUT 3: TEXT_MEDIA
// =============================================================================

export interface TextMediaSection extends SectionSettings {
  acf_fc_layout: 'text_media';
  eyebrow?: string;
  heading: string;
  subheading?: string;
  highlight?: string;
  content: string;
  cta_primary?: AcfLink;
  cta_secondary?: AcfLink;
  cta_secondary_action?: 'link' | 'booking_modal' | 'whatsapp';
  cta_tertiary?: AcfLink;
  cta_tertiary_action?: 'link' | 'booking_modal' | 'whatsapp';
  show_service_ctas?: boolean;
  service_email?: string;
  media_position?: 'left' | 'right';
  media_type: 'image' | 'gallery_grid' | 'slider' | 'video';
  image?: AcfImage;
  image_link?: string;
  gallery_images?: AcfImage[];
  video_url?: string;
  layout_ratio?: '40_60' | '50_50' | '60_40';
  media_height?: 'auto' | '400' | '500' | 'full';
  max_width?: 'medium' | 'wide' | 'full';
}

// =============================================================================
// LAYOUT 4: CARD_GRID
// =============================================================================

export interface CardDetail {
  icon: string;
  label: string;
  value: string;
}

export interface Card {
  image?: AcfImage;
  carousel_images?: AcfImage[];
  title: string;
  description?: string;
  details?: CardDetail[];
  cta_primary?: AcfLink;
  cta_secondary?: AcfLink;
}

export interface CardGridSection extends SectionSettings {
  acf_fc_layout: 'card_grid';
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  card_type: 'room' | 'activity' | 'feature' | 'content' | 'cpt_rooms';
  columns?: '2' | '3' | '4';
  cards?: Card[];
  rooms?: string[]; // Room IDs when card_type = 'cpt_rooms'
  show_price_pill?: boolean;
  text_align?: 'left' | 'center' | 'right';
  card_size?: 'small' | 'default' | 'large';
  max_width?: 'medium' | 'wide' | 'full';
}

// =============================================================================
// LAYOUT 5: ICON_GRID
// =============================================================================

export interface IconItem {
  icon: AcfImage;
  label: string;
  link?: AcfLink;
}

export interface IconGridSection extends SectionSettings {
  acf_fc_layout: 'icon_grid';
  eyebrow?: string;
  heading?: string;
  layout?: 'grid' | 'inline';
  icons: IconItem[];
  show_download?: boolean;
  download_file?: string;
  download_label?: string;
}

// =============================================================================
// LAYOUT 6: TESTIMONIAL_CAROUSEL
// =============================================================================

export interface Review {
  title: string;
  content: string;
  author: string;
  source?: string;
}

export interface TestimonialCarouselSection extends SectionSettings {
  acf_fc_layout: 'testimonial_carousel';
  eyebrow?: string;
  heading?: string;
  reviews: Review[];
  cards_per_slide?: '1' | '2' | '3';
  auto_advance?: boolean;
}

// =============================================================================
// LAYOUT 7: MEDIA_CAROUSEL
// =============================================================================

export interface MediaCarouselItem {
  title: string;
  subtitle?: string;
  description?: string;
  media_type: 'image' | 'pdf';
  image?: AcfImage;
  pdf?: string;
}

export interface MediaCarouselSection extends SectionSettings {
  acf_fc_layout: 'media_carousel';
  eyebrow?: string;
  heading?: string;
  items: MediaCarouselItem[];
  display_mode?: 'carousel' | 'tabs' | 'cards';
  items_per_slide?: '2' | '3' | '4';
}

// =============================================================================
// LAYOUT 8: GALLERY
// =============================================================================

export interface GalleryImage {
  image: AcfImage;
  caption?: string;
  category?: string;
}

export interface GallerySection extends SectionSettings {
  acf_fc_layout: 'gallery';
  eyebrow?: string;
  heading?: string;
  enable_filters?: boolean;
  images: GalleryImage[];
  columns?: '2' | '3' | '4';
  max_width?: 'medium' | 'wide' | 'full';
  aspect_ratio?: '1:1' | '4:3' | '16:9';
  // Category-specific galleries (used on main Gallery page)
  // These get merged into `images` array by normalise.ts with category labels
  rooms_gallery?: GalleryImage[];
  dining_gallery?: GalleryImage[];
  pool_bar_gallery?: GalleryImage[];
  conferencing_gallery?: GalleryImage[];
  wildlife_gallery?: GalleryImage[];
  hotel_grounds_gallery?: GalleryImage[];
}

// =============================================================================
// LAYOUT 9: ACCORDION
// =============================================================================

export interface AccordionItem {
  title: string;
  content: string;
}

export interface AccordionSection extends SectionSettings {
  acf_fc_layout: 'accordion';
  heading?: string;
  description?: string;
  items: AccordionItem[];
  allow_multiple?: boolean;
  default_open?: number;
  enable_schema?: boolean;
}

// =============================================================================
// LAYOUT 10: CTA_BANNER
// =============================================================================

export interface CtaBannerSection extends SectionSettings {
  acf_fc_layout: 'cta_banner';
  eyebrow?: string;
  heading: string;
  subheading?: string;
  content?: string;
  cta_primary?: AcfLink;
  cta_secondary?: AcfLink;
  layout?: 'centered' | 'split';
  background_type?: 'color' | 'image';
  background_image?: AcfImage;
  show_service_ctas?: boolean;
  service_email?: string;
}

// =============================================================================
// LAYOUT 11: TIMELINE
// =============================================================================

export interface Milestone {
  year: string;
  label: string;
}

export interface TimelineSection extends SectionSettings {
  acf_fc_layout: 'timeline';
  eyebrow?: string;
  heading?: string;
  milestones: Milestone[];
  footer_text?: string;
  footer_style?: 'normal' | 'italic';
}

// =============================================================================
// LAYOUT 12: RATE_TABLE
// =============================================================================

export interface RateRoom {
  sharing_price: number;
  single_price: number;
  view_link?: AcfLink;
  book_link?: AcfLink;
}

export interface RateCategory {
  category_name: string;
  rooms: RateRoom[];
}

export interface SimpleRow {
  label: string;
  value: string;
}

export interface RateTableSection extends SectionSettings {
  acf_fc_layout: 'rate_table';
  heading?: string;
  table_type: 'rates' | 'simple';
  rate_categories?: RateCategory[];
  simple_rows?: SimpleRow[];
  currency?: string;
  show_book_buttons?: boolean;
}

// =============================================================================
// LAYOUT 13: INFO_BAR
// =============================================================================

export interface InfoBarItem {
  icon: string;
  label: string;
  value: string;
  unit?: string;
}

export interface InfoBarSection extends SectionSettings {
  acf_fc_layout: 'info_bar';
  items: InfoBarItem[];
  columns?: '2' | '3' | '4';
  show_dividers?: boolean;
}

// =============================================================================
// LAYOUT 14: HOME_HERO_SECTION
// =============================================================================

export interface HomeHeroSection extends SectionSettings {
  acf_fc_layout: 'hero_section';
  hero_heading?: string;
  hero_subheading?: string;
  hero_background_image?: AcfImage;
  hero_cta?: AcfLink;
  hero_video_url?: string;
  hero_scroll_label?: string;
}

// =============================================================================
// LAYOUT 15: HOME_INTRO_SECTION
// =============================================================================

export interface HomeIntroSection extends SectionSettings {
  acf_fc_layout: 'intro_section';
  intro_eyebrow?: string;
  intro_heading?: string;
  intro_body_copy?: string;
  intro_cta?: AcfLink;
  intro_image?: AcfImage;
}

// =============================================================================
// LAYOUT 16: HOME_STAY_SECTION
// =============================================================================

export interface StayRoom {
  room_name?: string;
  room_count?: number;
  room_description?: string;
  room_price_from?: string;
  room_price_suffix?: string;
  room_image?: AcfImage;
  room_cta?: AcfLink;
}

export interface HomeStaySection extends SectionSettings {
  acf_fc_layout: 'stay_section';
  stay_eyebrow?: string;
  stay_heading?: string;
  stay_subheading?: string;
  stay_rooms?: StayRoom[];
}

// =============================================================================
// LAYOUT 17: HOME_DINING_SECTION
// =============================================================================

export interface HomeDiningSection extends SectionSettings {
  acf_fc_layout: 'dining_section';
  dining_eyebrow?: string;
  dining_heading?: string;
  dining_subheading?: string;
  dining_body_copy?: string;
  dining_cta?: AcfLink;
  dining_cta_secondary?: AcfLink;
  dining_images?: AcfImage[];
}

// =============================================================================
// LAYOUT 18: HOME_WILDLIFE_SECTION
// =============================================================================

export interface HomeWildlifeSection extends SectionSettings {
  acf_fc_layout: 'wildlife_section';
  wildlife_eyebrow?: string;
  wildlife_heading?: string;
  wildlife_body_copy?: string;
  wildlife_cta?: AcfLink;
  wildlife_images?: AcfImage[];
}

// =============================================================================
// LAYOUT 19: HOME_ACTIVITIES_SECTION
// =============================================================================

export interface ActivityItem {
  activity_label?: string;
  activity_url?: string;
  activity_icon?: AcfImage;
}

export interface HomeActivitiesSection extends SectionSettings {
  acf_fc_layout: 'activities_section';
  activities_eyebrow?: string;
  activities_heading?: string;
  activities_items?: ActivityItem[];
  activities_cta?: AcfLink;
}

// =============================================================================
// LAYOUT 20: HOME_REVIEWS_SECTION
// =============================================================================

export interface ReviewItem {
  review_title?: string;
  review_body?: string;
  review_author?: string;
  review_source?: string;
}

export interface HomeReviewsSection extends SectionSettings {
  acf_fc_layout: 'reviews_section';
  reviews_eyebrow?: string;
  reviews_heading?: string;
  reviews_items?: ReviewItem[];
}

// =============================================================================
// LAYOUT 21: HOME_CTA_BANNER_SECTION
// =============================================================================

export interface HomeCtaBannerSection extends SectionSettings {
  acf_fc_layout: 'cta_banner_section';
  cta_banner_heading?: string;
  cta_banner_subheading?: string;
  cta_banner_image?: AcfImage;
  cta_banner_cta?: AcfLink;
}

// =============================================================================
// DISCRIMINATED UNION
// =============================================================================

export type PageSection =
  | HeroSection
  | TextBlockSection
  | TextMediaSection
  | CardGridSection
  | IconGridSection
  | TestimonialCarouselSection
  | MediaCarouselSection
  | GallerySection
  | AccordionSection
  | CtaBannerSection
  | TimelineSection
  | RateTableSection
  | InfoBarSection
  | HomeHeroSection
  | HomeIntroSection
  | HomeStaySection
  | HomeDiningSection
  | HomeWildlifeSection
  | HomeActivitiesSection
  | HomeReviewsSection
  | HomeCtaBannerSection;

// =============================================================================
// LAYOUT NAME TYPE
// =============================================================================

export type LayoutName = PageSection['acf_fc_layout'];
