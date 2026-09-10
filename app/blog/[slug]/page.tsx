import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getAllPostSlugs } from '@/lib/content';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const revalidate = 300; // Revalidate every 5 minutes

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Ilala Lodge Hotel',
    };
  }

  return {
    title: `${post.title} | Ilala Lodge Hotel Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: post.featuredImage ? [{ url: post.featuredImage }] : undefined,
    },
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Check if post has page builder sections
  const hasPageSections = post.pageSections && post.pageSections.length > 0;

  return (
    <>
      {/* Hero Section - only show if NOT using page builder (page builder has its own hero) */}
      {!hasPageSections && (
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-brand-forest">
          {post.featuredImage && (
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt || post.title}
              fill
              className="object-cover opacity-40"
              priority
              sizes="100vw"
            />
          )}
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <time className="text-sm text-white/80 mb-4 block">
              {formatDate(post.date)}
            </time>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-4">
              {post.title}
            </h1>
            {post.author && (
              <p className="text-white/90">
                By {post.author}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Page Builder Sections OR Traditional Content */}
      {hasPageSections ? (
        <SectionRenderer sections={post.pageSections!} pageSlug={`blog-${slug}`} />
      ) : (
        <article className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            {/* Post Content */}
            <div
              className="prose prose-lg prose-brand max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      )}

      {/* Back to Blog - always show */}
      <section className="py-8 bg-white border-t border-brand-daisy">
        <div className="max-w-3xl mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-brand-forest hover:text-brand-gold transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </section>
    </>
  );
}
