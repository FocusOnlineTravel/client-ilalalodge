/**
 * Page data types matching ACF REST output shape
 */

import { PageSection } from './sections';

/** SEO metadata for a page */
export interface PageSeo {
  title: string;
  description: string;
  og_image: string | null;
}

/** Full page data structure */
export interface PageData {
  title: string;
  slug: string;
  seo: PageSeo;
  page_sections: PageSection[];
}

/** Minimal page reference for navigation/listings */
export interface PageReference {
  title: string;
  slug: string;
}
