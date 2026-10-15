import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/content';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('home');

  const defaultTitle = 'Ilala Lodge Hotel | Victoria Falls';
  const defaultDescription = 'Experience luxury accommodation at the closest hotel to Victoria Falls. Family-run hotel with exceptional service, award-winning dining, and breathtaking views.';
  const defaultImage = 'https://www.ilalalodge.com/images/HERO.png';

  if (!page) {
    return {
      title: defaultTitle,
      alternates: {
        canonical: 'https://www.ilalalodge.com',
      },
      openGraph: {
        title: defaultTitle,
        description: defaultDescription,
        url: 'https://www.ilalalodge.com',
        images: [{ url: defaultImage }],
      },
    };
  }

  const title = page.seo.title || defaultTitle;
  const description = page.seo.description || defaultDescription;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: 'https://www.ilalalodge.com',
      images: [{ url: page.seo.og_image || defaultImage }],
    },
    alternates: {
      canonical: 'https://www.ilalalodge.com',
    },
  };
}

export default async function HomePage() {
  const page = await getPageBySlug('home');
  if (!page) notFound();
  return <SectionRenderer sections={page.page_sections} pageSlug="home" />;
}
