import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/content';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('zambezi-river-deck');

  if (!page) {
    return {
      title: 'Zambezi River Deck Experience | Ilala Lodge Hotel',
    };
  }

  return {
    title: page.seo.title || 'Zambezi River Deck Experience | Ilala Lodge Hotel',
    description: page.seo.description || 'Dine on the banks of the Zambezi River with an African-style barbecue dinner.',
    openGraph: page.seo.og_image
      ? { images: [{ url: page.seo.og_image }] }
      : undefined,
  };
}

export default async function ZambeziRiverDeckPage() {
  const page = await getPageBySlug('zambezi-river-deck');

  if (!page) {
    notFound();
  }

  return <SectionRenderer sections={page.page_sections} />;
}
