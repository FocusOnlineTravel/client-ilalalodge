import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/content';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('home');

  if (!page) {
    return { title: 'Ilala Lodge Hotel | Victoria Falls' };
  }

  return {
    title: page.seo.title || 'Ilala Lodge Hotel | Victoria Falls',
    description: page.seo.description,
    openGraph: page.seo.og_image ? { images: [{ url: page.seo.og_image }] } : undefined,
  };
}

export default async function HomePage() {
  const page = await getPageBySlug('home');
  if (!page) notFound();
  return <SectionRenderer sections={page.page_sections} />;
}
