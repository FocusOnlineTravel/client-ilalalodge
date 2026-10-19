import type { Options } from '@/types/options';

const SITE_URL = 'https://www.ilalalodge.com';

function absoluteUrl(path: string | undefined): string | undefined {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function buildSameAs(social: Options['social']): string[] {
  return [social.facebook, social.instagram, social.twitter, social.tripadvisor]
    .filter((url): url is string => Boolean(url && url.trim()));
}

export function OrganizationJsonLd({ options }: { options: Options }) {
  const info = options.lodge_info ?? {};
  const name = info.legal_name || options.site_name || 'Ilala Lodge Hotel';
  const logoUrl = absoluteUrl(info.logo?.url || options.header?.logo?.url);
  const sameAs = buildSameAs(options.social);

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name,
    url: SITE_URL,
    ...(info.description ? { description: info.description } : {}),
    ...(logoUrl ? { logo: logoUrl } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    ...(options.contact.email || options.contact.phone
      ? {
          contactPoint: [
            {
              '@type': 'ContactPoint',
              contactType: 'reservations',
              ...(options.contact.phone ? { telephone: options.contact.phone } : {}),
              ...(options.contact.email ? { email: options.contact.email } : {}),
              availableLanguage: ['English'],
            },
          ],
        }
      : {}),
  };

  return <JsonLd data={data} />;
}

export function HotelJsonLd({ options }: { options: Options }) {
  const info = options.lodge_info ?? {};
  const name = info.legal_name || options.site_name || 'Ilala Lodge Hotel';
  const imageUrl = absoluteUrl(info.primary_image?.url);
  const sameAs = buildSameAs(options.social);
  const currencies = info.currencies_accepted
    ?.split(',')
    .map((c) => c.trim())
    .filter(Boolean);

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    '@id': `${SITE_URL}#hotel`,
    name,
    url: SITE_URL,
    ...(info.description ? { description: info.description } : {}),
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(options.contact.phone ? { telephone: options.contact.phone } : {}),
    ...(options.contact.email ? { email: options.contact.email } : {}),
    ...(info.price_range ? { priceRange: info.price_range } : {}),
    ...(currencies?.length ? { currenciesAccepted: currencies.join(', ') } : {}),
    ...(info.check_in_time ? { checkinTime: info.check_in_time } : {}),
    ...(info.check_out_time ? { checkoutTime: info.check_out_time } : {}),
    ...(info.room_count ? { numberOfRooms: info.room_count } : {}),
    ...(info.star_rating
      ? {
          starRating: {
            '@type': 'Rating',
            ratingValue: info.star_rating,
            bestRating: 5,
          },
        }
      : {}),
    address: {
      '@type': 'PostalAddress',
      ...(info.address_street ? { streetAddress: info.address_street } : {}),
      ...(info.address_locality ? { addressLocality: info.address_locality } : {}),
      ...(info.address_region ? { addressRegion: info.address_region } : {}),
      ...(info.address_postal_code ? { postalCode: info.address_postal_code } : {}),
      ...(info.address_country ? { addressCountry: info.address_country } : {}),
    },
    ...(typeof info.latitude === 'number' && typeof info.longitude === 'number'
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: info.latitude,
            longitude: info.longitude,
          },
        }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };

  return <JsonLd data={data} />;
}
