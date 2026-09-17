import Link from 'next/link';
import type { Category } from '@/lib/wordpress';

interface CategoryFilterProps {
  categories: Category[];
  activeSlug?: string;
}

export default function CategoryFilter({ categories, activeSlug }: CategoryFilterProps) {
  if (categories.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      <Link
        href="/blog"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !activeSlug
            ? 'bg-brand-forest text-white'
            : 'bg-brand-daisy text-brand-forest hover:bg-brand-gold/20'
        }`}
      >
        All Posts
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/blog/category/${category.slug}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeSlug === category.slug
              ? 'bg-brand-forest text-white'
              : 'bg-brand-daisy text-brand-forest hover:bg-brand-gold/20'
          }`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
