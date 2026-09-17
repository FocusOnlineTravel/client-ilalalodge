import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/wordpress';

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

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="group">
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
          <div className="flex items-center gap-2 text-sm">
            <time className="text-brand-stem/70">
              {formatDate(post.date)}
            </time>
            {post.categories.length > 0 && (
              <>
                <span className="text-brand-stem/40">•</span>
                <span className="text-brand-gold">{post.categories[0].name}</span>
              </>
            )}
          </div>
          <h2 className="font-serif text-xl lg:text-2xl text-brand-forest group-hover:text-brand-gold transition-colors">
            {decodeHtmlEntities(post.title)}
          </h2>
          <p className="text-brand-stem line-clamp-2">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}
