import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * On-demand revalidation endpoint
 *
 * Called by WordPress on save_post hook to invalidate cached pages
 *
 * POST /api/revalidate
 * Headers: Authorization: Bearer <REVALIDATION_SECRET>
 * Body: { slug?: string, type?: 'page' | 'options' | 'all' }
 */
export async function POST(request: NextRequest) {
  // Verify secret
  const authHeader = request.headers.get('authorization');
  const secret = process.env.REVALIDATION_SECRET;

  if (!secret) {
    console.error('[Revalidate] REVALIDATION_SECRET not configured');
    return NextResponse.json(
      { error: 'Revalidation not configured' },
      { status: 500 }
    );
  }

  // Support both Bearer token and query param for flexibility
  const providedSecret =
    authHeader?.replace('Bearer ', '') ||
    request.nextUrl.searchParams.get('secret');

  if (providedSecret !== secret) {
    console.warn('[Revalidate] Invalid secret provided');
    return NextResponse.json(
      { error: 'Invalid secret' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { slug, type = 'page' } = body as { slug?: string; type?: string };

    const revalidated: string[] = [];

    switch (type) {
      case 'options':
        // Revalidate all pages since they use options (via layout)
        revalidatePath('/', 'layout');
        revalidated.push('layout');
        break;

      case 'all':
        // Revalidate everything
        revalidatePath('/', 'layout');
        revalidated.push('all');
        break;

      case 'page':
      default:
        if (slug) {
          // Revalidate specific page
          const pagePath = slug === 'home' ? '/' : `/${slug}`;
          revalidatePath(pagePath, 'page');
          revalidated.push(pagePath);
        } else {
          // Revalidate all pages
          revalidatePath('/', 'page');
          revalidated.push('all-pages');
        }
        break;
    }

    console.log('[Revalidate] Success:', revalidated.join(', '));

    return NextResponse.json({
      revalidated: true,
      paths: revalidated,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Revalidate] Error:', error);
    return NextResponse.json(
      {
        error: 'Revalidation failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Health check endpoint
 */
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ status: 'unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}
