import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/content';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('contact');

  if (!page) {
    return { title: 'Contact Us | Ilala Lodge Hotel' };
  }

  return {
    title: page.seo.title || 'Contact Us | Ilala Lodge Hotel',
    description: page.seo.description,
    openGraph: page.seo.og_image ? { images: [{ url: page.seo.og_image }] } : undefined,
  };
}

export default async function ContactWPPage() {
  const page = await getPageBySlug('contact');
  if (!page) notFound();
  return <SectionRenderer sections={page.page_sections} />;
}
