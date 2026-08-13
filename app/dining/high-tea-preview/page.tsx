import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/content';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('high-tea');

  if (!page) {
    return { title: 'High Tea Preview | Ilala Lodge Hotel' };
  }

  return {
    title: `[PREVIEW] ${page.seo.title || 'High Tea at Palm River Hotel | Ilala Lodge Hotel'}`,
    description: page.seo.description,
  };
}

export default async function HighTeaPreviewPage() {
  const page = await getPageBySlug('high-tea');
  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-daisy">
        <div className="text-center p-8">
          <h1 className="font-serif text-3xl text-brand-forest mb-4">WordPress Page Not Found</h1>
          <p className="text-brand-forest/70 mb-2">Create a page in WordPress with the slug: <code className="bg-white px-2 py-1 rounded">high-tea</code></p>
          <p className="text-brand-forest/70">Then refresh this preview.</p>
        </div>
      </div>
    );
  }
  return <SectionRenderer sections={page.page_sections} />;
}
