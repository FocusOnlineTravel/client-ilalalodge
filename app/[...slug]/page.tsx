import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug, getAllPageSlugs } from '@/lib/content';
import SectionRenderer from '@/components/sections/SectionRenderer';

// ISR: Revalidate pages every hour
export const revalidate = 3600;

// Allow dynamic rendering for on-demand revalidation
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs();
  // Filter out empty slugs (homepage) since we use app/page.tsx for that
  return slugs.filter((slug) => slug.length > 0).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug.join('/');
  const page = await getPageBySlug(slugPath);

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
  const slugPath = slug.join('/');
  const page = await getPageBySlug(slugPath);

  if (!page) {
    notFound();
  }

  return <SectionRenderer sections={page.page_sections} />;
}
