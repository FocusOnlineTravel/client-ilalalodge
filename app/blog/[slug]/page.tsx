import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
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

function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    '&#8217;': "'",
    '&#8216;': "'",
    '&#8220;': '"',
    '&#8221;': '"',
    '&#8211;': '–',
    '&#8212;': '—',
    '&#038;': '&',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
  };
  return text.replace(/&#?\w+;/g, (match) => entities[match] || match);
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
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto mt-16">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6">
              {decodeHtmlEntities(post.title)}
            </h1>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </section>
      )}

      {/* Page Builder Sections OR Traditional Content */}
      {hasPageSections ? (
        <SectionRenderer sections={post.pageSections!} pageSlug={`blog-${slug}`} />
      ) : (
        <article className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            {/* Post Meta */}
            <div className="mb-8 pb-8 border-b border-brand-daisy">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-brand-stem">
                <time dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
                {post.categories.length > 0 && (
                  <>
                    <span className="text-brand-stem/40">|</span>
                    <div className="flex flex-wrap gap-2">
                      {post.categories.map((cat) => (
                        <span
                          key={cat.slug}
                          className="text-brand-gold"
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  </>
                )}
                {post.author && (
                  <>
                    <span className="text-brand-stem/40">|</span>
                    <span>By {post.author}</span>
                  </>
                )}
              </div>
            </div>

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
