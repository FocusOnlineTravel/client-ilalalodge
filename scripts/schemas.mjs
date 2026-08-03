/**
 * Zod schemas derived from types/sections.ts
 * Used for validating content before pushing to WordPress
 */

import { z } from 'zod';

// =============================================================================
// SHARED SCHEMAS
// =============================================================================

export const AcfLinkSchema = z.object({
  url: z.string(),
  title: z.string(),
  target: z.enum(['_blank', '_self']).optional(),
}).optional();

export const AcfImageSchema = z.object({
  url: z.string(),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
}).optional();

export const SectionSettingsSchema = z.object({
  section_theme: z.enum(['light', 'dark', 'accent', 'forest']),
  spacing_top: z.enum(['none', 'small', 'default', 'large']),
  spacing_bottom: z.enum(['none', 'small', 'default', 'large']),
  anchor_id: z.string().optional(),
  custom_background: AcfImageSchema.optional(),
});

// =============================================================================
// LAYOUT SCHEMAS
// =============================================================================

export const HeroSectionSchema = SectionSettingsSchema.extend({
  acf_fc_layout: z.literal('hero'),
  media_type: z.enum(['image', 'video', 'carousel']).optional(),
  hero_type: z.enum(['image', 'video', 'carousel', 'color']).optional(), // Alias
  image: AcfImageSchema.optional(),
  hero_image: AcfImageSchema.optional(), // Alias
  video_url: z.string().optional(),
  hero_video_url: z.string().optional(), // Alias
  carousel_images: z.array(AcfImageSchema).optional(),
  eyebrow: z.string().optional(),
  hero_eyebrow: z.string().optional(), // Alias
  heading: z.string().optional(),
  hero_heading: z.string().optional(), // Alias
  subheading: z.string().optional(),
  hero_subheading: z.string().optional(), // Alias
  overlay_opacity: z.number().optional(),
  hero_overlay_opacity: z.number().optional(), // Alias
  height: z.enum(['tall', 'medium', 'compact']).optional(),
  hero_height: z.enum(['tall', 'medium', 'compact', 'short']).optional(), // Alias
  cta: AcfLinkSchema.optional(),
  show_play_button: z.boolean().optional(),
  video_modal_url: z.string().optional(),
});

export const TextBlockSectionSchema = SectionSettingsSchema.extend({
  acf_fc_layout: z.literal('text_block'),
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  content: z.string().optional(),
  body: z.string().optional(), // Alias
  max_width: z.enum(['narrow', 'medium', 'wide', 'full']).optional(),
  text_align: z.enum(['left', 'center']).optional(),
});

export const TextMediaSectionSchema = SectionSettingsSchema.extend({
  acf_fc_layout: z.literal('text_media'),
  eyebrow: z.string().optional(),
  heading: z.string(),
  subheading: z.string().optional(),
  content: z.string().optional(),
  body: z.string().optional(), // Alias
  cta_primary: AcfLinkSchema.optional(),
  cta_secondary: AcfLinkSchema.optional(),
  cta_secondary_action: z.enum(['link', 'booking_modal', 'whatsapp']).optional(),
  media_position: z.enum(['left', 'right']).optional(),
  media_type: z.enum(['image', 'gallery_grid', 'slider', 'video', 'gallery']).optional(),
  image: AcfImageSchema.optional(),
  gallery_images: z.array(AcfImageSchema).optional(),
  gallery: z.array(AcfImageSchema).optional(), // Alias
  video_url: z.string().optional(),
  layout_ratio: z.enum(['40_60', '50_50', '60_40']).optional(),
  media_height: z.enum(['auto', '400', '500', 'full']).optional(),
  button_text: z.string().optional(),
  button_url: z.string().optional(),
  buttons: z.array(z.object({
    text: z.string(),
    url: z.string(),
    style: z.string().optional(),
    external: z.boolean().optional(),
  })).optional(),
});

export const CardDetailSchema = z.object({
  icon: z.string().optional(),
  label: z.string(),
  value: z.string().optional(),
});

export const CardSchema = z.object({
  image: AcfImageSchema.optional(),
  carousel_images: z.array(AcfImageSchema).optional(),
  images: z.array(z.string()).optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  details: z.array(CardDetailSchema).optional(),
  cta_primary: AcfLinkSchema.optional(),
  cta_secondary: AcfLinkSchema.optional(),
  slug: z.string().optional(),
  size: z.string().optional(),
  sleeps: z.string().optional(),
  beds: z.string().optional(),
  price_from: z.string().optional(),
  email: z.string().optional(),
  phones: z.array(z.string()).optional(),
  whatsapp: z.string().optional(),
  time: z.string().optional(),
  price: z.string().optional(),
  video_url: z.string().optional(),
  list_items: z.array(z.object({
    label: z.string(),
    value: z.string().optional(),
  })).optional(),
});

export const CardGridSectionSchema = SectionSettingsSchema.extend({
  acf_fc_layout: z.literal('card_grid'),
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  subheading: z.string().optional(),
  card_type: z.enum(['room', 'activity', 'feature', 'content', 'cpt_rooms', 'minimal', 'contact', 'image_carousel', 'info', 'list', 'room_listing', 'cruise_option']).optional(),
  card_style: z.string().optional(), // Alias
  columns: z.enum(['1', '2', '3', '4']).optional(),
  cards: z.array(CardSchema).optional(),
  rooms: z.array(z.string()).optional(),
  show_price_pill: z.boolean().optional(),
});

export const IconItemSchema = z.object({
  icon: AcfImageSchema.optional(),
  label: z.string(),
  link: AcfLinkSchema.optional(),
});

export const IconGridSectionSchema = SectionSettingsSchema.extend({
  acf_fc_layout: z.literal('icon_grid'),
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  layout: z.enum(['grid', 'inline']).optional(),
  icon_style: z.string().optional(),
  columns: z.number().optional(),
  icons: z.array(IconItemSchema).optional(),
  items: z.array(z.object({
    label: z.string(),
    link: z.string().optional(),
  })).optional(),
  show_download: z.boolean().optional(),
  download_file: z.string().optional(),
  download_label: z.string().optional(),
});

export const ReviewSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  quote: z.string().optional(), // Alias
  author: z.string(),
  source: z.string().optional(),
});

export const TestimonialCarouselSectionSchema = SectionSettingsSchema.extend({
  acf_fc_layout: z.literal('testimonial_carousel'),
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  reviews: z.array(ReviewSchema).optional(),
  testimonials: z.array(ReviewSchema).optional(), // Alias
  cards_per_slide: z.enum(['1', '2', '3']).optional(),
  auto_advance: z.boolean().optional(),
});

export const MediaCarouselItemSchema = z.object({
  title: z.string(),
  media_type: z.enum(['image', 'pdf']).optional(),
  image: AcfImageSchema.optional(),
  pdf: z.string().optional(),
});

export const MediaCarouselSectionSchema = SectionSettingsSchema.extend({
  acf_fc_layout: z.literal('media_carousel'),
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  items: z.array(MediaCarouselItemSchema),
  display_mode: z.enum(['carousel', 'tabs']).optional(),
});

export const GalleryImageSchema = z.object({
  image: AcfImageSchema.optional(),
  url: z.string().optional(), // Direct URL
  alt: z.string().optional(),
  caption: z.string().optional(),
  category: z.string().optional(),
});

export const GallerySectionSchema = SectionSettingsSchema.extend({
  acf_fc_layout: z.literal('gallery'),
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  enable_filters: z.boolean().optional(),
  images: z.array(GalleryImageSchema),
  columns: z.enum(['2', '3', '4']).optional(),
  max_width: z.enum(['medium', 'wide', 'full']).optional(),
});

export const AccordionItemSchema = z.object({
  title: z.string(),
  content: z.string(),
  category: z.string().optional(),
  is_open: z.boolean().optional(),
});

export const AccordionSectionSchema = SectionSettingsSchema.extend({
  acf_fc_layout: z.literal('accordion'),
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  subheading: z.string().optional(),
  description: z.string().optional(),
  enable_categories: z.boolean().optional(),
  items: z.array(AccordionItemSchema),
  allow_multiple: z.boolean().optional(),
  default_open: z.number().optional(),
  enable_schema: z.boolean().optional(),
});

export const CtaBannerSectionSchema = SectionSettingsSchema.extend({
  acf_fc_layout: z.literal('cta_banner'),
  eyebrow: z.string().optional(),
  heading: z.string(),
  subheading: z.string().optional(),
  content: z.string().optional(),
  body: z.string().optional(), // Alias
  cta_primary: AcfLinkSchema.optional(),
  cta_secondary: AcfLinkSchema.optional(),
  button_text: z.string().optional(),
  button_url: z.string().optional(),
  button_style: z.string().optional(),
  buttons: z.array(z.object({
    text: z.string(),
    url: z.string(),
    style: z.string().optional(),
    external: z.boolean().optional(),
  })).optional(),
  layout: z.enum(['centered', 'split']).optional(),
  background_type: z.enum(['color', 'image']).optional(),
  background_image: AcfImageSchema.optional(),
  show_service_ctas: z.boolean().optional(),
  service_email: z.string().optional(),
  cta_type: z.string().optional(),
  contact_email: z.string().optional(),
});

export const MilestoneSchema = z.object({
  year: z.string(),
  label: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
});

export const TimelineSectionSchema = SectionSettingsSchema.extend({
  acf_fc_layout: z.literal('timeline'),
  eyebrow: z.string().optional(),
  heading: z.string().optional(),
  milestones: z.array(MilestoneSchema).optional(),
  items: z.array(MilestoneSchema).optional(), // Alias
  footer_text: z.string().optional(),
  footer_style: z.enum(['normal', 'italic']).optional(),
});

export const RateRoomSchema = z.object({
  sharing_price: z.number().optional(),
  single_price: z.number().optional(),
  label: z.string().optional(),
  rate: z.string().optional(),
  rate_sharing: z.string().optional(),
  rate_single: z.string().optional(),
  view_link: z.string().optional(),
  view_label: z.string().optional(),
  book_link: AcfLinkSchema.optional(),
});

export const RateCategorySchema = z.object({
  category_name: z.string().optional(),
  name: z.string().optional(), // Alias
  rooms: z.array(RateRoomSchema).optional(),
  rows: z.array(RateRoomSchema).optional(), // Alias
});

export const SimpleRowSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const RateTableSectionSchema = SectionSettingsSchema.extend({
  acf_fc_layout: z.literal('rate_table'),
  heading: z.string().optional(),
  table_type: z.enum(['rates', 'simple']).optional(),
  rate_categories: z.array(RateCategorySchema).optional(),
  categories: z.array(RateCategorySchema).optional(), // Alias
  simple_rows: z.array(SimpleRowSchema).optional(),
  currency: z.string().optional(),
  show_book_buttons: z.boolean().optional(),
  show_booking_button: z.boolean().optional(), // Alias
});

export const InfoBarItemSchema = z.object({
  icon: z.string().optional(),
  label: z.string(),
  value: z.string(),
  unit: z.string().optional(),
});

export const InfoBarSectionSchema = SectionSettingsSchema.extend({
  acf_fc_layout: z.literal('info_bar'),
  items: z.array(InfoBarItemSchema).optional(),
  content_type: z.string().optional(),
  download_url: z.string().optional(),
  download_label: z.string().optional(),
  back_link_url: z.string().optional(),
  back_link_label: z.string().optional(),
  columns: z.enum(['2', '3', '4']).optional(),
  show_dividers: z.boolean().optional(),
});

// =============================================================================
// UNION SCHEMA
// =============================================================================

export const PageSectionSchema = z.discriminatedUnion('acf_fc_layout', [
  HeroSectionSchema,
  TextBlockSectionSchema,
  TextMediaSectionSchema,
  CardGridSectionSchema,
  IconGridSectionSchema,
  TestimonialCarouselSectionSchema,
  MediaCarouselSectionSchema,
  GallerySectionSchema,
  AccordionSectionSchema,
  CtaBannerSectionSchema,
  TimelineSectionSchema,
  RateTableSectionSchema,
  InfoBarSectionSchema,
]);

// =============================================================================
// PAGE SCHEMA
// =============================================================================

export const PageSeoSchema = z.object({
  title: z.string(),
  description: z.string(),
  og_image: z.string().nullable().optional(),
});

export const PageDataSchema = z.object({
  title: z.string(),
  slug: z.string(),
  seo: PageSeoSchema,
  page_sections: z.array(PageSectionSchema),
  parent: z.string().optional(),
  menu_order: z.number().optional(),
});

// =============================================================================
// OPTIONS SCHEMA
// =============================================================================

export const NavItemSchema = z.object({
  label: z.string(),
  href: z.string(),
  sub_items: z.array(z.object({
    label: z.string(),
    href: z.string(),
  })).optional(),
});

export const FooterLinkSchema = z.object({
  url: z.string(),
  title: z.string(),
});

export const NavColumnSchema = z.object({
  title: z.string(),
  links: z.array(FooterLinkSchema),
});

export const OptionsSchema = z.object({
  site_name: z.string(),
  header: z.object({
    logo: AcfImageSchema,
    logo_scrolled: AcfImageSchema.optional(),
    nav_items: z.array(NavItemSchema),
    booking_url: z.string(),
  }),
  footer: z.object({
    logo: AcfImageSchema,
    tagline: z.string().optional(),
    nav_columns: z.array(NavColumnSchema),
    copyright: z.string(),
  }),
  contact: z.object({
    email: z.string(),
    phone: z.string(),
    whatsapp: z.string(),
    address: z.string(),
    front_desk_phone: z.string().optional(),
    front_desk_email: z.string().optional(),
    front_desk_whatsapp: z.string().optional(),
    agents_phone: z.string().optional(),
    agents_email: z.string().optional(),
  }),
  social: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    tripadvisor: z.string().optional(),
  }),
});

// =============================================================================
// VALIDATION HELPERS
// =============================================================================

export function validatePageData(data, filePath) {
  const result = PageDataSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map(e => ({
      path: e.path.join('.'),
      message: e.message,
    }));
    throw new Error(`Validation failed for ${filePath}:\n${errors.map(e => `  - ${e.path}: ${e.message}`).join('\n')}`);
  }
  return result.data;
}

export function validateOptions(data) {
  const result = OptionsSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map(e => ({
      path: e.path.join('.'),
      message: e.message,
    }));
    throw new Error(`Options validation failed:\n${errors.map(e => `  - ${e.path}: ${e.message}`).join('\n')}`);
  }
  return result.data;
}
