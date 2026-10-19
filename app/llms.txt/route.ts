import { getAllPosts, getAllRooms, getOptions } from '@/lib/content';

export const revalidate = 3600;

const SITE_URL = 'https://www.ilalalodge.com';

function u(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function formatAddress(info: NonNullable<Awaited<ReturnType<typeof getOptions>>['lodge_info']>): string {
  return [
    info.address_street,
    info.address_locality,
    info.address_region,
    info.address_country,
  ]
    .filter(Boolean)
    .join(', ');
}

export async function GET() {
  const [options, roomsRes, postsRes] = await Promise.all([
    getOptions(),
    safe(() => getAllRooms()),
    safe(() => getAllPosts(1, 20)),
  ]);

  const info = options.lodge_info ?? {};
  const booking =
    options.header?.booking_url ||
    'https://direct-book.com/ilalalodge/properties/ilaladirect?locale=en&currency=USD';

  const lines: string[] = [];

  lines.push(`# ${info.legal_name || options.site_name || 'Ilala Lodge Hotel'}`);
  lines.push('');
  if (info.description) {
    lines.push(`> ${info.description}`);
    lines.push('');
  }

  lines.push('## Lodge information');
  lines.push('');
  lines.push(`- Address: ${formatAddress(info)}`);
  if (info.latitude != null && info.longitude != null) {
    lines.push(`- GPS: ${info.latitude}, ${info.longitude}`);
  }
  if (options.contact.phone) lines.push(`- Phone: ${options.contact.phone}`);
  if (options.contact.email) lines.push(`- Email: ${options.contact.email}`);
  if (info.check_in_time) lines.push(`- Check-in: ${info.check_in_time}`);
  if (info.check_out_time) lines.push(`- Check-out: ${info.check_out_time}`);
  if (info.room_count) lines.push(`- Rooms: ${info.room_count}`);
  if (info.star_rating) lines.push(`- Rating: ${info.star_rating} star`);
  if (info.price_range) lines.push(`- Price range: ${info.price_range}`);
  if (info.currencies_accepted) lines.push(`- Currencies accepted: ${info.currencies_accepted}`);
  lines.push(`- Book directly: ${booking}`);
  lines.push('');

  lines.push('## About the hotel');
  lines.push('');
  lines.push(`- [Our Story](${u('/our-story')})`);
  lines.push(`- [Facilities](${u('/facilities')})`);
  lines.push(`- [Location](${u('/location')})`);
  lines.push(`- [Victoria Falls](${u('/victoria-falls')})`);
  lines.push(`- [Map](${u('/map')})`);
  lines.push('');

  if (roomsRes?.length) {
    lines.push('## Rooms');
    lines.push('');
    for (const room of roomsRes) {
      lines.push(`- [${room.title}](${u(`/our-rooms/${room.slug}`)})${room.shortDescription ? `: ${room.shortDescription}` : ''}`);
    }
    lines.push(`- [Rates](${u('/rates')})`);
    lines.push('');
  }

  lines.push('## Dining');
  lines.push('');
  lines.push(`- [Cassia Restaurant](${u('/dining')})`);
  lines.push(`- [Zambezi River Deck Experience](${u('/dining/zambezi-river-deck')})`);
  lines.push(`- [Palm River Hotel High Tea](${u('/dining/high-tea')})`);
  lines.push('');

  lines.push('## Activities');
  lines.push('');
  lines.push(`- [All activities](${u('/activities')})`);
  lines.push(`- [Ra-Ikane sunset cruise](${u('/activities/ra-ikane')})`);
  lines.push('');

  if (postsRes?.posts?.length) {
    lines.push('## Journal (recent posts)');
    lines.push('');
    for (const post of postsRes.posts) {
      lines.push(`- [${escapeMarkdown(stripHtml(post.title))}](${u(`/blog/${post.slug}`)})`);
    }
    lines.push(`- [All posts](${u('/blog')})`);
    lines.push('');
  }

  lines.push('## Contact');
  lines.push('');
  lines.push(`- [Contact Us](${u('/contact')})`);
  lines.push(`- [FAQs](${u('/faqs')})`);
  lines.push(`- [Agents portal](${u('/agents')})`);
  lines.push('');

  lines.push('## Full content');
  lines.push('');
  lines.push(`- [llms-full.txt](${u('/llms-full.txt')})`);
  lines.push(`- [Sitemap](${u('/sitemap.xml')})`);

  return new Response(lines.join('\n') + '\n', {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

async function safe<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    console.error('[llms.txt] fetch failed:', error);
    return null;
  }
}

function stripHtml(input: string): string {
  return decodeEntities(input.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
}

function escapeMarkdown(input: string): string {
  return input.replace(/\]/g, '\\]').replace(/\[/g, '\\[');
}

function decodeEntities(input: string): string {
  const named: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': "'",
    '&nbsp;': ' ',
    '&hellip;': '…',
    '&mdash;': '—',
    '&ndash;': '–',
    '&rsquo;': '’',
    '&lsquo;': '‘',
    '&ldquo;': '“',
    '&rdquo;': '”',
  };
  return input
    .replace(/&(amp|lt|gt|quot|apos|nbsp|hellip|mdash|ndash|rsquo|lsquo|ldquo|rdquo);/g, (m) => named[m] || m)
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)));
}
