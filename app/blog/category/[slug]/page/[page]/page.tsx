import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostsByCategory, getAllCategories } from '@/lib/content';
import BlogPostCard from '@/components/blog/BlogPostCard';
import Pagination from '@/components/blog/Pagination';
import CategoryFilter from '@/components/blog/CategoryFilter';

export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string; page: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, page } = await params;
  const { category } = await getPostsByCategory(slug, 1, 1);

  if (!category) {
    return { title: 'Category Not Found | Ilala Lodge Hotel' };
  }

  return {
    title: `${category.name} - Page ${page} | Blog | Ilala Lodge Hotel`,
    description: `Browse ${category.name} posts from Ilala Lodge Hotel in Victoria Falls, Zimbabwe.`,
  };
}

export default async function CategoryPaginatedPage({ params }: PageProps) {
  const { slug, page } = await params;
  const pageNum = parseInt(page, 10);

  if (isNaN(pageNum) || pageNum < 1) {
    notFound();
  }

  // Redirect page 1 to category page
  if (pageNum === 1) {
    notFound();
  }

  const [{ posts, totalPages, category }, categories] = await Promise.all([
    getPostsByCategory(slug, pageNum, 12),
    getAllCategories(),
  ]);

  if (!category || pageNum > totalPages) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-brand-forest">
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-brand-gold text-sm uppercase tracking-wider mb-2">Category</p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4">
            {category.name}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            {category.count} {category.count === 1 ? 'post' : 'posts'}
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Category Filter */}
          <CategoryFilter categories={categories} activeSlug={slug} />

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-brand-stem text-lg">No posts found on this page.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>

              <Pagination
                currentPage={pageNum}
                totalPages={totalPages}
                basePath={`/blog/category/${slug}`}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}
