import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/content';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const revalidate = 10;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('special-offers');

  if (!page) {
    return { title: 'Special Offers | Ilala Lodge Hotel' };
  }

  return {
    title: page.seo.title || 'Special Offers | Ilala Lodge Hotel',
    description: page.seo.description,
    openGraph: page.seo.og_image ? { images: [{ url: page.seo.og_image }] } : undefined,
  };
}

export default async function SpecialOffersWPPage() {
  const page = await getPageBySlug('special-offers');
  if (!page) notFound();
  return <SectionRenderer sections={page.page_sections} />;
}
