import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/content';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('high-tea');

  if (!page) {
    return {
      title: 'High Tea at Palm River Hotel | Ilala Lodge Hotel',
    };
  }

  return {
    title: page.seo.title || 'High Tea at Palm River Hotel | Ilala Lodge Hotel',
    description: page.seo.description || 'Experience refined elegance with High Tea at Palm River Hotel on the Zambezi River.',
    openGraph: page.seo.og_image
      ? { images: [{ url: page.seo.og_image }] }
      : undefined,
  };
}

export default async function HighTeaPage() {
  const page = await getPageBySlug('high-tea');

  if (!page) {
    notFound();
  }

  return <SectionRenderer sections={page.page_sections} />;
}
