import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/content';

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
    '/blog',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path.startsWith('/our-rooms') ? 0.9 : 0.8,
  }));

  // Fetch blog posts for dynamic entries
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const { posts } = await getAllPosts(1, 100);
    blogEntries = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.modified || post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('[Sitemap] Failed to fetch blog posts:', error);
  }

  return [...staticEntries, ...blogEntries];
}
