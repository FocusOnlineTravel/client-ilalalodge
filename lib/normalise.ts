/**
 * Normalise WordPress REST API responses to match local JSON structure
 * This ensures components work identically regardless of data source
 */

import { PageData, PageSeo } from '@/types/page';
import { Options } from '@/types/options';
import { AcfImage, AcfLink, PageSection } from '@/types/sections';
import type { WPPageResponse, WPImage, WPSection, WPOptionsResponse } from './wordpress';

// =============================================================================
// VALIDATION (DEV ONLY)
// =============================================================================

let validatePageData: ((data: unknown, source: string) => void) | null = null;
let validateOptions: ((data: unknown) => void) | null = null;

// Lazy load validation in development
async function loadValidation() {
  if (process.env.NODE_ENV === 'development' && !validatePageData) {
    try {
      // Dynamic import of schemas - these are .mjs files
      const schemas = await import('../scripts/schemas.mjs');
      validatePageData = (data: unknown, source: string) => {
        const result = schemas.PageDataSchema.safeParse(data);
        if (!result.success) {
          console.error(`[Normalise] Validation failed for ${source}:`);
          // Access issues array from ZodError
          const issues = (result.error as { issues: Array<{ path: (string | number)[]; message: string }> }).issues;
          issues.forEach((err) => {
            console.error(`  - ${err.path.join('.')}: ${err.message}`);
          });
          throw new Error(`Normalisation validation failed for ${source}`);
        }
      };
      validateOptions = (data: unknown) => {
        const result = schemas.OptionsSchema.safeParse(data);
        if (!result.success) {
          console.error('[Normalise] Options validation failed:');
          const issues = (result.error as { issues: Array<{ path: (string | number)[]; message: string }> }).issues;
          issues.forEach((err) => {
            console.error(`  - ${err.path.join('.')}: ${err.message}`);
          });
          throw new Error('Options normalisation validation failed');
        }
      };
    } catch {
      // Schemas not available, skip validation
    }
  }
}

// =============================================================================
// IMAGE NORMALISATION
// =============================================================================

/**
 * Normalise a WordPress image to AcfImage format
 */
function normaliseImage(wpImage: WPImage | number | null | undefined): AcfImage | undefined {
  if (!wpImage) return undefined;

  // If it's just an ID, we can't resolve it here
  if (typeof wpImage === 'number') {
    console.warn(`[Normalise] Received image ID ${wpImage} without resolved data`);
    return undefined;
  }

  return {
    url: wpImage.url,
    alt: wpImage.alt || wpImage.title || '',
    width: wpImage.width,
    height: wpImage.height,
  };
}

/**
 * Normalise an image that might be in various formats
 */
function normaliseImageField(value: unknown): AcfImage | undefined {
  if (!value) return undefined;

  // Already in correct format
  if (typeof value === 'object' && 'url' in value && typeof (value as { url: unknown }).url === 'string') {
    const img = value as { url: string; alt?: string; width?: number; height?: number };
    return {
      url: img.url,
      alt: img.alt || '',
      width: img.width,
      height: img.height,
    };
  }

  // WordPress resolved image
  if (typeof value === 'object' && 'id' in value && 'url' in value) {
    return normaliseImage(value as WPImage);
  }

  return undefined;
}

// =============================================================================
// LINK NORMALISATION
// =============================================================================

/**
 * Normalise a link to AcfLink format
 */
function normaliseLink(value: unknown): AcfLink | undefined {
  if (!value) return undefined;

  if (typeof value === 'string') {
    return { url: value, title: '', target: '_self' };
  }

  if (typeof value === 'object') {
    const link = value as { url?: string; title?: string; target?: string; href?: string };
    return {
      url: link.url || link.href || '',
      title: link.title || '',
      target: (link.target === '_blank' ? '_blank' : '_self') as '_blank' | '_self',
    };
  }

  return undefined;
}

// =============================================================================
// SECTION NORMALISATION
// =============================================================================

/**
 * Normalise a single section from WordPress format to local JSON format
 */
function normaliseSection(wpSection: WPSection): PageSection {
  const layout = wpSection.acf_fc_layout;
  const section: Record<string, unknown> = {
    acf_fc_layout: layout,
  };

  // Copy section settings with defaults
  section.section_theme = wpSection.section_theme || 'light';
  // Map 'medium' to 'default' for backwards compatibility
  const normalizeSpacing = (val: unknown) => {
    if (val === 'medium') return 'default';
    return val || 'default';
  };
  section.spacing_top = normalizeSpacing(wpSection.spacing_top);
  section.spacing_bottom = normalizeSpacing(wpSection.spacing_bottom);
  if (wpSection.anchor_id) section.anchor_id = wpSection.anchor_id;
  if (wpSection.custom_background) {
    section.custom_background = normaliseImageField(wpSection.custom_background);
  }

  // Layout-specific normalisation
  switch (layout) {
    case 'hero':
      normaliseHeroSection(section, wpSection);
      break;
    case 'text_block':
      normaliseTextBlockSection(section, wpSection);
      break;
    case 'text_media':
      normaliseTextMediaSection(section, wpSection);
      break;
    case 'card_grid':
      normaliseCardGridSection(section, wpSection);
      break;
    case 'icon_grid':
      normaliseIconGridSection(section, wpSection);
      break;
    case 'testimonial_carousel':
      normaliseTestimonialCarouselSection(section, wpSection);
      break;
    case 'media_carousel':
      normaliseMediaCarouselSection(section, wpSection);
      break;
    case 'gallery':
      normaliseGallerySection(section, wpSection);
      break;
    case 'accordion':
      normaliseAccordionSection(section, wpSection);
      break;
    case 'cta_banner':
      normaliseCtaBannerSection(section, wpSection);
      break;
    case 'timeline':
      normaliseTimelineSection(section, wpSection);
      break;
    case 'rate_table':
      normaliseRateTableSection(section, wpSection);
      break;
    case 'info_bar':
      normaliseInfoBarSection(section, wpSection);
      break;
    case 'hero_section':
      normaliseHomeHeroSection(section, wpSection);
      break;
    case 'intro_section':
      normaliseHomeIntroSection(section, wpSection);
      break;
    case 'stay_section':
      normaliseHomeStaySection(section, wpSection);
      break;
    case 'dining_section':
      normaliseHomeDiningSection(section, wpSection);
      break;
    case 'wildlife_section':
      normaliseHomeWildlifeSection(section, wpSection);
      break;
    case 'activities_section':
      normaliseHomeActivitiesSection(section, wpSection);
      break;
    case 'reviews_section':
      normaliseHomeReviewsSection(section, wpSection);
      break;
    case 'cta_banner_section':
      normaliseHomeCtaBannerSection(section, wpSection);
      break;
    default:
      // Copy all fields for unknown layouts
      Object.assign(section, wpSection);
  }

  return section as unknown as PageSection;
}

// =============================================================================
// LAYOUT-SPECIFIC NORMALISATION
// =============================================================================

function normaliseHeroSection(section: Record<string, unknown>, wp: WPSection): void {
  // Handle field aliases (WP uses heading, local might use hero_heading)
  section.media_type = wp.media_type || wp.hero_type || 'image';
  section.heading = wp.heading || wp.hero_heading || '';
  section.subheading = wp.subheading || wp.hero_subheading;
  section.eyebrow = wp.eyebrow || wp.hero_eyebrow;
  section.height = wp.height || wp.hero_height || 'tall';
  section.text_position = wp.text_position || 'bottom';
  // Parse overlay_opacity to number (WordPress may send as string)
  const opacity = wp.overlay_opacity ?? wp.hero_overlay_opacity ?? 30;
  section.overlay_opacity = typeof opacity === 'string' ? parseInt(opacity, 10) : opacity;
  section.image = normaliseImageField(wp.image || wp.hero_image);
  section.video_url = wp.video_url || wp.hero_video_url;
  section.show_play_button = Boolean(wp.show_play_button);
  section.video_modal_url = wp.video_modal_url;

  if (wp.carousel_images || wp.hero_carousel) {
    const images = (wp.carousel_images || wp.hero_carousel) as unknown[];
    section.carousel_images = normaliseImageArray(images);
  }

  if (wp.cta) section.cta = normaliseLink(wp.cta);
}

function normaliseTextBlockSection(section: Record<string, unknown>, wp: WPSection): void {
  section.eyebrow = wp.eyebrow;
  section.heading = wp.heading;
  section.content = wp.content || wp.body || '';
  section.max_width = wp.max_width || 'medium';
  section.text_align = wp.text_align || 'left';
}

function normaliseTextMediaSection(section: Record<string, unknown>, wp: WPSection): void {
  section.eyebrow = wp.eyebrow;
  section.heading = wp.heading || '';
  section.subheading = wp.subheading;
  section.highlight = wp.highlight;
  section.content = wp.content || wp.body || '';
  section.media_position = wp.media_position || 'right';
  section.media_type = wp.media_type || 'image';
  section.layout_ratio = wp.layout_ratio || '50_50';
  section.max_width = wp.max_width || 'full';
  // Normalize media_height - handle various ACF field formats
  if (wp.media_height !== undefined && wp.media_height !== null && wp.media_height !== false) {
    let heightValue: string | undefined;

    if (typeof wp.media_height === 'string') {
      heightValue = wp.media_height;
    } else if (typeof wp.media_height === 'number') {
      heightValue = String(wp.media_height);
    } else if (typeof wp.media_height === 'object') {
      const obj = wp.media_height as Record<string, unknown>;
      // Try common ACF object structures
      heightValue = String(
        obj.value || obj.name || obj.slug || obj.label ||
        obj.height || obj.size || Object.values(obj)[0] || ''
      );
    }

    // Only set if we got a valid value
    if (heightValue && heightValue !== 'undefined' && heightValue !== 'null') {
      section.media_height = heightValue;
    }
  }

  section.image = normaliseImageField(wp.image);
  // Handle image_link as either a string URL or ACF Link object
  if (wp.image_link) {
    if (typeof wp.image_link === 'string') {
      section.image_link = wp.image_link;
    } else if (typeof wp.image_link === 'object' && (wp.image_link as Record<string, unknown>).url) {
      section.image_link = (wp.image_link as Record<string, unknown>).url as string;
    }
  }
  section.video_url = wp.video_url;

  if (wp.gallery_images || wp.gallery) {
    const images = (wp.gallery_images || wp.gallery) as unknown[];
    section.gallery_images = normaliseImageArray(images);
  }

  section.cta_primary = normaliseLink(wp.cta_primary);
  section.cta_secondary = normaliseLink(wp.cta_secondary);
  section.cta_secondary_action = wp.cta_secondary_action;
  section.cta_tertiary = normaliseLink(wp.cta_tertiary);
  section.cta_tertiary_action = wp.cta_tertiary_action;
  section.show_service_ctas = Boolean(wp.show_service_ctas);
  section.service_email = wp.service_email;

  // Handle buttons array format
  if (wp.buttons) {
    section.buttons = normaliseButtonsArray(wp.buttons as unknown[]);
  }
}

function normaliseCardGridSection(section: Record<string, unknown>, wp: WPSection): void {
  section.eyebrow = wp.eyebrow;
  section.heading = wp.heading;
  section.subheading = wp.subheading;
  section.card_type = wp.card_type || wp.card_style || 'content';
  section.columns = normaliseColumns(wp.columns);
  section.show_price_pill = Boolean(wp.show_price_pill);
  section.text_align = wp.text_align || 'left';
  section.card_size = wp.card_size || 'default';
  section.max_width = wp.max_width || 'full';

  if (wp.cards) {
    section.cards = normaliseCardsArray(wp.cards as unknown[]);
  } else {
    section.cards = [];
  }
}

function normaliseIconGridSection(section: Record<string, unknown>, wp: WPSection): void {
  section.eyebrow = wp.eyebrow;
  section.heading = wp.heading;
  section.layout = wp.layout || 'grid';
  section.show_download = Boolean(wp.show_download);
  // Handle download_file - WordPress may send false instead of undefined
  section.download_file = typeof wp.download_file === 'string' ? wp.download_file : undefined;
  section.download_label = wp.download_label;

  if (wp.icons || wp.items) {
    const items = (wp.icons || wp.items) as unknown[];
    section.icons = items.map((item: unknown) => {
      const i = item as Record<string, unknown>;
      return {
        icon: normaliseImageField(i.icon),
        label: i.label || '',
        link: normaliseLink(i.link),
      };
    });
  } else {
    section.icons = [];
  }
}

function normaliseTestimonialCarouselSection(section: Record<string, unknown>, wp: WPSection): void {
  section.eyebrow = wp.eyebrow;
  section.heading = wp.heading;
  section.cards_per_slide = String(wp.cards_per_slide || '1');
  section.auto_advance = Boolean(wp.auto_advance);

  if (wp.reviews || wp.testimonials) {
    const reviews = (wp.reviews || wp.testimonials) as unknown[];
    section.reviews = reviews.map((review: unknown) => {
      const r = review as Record<string, unknown>;
      return {
        title: r.title || '',
        content: r.content || r.quote || '',
        author: r.author || '',
        source: r.source || '',
      };
    });
  } else {
    section.reviews = [];
  }
}

function normaliseMediaCarouselSection(section: Record<string, unknown>, wp: WPSection): void {
  section.eyebrow = wp.eyebrow;
  section.heading = wp.heading;
  section.display_mode = wp.display_mode || 'carousel';

  if (wp.items || wp.images) {
    const items = (wp.items || wp.images) as unknown[];
    section.items = items.map((item: unknown) => {
      const i = item as Record<string, unknown>;
      return {
        title: i.title || '',
        media_type: i.media_type || 'image',
        image: normaliseImageField(i.image),
        pdf: i.pdf,
      };
    });
  } else {
    section.items = [];
  }
}

function normaliseGallerySection(section: Record<string, unknown>, wp: WPSection): void {
  section.eyebrow = wp.eyebrow;
  section.heading = wp.heading;
  section.enable_filters = Boolean(wp.enable_filters);
  section.columns = normaliseColumns(wp.columns);
  section.max_width = wp.max_width;
  section.aspect_ratio = wp.aspect_ratio || '4:3';

  // Category gallery field mappings (field name -> display label)
  const categoryGalleries: { field: string; label: string }[] = [
    { field: 'rooms_gallery', label: 'Rooms & Suites' },
    { field: 'dining_gallery', label: 'Dining' },
    { field: 'pool_bar_gallery', label: 'Pool & Bar' },
    { field: 'conferencing_gallery', label: 'Conferencing' },
    { field: 'wildlife_gallery', label: 'Wildlife' },
    { field: 'hotel_grounds_gallery', label: 'Hotel & Grounds' },
  ];

  // Check if any category galleries exist
  const hasCategoryGalleries = categoryGalleries.some(
    ({ field }) => wp[field] && Array.isArray(wp[field]) && (wp[field] as unknown[]).length > 0
  );

  if (hasCategoryGalleries) {
    // Merge all category galleries into single images array with category labels
    const mergedImages: Record<string, unknown>[] = [];

    for (const { field, label } of categoryGalleries) {
      const galleryImages = wp[field] as unknown[] | undefined;
      if (galleryImages && Array.isArray(galleryImages)) {
        for (const img of galleryImages) {
          const i = img as Record<string, unknown>;
          // Gallery field returns flat image objects (not nested)
          const imageData = i.image ? normaliseImageField(i.image) : normaliseImageField(i);
          if (imageData) {
            mergedImages.push({
              image: imageData,
              url: imageData.url,
              alt: imageData.alt || '',
              caption: '',
              category: label, // Auto-assign category based on field
            });
          }
        }
      }
    }

    section.images = mergedImages;
  } else if (wp.images) {
    // General images gallery (flat array of images, no categories)
    const images = wp.images as unknown[];
    section.images = images.map((img: unknown) => {
      const i = img as Record<string, unknown>;
      // Handle both gallery field (flat image) and repeater format (nested image object)
      const imageData = i.image ? normaliseImageField(i.image) : normaliseImageField(i);
      return {
        image: imageData,
        url: imageData?.url,
        alt: imageData?.alt || '',
        caption: '',
        category: '',
      };
    });
  } else {
    section.images = [];
  }
}

function normaliseAccordionSection(section: Record<string, unknown>, wp: WPSection): void {
  section.eyebrow = wp.eyebrow;
  section.heading = wp.heading;
  section.subheading = wp.subheading;
  section.description = wp.description;
  section.enable_categories = Boolean(wp.enable_categories);
  section.allow_multiple = Boolean(wp.allow_multiple);
  section.default_open = unwrapMisresolvedNumber(wp.default_open);
  section.enable_schema = Boolean(wp.enable_schema);
  section.static_display = Boolean(wp.static_display);

  if (wp.items) {
    const items = wp.items as unknown[];
    section.items = items.map((item: unknown) => {
      const i = item as Record<string, unknown>;
      return {
        title: i.title || '',
        content: i.content || '',
        category: i.category || '',
        is_open: Boolean(i.is_open),
      };
    });
  } else {
    section.items = [];
  }
}

function normaliseCtaBannerSection(section: Record<string, unknown>, wp: WPSection): void {
  section.eyebrow = wp.eyebrow;
  section.heading = wp.heading || '';
  section.subheading = wp.subheading;
  section.content = wp.content || wp.body;
  section.layout = wp.layout || 'centered';
  section.background_type = wp.background_type || 'color';
  section.background_image = normaliseImageField(wp.background_image);
  section.show_service_ctas = Boolean(wp.show_service_ctas);
  section.service_email = wp.service_email;
  section.cta_type = wp.cta_type;
  section.contact_email = wp.contact_email;

  section.cta_primary = normaliseLink(wp.cta_primary);
  section.cta_secondary = normaliseLink(wp.cta_secondary);

  if (wp.buttons) {
    section.buttons = normaliseButtonsArray(wp.buttons as unknown[]);
  }
}

function normaliseTimelineSection(section: Record<string, unknown>, wp: WPSection): void {
  section.eyebrow = wp.eyebrow;
  section.heading = wp.heading;
  section.footer_text = wp.footer_text;
  section.footer_style = wp.footer_style;

  if (wp.milestones || wp.items) {
    const items = (wp.milestones || wp.items) as unknown[];
    section.milestones = items.map((item: unknown) => {
      const i = item as Record<string, unknown>;
      return {
        year: String(i.year || ''),
        label: i.label || i.title || '',
        title: i.title,
        description: i.description,
      };
    });
  } else {
    section.milestones = [];
  }
}

// The WP mu-plugin's ilala_resolve_images_recursive replaces any numeric value
// matching a real attachment ID with a full image object. Room prices like 190
// happen to collide with actual attachment IDs, so a number field can come back
// as { id, url, width, height, ... }. Additionally, ACF number fields written
// through the REST API often come back as strings. Coerce both back to number.
function unwrapMisresolvedNumber(value: unknown): number | undefined {
  if (value === null || value === undefined || value === '') return undefined;
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const n = Number(value);
    return Number.isFinite(n) ? n : undefined;
  }
  if (typeof value === 'object' && !Array.isArray(value)) {
    const v = value as Record<string, unknown>;
    if ('id' in v && 'url' in v && ('width' in v || 'sizes' in v)) {
      const id = Number(v.id);
      return Number.isFinite(id) ? id : undefined;
    }
  }
  return undefined;
}

function normaliseRateTableSection(section: Record<string, unknown>, wp: WPSection): void {
  section.heading = wp.heading;
  section.table_type = wp.table_type || 'rates';
  section.currency = wp.currency;
  section.show_book_buttons = Boolean(wp.show_book_buttons || wp.show_booking_button);

  if (wp.rate_categories || wp.categories) {
    const categories = (wp.rate_categories || wp.categories) as unknown[];
    section.rate_categories = categories.map((cat: unknown) => {
      const c = cat as Record<string, unknown>;
      const rooms = (c.rooms || c.rows || []) as unknown[];
      return {
        category_name: c.category_name || c.name || '',
        name: c.name,
        rooms: rooms.map((room: unknown) => {
          const r = room as Record<string, unknown>;
          return {
            label: r.label,
            rate: r.rate,
            rate_sharing: r.rate_sharing,
            rate_single: r.rate_single,
            sharing_price: unwrapMisresolvedNumber(r.sharing_price),
            single_price: unwrapMisresolvedNumber(r.single_price),
            view_link: r.view_link,
            view_label: r.view_label,
            book_link: normaliseLink(r.book_link),
          };
        }),
      };
    });
  } else {
    section.rate_categories = [];
  }

  if (wp.simple_rows) {
    const rows = wp.simple_rows as unknown[];
    section.simple_rows = rows.map((row: unknown) => {
      const r = row as Record<string, unknown>;
      return {
        label: r.label || '',
        value: r.value || '',
      };
    });
  }
}

function normaliseInfoBarSection(section: Record<string, unknown>, wp: WPSection): void {
  section.columns = normaliseColumns(wp.columns);
  section.show_dividers = Boolean(wp.show_dividers);
  section.content_type = wp.content_type;
  section.download_url = wp.download_url;
  section.download_label = wp.download_label;
  section.back_link_url = wp.back_link_url;
  section.back_link_label = wp.back_link_label;

  if (wp.items) {
    const items = wp.items as unknown[];
    section.items = items.map((item: unknown) => {
      const i = item as Record<string, unknown>;
      return {
        icon: i.icon || '',
        label: i.label || '',
        value: i.value || '',
        unit: i.unit || '',
      };
    });
  } else {
    section.items = [];
  }
}

// =============================================================================
// HOMEPAGE BESPOKE SECTIONS
// The bespoke Home* components expect { label, url, target } CTAs and image
// objects with { url, alt, width?, height? }. The mu-plugin already resolves
// image IDs into that shape via ilala_get_image_data(); we just need to remap
// ACF link fields (title -> label) and pass the rest through.
// =============================================================================

function normaliseCta(value: unknown): { label: string; url: string; target: '_blank' | '_self' } | undefined {
  const link = normaliseLink(value);
  if (!link) return undefined;
  return {
    label: link.title || '',
    url: link.url,
    target: link.target === '_blank' ? '_blank' : '_self',
  };
}

function normaliseHomeImage(value: unknown): AcfImage | undefined {
  return normaliseImageField(value);
}

function normaliseHomeHeroSection(section: Record<string, unknown>, wp: WPSection): void {
  section.hero_heading = wp.hero_heading || '';
  section.hero_subheading = wp.hero_subheading || '';
  section.hero_background_image = normaliseHomeImage(wp.hero_background_image);
  section.hero_cta = normaliseCta(wp.hero_cta);
  section.hero_video_url = wp.hero_video_url || '';
  section.hero_scroll_label = wp.hero_scroll_label || '';
}

function normaliseHomeIntroSection(section: Record<string, unknown>, wp: WPSection): void {
  section.intro_eyebrow = wp.intro_eyebrow || '';
  section.intro_heading = wp.intro_heading || '';
  section.intro_body_copy = wp.intro_body_copy || '';
  section.intro_cta = normaliseCta(wp.intro_cta);
  section.intro_image = normaliseHomeImage(wp.intro_image);
}

function normaliseHomeStaySection(section: Record<string, unknown>, wp: WPSection): void {
  section.stay_eyebrow = wp.stay_eyebrow || '';
  section.stay_heading = wp.stay_heading || '';
  section.stay_subheading = wp.stay_subheading || '';
  const rooms = Array.isArray(wp.stay_rooms) ? (wp.stay_rooms as unknown[]) : [];
  section.stay_rooms = rooms.map((r) => {
    const room = r as Record<string, unknown>;
    return {
      room_name: room.room_name || '',
      room_count: unwrapMisresolvedNumber(room.room_count) ?? 0,
      room_description: room.room_description || '',
      room_price_from: room.room_price_from || '',
      room_price_suffix: room.room_price_suffix || '',
      room_image: normaliseHomeImage(room.room_image),
      room_cta: normaliseCta(room.room_cta),
    };
  });
}

function normaliseHomeDiningSection(section: Record<string, unknown>, wp: WPSection): void {
  section.dining_eyebrow = wp.dining_eyebrow || '';
  section.dining_heading = wp.dining_heading || '';
  section.dining_subheading = wp.dining_subheading || '';
  section.dining_body_copy = wp.dining_body_copy || '';
  section.dining_cta = normaliseCta(wp.dining_cta);
  section.dining_cta_secondary = normaliseCta(wp.dining_cta_secondary);
  const images = Array.isArray(wp.dining_images) ? (wp.dining_images as unknown[]) : [];
  section.dining_images = normaliseImageArray(images);
}

function normaliseHomeWildlifeSection(section: Record<string, unknown>, wp: WPSection): void {
  section.wildlife_eyebrow = wp.wildlife_eyebrow || '';
  section.wildlife_heading = wp.wildlife_heading || '';
  section.wildlife_body_copy = wp.wildlife_body_copy || '';
  section.wildlife_cta = normaliseCta(wp.wildlife_cta);
  const images = Array.isArray(wp.wildlife_images) ? (wp.wildlife_images as unknown[]) : [];
  section.wildlife_images = normaliseImageArray(images);
}

function normaliseHomeActivitiesSection(section: Record<string, unknown>, wp: WPSection): void {
  section.activities_eyebrow = wp.activities_eyebrow || '';
  section.activities_heading = wp.activities_heading || '';
  section.activities_cta = normaliseCta(wp.activities_cta);
  const items = Array.isArray(wp.activities_items) ? (wp.activities_items as unknown[]) : [];
  section.activities_items = items.map((i) => {
    const item = i as Record<string, unknown>;
    return {
      activity_label: item.activity_label || '',
      activity_url: item.activity_url || undefined,
      activity_icon: normaliseHomeImage(item.activity_icon),
    };
  });
}

function normaliseHomeReviewsSection(section: Record<string, unknown>, wp: WPSection): void {
  section.reviews_eyebrow = wp.reviews_eyebrow || '';
  section.reviews_heading = wp.reviews_heading || '';
  const items = Array.isArray(wp.reviews_items) ? (wp.reviews_items as unknown[]) : [];
  section.reviews_items = items.map((i) => {
    const item = i as Record<string, unknown>;
    return {
      review_title: item.review_title || '',
      review_body: item.review_body || '',
      review_author: item.review_author || '',
      review_source: item.review_source || undefined,
    };
  });
}

function normaliseHomeCtaBannerSection(section: Record<string, unknown>, wp: WPSection): void {
  section.cta_banner_heading = wp.cta_banner_heading || '';
  section.cta_banner_subheading = wp.cta_banner_subheading || '';
  section.cta_banner_image = normaliseHomeImage(wp.cta_banner_image);
  section.cta_banner_cta = normaliseCta(wp.cta_banner_cta);
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function normaliseImageArray(images: unknown[]): AcfImage[] {
  if (!Array.isArray(images)) return [];
  return images
    .map(img => normaliseImageField(img))
    .filter((img): img is AcfImage => img !== undefined);
}

function normaliseButtonsArray(buttons: unknown[]): { text: string; url: string; style?: string; external?: boolean }[] {
  if (!Array.isArray(buttons)) return [];
  return buttons.map((btn: unknown) => {
    const b = btn as Record<string, unknown>;
    return {
      text: String(b.text || b.title || ''),
      url: String(b.url || b.href || ''),
      style: b.style as string | undefined,
      external: Boolean(b.external || b.target === '_blank'),
    };
  });
}

function normaliseCardsArray(cards: unknown[]): Record<string, unknown>[] {
  if (!Array.isArray(cards)) return [];
  return cards.map((card: unknown) => {
    const c = card as Record<string, unknown>;
    const normalised: Record<string, unknown> = {
      title: c.title || '',
    };

    // Copy all fields, normalising as needed
    if (c.image) normalised.image = normaliseImageField(c.image);
    if (c.carousel_images) {
      normalised.carousel_images = normaliseImageArray(c.carousel_images as unknown[]);
    }
    if (c.subtitle) normalised.subtitle = c.subtitle;
    if (c.description) normalised.description = c.description;
    if (c.slug) normalised.slug = c.slug;
    if (c.size) normalised.size = c.size;
    if (c.sleeps) normalised.sleeps = c.sleeps;
    if (c.beds) normalised.beds = c.beds;
    if (c.price_from) normalised.price_from = c.price_from;
    if (c.price) normalised.price = c.price;
    if (c.time) normalised.time = c.time;
    if (c.email) normalised.email = c.email;
    if (c.whatsapp) normalised.whatsapp = c.whatsapp;
    if (c.video_url) normalised.video_url = c.video_url;

    if (c.phones) normalised.phones = c.phones;
    if (c.details) normalised.details = c.details;
    if (c.list_items) normalised.list_items = c.list_items;

    if (c.cta_primary) normalised.cta_primary = normaliseLink(c.cta_primary);
    if (c.cta_secondary) normalised.cta_secondary = normaliseLink(c.cta_secondary);

    return normalised;
  });
}

function normaliseColumns(value: unknown): string {
  if (!value) return '3';
  const num = typeof value === 'number' ? value : parseInt(String(value), 10);
  if (isNaN(num) || num < 2) return '2';
  if (num > 4) return '4';
  return String(num);
}

// =============================================================================
// PAGE NORMALISATION
// =============================================================================

/**
 * Normalise a WordPress page response to PageData format
 */
export function normalisePageData(wpPage: WPPageResponse): PageData {
  const pageData: PageData = {
    title: wpPage.title,
    slug: wpPage.slug,
    seo: normaliseSeo(wpPage.seo),
    page_sections: (wpPage.page_sections || []).map(normaliseSection),
  };

  // Validate in development
  if (process.env.NODE_ENV === 'development') {
    loadValidation().then(() => {
      if (validatePageData) {
        try {
          validatePageData(pageData, `WP page: ${wpPage.slug}`);
        } catch (error) {
          console.error('[Normalise] Validation error:', error);
        }
      }
    });
  }

  return pageData;
}

function normaliseSeo(wpSeo: WPPageResponse['seo']): PageSeo {
  return {
    title: wpSeo?.title || '',
    description: wpSeo?.description || '',
    og_image: wpSeo?.og_image?.url || null,
  };
}

// =============================================================================
// OPTIONS NORMALISATION
// =============================================================================

/**
 * Normalise WordPress options to Options format
 */
export function normaliseOptions(wpOptions: WPOptionsResponse): Options {
  const options: Options = {
    site_name: wpOptions.site_name || 'Ilala Lodge Hotel',
    header: normaliseHeader(wpOptions.header),
    footer: normaliseFooter(wpOptions.footer),
    contact: normaliseContact(wpOptions.contact),
    social: normaliseSocial(wpOptions.social),
  };

  // Validate in development
  if (process.env.NODE_ENV === 'development') {
    loadValidation().then(() => {
      if (validateOptions) {
        try {
          validateOptions(options);
        } catch (error) {
          console.error('[Normalise] Options validation error:', error);
        }
      }
    });
  }

  return options;
}

function normaliseHeader(header: Record<string, unknown> | undefined): Options['header'] {
  if (!header) {
    return {
      logo: { url: '/images/ilala-lodge-logo.svg', alt: 'Ilala Lodge Hotel' },
      nav_items: [],
      booking_url: 'https://booking.ilalalodge.com',
    };
  }

  return {
    logo: normaliseImageField(header.logo) || { url: '/images/ilala-lodge-logo.svg', alt: 'Ilala Lodge Hotel' },
    logo_scrolled: normaliseImageField(header.logo_scrolled),
    nav_items: normaliseNavItems(header.nav_items as unknown[] | undefined),
    booking_url: String(header.booking_url || 'https://booking.ilalalodge.com'),
  };
}

function normaliseNavItems(items: unknown[] | undefined): Options['header']['nav_items'] {
  if (!Array.isArray(items)) return [];
  return items.map((item: unknown) => {
    const i = item as Record<string, unknown>;
    return {
      label: String(i.label || ''),
      href: String(i.href || i.url || ''),
      sub_items: i.sub_items ? normaliseNavSubItems(i.sub_items as unknown[]) : undefined,
    };
  });
}

function normaliseNavSubItems(items: unknown[]): { label: string; href: string }[] {
  if (!Array.isArray(items)) return [];
  return items.map((item: unknown) => {
    const i = item as Record<string, unknown>;
    return {
      label: String(i.label || ''),
      href: String(i.href || i.url || ''),
    };
  });
}

function normaliseFooter(footer: Record<string, unknown> | undefined): Options['footer'] {
  if (!footer) {
    return {
      logo: { url: '/images/ilala-lodge-logo.svg', alt: 'Ilala Lodge Hotel' },
      tagline: '',
      nav_columns: [],
      copyright: '',
    };
  }

  return {
    logo: normaliseImageField(footer.logo) || { url: '/images/ilala-lodge-logo.svg', alt: 'Ilala Lodge Hotel' },
    tagline: String(footer.tagline || ''),
    nav_columns: normaliseNavColumns(footer.nav_columns as unknown[] | undefined),
    copyright: String(footer.copyright || ''),
  };
}

function normaliseNavColumns(columns: unknown[] | undefined): Options['footer']['nav_columns'] {
  if (!Array.isArray(columns)) return [];
  return columns.map((col: unknown) => {
    const c = col as Record<string, unknown>;
    return {
      title: String(c.title || ''),
      links: normaliseFooterLinks(c.links as unknown[] | undefined),
    };
  });
}

function normaliseFooterLinks(links: unknown[] | undefined): AcfLink[] {
  if (!Array.isArray(links)) return [];
  return links.map((link: unknown) => {
    const l = link as Record<string, unknown>;
    return {
      url: String(l.url || l.href || ''),
      title: String(l.title || l.label || ''),
      target: (l.target === '_blank' ? '_blank' : '_self') as '_blank' | '_self',
    };
  });
}

function normaliseContact(contact: Record<string, unknown> | undefined): Options['contact'] {
  if (!contact) {
    return {
      email: '',
      phone: '',
      whatsapp: '',
      address: '',
    };
  }

  return {
    email: String(contact.email || ''),
    phone: String(contact.phone || ''),
    whatsapp: String(contact.whatsapp || ''),
    address: String(contact.address || ''),
    front_desk_phone: contact.front_desk_phone ? String(contact.front_desk_phone) : undefined,
    front_desk_email: contact.front_desk_email ? String(contact.front_desk_email) : undefined,
    front_desk_whatsapp: contact.front_desk_whatsapp ? String(contact.front_desk_whatsapp) : undefined,
    agents_phone: contact.agents_phone ? String(contact.agents_phone) : undefined,
    agents_email: contact.agents_email ? String(contact.agents_email) : undefined,
  };
}

function normaliseSocial(social: Record<string, unknown> | undefined): Options['social'] {
  if (!social) {
    return {
      facebook: '',
      instagram: '',
    };
  }

  return {
    facebook: String(social.facebook || ''),
    instagram: String(social.instagram || ''),
    twitter: social.twitter ? String(social.twitter) : undefined,
    tripadvisor: social.tripadvisor ? String(social.tripadvisor) : undefined,
  };
}
