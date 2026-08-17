import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/content';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const revalidate = 10;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('our-story');

  if (!page) {
    return { title: 'Our Story | Ilala Lodge Hotel' };
  }

  return {
    title: page.seo.title || 'Our Story | Ilala Lodge Hotel',
    description: page.seo.description,
    openGraph: page.seo.og_image ? { images: [{ url: page.seo.og_image }] } : undefined,
  };
}

export default async function OurStoryPage() {
  const page = await getPageBySlug('our-story');
  if (!page) notFound();
  return <SectionRenderer sections={page.page_sections} />;
}
