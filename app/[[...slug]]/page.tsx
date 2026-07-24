import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug, getAllPageSlugs } from '@/lib/content';
import SectionRenderer from '@/components/sections/SectionRenderer';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateStaticParams() {
  const slugs = getAllPageSlugs();
  return slugs.map((slug) => ({ slug: slug.length === 0 ? undefined : slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug?.join('/') || '';
  const page = getPageBySlug(slugPath);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: page.seo.title,
    description: page.seo.description,
    openGraph: page.seo.og_image
      ? {
          images: [{ url: page.seo.og_image }],
        }
      : undefined,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = slug?.join('/') || '';
  const page = getPageBySlug(slugPath);

  if (!page) {
    notFound();
  }

  return <SectionRenderer sections={page.page_sections} />;
}
