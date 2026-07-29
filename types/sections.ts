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
  content: string;
  cta_primary?: AcfLink;
  cta_secondary?: AcfLink;
  cta_secondary_action?: 'link' | 'booking_modal' | 'whatsapp';
  media_position?: 'left' | 'right';
  media_type: 'image' | 'gallery_grid' | 'slider' | 'video';
  image?: AcfImage;
  gallery_images?: AcfImage[];
  video_url?: string;
  layout_ratio?: '40_60' | '50_50' | '60_40';
  media_height?: 'auto' | '400' | '500' | 'full';
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
  media_type: 'image' | 'pdf';
  image?: AcfImage;
  pdf?: string;
}

export interface MediaCarouselSection extends SectionSettings {
  acf_fc_layout: 'media_carousel';
  eyebrow?: string;
  heading?: string;
  items: MediaCarouselItem[];
  display_mode?: 'carousel' | 'tabs';
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
  | InfoBarSection;

// =============================================================================
// LAYOUT NAME TYPE
// =============================================================================

export type LayoutName = PageSection['acf_fc_layout'];
