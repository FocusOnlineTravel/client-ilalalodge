/**
 * Global options types (header, footer, contact, etc.)
 */

import { AcfImage, AcfLink } from './sections';

/** Navigation item with optional submenu */
export interface NavItem {
  label: string;
  href: string;
  sub_items?: NavSubItem[];
}

export interface NavSubItem {
  label: string;
  href: string;
}

/** Footer navigation column */
export interface FooterNavColumn {
  title: string;
  links: AcfLink[];
}

/** Header configuration */
export interface HeaderOptions {
  logo: AcfImage;
  logo_scrolled?: AcfImage;
  nav_items: NavItem[];
  booking_url: string;
}

/** Footer configuration */
export interface FooterOptions {
  logo: AcfImage;
  tagline: string;
  nav_columns: FooterNavColumn[];
  copyright: string;
}

/** Contact information */
export interface ContactOptions {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  front_desk_phone?: string;
  front_desk_email?: string;
  front_desk_whatsapp?: string;
  agents_phone?: string;
  agents_email?: string;
}

/** Social media links */
export interface SocialOptions {
  facebook: string;
  instagram: string;
  tripadvisor?: string;
  twitter?: string;
}

/** Complete options structure */
export interface Options {
  site_name: string;
  header: HeaderOptions;
  footer: FooterOptions;
  contact: ContactOptions;
  social: SocialOptions;
}
