# WordPress Headless Setup Guide

This document provides step-by-step instructions for setting up the WordPress backend for the Ilala Lodge Hotel website.

## Prerequisites

- WordPress 6.x installation
- ACF Pro plugin installed and activated
- ACF to REST API plugin installed and activated
- Gravity Forms plugin installed (for contact forms)
- Admin access to WordPress

---

## 1. Install the MU-Plugin

Copy the headless setup plugin to your WordPress installation:

```
wordpress/mu-plugins/headless-setup.php
→ wp-content/mu-plugins/headless-setup.php
```

> **Note:** MU-plugins are automatically activated. No manual activation required.

This plugin:
- Registers custom post types (Rooms, Experiences, Offers)
- Adds CORS headers for the Next.js frontend
- Creates REST API endpoints for resolved image data
- Registers the ACF Options Page
- Enables Gravity Forms REST API

---

## 2. Import ACF Field Groups

### Step 1: Navigate to ACF Tools

1. Log in to WordPress admin
2. Go to **Custom Fields → Tools**

### Step 2: Import Field Groups

1. Click **Choose File** under "Import Field Groups"
2. Select `wordpress/acf-export.json`
3. Click **Import**

You should see these field groups imported:
- **Section Settings** (clone source)
- **Page Builder** (Flexible Content for pages)
- **SEO** (meta fields for pages/posts)
- **Site Options** (global options)
- **Room Details** (Room CPT fields)

### Step 3: Verify Installation

1. Go to **Custom Fields → Field Groups**
2. Confirm all 5 field groups are listed and active
3. Edit any page - you should see the "Page Sections" flexible content field

---

## 3. Configure the Options Page

### Step 1: Access Options

1. In the WordPress admin sidebar, click **Site Options**

### Step 2: Fill in Global Data

Configure the following sections:

#### Site Name
```
Ilala Lodge Hotel
```

#### Header
- Upload logos (default and scrolled versions)
- Add navigation items with sub-items
- Set booking URL

#### Footer
- Upload footer logo
- Add tagline
- Configure navigation columns with links
- Set copyright text

#### Contact Information
- Email: onlinereservations@ilalalodge.com
- Phone: +263 719 384 920
- WhatsApp link
- Address
- Front desk contact details
- Agent contact details

#### Social Media
- Facebook URL
- Instagram URL
- Twitter URL
- TripAdvisor URL (optional)

---

## 4. Create an Application Password

Application passwords allow the Next.js frontend to authenticate with WordPress for preview mode and protected endpoints.

### Step 1: Navigate to Your Profile

1. Go to **Users → Profile** (or click your username in the admin bar)

### Step 2: Create Application Password

1. Scroll down to **Application Passwords**
2. Enter a name: `Next.js Frontend`
3. Click **Add New Application Password**
4. **Copy the password immediately** - it won't be shown again

The password format will be: `xxxx xxxx xxxx xxxx xxxx xxxx`

---

## 5. Environment Variables

Add these environment variables to your Next.js frontend:

### `.env.local` (development)

```bash
# WordPress API
WORDPRESS_API_URL=https://your-wordpress-domain.com
WORDPRESS_AUTH_USER=your-username
WORDPRESS_AUTH_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx

# Preview Secret (generate a random string)
PREVIEW_SECRET=your-random-preview-secret-key

# Revalidation Secret (for on-demand ISR)
REVALIDATION_SECRET=your-random-revalidation-secret
```

### Production Environment Variables

Set these in your hosting provider (Vercel, Netlify, etc.):

| Variable | Description |
|----------|-------------|
| `WORDPRESS_API_URL` | Full URL to WordPress (e.g., `https://cms.ilalalodge.com`) |
| `WORDPRESS_AUTH_USER` | WordPress username for API auth |
| `WORDPRESS_AUTH_PASSWORD` | Application password (with spaces) |
| `PREVIEW_SECRET` | Secret key for preview mode |
| `REVALIDATION_SECRET` | Secret key for on-demand revalidation |

---

## 6. Create Pages in WordPress

Create the following pages in WordPress (Pages → Add New):

| Page Title | Slug | Description |
|-----------|------|-------------|
| Home | `home` | Homepage |
| Our Rooms | `our-rooms` | Accommodation listing |
| Our Story | `our-story` | About page |
| Location | `location` | Location info |
| Victoria Falls | `victoria-falls` | Victoria Falls guide |
| Activities | `activities` | Activities listing |
| Dining | `dining` | Restaurant page |
| Facilities | `facilities` | Hotel facilities |
| Gallery | `gallery` | Photo gallery |
| FAQs | `faqs` | Frequently asked questions |
| Rates | `rates` | Pricing page |
| Contact | `contact` | Contact form page |
| Special Offers | `special-offers` | Promotions |

### Nested Pages

Create these as child pages:

| Page Title | Parent | Slug |
|-----------|--------|------|
| High Tea | Dining | `high-tea` |
| Zambezi River Deck | Dining | `zambezi-river-deck` |
| Ra-Ikane | Activities | `ra-ikane` |

---

## 7. Create Rooms

1. Go to **Rooms → Add New**
2. Create each room type:
   - Classic Rooms
   - Classic Suites
   - Deluxe Rooms
   - Executive Suites
   - Strathearn Suite

3. Fill in Room Details fields:
   - Short description
   - Full description
   - Gallery images
   - Hero images
   - Floorplan PDF
   - Size, sleeps, beds
   - Price from
   - Amenities list

---

## 8. Gravity Forms Setup

### Create Contact Form

1. Go to **Forms → Add New**
2. Create fields:
   - Name (required)
   - Email (required)
   - Phone
   - Message (required)
3. Configure notifications and confirmations
4. Note the Form ID for the frontend

### Enable REST API

The MU-plugin already enables the REST API. Forms can be submitted via:

```
POST /wp-json/gf/v2/forms/{form_id}/submissions
```

---

## 9. REST API Endpoints

The plugin exposes these custom endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/wp-json/ilala/v1/options` | GET | Global site options |
| `/wp-json/ilala/v1/page/{slug}` | GET | Single page with resolved images |
| `/wp-json/ilala/v1/pages` | GET | All pages (for SSG) |
| `/wp-json/wp/v2/pages` | GET | Standard WP pages endpoint |
| `/wp-json/wp/v2/rooms` | GET | Rooms CPT |
| `/wp-json/wp/v2/experiences` | GET | Experiences CPT |
| `/wp-json/wp/v2/offers` | GET | Special Offers CPT |

### Image Resolution

All ACF fields are available in two formats:
- `acf` - Raw ACF data (image IDs)
- `acf_resolved` - Processed with full image URLs and dimensions

---

## 10. Regenerating ACF Schema

If you modify `types/sections.ts`, regenerate the ACF export:

```bash
node scripts/generate-acf.mjs
```

Then re-import `wordpress/acf-export.json` in WordPress.

> **Important:** The generator produces deterministic field keys. Re-importing will update existing fields rather than creating duplicates.

---

## 11. Troubleshooting

### CORS Errors

If you see CORS errors in the browser console:

1. Verify the frontend URL in `headless-setup.php`
2. Check that the MU-plugin is loaded (`wp-content/mu-plugins/`)
3. Clear any server-side caching

### ACF Fields Not Showing in REST API

1. Ensure ACF to REST API plugin is active
2. Check that `show_in_rest: 1` is set on all field groups
3. Verify the field group is assigned to the correct post type

### Preview Not Working

1. Verify the application password is correct
2. Check that `PREVIEW_SECRET` matches in WordPress and Next.js
3. Ensure the preview API route exists in Next.js

### Images Returning IDs Instead of URLs

Use the `acf_resolved` field instead of `acf` - it contains resolved image data.

---

## 12. Security Checklist

- [ ] Use HTTPS for WordPress
- [ ] Use strong application password
- [ ] Keep `PREVIEW_SECRET` and `REVALIDATION_SECRET` secure
- [ ] Consider IP whitelisting for admin access
- [ ] Enable WordPress security headers
- [ ] Keep all plugins updated
- [ ] Use a WAF (Web Application Firewall) if possible

---

## Need Help?

For questions about this setup, contact the development team or refer to:
- [ACF Documentation](https://www.advancedcustomfields.com/resources/)
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [Gravity Forms REST API](https://docs.gravityforms.com/rest-api-v2/)
