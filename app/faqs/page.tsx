import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/content';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const revalidate = 10;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('faqs');

  if (!page) {
    return { title: 'FAQs | Ilala Lodge Hotel' };
  }

  return {
    title: page.seo.title || 'FAQs | Ilala Lodge Hotel',
    description: page.seo.description,
    openGraph: page.seo.og_image ? { images: [{ url: page.seo.og_image }] } : undefined,
  };
}

export default async function FAQsPage() {
  const page = await getPageBySlug('faqs');
  if (!page) notFound();
  return <SectionRenderer sections={page.page_sections} />;
}
