import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/content';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const revalidate = 10;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('dining');

  if (!page) {
    return {
      title: 'Dining at Cassia Restaurant | Ilala Lodge Hotel',
    };
  }

  return {
    title: page.seo.title || 'Dining at Cassia Restaurant | Ilala Lodge Hotel',
    description: page.seo.description || 'Experience elevated comfort food at Cassia Restaurant.',
    openGraph: page.seo.og_image
      ? { images: [{ url: page.seo.og_image }] }
      : undefined,
  };
}

export default async function DiningPage() {
  const page = await getPageBySlug('dining');

  if (!page) {
    notFound();
  }

  return <SectionRenderer sections={page.page_sections} pageSlug="dining" />;
}
