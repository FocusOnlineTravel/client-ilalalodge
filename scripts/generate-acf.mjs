#!/usr/bin/env node
/**
 * ACF Field Group Generator
 * Generates wordpress/acf-export.json from types/sections.ts
 *
 * Run: node scripts/generate-acf.mjs
 */

import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// =============================================================================
// DETERMINISTIC KEY GENERATION
// =============================================================================

function generateKey(prefix, ...parts) {
  const slug = parts.map(p => p.toLowerCase().replace(/[^a-z0-9]/g, '_')).join('_');
  return `${prefix}_${slug}`;
}

function fieldKey(...parts) {
  return generateKey('field', ...parts);
}

function groupKey(...parts) {
  return generateKey('group', ...parts);
}

function layoutKey(...parts) {
  return generateKey('layout', ...parts);
}

// =============================================================================
// FIELD BUILDERS
// =============================================================================

function textField(name, label, group, layout = null, options = {}) {
  const keyParts = layout ? [group, layout, name] : [group, name];
  return {
    key: fieldKey(...keyParts),
    label,
    name,
    type: 'text',
    show_in_rest: 1,
    ...options
  };
}

function textareaField(name, label, group, layout = null, options = {}) {
  const keyParts = layout ? [group, layout, name] : [group, name];
  return {
    key: fieldKey(...keyParts),
    label,
    name,
    type: 'textarea',
    show_in_rest: 1,
    rows: 4,
    ...options
  };
}

function wysiwygField(name, label, group, layout = null, options = {}) {
  const keyParts = layout ? [group, layout, name] : [group, name];
  return {
    key: fieldKey(...keyParts),
    label,
    name,
    type: 'wysiwyg',
    show_in_rest: 1,
    tabs: 'all',
    toolbar: 'full',
    media_upload: 1,
    ...options
  };
}

function numberField(name, label, group, layout = null, options = {}) {
  const keyParts = layout ? [group, layout, name] : [group, name];
  return {
    key: fieldKey(...keyParts),
    label,
    name,
    type: 'number',
    show_in_rest: 1,
    ...options
  };
}

function selectField(name, label, choices, group, layout = null, options = {}) {
  const keyParts = layout ? [group, layout, name] : [group, name];
  return {
    key: fieldKey(...keyParts),
    label,
    name,
    type: 'select',
    show_in_rest: 1,
    choices,
    ...options
  };
}

function trueFalseField(name, label, group, layout = null, options = {}) {
  const keyParts = layout ? [group, layout, name] : [group, name];
  return {
    key: fieldKey(...keyParts),
    label,
    name,
    type: 'true_false',
    show_in_rest: 1,
    ui: 1,
    ...options
  };
}

function imageField(name, label, group, layout = null, options = {}) {
  const keyParts = layout ? [group, layout, name] : [group, name];
  return {
    key: fieldKey(...keyParts),
    label,
    name,
    type: 'image',
    show_in_rest: 1,
    return_format: 'id',
    preview_size: 'medium',
    library: 'all',
    ...options
  };
}

function galleryField(name, label, group, layout = null, options = {}) {
  const keyParts = layout ? [group, layout, name] : [group, name];
  return {
    key: fieldKey(...keyParts),
    label,
    name,
    type: 'gallery',
    show_in_rest: 1,
    return_format: 'id',
    preview_size: 'medium',
    library: 'all',
    ...options
  };
}

function urlField(name, label, group, layout = null, options = {}) {
  const keyParts = layout ? [group, layout, name] : [group, name];
  return {
    key: fieldKey(...keyParts),
    label,
    name,
    type: 'url',
    show_in_rest: 1,
    ...options
  };
}

function linkField(name, label, group, layout = null, options = {}) {
  const keyParts = layout ? [group, layout, name] : [group, name];
  return {
    key: fieldKey(...keyParts),
    label,
    name,
    type: 'link',
    show_in_rest: 1,
    return_format: 'array',
    ...options
  };
}

function fileField(name, label, group, layout = null, options = {}) {
  const keyParts = layout ? [group, layout, name] : [group, name];
  return {
    key: fieldKey(...keyParts),
    label,
    name,
    type: 'file',
    show_in_rest: 1,
    return_format: 'url',
    library: 'all',
    ...options
  };
}

function repeaterField(name, label, subFields, group, layout = null, options = {}) {
  const keyParts = layout ? [group, layout, name] : [group, name];
  return {
    key: fieldKey(...keyParts),
    label,
    name,
    type: 'repeater',
    show_in_rest: 1,
    layout: 'block',
    button_label: `Add ${label.replace(/s$/, '')}`,
    sub_fields: subFields,
    ...options
  };
}

function groupField(name, label, subFields, group, layout = null, options = {}) {
  const keyParts = layout ? [group, layout, name] : [group, name];
  return {
    key: fieldKey(...keyParts),
    label,
    name,
    type: 'group',
    show_in_rest: 1,
    layout: 'block',
    sub_fields: subFields,
    ...options
  };
}

function cloneField(name, cloneKey, group, layout = null, options = {}) {
  const keyParts = layout ? [group, layout, name] : [group, name];
  return {
    key: fieldKey(...keyParts),
    label: '',
    name,
    type: 'clone',
    show_in_rest: 1,
    clone: [cloneKey],
    display: 'seamless',
    layout: 'block',
    prefix_label: 0,
    prefix_name: 0,
    ...options
  };
}

function postObjectField(name, label, postType, group, layout = null, options = {}) {
  const keyParts = layout ? [group, layout, name] : [group, name];
  return {
    key: fieldKey(...keyParts),
    label,
    name,
    type: 'post_object',
    show_in_rest: 1,
    post_type: Array.isArray(postType) ? postType : [postType],
    return_format: 'id',
    multiple: 1,
    ...options
  };
}

// =============================================================================
// SECTION SETTINGS (CLONE SOURCE)
// =============================================================================

const SECTION_SETTINGS_GROUP = {
  key: groupKey('section_settings'),
  title: 'Section Settings',
  fields: [
    selectField('section_theme', 'Section Theme', {
      light: 'Light (White)',
      dark: 'Dark (Forest Green)',
      accent: 'Accent (Daisy)',
      forest: 'Forest'
    }, 'section_settings', null, { default_value: 'light' }),
    selectField('spacing_top', 'Spacing Top', {
      none: 'None',
      small: 'Small',
      default: 'Default',
      large: 'Large'
    }, 'section_settings', null, { default_value: 'default' }),
    selectField('spacing_bottom', 'Spacing Bottom', {
      none: 'None',
      small: 'Small',
      default: 'Default',
      large: 'Large'
    }, 'section_settings', null, { default_value: 'default' }),
    textField('anchor_id', 'Anchor ID', 'section_settings', null, {
      instructions: 'Optional anchor for linking directly to this section'
    }),
    imageField('custom_background', 'Custom Background', 'section_settings')
  ],
  location: [],
  menu_order: 0,
  position: 'normal',
  style: 'default',
  label_placement: 'top',
  instruction_placement: 'label',
  hide_on_screen: '',
  active: true,
  description: 'Clone source for section settings - do not edit directly',
  show_in_rest: 1
};

// =============================================================================
// LAYOUT DEFINITIONS
// =============================================================================

const LAYOUTS = {
  hero: {
    label: 'Hero',
    fields: [
      selectField('media_type', 'Media Type', {
        image: 'Image',
        video: 'Video',
        carousel: 'Carousel'
      }, 'page_builder', 'hero', { default_value: 'image' }),
      imageField('image', 'Image', 'page_builder', 'hero', {
        conditional_logic: [[{ field: fieldKey('page_builder', 'hero', 'media_type'), operator: '==', value: 'image' }]]
      }),
      urlField('video_url', 'Video URL', 'page_builder', 'hero', {
        conditional_logic: [[{ field: fieldKey('page_builder', 'hero', 'media_type'), operator: '==', value: 'video' }]]
      }),
      galleryField('carousel_images', 'Carousel Images', 'page_builder', 'hero', {
        conditional_logic: [[{ field: fieldKey('page_builder', 'hero', 'media_type'), operator: '==', value: 'carousel' }]]
      }),
      textField('eyebrow', 'Eyebrow', 'page_builder', 'hero'),
      textField('heading', 'Heading', 'page_builder', 'hero', { required: 1 }),
      textField('subheading', 'Subheading', 'page_builder', 'hero'),
      numberField('overlay_opacity', 'Overlay Opacity', 'page_builder', 'hero', {
        min: 0, max: 100, default_value: 20,
        instructions: 'Percentage (0-100)'
      }),
      selectField('height', 'Height', {
        tall: 'Tall (80vh)',
        medium: 'Medium (60vh)',
        compact: 'Compact (50vh)'
      }, 'page_builder', 'hero', { default_value: 'tall' }),
      linkField('cta', 'Call to Action', 'page_builder', 'hero'),
      trueFalseField('show_play_button', 'Show Play Button', 'page_builder', 'hero'),
      urlField('video_modal_url', 'Video Modal URL', 'page_builder', 'hero', {
        conditional_logic: [[{ field: fieldKey('page_builder', 'hero', 'show_play_button'), operator: '==', value: 1 }]]
      })
    ]
  },

  text_block: {
    label: 'Text Block',
    fields: [
      textField('eyebrow', 'Eyebrow', 'page_builder', 'text_block'),
      textField('heading', 'Heading', 'page_builder', 'text_block'),
      wysiwygField('content', 'Content', 'page_builder', 'text_block', { required: 1 }),
      selectField('max_width', 'Max Width', {
        narrow: 'Narrow',
        medium: 'Medium',
        wide: 'Wide'
      }, 'page_builder', 'text_block', { default_value: 'medium' }),
      selectField('text_align', 'Text Alignment', {
        left: 'Left',
        center: 'Center'
      }, 'page_builder', 'text_block', { default_value: 'left' })
    ]
  },

  text_media: {
    label: 'Text & Media',
    fields: [
      textField('eyebrow', 'Eyebrow', 'page_builder', 'text_media'),
      textField('heading', 'Heading', 'page_builder', 'text_media', { required: 1 }),
      textField('subheading', 'Subheading', 'page_builder', 'text_media'),
      wysiwygField('content', 'Content', 'page_builder', 'text_media', { required: 1 }),
      linkField('cta_primary', 'Primary CTA', 'page_builder', 'text_media'),
      linkField('cta_secondary', 'Secondary CTA', 'page_builder', 'text_media'),
      selectField('cta_secondary_action', 'Secondary CTA Action', {
        link: 'Link',
        booking_modal: 'Booking Modal',
        whatsapp: 'WhatsApp'
      }, 'page_builder', 'text_media', { default_value: 'link' }),
      selectField('media_position', 'Media Position', {
        left: 'Left',
        right: 'Right'
      }, 'page_builder', 'text_media', { default_value: 'right' }),
      selectField('media_type', 'Media Type', {
        image: 'Image',
        gallery_grid: 'Gallery Grid',
        slider: 'Slider',
        video: 'Video'
      }, 'page_builder', 'text_media', { default_value: 'image' }),
      imageField('image', 'Image', 'page_builder', 'text_media', {
        conditional_logic: [[{ field: fieldKey('page_builder', 'text_media', 'media_type'), operator: '==', value: 'image' }]]
      }),
      galleryField('gallery_images', 'Gallery Images', 'page_builder', 'text_media', {
        conditional_logic: [[
          { field: fieldKey('page_builder', 'text_media', 'media_type'), operator: '==', value: 'gallery_grid' }
        ], [
          { field: fieldKey('page_builder', 'text_media', 'media_type'), operator: '==', value: 'slider' }
        ]]
      }),
      urlField('video_url', 'Video URL', 'page_builder', 'text_media', {
        conditional_logic: [[{ field: fieldKey('page_builder', 'text_media', 'media_type'), operator: '==', value: 'video' }]]
      }),
      selectField('layout_ratio', 'Layout Ratio', {
        '40_60': '40/60',
        '50_50': '50/50',
        '60_40': '60/40'
      }, 'page_builder', 'text_media', { default_value: '50_50' }),
      selectField('media_height', 'Media Height', {
        auto: 'Auto',
        '400': '400px',
        '500': '500px',
        full: 'Full'
      }, 'page_builder', 'text_media', { default_value: 'auto' })
    ]
  },

  card_grid: {
    label: 'Card Grid',
    fields: [
      textField('eyebrow', 'Eyebrow', 'page_builder', 'card_grid'),
      textField('heading', 'Heading', 'page_builder', 'card_grid'),
      textField('subheading', 'Subheading', 'page_builder', 'card_grid'),
      selectField('card_type', 'Card Type', {
        room: 'Room Card',
        activity: 'Activity Card',
        feature: 'Feature Card',
        content: 'Content Card',
        cpt_rooms: 'Rooms (from CPT)'
      }, 'page_builder', 'card_grid', { default_value: 'content' }),
      selectField('columns', 'Columns', {
        '2': '2 Columns',
        '3': '3 Columns',
        '4': '4 Columns'
      }, 'page_builder', 'card_grid', { default_value: '3' }),
      repeaterField('cards', 'Cards', [
        imageField('image', 'Image', 'page_builder', 'card_grid_cards'),
        galleryField('carousel_images', 'Carousel Images', 'page_builder', 'card_grid_cards'),
        textField('title', 'Title', 'page_builder', 'card_grid_cards', { required: 1 }),
        textareaField('description', 'Description', 'page_builder', 'card_grid_cards'),
        repeaterField('details', 'Details', [
          textField('icon', 'Icon', 'page_builder', 'card_grid_cards_details'),
          textField('label', 'Label', 'page_builder', 'card_grid_cards_details'),
          textField('value', 'Value', 'page_builder', 'card_grid_cards_details')
        ], 'page_builder', 'card_grid_cards'),
        linkField('cta_primary', 'Primary CTA', 'page_builder', 'card_grid_cards'),
        linkField('cta_secondary', 'Secondary CTA', 'page_builder', 'card_grid_cards')
      ], 'page_builder', 'card_grid', {
        conditional_logic: [[{ field: fieldKey('page_builder', 'card_grid', 'card_type'), operator: '!=', value: 'cpt_rooms' }]]
      }),
      postObjectField('rooms', 'Select Rooms', 'room', 'page_builder', 'card_grid', {
        conditional_logic: [[{ field: fieldKey('page_builder', 'card_grid', 'card_type'), operator: '==', value: 'cpt_rooms' }]]
      }),
      trueFalseField('show_price_pill', 'Show Price Pill', 'page_builder', 'card_grid')
    ]
  },

  icon_grid: {
    label: 'Icon Grid',
    fields: [
      textField('eyebrow', 'Eyebrow', 'page_builder', 'icon_grid'),
      textField('heading', 'Heading', 'page_builder', 'icon_grid'),
      selectField('layout', 'Layout', {
        grid: 'Grid',
        inline: 'Inline'
      }, 'page_builder', 'icon_grid', { default_value: 'grid' }),
      repeaterField('icons', 'Icons', [
        imageField('icon', 'Icon', 'page_builder', 'icon_grid_icons', { required: 1 }),
        textField('label', 'Label', 'page_builder', 'icon_grid_icons', { required: 1 }),
        linkField('link', 'Link', 'page_builder', 'icon_grid_icons')
      ], 'page_builder', 'icon_grid', { required: 1 }),
      trueFalseField('show_download', 'Show Download Button', 'page_builder', 'icon_grid'),
      fileField('download_file', 'Download File', 'page_builder', 'icon_grid', {
        conditional_logic: [[{ field: fieldKey('page_builder', 'icon_grid', 'show_download'), operator: '==', value: 1 }]]
      }),
      textField('download_label', 'Download Label', 'page_builder', 'icon_grid', {
        conditional_logic: [[{ field: fieldKey('page_builder', 'icon_grid', 'show_download'), operator: '==', value: 1 }]]
      })
    ]
  },

  testimonial_carousel: {
    label: 'Testimonial Carousel',
    fields: [
      textField('eyebrow', 'Eyebrow', 'page_builder', 'testimonial_carousel'),
      textField('heading', 'Heading', 'page_builder', 'testimonial_carousel'),
      repeaterField('reviews', 'Reviews', [
        textField('title', 'Title', 'page_builder', 'testimonial_carousel_reviews', { required: 1 }),
        textareaField('content', 'Content', 'page_builder', 'testimonial_carousel_reviews', { required: 1 }),
        textField('author', 'Author', 'page_builder', 'testimonial_carousel_reviews', { required: 1 }),
        textField('source', 'Source', 'page_builder', 'testimonial_carousel_reviews')
      ], 'page_builder', 'testimonial_carousel', { required: 1 }),
      selectField('cards_per_slide', 'Cards Per Slide', {
        '1': '1',
        '2': '2',
        '3': '3'
      }, 'page_builder', 'testimonial_carousel', { default_value: '3' }),
      trueFalseField('auto_advance', 'Auto Advance', 'page_builder', 'testimonial_carousel', { default_value: 1 })
    ]
  },

  media_carousel: {
    label: 'Media Carousel',
    fields: [
      textField('eyebrow', 'Eyebrow', 'page_builder', 'media_carousel'),
      textField('heading', 'Heading', 'page_builder', 'media_carousel'),
      repeaterField('items', 'Items', [
        textField('title', 'Title', 'page_builder', 'media_carousel_items', { required: 1 }),
        selectField('media_type', 'Media Type', {
          image: 'Image',
          pdf: 'PDF'
        }, 'page_builder', 'media_carousel_items', { default_value: 'image' }),
        imageField('image', 'Image', 'page_builder', 'media_carousel_items', {
          conditional_logic: [[{ field: fieldKey('page_builder', 'media_carousel_items', 'media_type'), operator: '==', value: 'image' }]]
        }),
        fileField('pdf', 'PDF File', 'page_builder', 'media_carousel_items', {
          conditional_logic: [[{ field: fieldKey('page_builder', 'media_carousel_items', 'media_type'), operator: '==', value: 'pdf' }]]
        })
      ], 'page_builder', 'media_carousel', { required: 1 }),
      selectField('display_mode', 'Display Mode', {
        carousel: 'Carousel',
        tabs: 'Tabs'
      }, 'page_builder', 'media_carousel', { default_value: 'carousel' })
    ]
  },

  gallery: {
    label: 'Gallery',
    fields: [
      textField('eyebrow', 'Eyebrow', 'page_builder', 'gallery'),
      textField('heading', 'Heading', 'page_builder', 'gallery'),
      trueFalseField('enable_filters', 'Enable Category Filters', 'page_builder', 'gallery'),
      repeaterField('images', 'Images', [
        imageField('image', 'Image', 'page_builder', 'gallery_images', { required: 1 }),
        textField('caption', 'Caption', 'page_builder', 'gallery_images'),
        textField('category', 'Category', 'page_builder', 'gallery_images')
      ], 'page_builder', 'gallery', { required: 1 }),
      selectField('columns', 'Columns', {
        '2': '2 Columns',
        '3': '3 Columns',
        '4': '4 Columns'
      }, 'page_builder', 'gallery', { default_value: '4' }),
      selectField('max_width', 'Max Width', {
        medium: 'Medium',
        wide: 'Wide',
        full: 'Full Width'
      }, 'page_builder', 'gallery', { default_value: 'wide' })
    ]
  },

  accordion: {
    label: 'Accordion',
    fields: [
      textField('heading', 'Heading', 'page_builder', 'accordion'),
      textareaField('description', 'Description', 'page_builder', 'accordion'),
      repeaterField('items', 'Items', [
        textField('title', 'Title', 'page_builder', 'accordion_items', { required: 1 }),
        wysiwygField('content', 'Content', 'page_builder', 'accordion_items', { required: 1 })
      ], 'page_builder', 'accordion', { required: 1 }),
      trueFalseField('allow_multiple', 'Allow Multiple Open', 'page_builder', 'accordion'),
      numberField('default_open', 'Default Open Index', 'page_builder', 'accordion', {
        instructions: 'Leave empty for all closed, or enter 0-based index'
      }),
      trueFalseField('enable_schema', 'Enable FAQ Schema', 'page_builder', 'accordion', {
        instructions: 'Adds FAQPage structured data for SEO'
      })
    ]
  },

  cta_banner: {
    label: 'CTA Banner',
    fields: [
      textField('eyebrow', 'Eyebrow', 'page_builder', 'cta_banner'),
      textField('heading', 'Heading', 'page_builder', 'cta_banner', { required: 1 }),
      textField('subheading', 'Subheading', 'page_builder', 'cta_banner'),
      wysiwygField('content', 'Content', 'page_builder', 'cta_banner'),
      linkField('cta_primary', 'Primary CTA', 'page_builder', 'cta_banner'),
      linkField('cta_secondary', 'Secondary CTA', 'page_builder', 'cta_banner'),
      selectField('layout', 'Layout', {
        centered: 'Centered',
        split: 'Split'
      }, 'page_builder', 'cta_banner', { default_value: 'centered' }),
      selectField('background_type', 'Background Type', {
        color: 'Color (from theme)',
        image: 'Image'
      }, 'page_builder', 'cta_banner', { default_value: 'color' }),
      imageField('background_image', 'Background Image', 'page_builder', 'cta_banner', {
        conditional_logic: [[{ field: fieldKey('page_builder', 'cta_banner', 'background_type'), operator: '==', value: 'image' }]]
      }),
      trueFalseField('show_service_ctas', 'Show Service CTAs', 'page_builder', 'cta_banner', {
        instructions: 'Shows email/phone/WhatsApp buttons'
      }),
      textField('service_email', 'Service Email', 'page_builder', 'cta_banner', {
        conditional_logic: [[{ field: fieldKey('page_builder', 'cta_banner', 'show_service_ctas'), operator: '==', value: 1 }]]
      })
    ]
  },

  timeline: {
    label: 'Timeline',
    fields: [
      textField('eyebrow', 'Eyebrow', 'page_builder', 'timeline'),
      textField('heading', 'Heading', 'page_builder', 'timeline'),
      repeaterField('milestones', 'Milestones', [
        textField('year', 'Year', 'page_builder', 'timeline_milestones', { required: 1 }),
        textField('label', 'Label', 'page_builder', 'timeline_milestones', { required: 1 })
      ], 'page_builder', 'timeline', { required: 1 }),
      textareaField('footer_text', 'Footer Text', 'page_builder', 'timeline'),
      selectField('footer_style', 'Footer Style', {
        normal: 'Normal',
        italic: 'Italic'
      }, 'page_builder', 'timeline', { default_value: 'normal' })
    ]
  },

  rate_table: {
    label: 'Rate Table',
    fields: [
      textField('heading', 'Heading', 'page_builder', 'rate_table'),
      selectField('table_type', 'Table Type', {
        rates: 'Room Rates',
        simple: 'Simple Table'
      }, 'page_builder', 'rate_table', { default_value: 'rates' }),
      repeaterField('rate_categories', 'Rate Categories', [
        textField('category_name', 'Category Name', 'page_builder', 'rate_table_categories', { required: 1 }),
        repeaterField('rooms', 'Rooms', [
          numberField('sharing_price', 'Sharing Price', 'page_builder', 'rate_table_rooms'),
          numberField('single_price', 'Single Price', 'page_builder', 'rate_table_rooms'),
          linkField('view_link', 'View Link', 'page_builder', 'rate_table_rooms'),
          linkField('book_link', 'Book Link', 'page_builder', 'rate_table_rooms')
        ], 'page_builder', 'rate_table_categories')
      ], 'page_builder', 'rate_table', {
        conditional_logic: [[{ field: fieldKey('page_builder', 'rate_table', 'table_type'), operator: '==', value: 'rates' }]]
      }),
      repeaterField('simple_rows', 'Simple Rows', [
        textField('label', 'Label', 'page_builder', 'rate_table_simple', { required: 1 }),
        textField('value', 'Value', 'page_builder', 'rate_table_simple', { required: 1 })
      ], 'page_builder', 'rate_table', {
        conditional_logic: [[{ field: fieldKey('page_builder', 'rate_table', 'table_type'), operator: '==', value: 'simple' }]]
      }),
      textField('currency', 'Currency', 'page_builder', 'rate_table', { default_value: 'USD' }),
      trueFalseField('show_book_buttons', 'Show Book Buttons', 'page_builder', 'rate_table', { default_value: 1 })
    ]
  },

  info_bar: {
    label: 'Info Bar',
    fields: [
      repeaterField('items', 'Items', [
        textField('icon', 'Icon', 'page_builder', 'info_bar_items'),
        textField('label', 'Label', 'page_builder', 'info_bar_items', { required: 1 }),
        textField('value', 'Value', 'page_builder', 'info_bar_items', { required: 1 }),
        textField('unit', 'Unit', 'page_builder', 'info_bar_items')
      ], 'page_builder', 'info_bar', { required: 1 }),
      selectField('columns', 'Columns', {
        '2': '2 Columns',
        '3': '3 Columns',
        '4': '4 Columns'
      }, 'page_builder', 'info_bar', { default_value: '4' }),
      trueFalseField('show_dividers', 'Show Dividers', 'page_builder', 'info_bar', { default_value: 1 })
    ]
  }
};

// =============================================================================
// BUILD PAGE BUILDER FIELD GROUP
// =============================================================================

function buildPageBuilderGroup() {
  const layouts = Object.entries(LAYOUTS).map(([name, config]) => ({
    key: layoutKey('page_builder', name),
    name,
    label: config.label,
    display: 'block',
    sub_fields: [
      // Clone section settings into every layout
      cloneField('section_settings', groupKey('section_settings'), 'page_builder', name),
      ...config.fields
    ]
  }));

  return {
    key: groupKey('page_builder'),
    title: 'Page Builder',
    fields: [
      {
        key: fieldKey('page_builder', 'page_sections'),
        label: 'Page Sections',
        name: 'page_sections',
        type: 'flexible_content',
        show_in_rest: 1,
        layouts,
        button_label: 'Add Section'
      }
    ],
    location: [
      [{ param: 'post_type', operator: '==', value: 'page' }]
    ],
    menu_order: 0,
    position: 'normal',
    style: 'default',
    label_placement: 'top',
    instruction_placement: 'label',
    hide_on_screen: ['the_content'],
    active: true,
    description: 'Flexible content page builder',
    show_in_rest: 1
  };
}

// =============================================================================
// BUILD SEO FIELD GROUP
// =============================================================================

function buildSeoGroup() {
  return {
    key: groupKey('seo'),
    title: 'SEO',
    fields: [
      textField('seo_title', 'SEO Title', 'seo', null, {
        instructions: 'Leave empty to use page title'
      }),
      textareaField('seo_description', 'Meta Description', 'seo', null, {
        instructions: 'Recommended: 150-160 characters',
        maxlength: 160
      }),
      imageField('og_image', 'Open Graph Image', 'seo', null, {
        instructions: 'Recommended: 1200x630 pixels'
      })
    ],
    location: [
      [{ param: 'post_type', operator: '==', value: 'page' }],
      [{ param: 'post_type', operator: '==', value: 'room' }],
      [{ param: 'post_type', operator: '==', value: 'post' }]
    ],
    menu_order: 100,
    position: 'normal',
    style: 'default',
    label_placement: 'top',
    instruction_placement: 'label',
    hide_on_screen: '',
    active: true,
    description: 'SEO meta fields',
    show_in_rest: 1
  };
}

// =============================================================================
// BUILD OPTIONS PAGE FIELD GROUP
// =============================================================================

function buildOptionsGroup() {
  return {
    key: groupKey('site_options'),
    title: 'Site Options',
    fields: [
      // Site Name
      textField('site_name', 'Site Name', 'site_options'),

      // Header Group
      groupField('header', 'Header', [
        imageField('logo', 'Logo', 'site_options', 'header'),
        imageField('logo_scrolled', 'Logo (Scrolled)', 'site_options', 'header'),
        repeaterField('nav_items', 'Navigation Items', [
          textField('label', 'Label', 'site_options', 'header_nav'),
          urlField('href', 'URL', 'site_options', 'header_nav'),
          repeaterField('sub_items', 'Sub Items', [
            textField('label', 'Label', 'site_options', 'header_nav_sub'),
            urlField('href', 'URL', 'site_options', 'header_nav_sub')
          ], 'site_options', 'header_nav')
        ], 'site_options', 'header'),
        urlField('booking_url', 'Booking URL', 'site_options', 'header')
      ], 'site_options'),

      // Footer Group
      groupField('footer', 'Footer', [
        imageField('logo', 'Logo', 'site_options', 'footer'),
        textareaField('tagline', 'Tagline', 'site_options', 'footer'),
        repeaterField('nav_columns', 'Navigation Columns', [
          textField('title', 'Column Title', 'site_options', 'footer_nav'),
          repeaterField('links', 'Links', [
            textField('title', 'Title', 'site_options', 'footer_nav_links'),
            urlField('url', 'URL', 'site_options', 'footer_nav_links')
          ], 'site_options', 'footer_nav')
        ], 'site_options', 'footer'),
        textField('copyright', 'Copyright Text', 'site_options', 'footer')
      ], 'site_options'),

      // Contact Group
      groupField('contact', 'Contact Information', [
        textField('email', 'Email', 'site_options', 'contact'),
        textField('phone', 'Phone', 'site_options', 'contact'),
        urlField('whatsapp', 'WhatsApp Link', 'site_options', 'contact'),
        textareaField('address', 'Address', 'site_options', 'contact'),
        textField('front_desk_phone', 'Front Desk Phone', 'site_options', 'contact'),
        textField('front_desk_email', 'Front Desk Email', 'site_options', 'contact'),
        urlField('front_desk_whatsapp', 'Front Desk WhatsApp', 'site_options', 'contact'),
        textField('agents_phone', 'Agents Phone', 'site_options', 'contact'),
        textField('agents_email', 'Agents Email', 'site_options', 'contact')
      ], 'site_options'),

      // Social Group
      groupField('social', 'Social Media', [
        urlField('facebook', 'Facebook', 'site_options', 'social'),
        urlField('instagram', 'Instagram', 'site_options', 'social'),
        urlField('twitter', 'Twitter', 'site_options', 'social'),
        urlField('tripadvisor', 'TripAdvisor', 'site_options', 'social')
      ], 'site_options')
    ],
    location: [
      [{ param: 'options_page', operator: '==', value: 'site-options' }]
    ],
    menu_order: 0,
    position: 'normal',
    style: 'default',
    label_placement: 'top',
    instruction_placement: 'label',
    hide_on_screen: '',
    active: true,
    description: 'Global site options',
    show_in_rest: 1
  };
}

// =============================================================================
// BUILD ROOM CPT FIELDS
// =============================================================================

function buildRoomFieldsGroup() {
  return {
    key: groupKey('room_fields'),
    title: 'Room Details',
    fields: [
      textField('short_description', 'Short Description', 'room_fields'),
      wysiwygField('full_description', 'Full Description', 'room_fields'),
      galleryField('gallery', 'Gallery', 'room_fields'),
      galleryField('hero_images', 'Hero Images', 'room_fields'),
      fileField('floorplan', 'Floorplan PDF', 'room_fields'),
      numberField('room_count', 'Number of Rooms', 'room_fields'),
      textField('size', 'Size (e.g., 36 m²)', 'room_fields'),
      numberField('sleeps', 'Sleeps', 'room_fields'),
      textField('beds', 'Bed Configuration', 'room_fields'),
      textField('price_from', 'Price From', 'room_fields'),
      repeaterField('amenities', 'Amenities', [
        textField('amenity', 'Amenity', 'room_fields', 'amenities')
      ], 'room_fields')
    ],
    location: [
      [{ param: 'post_type', operator: '==', value: 'room' }]
    ],
    menu_order: 0,
    position: 'normal',
    style: 'default',
    label_placement: 'top',
    instruction_placement: 'label',
    hide_on_screen: '',
    active: true,
    description: 'Room custom fields',
    show_in_rest: 1
  };
}

// =============================================================================
// MAIN EXPORT
// =============================================================================

function generateAcfExport() {
  const groups = [
    SECTION_SETTINGS_GROUP,
    buildPageBuilderGroup(),
    buildSeoGroup(),
    buildOptionsGroup(),
    buildRoomFieldsGroup()
  ];

  return groups;
}

// Write the export file
const output = generateAcfExport();
const outputPath = join(ROOT, 'wordpress', 'acf-export.json');

writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log(`Generated ${outputPath}`);
console.log(`Total field groups: ${output.length}`);
console.log(`Layouts: ${Object.keys(LAYOUTS).join(', ')}`);
