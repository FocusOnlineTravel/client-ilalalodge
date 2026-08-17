# WordPress Section Types Reference

This document lists all ACF Flexible Content section types and their required fields.
Field names must match exactly for the frontend to work.

---

## 1. HERO

**Layout name:** `hero`

| Field | Type | Required | Options/Notes |
|-------|------|----------|---------------|
| `media_type` | Select | Yes | `image`, `video`, `carousel` |
| `image` | Image | When type=image | Return format: array |
| `video_url` | URL | When type=video | Direct video URL (mp4) |
| `carousel_images` | Gallery | When type=carousel | Return format: array |
| `eyebrow` | Text | No | Small text above heading |
| `heading` | Text | Yes | Main title |
| `subheading` | Text | No | Text below heading |
| `overlay_opacity` | Number | No | 0-100, default 20 |
| `height` | Select | No | `tall`, `medium`, `compact` |
| `text_position` | Select | No | `center`, `bottom` |
| `cta` | Link | No | Button link |
| `show_play_button` | True/False | No | Show play button overlay |
| `video_modal_url` | URL | No | Video to play in modal |

**Section Settings (all sections have these):**
| Field | Type | Required | Options |
|-------|------|----------|---------|
| `section_theme` | Select | Yes | `light`, `dark`, `accent`, `forest` |
| `spacing_top` | Select | No | `none`, `small`, `default`, `large` |
| `spacing_bottom` | Select | No | `none`, `small`, `default`, `large` |
| `anchor_id` | Text | No | For anchor links (e.g., `#about`) |

---

## 2. TEXT_BLOCK

**Layout name:** `text_block`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `eyebrow` | Text | No | Small text above heading |
| `heading` | Text | No | Section heading |
| `content` | WYSIWYG | Yes | Main text content |
| `max_width` | Select | No | `narrow`, `medium`, `wide` |
| `text_align` | Select | No | `left`, `center` |

---

## 3. TEXT_MEDIA

**Layout name:** `text_media`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `eyebrow` | Text | No | Small text above heading |
| `heading` | Text | Yes | Section heading |
| `subheading` | Text | No | Below heading |
| `highlight` | Text | No | Highlighted text (gold) |
| `content` | WYSIWYG | Yes | Main text content |
| `cta_primary` | Link | No | Primary button |
| `cta_secondary` | Link | No | Secondary button |
| `cta_secondary_action` | Select | No | `link`, `booking_modal`, `whatsapp` |
| `cta_tertiary` | Link | No | Tertiary button |
| `cta_tertiary_action` | Select | No | `link`, `booking_modal`, `whatsapp` |
| `show_service_ctas` | True/False | No | Show call/email/WhatsApp buttons |
| `service_email` | Email | No | Email for service CTAs |
| `media_position` | Select | No | `left`, `right` |
| `media_type` | Select | Yes | `image`, `gallery_grid`, `video` |
| `image` | Image | When type=image | Single image |
| `image_link` | Link | No | Makes image clickable (extracts URL) |
| `gallery_images` | Gallery | When type=gallery_grid | Multiple images |
| `video_url` | URL | When type=video | Direct video URL |
| `layout_ratio` | Select | No | `40_60`, `50_50`, `60_40` |
| `media_height` | Select | No | `400`, `500`, `full`, `auto` |
| `max_width` | Select | No | `medium`, `wide`, `full` |

**Note:** Full-width edge-to-edge layout works with `layout_ratio: 40_60` + `media_type: image` or `video`. Other combinations use contained layout.

---

## 4. CARD_GRID

**Layout name:** `card_grid`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `eyebrow` | Text | No | Script text above heading |
| `heading` | Text | No | Section heading |
| `subheading` | Text | No | Below heading |
| `card_type` | Select | Yes | `room`, `activity`, `feature`, `content`, `cpt_rooms` |
| `columns` | Select | No | `2`, `3`, `4` |
| `cards` | Repeater | When not cpt_rooms | See card fields below |
| `rooms` | Relationship | When type=cpt_rooms | Select Room CPT posts |
| `show_price_pill` | True/False | No | Show price on cards |
| `text_align` | Select | No | `left`, `center`, `right` |
| `card_size` | Select | No | `small`, `default`, `large` |
| `max_width` | Select | No | `medium`, `wide`, `full` |

**Card Repeater Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `image` | Image | No | Card image |
| `carousel_images` | Gallery | No | Multiple images (carousel) |
| `title` | Text | Yes | Card title |
| `description` | Textarea | No | Card description |
| `details` | Repeater | No | Icon/label/value items |
| `cta_primary` | Link | No | Primary button |
| `cta_secondary` | Link | No | Secondary button |

---

## 5. ICON_GRID

**Layout name:** `icon_grid`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `eyebrow` | Text | No | Script text |
| `heading` | Text | No | Section heading |
| `layout` | Select | No | `grid`, `inline` |
| `icons` | Repeater | Yes | See icon fields below |
| `show_download` | True/False | No | Show download button |
| `download_file` | File/URL | No | PDF or file to download |
| `download_label` | Text | No | Button text |

**Icon Repeater Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `icon` | Image | Yes | Icon image (required or item won't show) |
| `label` | Text | Yes | Text below icon |
| `link` | Link | No | Makes icon clickable |

---

## 6. TESTIMONIAL_CAROUSEL

**Layout name:** `testimonial_carousel`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `eyebrow` | Text | No | Script text |
| `heading` | Text | No | Section heading |
| `reviews` | Repeater | Yes | See review fields below |
| `cards_per_slide` | Select | No | `1`, `2`, `3` |
| `auto_advance` | True/False | No | Auto-rotate slides |

**Review Repeater Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | Text | Yes | Review title/headline |
| `content` | Textarea | Yes | Review text |
| `author` | Text | Yes | Reviewer name |
| `source` | Text | No | e.g., "TripAdvisor" |

---

## 7. MEDIA_CAROUSEL

**Layout name:** `media_carousel`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `eyebrow` | Text | No | Script text |
| `heading` | Text | No | Section heading |
| `items` | Repeater | Yes | See item fields below |
| `display_mode` | Select | No | `carousel`, `tabs`, `cards` |
| `items_per_slide` | Select | No | `2`, `3`, `4` (for cards mode) |

**Item Repeater Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | Text | Yes | Item title |
| `subtitle` | Text | No | e.g., "06:30 - 10:00" (for cards mode) |
| `description` | Textarea | No | Item description (for cards mode) |
| `media_type` | Select | Yes | `image`, `pdf` |
| `image` | Image | When type=image | Menu/document image |
| `pdf` | URL/File | When type=pdf | PDF URL (shows "View Menu" button in cards mode) |

**Display Modes:**
- `carousel`: Single item per slide with arrows
- `tabs`: Tab buttons to switch between items
- `cards`: 3-column card layout (like dining menus) with image, title, subtitle, description, and PDF link

---

## 8. GALLERY

**Layout name:** `gallery`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `eyebrow` | Text | No | Script text |
| `heading` | Text | No | Section heading |
| `enable_filters` | True/False | No | Show category filter buttons |
| `images` | Repeater | Yes | See image fields below |
| `columns` | Select | No | `2`, `3`, `4` |
| `max_width` | Select | No | `medium`, `wide`, `full` |
| `aspect_ratio` | Select | No | `1:1`, `4:3`, `16:9` |

**Image Repeater Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `image` | Image | Yes | Gallery image |
| `caption` | Text | No | Image caption |
| `category` | Text | No | For filtering (e.g., "Rooms", "Dining") |

**Category-specific galleries (for main Gallery page):**
| Field | Type | Notes |
|-------|------|-------|
| `rooms_gallery` | Gallery | Images auto-tagged "Rooms" |
| `dining_gallery` | Gallery | Images auto-tagged "Dining" |
| `pool_bar_gallery` | Gallery | Images auto-tagged "Pool & Bar" |
| `conferencing_gallery` | Gallery | Images auto-tagged "Conferencing" |
| `wildlife_gallery` | Gallery | Images auto-tagged "Wildlife" |
| `hotel_grounds_gallery` | Gallery | Images auto-tagged "Hotel Grounds" |

---

## 9. ACCORDION

**Layout name:** `accordion`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `heading` | Text | No | Section heading |
| `description` | Textarea | No | Intro text |
| `items` | Repeater | Yes | See item fields below |
| `allow_multiple` | True/False | No | Allow multiple items open |
| `default_open` | Number | No | Index of item to open by default |
| `enable_schema` | True/False | No | Add FAQ schema markup |

**Item Repeater Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | Text | Yes | Question/accordion title |
| `content` | WYSIWYG | Yes | Answer/content (HTML supported) |

---

## 10. CTA_BANNER

**Layout name:** `cta_banner`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `eyebrow` | Text | No | Script text |
| `heading` | Text | Yes | Main heading |
| `subheading` | Text | No | Below heading |
| `content` | WYSIWYG | No | Body text |
| `cta_primary` | Link | No | Primary button |
| `cta_secondary` | Link | No | Secondary button |
| `layout` | Select | No | `centered`, `split` |
| `background_type` | Select | No | `color`, `image` |
| `background_image` | Image | No | When type=image |
| `show_service_ctas` | True/False | No | Show call/email/WhatsApp buttons |
| `service_email` | Email | No | Email for service CTAs |

---

## 11. TIMELINE

**Layout name:** `timeline`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `eyebrow` | Text | No | Script text |
| `heading` | Text | No | Section heading |
| `milestones` | Repeater | Yes | See milestone fields below |
| `footer_text` | Text | No | Text below timeline |
| `footer_style` | Select | No | `normal`, `italic` |

**Milestone Repeater Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `year` | Text | Yes | Year (e.g., "1990") |
| `label` | Text | Yes | Description |

---

## 12. RATE_TABLE

**Layout name:** `rate_table`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `heading` | Text | No | Section heading |
| `table_type` | Select | Yes | `rates`, `simple` |
| `rate_categories` | Repeater | When type=rates | Room rate categories |
| `simple_rows` | Repeater | When type=simple | Label/value rows |
| `currency` | Text | No | e.g., "US$" |
| `show_book_buttons` | True/False | No | Show booking buttons |

---

## 13. INFO_BAR

**Layout name:** `info_bar`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `items` | Repeater | Yes | See item fields below |
| `columns` | Select | No | `2`, `3`, `4` |
| `show_dividers` | True/False | No | Show vertical dividers |

**Item Repeater Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `icon` | Text | No | Lucide icon name |
| `label` | Text | Yes | Label text |
| `value` | Text | Yes | Value text |
| `unit` | Text | No | Unit suffix |

---

## 14. HOME_HERO_SECTION

**Layout name:** `hero_section`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `hero_heading` | Text | No | Main heading |
| `hero_subheading` | Text | No | Below heading |
| `hero_background_image` | Image | No | Background image |
| `hero_cta` | Link | No | CTA button |
| `hero_video_url` | Text | No | Streamable MP4 URL for video background |
| `hero_scroll_label` | Text | No | Scroll indicator text |

---

## 15. HOME_INTRO_SECTION

**Layout name:** `intro_section`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `intro_eyebrow` | Text | No | Script text |
| `intro_heading` | Text | No | Section heading |
| `intro_body_copy` | Textarea | No | Body text |
| `intro_cta` | Link | No | CTA button |
| `intro_image` | Image | No | Section image |

---

## 16. HOME_STAY_SECTION

**Layout name:** `stay_section`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `stay_eyebrow` | Text | No | Script text |
| `stay_heading` | Text | No | Section heading |
| `stay_subheading` | Text | No | Below heading |
| `stay_rooms` | Repeater | No | See room fields below |

**Room Repeater Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `room_name` | Text | No | Room name |
| `room_count` | Number | No | Number of rooms |
| `room_description` | Textarea | No | Room description |
| `room_price_from` | Text | No | Starting price (e.g., "US$350") |
| `room_price_suffix` | Text | No | Price suffix (e.g., "per night") |
| `room_image` | Image | No | Room image |
| `room_cta` | Link | No | View room link |

---

## 17. HOME_DINING_SECTION

**Layout name:** `dining_section`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `dining_eyebrow` | Text | No | Script text |
| `dining_heading` | Text | No | Section heading |
| `dining_subheading` | Text | No | Below heading |
| `dining_body_copy` | Textarea | No | Body text |
| `dining_cta` | Link | No | Primary CTA button |
| `dining_cta_secondary` | Link | No | Secondary CTA button |
| `dining_images` | Gallery | No | 5 images for the bento grid |

---

## 18. HOME_WILDLIFE_SECTION

**Layout name:** `wildlife_section`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `wildlife_eyebrow` | Text | No | Script text |
| `wildlife_heading` | Text | No | Section heading |
| `wildlife_body_copy` | Textarea | No | Body text |
| `wildlife_cta` | Link | No | CTA button |
| `wildlife_images` | Gallery | No | Images for the section |

---

## 19. HOME_ACTIVITIES_SECTION

**Layout name:** `activities_section`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `activities_eyebrow` | Text | No | Script text |
| `activities_heading` | Text | No | Section heading |
| `activities_items` | Repeater | No | See activity fields below |
| `activities_cta` | Link | No | CTA button |

**Activity Repeater Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `activity_label` | Text | No | Activity name |
| `activity_url` | Text | No | Link URL |
| `activity_icon` | Image | No | Activity icon |

---

## 20. HOME_REVIEWS_SECTION

**Layout name:** `reviews_section`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `reviews_eyebrow` | Text | No | Script text |
| `reviews_heading` | Text | No | Section heading |
| `reviews_items` | Repeater | No | See review fields below |

**Review Repeater Fields:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `review_title` | Text | No | Review title |
| `review_body` | Textarea | No | Review content |
| `review_author` | Text | No | Reviewer name |
| `review_source` | Text | No | e.g., "TripAdvisor" |

---

## 21. HOME_CTA_BANNER_SECTION

**Layout name:** `cta_banner_section`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `cta_banner_heading` | Text | No | Main heading |
| `cta_banner_subheading` | Text | No | Below heading |
| `cta_banner_image` | Image | No | Background/section image |
| `cta_banner_cta` | Link | No | CTA button |

---

## Not Yet Implemented

These patterns exist in hardcoded pages but don't have WP section types:

1. **Anchor Links** - Simple text-only navigation pills (activities page)
2. **Category Section** - Card grid with intro text per category (activities page)
3. **Featured Experience** - Full-bleed alternating image/text blocks (activities page)

---

## Field Naming Conventions

- Use `snake_case` for all field names
- Image fields should return array format (with url, alt, width, height)
- Link fields return object: `{ url, title, target }`
- Gallery fields return array of image objects
- Select fields should use lowercase values matching the options above
