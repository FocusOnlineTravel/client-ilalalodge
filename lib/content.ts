/**
 * Content loading utilities
 * This is the ONLY place pages are loaded from - every route goes through it
 */

import { PageData } from '@/types/page';
import { Options } from '@/types/options';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const PAGES_DIR = path.join(DATA_DIR, 'pages');

/**
 * Get a page by its slug
 * @param slug - Page slug (use 'home' for homepage)
 * @returns PageData or null if not found
 */
export function getPageBySlug(slug: string): PageData | null {
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

/**
 * Recursively get all JSON files from a directory
 */
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

/**
 * Get all page slugs for static generation
 * @returns Array of slug arrays (for catch-all route)
 */
export function getAllPageSlugs(): string[][] {
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

/**
 * Get global options (header, footer, contact info, etc.)
 * @returns Options data
 */
export function getOptions(): Options {
  const filePath = path.join(DATA_DIR, 'options.json');

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent) as Options;
  } catch {
    // Return default options if file doesn't exist
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
}

/**
 * Check if a page exists
 * @param slug - Page slug
 * @returns boolean
 */
export function pageExists(slug: string): boolean {
  return getPageBySlug(slug) !== null;
}
