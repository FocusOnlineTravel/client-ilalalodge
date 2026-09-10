import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.ilalalodge.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    '',
    '/our-rooms',
    '/our-rooms/classic-rooms',
    '/our-rooms/classic-suites',
    '/our-rooms/deluxe-rooms',
    '/our-rooms/executive-suites',
    '/our-rooms/strathearn-suite',
    '/rates',
    '/special-offers',
    '/dining',
    '/dining/high-tea',
    '/dining/zambezi-river-deck',
    '/activities',
    '/activities/ra-ikane',
    '/facilities',
    '/our-story',
    '/gallery',
    '/location',
    '/victoria-falls',
    '/map',
    '/faqs',
    '/contact',
    '/agents',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path.startsWith('/our-rooms') ? 0.9 : 0.8,
  }));

  return staticEntries;
}
