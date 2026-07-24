/**
 * Content loading utilities
 * This is the ONLY place pages are loaded from - every route goes through it
 *
 * Switch between WordPress and local JSON via NEXT_PUBLIC_USE_WORDPRESS env var
 */

import { PageData } from '@/types/page';
import { Options } from '@/types/options';

// =============================================================================
// DATA SOURCE SWITCH
// =============================================================================

const USE_WORDPRESS = process.env.NEXT_PUBLIC_USE_WORDPRESS === 'true';

// Log data source on startup (server-side only)
if (typeof window === 'undefined') {
  console.log(`[Content] Data source: ${USE_WORDPRESS ? 'WordPress' : 'Local JSON'}`);
}

// =============================================================================
// LOCAL JSON IMPLEMENTATION
// =============================================================================

import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const PAGES_DIR = path.join(DATA_DIR, 'pages');

function getPageBySlugFromJSON(slug: string): PageData | null {
  // Normalize slug - empty or root becomes 'home'
  const normalizedSlug = !slug || slug === '' || slug === '/' ? 'home' : slug;

  // Try nested directory structure first (e.g., 'dining/high-tea' -> 'dining/high-tea.json')
  const nestedPath = path.join(PAGES_DIR, normalizedSlug + '.json');
  try {
    const fileContent = fs.readFileSync(nestedPath, 'utf-8');
    return JSON.parse(fileContent) as PageData;
  } catch {
    // Fallback to flat structure (e.g., 'dining/high-tea' -> 'dining--high-tea.json')
    const flatFileName = normalizedSlug.replace(/\//g, '--') + '.json';
    const flatPath = path.join(PAGES_DIR, flatFileName);
    try {
      const fileContent = fs.readFileSync(flatPath, 'utf-8');
      return JSON.parse(fileContent) as PageData;
    } catch {
      return null;
    }
  }
}

function getJsonFilesRecursively(dir: string, basePath: string = ''): string[] {
  const results: string[] = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        results.push(...getJsonFilesRecursively(fullPath, relativePath));
      } else if (entry.name.endsWith('.json')) {
        results.push(relativePath);
      }
    }
  } catch {
    // Directory doesn't exist or isn't readable
  }
  return results;
}

function getAllPageSlugsFromJSON(): string[][] {
  try {
    const files = getJsonFilesRecursively(PAGES_DIR);
    return files.map(file => {
      // Remove .json extension and convert path separators
      const slug = file.replace('.json', '').replace(/\\/g, '/').replace(/--/g, '/');
      // 'home' becomes empty array (root route)
      if (slug === 'home') return [];
      // Split nested slugs into array segments
      return slug.split('/');
    });
  } catch {
    return [];
  }
}

function getOptionsFromJSON(): Options {
  const filePath = path.join(DATA_DIR, 'options.json');

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent) as Options;
  } catch {
    // Return default options if file doesn't exist
    return getDefaultOptions();
  }
}

function getDefaultOptions(): Options {
  return {
    site_name: 'Ilala Lodge Hotel',
    header: {
      logo: { url: '/images/ilala-lodge-logo.svg', alt: 'Ilala Lodge Hotel' },
      nav_items: [],
      booking_url: 'https://booking.ilalalodge.com',
    },
    footer: {
      logo: { url: '/images/ilala-lodge-logo.svg', alt: 'Ilala Lodge Hotel' },
      tagline: '',
      nav_columns: [],
      copyright: '',
    },
    contact: {
      email: '',
      phone: '',
      whatsapp: '',
      address: '',
    },
    social: {
      facebook: '',
      instagram: '',
      tripadvisor: '',
    },
  };
}

// =============================================================================
// WORDPRESS IMPLEMENTATION (LAZY LOADED)
// =============================================================================

let wpModule: typeof import('./wordpress') | null = null;

async function getWPModule() {
  if (!wpModule) {
    wpModule = await import('./wordpress');
  }
  return wpModule;
}

// =============================================================================
// PUBLIC API
// =============================================================================

/**
 * Get a page by its slug
 * @param slug - Page slug (use 'home' for homepage, empty string for root)
 * @returns PageData or null if not found
 */
export async function getPageBySlug(slug: string): Promise<PageData | null> {
  if (USE_WORDPRESS) {
    const wp = await getWPModule();
    return wp.getPageBySlugFromWP(slug);
  }
  return getPageBySlugFromJSON(slug);
}

/**
 * Synchronous version for backwards compatibility (local JSON only)
 * @deprecated Use async getPageBySlug instead
 */
export function getPageBySlugSync(slug: string): PageData | null {
  if (USE_WORDPRESS) {
    console.warn('[Content] getPageBySlugSync called with WordPress enabled - falling back to local JSON');
  }
  return getPageBySlugFromJSON(slug);
}

/**
 * Get all page slugs for static generation
 * @returns Array of slug arrays (for catch-all route)
 */
export async function getAllPageSlugs(): Promise<string[][]> {
  if (USE_WORDPRESS) {
    const wp = await getWPModule();
    return wp.getAllPageSlugsFromWP();
  }
  return getAllPageSlugsFromJSON();
}

/**
 * Get global options (header, footer, contact info, etc.)
 * @returns Options data
 */
export async function getOptions(): Promise<Options> {
  if (USE_WORDPRESS) {
    const wp = await getWPModule();
    return wp.getOptionsFromWP();
  }
  return getOptionsFromJSON();
}

/**
 * Check if a page exists
 * @param slug - Page slug
 * @returns boolean
 */
export async function pageExists(slug: string): Promise<boolean> {
  const page = await getPageBySlug(slug);
  return page !== null;
}

// =============================================================================
// REVALIDATION
// =============================================================================

/**
 * Clear caches for revalidation (WordPress mode only)
 */
export async function clearCache(slug?: string): Promise<void> {
  if (USE_WORDPRESS) {
    const wp = await getWPModule();
    wp.clearPageCache(slug);
    if (!slug) {
      wp.clearOptionsCache();
    }
  }
}

// =============================================================================
// HEALTH CHECK
// =============================================================================

/**
 * Check if the data source is healthy
 */
export async function checkHealth(): Promise<{ healthy: boolean; source: string; error?: string }> {
  const source = USE_WORDPRESS ? 'wordpress' : 'json';

  if (USE_WORDPRESS) {
    try {
      const wp = await getWPModule();
      const healthy = await wp.checkWordPressHealth();
      return { healthy, source };
    } catch (error) {
      return {
        healthy: false,
        source,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Local JSON is always healthy if files exist
  try {
    fs.accessSync(PAGES_DIR, fs.constants.R_OK);
    return { healthy: true, source };
  } catch {
    return { healthy: false, source, error: 'Pages directory not accessible' };
  }
}
