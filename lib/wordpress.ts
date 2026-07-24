/**
 * WordPress REST API client
 * Fetches pages and options from the WordPress backend
 */

import { PageData } from '@/types/page';
import { Options } from '@/types/options';
import { normalisePageData, normaliseOptions } from './normalise';

// =============================================================================
// CONFIGURATION
// =============================================================================

const WP_URL = process.env.WP_URL || process.env.NEXT_PUBLIC_WP_URL || 'https://backend-ilalalodge.focusonlinetravel.co.za';
const WP_API_URL = `${WP_URL}/wp-json`;

// Cache for build-time fetches
const pageCache = new Map<string, PageData>();
const slugCache: string[][] | null = null;
let optionsCache: Options | null = null;

// =============================================================================
// ERROR HANDLING
// =============================================================================

class WordPressError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = 'WordPressError';
  }
}

/**
 * Check if WordPress is reachable
 */
export async function checkWordPressHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${WP_API_URL}/`, {
      method: 'HEAD',
      next: { revalidate: 0 },
    });
    return response.ok;
  } catch {
    return false;
  }
}

// =============================================================================
// FETCH HELPERS
// =============================================================================

interface FetchOptions {
  revalidate?: number | false;
  tags?: string[];
}

async function wpFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const url = `${WP_API_URL}${endpoint}`;
  const { revalidate = 3600, tags } = options;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      next: {
        revalidate: revalidate === false ? 0 : revalidate,
        tags,
      },
    });

    if (!response.ok) {
      throw new WordPressError(
        `WordPress API error: ${response.status} ${response.statusText}`,
        response.status,
        endpoint
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof WordPressError) {
      throw error;
    }
    throw new WordPressError(
      `Failed to fetch from WordPress: ${error instanceof Error ? error.message : 'Unknown error'}`,
      undefined,
      endpoint
    );
  }
}

// =============================================================================
// PAGE FETCHING
// =============================================================================

interface WPPageResponse {
  id: number;
  title: string;
  slug: string;
  status: string;
  seo: {
    title: string;
    description: string;
    og_image: WPImage | null;
  };
  page_sections: WPSection[];
  acf: Record<string, unknown>;
  acf_resolved?: Record<string, unknown>;
}

interface WPImage {
  id: number;
  url: string;
  width: number;
  height: number;
  alt: string;
  title?: string;
  sizes?: {
    thumbnail?: string;
    medium?: string;
    large?: string;
    full?: string;
  };
}

interface WPSection {
  acf_fc_layout: string;
  [key: string]: unknown;
}

interface WPPageListItem {
  id: number;
  title: string;
  slug: string;
}

/**
 * Get a page by its slug from WordPress
 */
export async function getPageBySlugFromWP(slug: string): Promise<PageData | null> {
  // Normalize slug - empty or root becomes 'home'
  const normalizedSlug = !slug || slug === '' || slug === '/' ? 'home' : slug;

  // Check cache first
  if (pageCache.has(normalizedSlug)) {
    return pageCache.get(normalizedSlug)!;
  }

  try {
    const response = await wpFetch<WPPageResponse>(
      `/ilala/v1/page/${encodeURIComponent(normalizedSlug)}`,
      { tags: [`page-${normalizedSlug}`] }
    );

    const pageData = normalisePageData(response);
    pageCache.set(normalizedSlug, pageData);
    return pageData;
  } catch (error) {
    if (error instanceof WordPressError && error.statusCode === 404) {
      return null;
    }

    // In production, log but don't crash - allow serving stale content
    if (process.env.NODE_ENV === 'production') {
      console.error(`[WordPress] Failed to fetch page "${normalizedSlug}":`, error);
      return null;
    }

    throw error;
  }
}

/**
 * Get all page slugs for static generation
 */
export async function getAllPageSlugsFromWP(): Promise<string[][]> {
  try {
    const pages = await wpFetch<WPPageListItem[]>('/ilala/v1/pages', {
      tags: ['pages-list'],
    });

    return pages.map(page => {
      // 'home' becomes empty array (root route)
      if (page.slug === 'home') return [];
      // Split nested slugs into array segments
      return page.slug.split('/');
    });
  } catch (error) {
    // At build time, fail loudly if WordPress is unreachable
    if (process.env.NODE_ENV === 'production') {
      console.error('[WordPress] Failed to fetch page slugs:', error);
      throw new Error(
        'WordPress is unreachable at build time. Cannot generate static pages. ' +
        'Ensure WordPress is running and accessible.'
      );
    }

    console.warn('[WordPress] Failed to fetch page slugs, returning empty array:', error);
    return [];
  }
}

// =============================================================================
// OPTIONS FETCHING
// =============================================================================

interface WPOptionsResponse {
  site_name?: string;
  header?: Record<string, unknown>;
  footer?: Record<string, unknown>;
  contact?: Record<string, unknown>;
  social?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * Get global options from WordPress
 */
export async function getOptionsFromWP(): Promise<Options> {
  // Return cached options if available
  if (optionsCache) {
    return optionsCache;
  }

  try {
    const response = await wpFetch<WPOptionsResponse>('/ilala/v1/options', {
      tags: ['options'],
    });

    const options = normaliseOptions(response);
    optionsCache = options;
    return options;
  } catch (error) {
    console.error('[WordPress] Failed to fetch options:', error);

    // Return default options as fallback
    return getDefaultOptions();
  }
}

/**
 * Default options fallback
 */
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
// CACHE INVALIDATION
// =============================================================================

/**
 * Clear the page cache (for revalidation)
 */
export function clearPageCache(slug?: string): void {
  if (slug) {
    pageCache.delete(slug);
  } else {
    pageCache.clear();
  }
}

/**
 * Clear the options cache (for revalidation)
 */
export function clearOptionsCache(): void {
  optionsCache = null;
}

// =============================================================================
// EXPORTS
// =============================================================================

export type { WPPageResponse, WPImage, WPSection, WPOptionsResponse };
