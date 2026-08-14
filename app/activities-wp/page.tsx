import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/content';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('activities');

  if (!page) {
    return {
      title: 'Activities & Experiences | Ilala Lodge Hotel Victoria Falls',
    };
  }

  return {
    title: page.seo.title || 'Activities & Experiences | Ilala Lodge Hotel Victoria Falls',
    description: page.seo.description || 'Adventure, wildlife, relaxation and culture at Victoria Falls.',
    openGraph: page.seo.og_image
      ? { images: [{ url: page.seo.og_image }] }
      : undefined,
  };
}

export default async function ActivitiesWPPage() {
  const page = await getPageBySlug('activities');

  if (!page) {
    notFound();
  }

  return <SectionRenderer sections={page.page_sections} />;
}
