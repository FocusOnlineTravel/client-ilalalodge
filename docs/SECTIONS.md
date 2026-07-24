# ACF Flexible Content Section Audit

> **Goal:** Define the minimum set of canonical layouts needed to rebuild this site with ACF Pro Flexible Content.
>
> **Target:** 12–15 layouts maximum. Differences in styling, position, or optional elements become **fields**, not new layouts.

---

## Summary: 13 Canonical Layouts

| # | Layout Name | Used On | Primary Purpose |
|---|-------------|---------|-----------------|
| 1 | `hero` | All pages | Full-viewport hero with video/image/carousel background |
| 2 | `text_block` | 12+ pages | Centered prose content (intros, narratives, overviews) |
| 3 | `text_media` | 10+ pages | Split layout: text + media (image/video/gallery/slider) |
| 4 | `card_grid` | 6+ pages | Grid of cards (rooms, activities, info cards, features) |
| 5 | `icon_grid` | 3+ pages | Grid of icons with labels (activities, amenities) |
| 6 | `testimonial_carousel` | 2 pages | Sliding carousel of guest reviews |
| 7 | `media_carousel` | 2 pages | Carousel for menus, PDFs, or mixed media |
| 8 | `gallery` | 8+ pages | Image grid with lightbox, optional category filters |
| 9 | `accordion` | 2+ pages | Expandable FAQ or terms content |
| 10 | `cta_banner` | All pages | Call-to-action section (solid bg or image bg) |
| 11 | `timeline` | 1 page | Horizontal/vertical milestone timeline |
| 12 | `rate_table` | 2 pages | Pricing tables with categories |
| 13 | `info_bar` | 3+ pages | Horizontal row of stats/details with icons |

---

## Shared Settings Group (Clone Field)

Every layout includes this group via ACF clone field:

| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| `section_theme` | select | yes | `light` | Options: `light`, `dark`, `accent` (daisy), `forest` |
| `spacing_top` | select | yes | `default` | Options: `none`, `small`, `default`, `large` |
| `spacing_bottom` | select | yes | `default` | Options: `none`, `small`, `default`, `large` |
| `anchor_id` | text | no | — | For in-page navigation links |
| `custom_background` | image | no | — | Override theme with custom image |

---

## Layout Specifications

### 1. `hero`

Full-viewport hero section with media background (video, static image, or image carousel).

#### Fields

| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| `media_type` | select | yes | `image` | `image`, `video`, `carousel` |
| `image` | image (ID) | conditional | — | When `media_type` = `image` |
| `video_url` | url | conditional | — | When `media_type` = `video` (Streamable/Vimeo URL) |
| `carousel_images` | gallery | conditional | — | When `media_type` = `carousel` |
| `eyebrow` | text | no | — | Script font text above heading |
| `heading` | text | yes | — | Main h1 heading |
| `subheading` | textarea | no | — | Supporting text below heading |
| `overlay_opacity` | range | no | `20` | 0–60%, controls background darkness |
| `height` | select | no | `tall` | `tall` (80vh), `medium` (60vh), `compact` (50vh) |
| `cta` | link | no | — | Optional button |
| `show_play_button` | true_false | no | `false` | Shows play button for video modal |
| `video_modal_url` | url | no | — | Full video URL for modal playback |

#### Collapses These Existing Sections

- Homepage hero (video + play button modal)
- Room listing hero (video)
- Room detail hero (carousel with navigation)
- Activities hero (video)
- Dining hero (image)
- Gallery hero (image)
- Our Story hero (image)
- Contact hero (image)
- Location hero (video)
- FAQs hero (image)
- Rates hero (gradient on solid color)
- Special Offers hero (image)

#### Variant Fields That Absorb Differences

- `media_type`: Absorbs video vs image vs carousel
- `height`: Absorbs full (80vh) vs medium (60vh) vs compact (50vh)
- `show_play_button`: Absorbs homepage video modal feature
- `overlay_opacity`: Absorbs different overlay intensities

---

### 2. `text_block`

Simple centered prose content for introductions, narrative sections, and overviews.

#### Fields

| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| `eyebrow` | text | no | — | Script font text above heading |
| `heading` | text | no | — | Optional section heading |
| `content` | wysiwyg | yes | — | Rich text content |
| `max_width` | select | no | `medium` | `narrow` (2xl), `medium` (3xl), `wide` (4xl) |
| `text_align` | select | no | `center` | `left`, `center` |

#### Collapses These Existing Sections

- Homepage intro paragraph sections
- Our Rooms overview text
- Dining story intro
- Activities intro
- Facilities intro
- Our Story narrative paragraphs (Parts 1 & 2)
- Our Story "Family Legacy" section
- Location overview, regional context
- Contact intro
- Rates intro
- Special Offers intro

#### Variant Fields That Absorb Differences

- `max_width`: Absorbs different container widths
- `text_align`: Absorbs centered vs left-aligned text
- Section theme (via shared settings): Absorbs daisy vs white backgrounds

---

### 3. `text_media`

Split layout with text content on one side and media (single image, image grid, slider, or video) on the other.

#### Fields

| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| `eyebrow` | text | no | — | Script font text above heading |
| `heading` | text | yes | — | Section heading |
| `subheading` | text | no | — | Optional subheading |
| `content` | wysiwyg | yes | — | Rich text body content |
| `cta_primary` | link | no | — | Primary button |
| `cta_secondary` | link | no | — | Secondary button |
| `cta_secondary_action` | select | no | `link` | `link`, `booking_modal`, `whatsapp` |
| `media_position` | select | no | `right` | `left`, `right` |
| `media_type` | select | yes | `image` | `image`, `gallery_grid`, `slider`, `video` |
| `image` | image (ID) | conditional | — | Single image |
| `gallery_images` | gallery | conditional | — | For grid or slider |
| `video_url` | url | conditional | — | Video URL |
| `layout_ratio` | select | no | `50_50` | `40_60`, `50_50`, `60_40` |
| `media_height` | select | no | `auto` | `auto`, `400`, `500`, `full` |

#### Collapses These Existing Sections

- Homepage IntroSection (40/60, single image right)
- Homepage DiningSection (image grid left)
- Homepage WildlifeSection (image grid right, staggered)
- Dining featured experience blocks (video left/right)
- Activities featured experience blocks
- Facilities sections (text + image slider)
- Experience detail pages (text + image alternating)
- Location "Getting Here" could use card_grid instead

#### Variant Fields That Absorb Differences

- `media_position`: Absorbs left vs right alternating patterns
- `media_type`: Absorbs single image vs grid vs slider vs video
- `layout_ratio`: Absorbs 40/60 vs 50/50 layouts
- `media_height`: Absorbs different image heights
- `cta_secondary_action`: Absorbs "Book a Table" modal behavior

---

### 4. `card_grid`

Grid of cards for rooms, activities, features, or informational content.

#### Fields

| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| `eyebrow` | text | no | — | Script font text above heading |
| `heading` | text | no | — | Section heading |
| `subheading` | text | no | — | Supporting text |
| `card_type` | select | yes | `content` | `room`, `activity`, `feature`, `content`, `cpt_rooms` |
| `columns` | select | no | `3` | `2`, `3`, `4` |
| `cards` | repeater | conditional | — | When `card_type` != `cpt_rooms` |
| └ `image` | image (ID) | no | — | Card image |
| └ `carousel_images` | gallery | no | — | For activity cards with carousels |
| └ `title` | text | yes | — | Card title |
| └ `description` | textarea | no | — | Card description |
| └ `details` | repeater | no | — | For room cards (size, sleeps, beds, price) |
| └ └ `icon` | select | yes | — | Icon identifier |
| └ └ `label` | text | yes | — | Detail label |
| └ └ `value` | text | yes | — | Detail value |
| └ `cta_primary` | link | no | — | Primary button |
| └ `cta_secondary` | link | no | — | Secondary button |
| `rooms` | relationship | conditional | — | When `card_type` = `cpt_rooms`, pull from Rooms CPT |
| `show_price_pill` | true_false | no | `false` | Show price overlay on room images |

#### Collapses These Existing Sections

- Homepage StaySection (room cards)
- Our Rooms listing grid
- Activities category sections (activity cards with carousels)
- Location "Getting Here" cards (3-column info cards)
- Experience "What's Included" grids
- Ra-Ikane cruise options cards

#### Variant Fields That Absorb Differences

- `card_type`: Absorbs room cards vs activity cards vs info cards
- `columns`: Absorbs 2/3/4 column layouts
- `carousel_images`: Absorbs cards with image carousels (activity cards)
- `details` repeater: Absorbs room-specific stats (size, sleeps, beds, price)
- `show_price_pill`: Absorbs homepage room cards with price overlay

---

### 5. `icon_grid`

Grid of icons with labels, used for activities overview and room amenities.

#### Fields

| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| `eyebrow` | text | no | — | Script font text above heading |
| `heading` | text | no | — | Section heading |
| `layout` | select | no | `grid` | `grid`, `inline` |
| `icons` | repeater | yes | — | |
| └ `icon` | image (ID) | yes | — | Icon image |
| └ `label` | text | yes | — | Icon label |
| └ `link` | link | no | — | Optional link |
| `show_download` | true_false | no | `false` | Show download button (for floorplan etc.) |
| `download_file` | file | conditional | — | PDF or other file |
| `download_label` | text | no | `Download` | Button text |

#### Collapses These Existing Sections

- Homepage ActivitiesSection (activity icons grid)
- Room detail amenities grid
- Any icon-based feature lists

#### Variant Fields That Absorb Differences

- `layout`: Absorbs grid vs inline/flex layouts
- `link` on icons: Absorbs clickable vs non-clickable icons
- `show_download`: Absorbs floorplan download feature

---

### 6. `testimonial_carousel`

Carousel of guest reviews/testimonials.

#### Fields

| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| `eyebrow` | text | no | — | Script font text |
| `heading` | text | no | — | Section heading |
| `reviews` | repeater | yes | — | |
| └ `title` | text | yes | — | Review title/highlight |
| └ `content` | textarea | yes | — | Review text |
| └ `author` | text | yes | — | Reviewer name |
| └ `source` | text | no | — | Platform (TripAdvisor, Google, etc.) |
| `cards_per_slide` | select | no | `3` | `1`, `2`, `3` |
| `auto_advance` | true_false | no | `true` | Auto-rotate slides |

#### Collapses These Existing Sections

- Homepage ReviewsSection
- Dining page reviews carousel

#### Notes

This is kept separate from `media_carousel` because the content shape is fundamentally different (structured review data vs media files).

---

### 7. `media_carousel`

Carousel for menus, PDFs, or mixed media content.

#### Fields

| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| `eyebrow` | text | no | — | Script font text |
| `heading` | text | no | — | Section heading |
| `items` | repeater | yes | — | |
| └ `title` | text | yes | — | Item title |
| └ `media_type` | select | yes | `image` | `image`, `pdf` |
| └ `image` | image (ID) | conditional | — | When `media_type` = `image` |
| └ `pdf` | file | conditional | — | When `media_type` = `pdf` |
| `display_mode` | select | no | `carousel` | `carousel`, `tabs` |

#### Collapses These Existing Sections

- Dining MenuCarousel (multiple menu PDFs)
- Any document/media carousel needs

#### Notes

Kept separate from `testimonial_carousel` because content structure differs significantly (files vs structured text data).

---

### 8. `gallery`

Image grid with lightbox functionality, optionally filterable by category.

#### Fields

| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| `eyebrow` | text | no | — | Script font text |
| `heading` | text | no | — | Section heading |
| `enable_filters` | true_false | no | `false` | Show category filter buttons |
| `images` | repeater | yes | — | |
| └ `image` | image (ID) | yes | — | Image |
| └ `caption` | text | no | — | Image caption |
| └ `category` | text | no | — | Filter category (if filters enabled) |
| `columns` | select | no | `4` | `2`, `3`, `4` |
| `max_width` | select | no | `full` | `medium`, `wide`, `full` |

#### Collapses These Existing Sections

- Gallery page GalleryGrid (with filters)
- Our Story hotel gallery
- Our Story history gallery
- Dining gallery
- High Tea gallery
- Zambezi River Deck gallery
- Ra-Ikane gallery
- Room detail gallery

#### Variant Fields That Absorb Differences

- `enable_filters`: Absorbs filtered (gallery page) vs simple grids
- `columns`: Absorbs 2/3/4 column variations
- `max_width`: Absorbs different container widths

---

### 9. `accordion`

Expandable content sections for FAQs, terms, or structured information.

#### Fields

| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| `heading` | text | no | — | Section heading |
| `description` | textarea | no | — | Intro text above accordion |
| `items` | repeater | yes | — | |
| └ `title` | text | yes | — | Accordion item heading |
| └ `content` | wysiwyg | yes | — | Expandable content |
| `allow_multiple` | true_false | no | `false` | Allow multiple items open |
| `default_open` | number | no | `0` | Index of initially open item (0 = none) |
| `enable_schema` | true_false | no | `false` | Output FAQ schema.org markup |

#### Collapses These Existing Sections

- FAQs page accordion (with schema)
- Rates page TermsAccordion
- Special Offers terms section

#### Variant Fields That Absorb Differences

- `enable_schema`: Absorbs FAQ schema.org output for SEO
- `allow_multiple`: Absorbs different UX behaviors

---

### 10. `cta_banner`

Call-to-action section with various background and layout options.

#### Fields

| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| `eyebrow` | text | no | — | Script font text |
| `heading` | text | yes | — | Main heading |
| `subheading` | text | no | — | Supporting text |
| `content` | textarea | no | — | Optional body text |
| `cta_primary` | link | no | — | Primary button |
| `cta_secondary` | link | no | — | Secondary button |
| `layout` | select | no | `centered` | `centered`, `split` |
| `background_type` | select | no | `color` | `color`, `image` |
| `background_image` | image (ID) | conditional | — | When `background_type` = `image` |
| `show_service_ctas` | true_false | no | `false` | Show email/phone/WhatsApp buttons |
| `service_email` | email | conditional | — | Email for ServiceCTAs |

#### Collapses These Existing Sections

- Homepage CtaBannerSection (split layout)
- Our Rooms CTA (dark forest, centered)
- Room detail final CTA (image background)
- Dining CTA
- Activities CTA
- Facilities CTA
- Our Story CTA
- Contact "Find Us" section
- FAQs "Still have questions?" CTA
- Rates CTA
- Rates "Special Offers Banner" (accent/gold background)
- Special Offers CTA
- Location "Best Time to Visit" (informational CTA style)

#### Variant Fields That Absorb Differences

- `layout`: Absorbs centered (most) vs split (homepage) layouts
- `background_type`: Absorbs solid color vs image backgrounds
- `show_service_ctas`: Absorbs contact-focused CTAs with email/phone buttons
- Theme (via shared settings): Absorbs dark/forest/accent backgrounds

---

### 11. `timeline`

Horizontal or vertical timeline for milestones and history.

#### Fields

| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| `eyebrow` | text | no | — | Script font text |
| `heading` | text | no | — | Section heading |
| `milestones` | repeater | yes | — | |
| └ `year` | text | yes | — | Year or date |
| └ `label` | text | yes | — | Milestone description |
| `footer_text` | textarea | no | — | Optional text below timeline |
| `footer_style` | select | no | `normal` | `normal`, `italic` |

#### Collapses These Existing Sections

- Our Story milestone timeline

#### Notes

This could theoretically be a variant of `text_block` with structured content, but the visual presentation (horizontal timeline with dots and connecting line) is unique enough to warrant its own layout.

---

### 12. `rate_table`

Pricing tables for room rates, transfers, or other structured pricing.

#### Fields

| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| `heading` | text | no | — | Section heading |
| `table_type` | select | yes | `rates` | `rates`, `simple` |
| `rate_categories` | repeater | conditional | — | When `table_type` = `rates` |
| └ `category_name` | text | yes | — | Category header |
| └ `rooms` | repeater | yes | — | |
| └ └ `sharing_price` | number | yes | — | Per person sharing |
| └ └ `single_price` | number | yes | — | Single occupancy |
| └ └ `view_link` | link | no | — | Link to room details |
| └ └ `book_link` | link | no | — | Book now link |
| `simple_rows` | repeater | conditional | — | When `table_type` = `simple` |
| └ `label` | text | yes | — | Row label |
| └ `value` | text | yes | — | Row value |
| `currency` | text | no | `US$` | Currency symbol |
| `show_book_buttons` | true_false | no | `true` | Show booking buttons |

#### Collapses These Existing Sections

- Rates page room rates tables
- Rates page transfer prices table
- Special Offers seasonal rates table

#### Variant Fields That Absorb Differences

- `table_type`: Absorbs complex rate tables vs simple two-column tables
- `show_book_buttons`: Absorbs with/without booking buttons

---

### 13. `info_bar`

Horizontal row of stats, details, or key information with icons.

#### Fields

| Field | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| `items` | repeater | yes | — | |
| └ `icon` | select | yes | — | Icon identifier (size, guests, bed, price, etc.) |
| └ `label` | text | yes | — | Item label |
| └ `value` | text | yes | — | Item value |
| └ `unit` | text | no | — | Optional unit (m², pax, etc.) |
| `columns` | select | no | `4` | `2`, `3`, `4` |
| `show_dividers` | true_false | no | `true` | Show dividers between items |

#### Collapses These Existing Sections

- Room detail quick info bar (size, sleeps, beds, price)
- Could be used for any stats/features row

#### Notes

This is a supporting layout for structured key-value data, commonly used in detail pages but flexible enough for other uses.

---

## Custom Post Types (Not Flexible Content)

These content types should be managed as WordPress Custom Post Types, not as Flexible Content layouts:

| CPT | Fields | Notes |
|-----|--------|-------|
| `rooms` | name, slug, description, images (gallery), price_from, size, sleeps, beds, amenities (repeater), floorplan (file) | Used by card_grid with `card_type` = `cpt_rooms` |
| `experiences` | name, slug, description, featured_image, video_url, gallery | High Tea, Zambezi Deck, Ra-Ikane, etc. |
| `reviews` | title, content, author, source | Could pull into testimonial_carousel |

---

## Sections Considered but Folded

### Folded into `text_media`

| Original Section | Reason for Folding |
|------------------|-------------------|
| Homepage IntroSection | Same structure as text_media with `media_position: right`, `media_type: image` |
| Homepage DiningSection | Same structure with `media_position: left`, `media_type: gallery_grid` |
| Homepage WildlifeSection | Same structure with `media_position: right`, `media_type: gallery_grid` |
| Dining experience blocks | Same structure with alternating `media_position`, `media_type: video` |
| Activities experience blocks | Same as above |
| Facilities feature sections | Same structure with `media_type: slider` |

### Folded into `card_grid`

| Original Section | Reason for Folding |
|------------------|-------------------|
| Room listing grid | Room cards are cards with specific detail fields |
| Activity category cards | Cards with carousel images |
| Getting Here info cards | Simple content cards without images |
| What's Included grids | Feature cards |
| Cruise options | Cards with descriptions |

### Folded into `cta_banner`

| Original Section | Reason for Folding |
|------------------|-------------------|
| All page-end CTAs | Same structure, different themes |
| Split CTA (homepage) | Uses `layout: split` variant |
| Special Offers banner | Uses `section_theme: accent` |
| Contact "Find Us" | Uses `show_service_ctas: true` |
| Location "Best Time" | Informational CTA, `section_theme: forest` |

### Folded into `gallery`

| Original Section | Reason for Folding |
|------------------|-------------------|
| Gallery page grid (filtered) | Uses `enable_filters: true` |
| All inline image galleries | Use same structure without filters |

### Folded into `accordion`

| Original Section | Reason for Folding |
|------------------|-------------------|
| FAQ accordion | Uses `enable_schema: true` |
| Terms accordion | Same structure without schema |

---

## Sections Flagged as Edge Cases

### `timeline` — Kept Separate

**Reason:** The horizontal/vertical timeline with connecting lines and dots is visually unique. While it could theoretically be a repeater inside `text_block`, the specialized desktop (horizontal) vs mobile (vertical) layouts and the visual treatment justify a separate layout.

**Alternative considered:** Could be a `text_block` variant with `display_mode: timeline`, but this adds complexity to text_block for a single-use case.

### `rate_table` — Kept Separate

**Reason:** The nested structure (categories → rooms → prices + actions) is fundamentally different from other layouts. This is specialized content that doesn't fit into `card_grid` or a generic table component.

**Alternative considered:** Could use a generic "table" layout, but rate tables have booking actions, view links, and specific price formatting that warrant specialization.

### `info_bar` — Kept Separate

**Reason:** While this could be folded into `icon_grid`, the purpose is different (structured data display vs decorative icons), and the visual treatment (horizontal bar with dividers, key-value pairs) is distinct.

**Alternative considered:** Merge with `icon_grid` using a `display_mode` variant, but this overcomplicates icon_grid for a fairly common pattern.

---

## Final Count: 13 Layouts

This is within the target of 12–15 layouts. Further consolidation is possible but would sacrifice clarity:

- Merging `testimonial_carousel` + `media_carousel` would require complex conditional logic
- Merging `timeline` into `text_block` adds edge-case complexity
- Merging `info_bar` into `icon_grid` conflates different purposes

The 13 layouts provide a clean, maintainable system that covers all current site sections with clear separation of concerns.

---

## Next Steps

1. Create ACF field groups for shared settings (clone field)
2. Create ACF Flexible Content field with all 13 layouts
3. Register CPTs for Rooms, Experiences, Reviews
4. Build Next.js components that map 1:1 with ACF layouts
5. Create GraphQL/REST API queries for flexible content data
