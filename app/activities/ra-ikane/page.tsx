import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/content';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const revalidate = 10;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('ra-ikane');

  if (!page) {
    return {
      title: 'Ra-Ikane River Cruise | Ilala Lodge Hotel',
    };
  }

  return {
    title: page.seo.title || 'Ra-Ikane River Cruise | Ilala Lodge Hotel',
    description: page.seo.description || 'Explore the Zambezi River aboard the Ra-Ikane, inspired by the journeys of David Livingstone.',
    openGraph: page.seo.og_image
      ? { images: [{ url: page.seo.og_image }] }
      : undefined,
  };
}

export default async function RaIkanePage() {
  const page = await getPageBySlug('ra-ikane');

  if (!page) {
    notFound();
  }

  return <SectionRenderer sections={page.page_sections} />;
}
