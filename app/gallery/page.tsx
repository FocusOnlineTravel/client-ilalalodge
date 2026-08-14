import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/content';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('gallery');

  if (!page) {
    return { title: 'Gallery | Ilala Lodge Hotel' };
  }

  return {
    title: page.seo.title || 'Gallery | Ilala Lodge Hotel',
    description: page.seo.description,
    openGraph: page.seo.og_image ? { images: [{ url: page.seo.og_image }] } : undefined,
  };
}

export default async function GalleryPage() {
  const page = await getPageBySlug('gallery');
  if (!page) notFound();
  return <SectionRenderer sections={page.page_sections} />;
}
