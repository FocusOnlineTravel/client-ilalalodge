import { NextResponse } from 'next/server';

interface WPImage {
  id: number;
  url: string;
  alt: string;
  title: string;
  sizes: {
    thumbnail: string;
    medium: string;
    large: string;
    full: string;
  };
}

interface GallerySection {
  acf_fc_layout: string;
  rooms_gallery?: WPImage[];
  dining_gallery?: WPImage[];
  pool_bar_gallery?: WPImage[];
  conferencing_gallery?: WPImage[];
  wildlife_gallery?: WPImage[];
  hotel_grounds_gallery?: WPImage[];
}

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

// Map WordPress field names to frontend category IDs
const CATEGORY_MAP: Record<string, string> = {
  rooms_gallery: 'rooms',
  dining_gallery: 'dining',
  pool_bar_gallery: 'pool',
  conferencing_gallery: 'conferencing',
  wildlife_gallery: 'wildlife',
  hotel_grounds_gallery: 'hotel',
};

export async function GET() {
  try {
    const res = await fetch(
      'https://backend-ilalalodge.focusonlinetravel.co.za/wp-json/ilala/v1/page/gallery',
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from WordPress' },
        { status: res.status }
      );
    }

    const json = await res.json();
    const sections = json.acf?.page_sections || [];

    // Find the gallery section
    const gallerySection = sections.find(
      (s: GallerySection) => s.acf_fc_layout === 'gallery'
    ) as GallerySection | undefined;

    if (!gallerySection) {
      return NextResponse.json({ images: [] });
    }

    // Collect images from all category galleries
    const images: GalleryImage[] = [];

    for (const [wpField, categoryId] of Object.entries(CATEGORY_MAP)) {
      const gallery = gallerySection[wpField as keyof GallerySection] as WPImage[] | undefined;

      if (gallery && Array.isArray(gallery)) {
        for (const img of gallery) {
          images.push({
            src: img.sizes?.large || img.url,
            alt: img.alt || img.title || '',
            category: categoryId,
          });
        }
      }
    }

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Gallery API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
