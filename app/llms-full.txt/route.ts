import { getAllPosts, getAllRooms, getOptions } from '@/lib/content';

export const revalidate = 3600;

const SITE_URL = 'https://www.ilalalodge.com';

function u(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function stripHtml(input: string): string {
  return decodeEntities(input.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
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

export async function GET() {
  const [options, rooms, postsRes] = await Promise.all([
    getOptions(),
    safe(() => getAllRooms()),
    safe(() => getAllPosts(1, 50)),
  ]);

  const info = options.lodge_info ?? {};
  const booking =
    options.header?.booking_url ||
    'https://direct-book.com/ilalalodge/properties/ilaladirect?locale=en&currency=USD';
  const address = [
    info.address_street,
    info.address_locality,
    info.address_region,
    info.address_country,
  ]
    .filter(Boolean)
    .join(', ');

  const sections: string[] = [];

  const facts: string[] = [
    `- Name: ${info.legal_name || options.site_name || 'Ilala Lodge Hotel'}`,
  ];
  if (address) facts.push(`- Address: ${address}`);
  if (info.latitude != null && info.longitude != null) {
    facts.push(`- GPS coordinates: ${info.latitude}, ${info.longitude}`);
  }
  if (options.contact.phone) facts.push(`- Reservations phone: ${options.contact.phone}`);
  if (options.contact.email) facts.push(`- Reservations email: ${options.contact.email}`);
  if (options.contact.front_desk_phone) facts.push(`- Front desk phone: ${options.contact.front_desk_phone}`);
  if (options.contact.front_desk_email) facts.push(`- Front desk email: ${options.contact.front_desk_email}`);
  if (info.check_in_time) facts.push(`- Check-in: ${info.check_in_time}`);
  if (info.check_out_time) facts.push(`- Check-out: ${info.check_out_time}`);
  if (info.room_count) facts.push(`- Number of rooms: ${info.room_count}`);
  if (info.star_rating) facts.push(`- Star rating: ${info.star_rating}`);
  if (info.price_range) facts.push(`- Price range (Schema.org): ${info.price_range}`);
  if (info.currencies_accepted) facts.push(`- Currencies accepted: ${info.currencies_accepted}`);
  if (info.year_founded) facts.push(`- Year founded: ${info.year_founded}`);
  facts.push(`- Direct booking: ${booking}`);

  sections.push(
    [
      `# ${info.legal_name || options.site_name || 'Ilala Lodge Hotel'}`,
      '',
      info.description || '',
      '',
      '## Fast facts',
      '',
      ...facts,
      '',
    ].join('\n')
  );

  if (rooms?.length) {
    const roomLines: string[] = ['## Rooms', ''];
    for (const room of rooms) {
      roomLines.push(`### ${room.title}`);
      roomLines.push('');
      roomLines.push(`URL: ${u(`/our-rooms/${room.slug}`)}`);
      if (room.shortDescription) roomLines.push(`Summary: ${room.shortDescription}`);
      const specs: string[] = [];
      if (room.roomCount) specs.push(`${room.roomCount} rooms`);
      if (room.size) specs.push(room.size);
      if (room.sleeps) specs.push(`sleeps ${room.sleeps}`);
      if (room.beds) specs.push(room.beds);
      if (room.priceFrom) specs.push(`from ${room.priceFrom}`);
      if (specs.length) roomLines.push(`Specs: ${specs.join(' · ')}`);
      if (room.amenities?.length) {
        roomLines.push(
          `Amenities: ${room.amenities
            .map((a) => a.text)
            .filter(Boolean)
            .join(', ')}`
        );
      }
      roomLines.push('');
    }
    sections.push(roomLines.join('\n'));
  }

  sections.push(
    [
      '## Dining',
      '',
      `- Cassia Restaurant — the hotel's signature restaurant, open for breakfast, lunch, and dinner. ${u('/dining')}`,
      `- Zambezi River Deck Experience — riverside dining on the Zambezi. ${u('/dining/zambezi-river-deck')}`,
      `- Palm River Hotel High Tea — classic high tea at the sister property. ${u('/dining/high-tea')}`,
      '',
    ].join('\n')
  );

  sections.push(
    [
      '## Activities',
      '',
      `- Overview: ${u('/activities')}`,
      `- Ra-Ikane sunset cruise on the Zambezi: ${u('/activities/ra-ikane')}`,
      '- Victoria Falls guided tour, white-water rafting, bungee jumping, helicopter flights, cultural village visits, game drives in Zambezi National Park and Chobe (Botswana day trip).',
      '',
    ].join('\n')
  );

  if (postsRes?.posts?.length) {
    const blogLines: string[] = ['## Journal (recent articles)', ''];
    for (const post of postsRes.posts) {
      const title = stripHtml(post.title);
      const excerpt = stripHtml(post.excerpt);
      blogLines.push(`### ${title}`);
      blogLines.push('');
      blogLines.push(`URL: ${u(`/blog/${post.slug}`)}`);
      blogLines.push(`Published: ${post.date}`);
      if (post.author) blogLines.push(`Author: ${post.author}`);
      if (post.categories.length) {
        blogLines.push(`Categories: ${post.categories.map((c) => c.name).join(', ')}`);
      }
      if (excerpt) {
        blogLines.push('');
        blogLines.push(excerpt);
      }
      blogLines.push('');
    }
    sections.push(blogLines.join('\n'));
  }

  sections.push(
    [
      '## Contact and policies',
      '',
      `- Contact: ${u('/contact')}`,
      `- FAQs: ${u('/faqs')}`,
      `- Agents portal: ${u('/agents')}`,
      `- Sitemap: ${u('/sitemap.xml')}`,
      '',
    ].join('\n')
  );

  return new Response(sections.join('\n'), {
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
    console.error('[llms-full.txt] fetch failed:', error);
    return null;
  }
}
