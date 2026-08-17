import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/content';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const revalidate = 10;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('our-rooms');

  if (!page) {
    return {
      title: 'Accommodation | Ilala Lodge Hotel Victoria Falls',
    };
  }

  return {
    title: page.seo.title || 'Accommodation | Ilala Lodge Hotel Victoria Falls',
    description: page.seo.description || 'Explore our luxurious rooms and suites at Ilala Lodge Hotel.',
    openGraph: page.seo.og_image
      ? { images: [{ url: page.seo.og_image }] }
      : undefined,
  };
}

export default async function OurRoomsWPPage() {
  const page = await getPageBySlug('our-rooms');

  if (!page) {
    notFound();
  }

  return <SectionRenderer sections={page.page_sections} />;
}
