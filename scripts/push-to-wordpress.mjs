#!/usr/bin/env node
/**
 * Push content to WordPress from local JSON files
 *
 * Usage:
 *   node scripts/push-to-wordpress.mjs [options]
 *
 * Options:
 *   --dry-run       Print payloads without making changes
 *   --only=<slug>   Only process a specific page slug
 *   --media-only    Only upload media files
 *   --force         Force update even if unchanged
 *   --verbose       Show detailed output
 *
 * Environment variables (from .env.local):
 *   WP_URL          WordPress URL (e.g., https://cms.ilalalodge.com)
 *   WP_USER         WordPress username
 *   WP_APP_PASSWORD Application password
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, basename, extname, relative } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// =============================================================================
// CONFIGURATION
// =============================================================================

const WP_URL = process.env.WP_URL || process.env.WORDPRESS_API_URL;
const WP_USER = process.env.WP_USER || process.env.WORDPRESS_AUTH_USER;
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD || process.env.WORDPRESS_AUTH_PASSWORD;

const PAGES_DIR = join(ROOT, 'data', 'pages');
const OPTIONS_FILE = join(ROOT, 'data', 'options.json');
const MEDIA_MANIFEST = join(ROOT, 'media', 'manifest.json');
const ID_MAP_FILE = join(ROOT, 'wordpress', 'id-map.json');
const PUBLIC_DIR = join(ROOT, 'public');

// Parse command line arguments
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const MEDIA_ONLY = args.includes('--media-only');
const FORCE = args.includes('--force');
const VERBOSE = args.includes('--verbose');
const ONLY_SLUG = args.find(a => a.startsWith('--only='))?.split('=')[1];

// =============================================================================
// UTILITIES
// =============================================================================

function log(message, ...rest) {
  console.log(message, ...rest);
}

function verbose(message, ...rest) {
  if (VERBOSE) console.log('  ' + message, ...rest);
}

function error(message, ...rest) {
  console.error('ERROR:', message, ...rest);
}

function getBasicAuth() {
  const credentials = Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64');
  return `Basic ${credentials}`;
}

async function wpFetch(endpoint, options = {}) {
  const url = `${WP_URL}/wp-json${endpoint}`;

  const headers = {
    'Authorization': getBasicAuth(),
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (VERBOSE) {
    verbose(`${options.method || 'GET'} ${url}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`WordPress API error (${response.status}): ${text}`);
  }

  return response.json();
}

async function wpUploadMedia(filePath, altText = '') {
  const url = `${WP_URL}/wp-json/wp/v2/media`;
  const fileName = basename(filePath);
  const fileBuffer = readFileSync(filePath);

  // Determine content type
  const ext = extname(filePath).toLowerCase();
  const contentTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
  };
  const contentType = contentTypes[ext] || 'application/octet-stream';

  if (VERBOSE) {
    verbose(`Uploading ${fileName} (${contentType})`);
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': getBasicAuth(),
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
    },
    body: fileBuffer,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Media upload failed (${response.status}): ${text}`);
  }

  const media = await response.json();

  // Update alt text if provided
  if (altText) {
    await wpFetch(`/wp/v2/media/${media.id}`, {
      method: 'POST',
      body: JSON.stringify({ alt_text: altText }),
    });
  }

  return media;
}

function hashFile(filePath) {
  const content = readFileSync(filePath);
  return createHash('sha256').update(content).digest('hex').substring(0, 16);
}

function loadJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

function saveJson(filePath, data) {
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}

import { mkdirSync } from 'fs';

function ensureDir(filePath) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

// =============================================================================
// MEDIA MANIFEST
// =============================================================================

function loadMediaManifest() {
  if (existsSync(MEDIA_MANIFEST)) {
    return loadJson(MEDIA_MANIFEST);
  }
  return { uploads: {} };
}

function saveMediaManifest(manifest) {
  const dir = dirname(MEDIA_MANIFEST);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  saveJson(MEDIA_MANIFEST, manifest);
}

// =============================================================================
// ID MAP
// =============================================================================

function loadIdMap() {
  if (existsSync(ID_MAP_FILE)) {
    return loadJson(ID_MAP_FILE);
  }
  return { pages: {}, media: {} };
}

function saveIdMap(idMap) {
  saveJson(ID_MAP_FILE, idMap);
}

// =============================================================================
// EXTRACT IMAGE PATHS FROM DATA
// =============================================================================

function extractImagePaths(data, paths = [], currentPath = '') {
  if (data === null || data === undefined) return paths;

  if (typeof data === 'string') {
    // Check if it looks like a local image path
    if (data.startsWith('/images/') || data.startsWith('/documents/') || data.startsWith('/icons/')) {
      paths.push({ path: data, jsonPath: currentPath });
    }
    return paths;
  }

  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      extractImagePaths(item, paths, `${currentPath}[${index}]`);
    });
    return paths;
  }

  if (typeof data === 'object') {
    // Check for url property in image objects
    if (data.url && typeof data.url === 'string') {
      if (data.url.startsWith('/images/') || data.url.startsWith('/documents/') || data.url.startsWith('/icons/')) {
        paths.push({ path: data.url, jsonPath: `${currentPath}.url`, alt: data.alt });
      }
    }

    // Recursively check all properties
    for (const [key, value] of Object.entries(data)) {
      extractImagePaths(value, paths, currentPath ? `${currentPath}.${key}` : key);
    }
  }

  return paths;
}

// =============================================================================
// NORMALIZE FIELD NAMES FOR ACF
// =============================================================================

/**
 * Transform prefixed field names to ACF-compatible names
 * e.g., hero_heading -> heading, hero_video_url -> video_url
 */
function normalizeFieldNames(section) {
  if (!section || typeof section !== 'object') return section;

  const layout = section.acf_fc_layout;
  if (!layout) return section;

  const result = { ...section };

  // Field mappings for each layout type
  // Set to null to remove the field, or to a string to rename it
  const prefixMappings = {
    hero: {
      hero_type: 'media_type',
      hero_image: 'image',
      hero_video_url: 'video_url',
      hero_carousel: 'carousel_images',
      hero_heading: 'heading',
      hero_subheading: 'subheading',
      hero_height: 'height',
      hero_overlay_opacity: 'overlay_opacity',
    },
    text_block: {
      body: 'content',
    },
    text_media: {
      body: 'content',
    },
    accordion: {
      intro: 'intro_text',
    },
    tabs: {
      intro: 'intro_text',
    },
    gallery: {
      // No transformation needed - ACF expects 'images'
    },
    media_carousel: {
      slides: 'images', // Transform slides to images for media_carousel
    },
    icon_grid: {
      items: 'icons',
      columns: null, // Remove - not in ACF schema
      icon_style: null, // Remove - not in ACF schema
    },
    card_grid: {
      cta: 'cta_button',
    },
    testimonial_carousel: {
      testimonials: 'reviews',
    },
    timeline: {
      items: 'milestones',
      footer_text: null, // Remove - not in ACF schema
    },
  };

  const mapping = prefixMappings[layout];
  if (mapping) {
    for (const [oldName, newName] of Object.entries(mapping)) {
      if (oldName in result) {
        if (newName === null) {
          // Remove the field
          delete result[oldName];
        } else {
          // Rename the field
          result[newName] = result[oldName];
          delete result[oldName];
        }
      }
    }
  }

  return result;
}

/**
 * Transform nested structures (e.g., icon_grid items)
 */
function transformNestedStructures(section) {
  const layout = section.acf_fc_layout;

  // Transform icon_grid icons to have required icon field
  if (layout === 'icon_grid' && section.icons) {
    section.icons = section.icons.map(item => {
      // Handle link - could be string or object
      let link = null;
      if (typeof item.link === 'string') {
        link = { url: item.link, title: item.label || '', target: '_self' };
      } else if (item.link && typeof item.link === 'object') {
        link = { url: item.link.url || '', title: item.link.title || '', target: item.link.target || '_self' };
      }

      // Handle icon - could be object with url or already processed
      let icon = null;
      if (item.icon) {
        if (typeof item.icon === 'object' && item.icon.url) {
          icon = item.icon; // Keep as-is, will be processed by replaceImagePathsWithIds
        } else if (typeof item.icon === 'number') {
          icon = item.icon; // Already an attachment ID
        }
      }

      return {
        icon: icon,
        label: item.label || '',
        link: link,
      };
    });
  }

  // Transform card_grid cards link structures
  if (layout === 'card_grid' && section.cards) {
    section.cards = section.cards.map(card => {
      const transformed = { ...card };
      // Ensure link is in proper ACF link format
      if (typeof transformed.link === 'string') {
        transformed.link = { url: transformed.link, title: '', target: '_self' };
      }
      return transformed;
    });
  }

  // Transform info_bar - our JSON uses different structure than ACF expects
  // Skip or transform to compatible format
  if (layout === 'info_bar') {
    // If using download format, convert to items format
    if (section.content_type === 'download') {
      section.items = [];
      delete section.content_type;
      delete section.download_url;
      delete section.download_label;
    }
    // Ensure items array exists
    if (!section.items) {
      section.items = [];
    }
  }

  // Transform gallery images from {url, alt} to {image, caption, category}
  if (layout === 'gallery' && section.images) {
    section.images = section.images.map(img => ({
      image: img.url ? { url: img.url, alt: img.alt || '' } : img.image || null,
      caption: img.alt || img.caption || '',
      category: img.category || '',
    }));
    // Remove empty images (those without url)
    section.images = section.images.filter(img => img.image !== null);
  }

  // Transform media_carousel slides
  if (layout === 'media_carousel' && section.slides) {
    section.images = section.slides.map(slide => ({
      image: slide.url ? { url: slide.url, alt: slide.alt || '' } : slide.image || null,
      caption: slide.caption || '',
    }));
    section.images = section.images.filter(img => img.image !== null);
    delete section.slides;
  }

  // Transform testimonial_carousel reviews
  if (layout === 'testimonial_carousel' && section.reviews) {
    section.reviews = section.reviews.map(review => ({
      title: review.title || '',
      content: review.quote || review.content || '',
      author: review.author || '',
      source: review.source || '',
    }));
  }

  // Transform timeline milestones
  if (layout === 'timeline' && section.milestones) {
    section.milestones = section.milestones.map(item => ({
      year: item.year || '',
      label: item.label || item.title || '',
    }));
  }

  return section;
}

/**
 * Fix common value issues (e.g., columns must be 2, 3, or 4)
 */
function fixFieldValues(section) {
  // Fix columns - must be string "2", "3", or "4"
  if ('columns' in section) {
    const col = String(section.columns);
    if (!['2', '3', '4'].includes(col)) {
      // Map invalid values to closest valid value
      const num = parseInt(col) || 3;
      if (num <= 2) section.columns = '2';
      else if (num >= 4) section.columns = '4';
      else section.columns = '3';
    } else {
      section.columns = col;
    }
  }

  return section;
}

/**
 * Normalize all sections in page data
 */
function normalizeSections(sections) {
  if (!Array.isArray(sections)) return sections;
  return sections.map(section => {
    let normalized = normalizeFieldNames(section);
    normalized = transformNestedStructures(normalized);
    normalized = fixFieldValues(normalized);
    return normalized;
  });
}

// =============================================================================
// REPLACE IMAGE PATHS WITH ATTACHMENT IDS
// =============================================================================

function replaceImagePathsWithIds(data, manifest) {
  if (data === null || data === undefined) return data;

  if (typeof data === 'string') {
    // Check if it's a local image path
    if (data.startsWith('/images/') || data.startsWith('/documents/') || data.startsWith('/icons/')) {
      const upload = manifest.uploads[data];
      if (upload) {
        return upload.attachmentId;
      }
      // Return null if not in manifest - ACF expects integer or null for image fields
      return null;
    }
    return data;
  }

  if (Array.isArray(data)) {
    const mapped = data.map(item => replaceImagePathsWithIds(item, manifest));
    // If this looks like a gallery (array of integers/nulls), filter out nulls
    const hasImageIds = mapped.some(item => typeof item === 'number');
    const hasNulls = mapped.some(item => item === null);
    if (hasImageIds && hasNulls) {
      return mapped.filter(item => item !== null);
    }
    return mapped;
  }

  if (typeof data === 'object') {
    // Check if this is an image object (has url property with local image path)
    if (data.url && typeof data.url === 'string' &&
        (data.url.startsWith('/images/') || data.url.startsWith('/documents/') || data.url.startsWith('/icons/'))) {
      const upload = manifest.uploads[data.url];
      if (upload) {
        // Return just the attachment ID - ACF expects integer for image fields
        return upload.attachmentId;
      }
      // Return null if not uploaded - ACF expects integer or null
      return null;
    }

    // Regular object processing
    const result = {};
    for (const [key, value] of Object.entries(data)) {
      result[key] = replaceImagePathsWithIds(value, manifest);
    }
    return result;
  }

  return data;
}

// =============================================================================
// PROCESS MEDIA
// =============================================================================

async function processMedia(pageFiles) {
  log('\n📸 Processing media files...\n');

  const manifest = loadMediaManifest();
  const allImagePaths = new Set();
  const stats = { uploaded: 0, skipped: 0, failed: 0 };

  // Collect all image paths from all pages
  for (const file of pageFiles) {
    const data = loadJson(file);
    const imagePaths = extractImagePaths(data);
    imagePaths.forEach(({ path }) => allImagePaths.add(path));
  }

  // Also collect from options
  if (existsSync(OPTIONS_FILE)) {
    const options = loadJson(OPTIONS_FILE);
    const imagePaths = extractImagePaths(options);
    imagePaths.forEach(({ path }) => allImagePaths.add(path));
  }

  log(`Found ${allImagePaths.size} unique image references\n`);

  for (const imagePath of allImagePaths) {
    const localPath = join(PUBLIC_DIR, imagePath);

    // Check if file exists
    if (!existsSync(localPath)) {
      verbose(`⚠️  File not found: ${imagePath}`);
      stats.skipped++;
      continue;
    }

    // Check if already in manifest with same hash
    const fileHash = hashFile(localPath);
    const existing = manifest.uploads[imagePath];

    if (existing && existing.hash === fileHash && !FORCE) {
      verbose(`⏭️  Already uploaded: ${imagePath}`);
      stats.skipped++;
      continue;
    }

    // Upload to WordPress
    if (DRY_RUN) {
      log(`🔄 Would upload: ${imagePath}`);
      stats.uploaded++;
      continue;
    }

    try {
      const media = await wpUploadMedia(localPath);
      manifest.uploads[imagePath] = {
        attachmentId: media.id,
        hash: fileHash,
        wpUrl: media.source_url,
        uploadedAt: new Date().toISOString(),
      };
      log(`✅ Uploaded: ${imagePath} -> ID ${media.id}`);
      stats.uploaded++;
    } catch (err) {
      error(`Failed to upload ${imagePath}:`, err.message);
      stats.failed++;
    }
  }

  // Save manifest
  if (!DRY_RUN) {
    saveMediaManifest(manifest);
  }

  log(`\n📊 Media Summary: ${stats.uploaded} uploaded, ${stats.skipped} skipped, ${stats.failed} failed`);

  return manifest;
}

// =============================================================================
// PROCESS PAGES
// =============================================================================

async function processPages(pageFiles, manifest) {
  if (MEDIA_ONLY) {
    log('\n⏭️  Skipping pages (--media-only)\n');
    return;
  }

  log('\n📄 Processing pages...\n');

  const idMap = loadIdMap();
  const stats = { created: 0, updated: 0, skipped: 0, failed: 0 };

  // Get existing pages from WordPress
  let existingPages = [];
  if (!DRY_RUN) {
    try {
      existingPages = await wpFetch('/wp/v2/pages?per_page=100&status=publish,draft');
    } catch (err) {
      error('Failed to fetch existing pages:', err.message);
    }
  }

  const pagesBySlug = new Map(existingPages.map(p => [p.slug, p]));

  for (const file of pageFiles) {
    const data = loadJson(file);
    const slug = data.slug.replace(/\//g, '-'); // Flatten nested slugs for WP
    const displaySlug = data.slug;

    // Filter if --only specified
    if (ONLY_SLUG && displaySlug !== ONLY_SLUG && slug !== ONLY_SLUG) {
      continue;
    }

    verbose(`Processing: ${displaySlug}`);

    // Normalize field names and replace image paths with attachment IDs
    const normalizedSections = normalizeSections(data.page_sections);
    const sectionsWithIds = replaceImagePathsWithIds(normalizedSections, manifest);

    // Build ACF payload
    const acfPayload = {
      page_sections: sectionsWithIds,
    };

    // Build main payload
    const payload = {
      title: data.title,
      slug: slug,
      status: 'publish',
      acf: acfPayload,
    };

    // Handle parent page
    if (data.parent) {
      const parentSlug = data.parent.replace(/\//g, '-');
      const parentPage = pagesBySlug.get(parentSlug);
      if (parentPage) {
        payload.parent = parentPage.id;
      }
    }

    // Handle menu order
    if (data.menu_order !== undefined) {
      payload.menu_order = data.menu_order;
    }

    if (DRY_RUN) {
      log(`\n📝 ${displaySlug}:`);
      log(JSON.stringify(payload, null, 2).substring(0, 500) + '...');
      stats.created++;
      continue;
    }

    try {
      const existing = pagesBySlug.get(slug);
      let page;

      if (existing) {
        // Update existing page
        page = await wpFetch(`/wp/v2/pages/${existing.id}`, {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        log(`✅ Updated: ${displaySlug} (ID: ${page.id})`);
        stats.updated++;
      } else {
        // Create new page
        page = await wpFetch('/wp/v2/pages', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        log(`✅ Created: ${displaySlug} (ID: ${page.id})`);
        pagesBySlug.set(slug, page);
        stats.created++;
      }

      // Update SEO fields separately
      if (data.seo) {
        // Truncate SEO description to 160 characters (ACF limit)
        let seoDescription = data.seo.description || '';
        if (seoDescription.length > 160) {
          seoDescription = seoDescription.substring(0, 157) + '...';
        }

        const seoPayload = {
          acf: {
            seo_title: data.seo.title,
            seo_description: seoDescription,
          },
        };

        if (data.seo.og_image) {
          const ogImageUpload = manifest.uploads[data.seo.og_image];
          if (ogImageUpload) {
            seoPayload.acf.og_image = ogImageUpload.attachmentId;
          }
        }

        await wpFetch(`/wp/v2/pages/${page.id}`, {
          method: 'POST',
          body: JSON.stringify(seoPayload),
        });
        verbose(`  Updated SEO for ${displaySlug}`);
      }

      // Update ID map
      idMap.pages[displaySlug] = page.id;

    } catch (err) {
      error(`Failed to process ${displaySlug}:`, err.message);
      stats.failed++;
    }
  }

  // Save ID map
  if (!DRY_RUN) {
    saveIdMap(idMap);
  }

  log(`\n📊 Pages Summary: ${stats.created} created, ${stats.updated} updated, ${stats.skipped} skipped, ${stats.failed} failed`);
}

// =============================================================================
// PROCESS OPTIONS
// =============================================================================

async function processOptions(manifest) {
  if (MEDIA_ONLY) {
    log('\n⏭️  Skipping options (--media-only)\n');
    return;
  }

  if (!existsSync(OPTIONS_FILE)) {
    log('\n⚠️  No options.json found\n');
    return;
  }

  log('\n⚙️  Processing options...\n');

  const options = loadJson(OPTIONS_FILE);

  // Replace image paths with attachment IDs
  const optionsWithIds = replaceImagePathsWithIds(options, manifest);

  if (DRY_RUN) {
    log('📝 Options payload:');
    log(JSON.stringify(optionsWithIds, null, 2).substring(0, 1000) + '...');
    return;
  }

  try {
    // Update options via ACF REST API
    await wpFetch('/acf/v3/options/options', {
      method: 'POST',
      body: JSON.stringify({ acf: optionsWithIds }),
    });
    log('✅ Updated options page');
  } catch (err) {
    // Try alternative endpoint
    try {
      await wpFetch('/ilala/v1/options', {
        method: 'POST',
        body: JSON.stringify(optionsWithIds),
      });
      log('✅ Updated options page (via custom endpoint)');
    } catch (err2) {
      error('Failed to update options:', err.message);
    }
  }
}

// =============================================================================
// VALIDATE CONTENT
// =============================================================================

async function validateContent(pageFiles) {
  log('\n🔍 Validating content...\n');

  let hasErrors = false;

  // Dynamic import of zod and schemas
  const { z } = await import('zod');

  // Simple validation - just check JSON structure
  for (const file of pageFiles) {
    try {
      const data = loadJson(file);

      // Basic structure check
      if (!data.title) {
        error(`${file}: Missing 'title' field`);
        hasErrors = true;
      }
      if (!data.slug) {
        error(`${file}: Missing 'slug' field`);
        hasErrors = true;
      }
      if (!data.seo) {
        error(`${file}: Missing 'seo' field`);
        hasErrors = true;
      }
      if (!Array.isArray(data.page_sections)) {
        error(`${file}: 'page_sections' must be an array`);
        hasErrors = true;
      }

      // Check each section has acf_fc_layout
      if (Array.isArray(data.page_sections)) {
        data.page_sections.forEach((section, index) => {
          if (!section.acf_fc_layout) {
            error(`${file}: Section ${index} missing 'acf_fc_layout'`);
            hasErrors = true;
          }
        });
      }

      verbose(`✅ ${basename(file)}`);
    } catch (err) {
      error(`${file}: ${err.message}`);
      hasErrors = true;
    }
  }

  // Validate options
  if (existsSync(OPTIONS_FILE)) {
    try {
      const options = loadJson(OPTIONS_FILE);
      if (!options.site_name) {
        error('options.json: Missing site_name');
        hasErrors = true;
      }
      verbose('✅ options.json');
    } catch (err) {
      error(`options.json: ${err.message}`);
      hasErrors = true;
    }
  }

  if (hasErrors) {
    throw new Error('Validation failed. Fix errors before continuing.');
  }

  log('✅ All content validated\n');
}

// =============================================================================
// GET ALL PAGE FILES
// =============================================================================

function getAllPageFiles(dir, files = []) {
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllPageFiles(fullPath, files);
    } else if (entry.name.endsWith('.json')) {
      files.push(fullPath);
    }
  }

  return files;
}

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║           WordPress Content Push Script                    ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  // Check configuration (allow dry-run without full credentials)
  if (!WP_URL) {
    if (DRY_RUN) {
      log('⚠️  WP_URL not configured (dry-run mode, continuing anyway)');
    } else {
      error('WP_URL not configured. Set it in .env.local');
      process.exit(1);
    }
  }
  if ((!WP_USER || !WP_APP_PASSWORD) && !DRY_RUN) {
    error('WP_USER and WP_APP_PASSWORD required. Set them in .env.local');
    process.exit(1);
  }

  log(`🌐 WordPress URL: ${WP_URL}`);
  log(`👤 User: ${WP_USER}`);
  if (DRY_RUN) log('🔄 DRY RUN MODE - No changes will be made');
  if (ONLY_SLUG) log(`🎯 Only processing: ${ONLY_SLUG}`);
  if (MEDIA_ONLY) log('📸 Media only mode');
  if (FORCE) log('💪 Force mode - will re-upload media');

  // Get all page files
  const pageFiles = getAllPageFiles(PAGES_DIR);
  log(`\n📁 Found ${pageFiles.length} page files\n`);

  // Validate content first
  await validateContent(pageFiles);

  // Process media
  const manifest = await processMedia(pageFiles);

  // Process pages
  await processPages(pageFiles, manifest);

  // Process options
  await processOptions(manifest);

  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                        Complete!                           ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
}

main().catch(err => {
  error(err.message);
  if (VERBOSE) console.error(err.stack);
  process.exit(1);
});
