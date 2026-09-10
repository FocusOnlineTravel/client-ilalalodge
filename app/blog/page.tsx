import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/content';

export const revalidate = 300; // Revalidate every 5 minutes

export const metadata: Metadata = {
  title: 'Blog | Ilala Lodge Hotel',
  description: 'News, stories, and travel inspiration from Ilala Lodge Hotel in Victoria Falls, Zimbabwe.',
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogPage() {
  const { posts } = await getAllPosts(1, 12);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-brand-forest">
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4">
            Blog
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Stories from Victoria Falls
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-brand-stem text-lg">No posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.slug} className="group">
                  <Link href={`/blog/${post.slug}`} className="block">
                    {/* Featured Image */}
                    <div className="relative aspect-[16/10] mb-4 overflow-hidden bg-brand-daisy">
                      {post.featuredImage ? (
                        <Image
                          src={post.featuredImage}
                          alt={post.featuredImageAlt || post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-serif text-4xl text-brand-stem/30">IL</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <time className="text-sm text-brand-stem/70">
                        {formatDate(post.date)}
                      </time>
                      <h2 className="font-serif text-xl lg:text-2xl text-brand-forest group-hover:text-brand-gold transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-brand-stem line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
