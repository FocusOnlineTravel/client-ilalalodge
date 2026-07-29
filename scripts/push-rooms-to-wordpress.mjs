/**
 * Push Room Data to WordPress
 *
 * This script pushes room/accommodation data from data/accommodation.ts to WordPress Room CPT.
 *
 * Usage:
 *   node scripts/push-rooms-to-wordpress.mjs
 *   node scripts/push-rooms-to-wordpress.mjs --dry-run
 *
 * Environment variables (from .env.local):
 *   WP_URL          WordPress URL
 *   WP_USER         WordPress username
 *   WP_APP_PASSWORD Application password
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const WP_URL = process.env.WP_URL || process.env.WORDPRESS_API_URL;
const WP_USER = process.env.WP_USER || process.env.WORDPRESS_AUTH_USER;
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD || process.env.WORDPRESS_AUTH_PASSWORD;

const DRY_RUN = process.argv.includes('--dry-run');

// Room data from accommodation.ts (converted to JSON-compatible format)
const accommodationData = {
  rooms: [
    {
      slug: "classic-rooms",
      title: "Classic Rooms",
      shortDescription: "Twin or King beds with railway teak furnishings, opening onto the hotel's gardens and lawns where wildlife often grazes.",
      description: `Our Twin Classic Rooms feature two comfortable three-quarter beds within a spacious layout, along with an en-suite bathroom with a separate shower.

The King Classic Rooms are designed for couples, offering a king-size bed and an en-suite bathroom with a separate shower.

Both room types are furnished with traditional railway teak pieces, paired with modern comforts. Sliding doors open onto the hotel's gardens and lawns, where guests may see warthog, elephant, bushbuck, hippo, and other wildlife grazing nearby.`,
      image: "/images/Ilala-Lodge-Accommodation-Classic-Double-02.jpg",
      heroImages: [
        "/images/Ilala-Lodge-Accommodation-Classic-Double-02.jpg",
        "/images/Ilala-Lodge-Accommodation-Classic-Twin-02.jpg",
        "/images/Ilala-Lodge-Accommodation-Classic-Double-01.jpg",
      ],
      floorplan: "/documents/floorplan-classic_room.pdf",
      roomCount: 32,
      size: "36 m²",
      sleeps: 2,
      beds: "Twin or King",
      priceFrom: "$285 PPS / $406 PPPN",
      gallery: [
        "/images/Ilala-Lodge-Accommodation-Classic-Twin-02.jpg",
        "/images/Ilala-Lodge-Accommodation-Classic-Double-02.jpg",
        "/images/Ilala-Lodge-Accommodation-Classic-Double-01.jpg",
        "/images/Ilala-Lodge-Accommodation-Classic-Twin-01.jpg",
        "/images/Ilala-Lodge-Accommodation-Classic-Twin-03.jpg",
        "/images/Ilala-Lodge-Accommodation-Classic-Twin-Adjoined-02.jpg",
        "/images/Ilala-Lodge-Accommodation-Classic-Twin-Adjoined-01.jpg",
        "/images/Ilala-Lodge-Exteriors-16.jpg",
      ],
      amenities: [
        "Mini-Bar (with Complimentary Initial Stocking)",
        "Air-conditioning",
        "Free Wi-Fi",
        "Complimentary Toiletries",
        "Satellite Television",
        "Tea and Coffee Facilities",
        "Hairdryers",
        "Writing Desk",
        "Mineral water replenished twice daily",
        "Laundry Service",
        "Overhead Fans",
        "Digital Safe",
        "Private Patio/Balcony"
      ]
    },
    {
      slug: "classic-suites",
      title: "Classic Suites",
      shortDescription: "Top-floor suites with private balconies overlooking the hotel grounds and the rising spray of Victoria Falls.",
      description: `Located on the top floor, the Classic Suites feature private balconies with views over the hotel's grounds and the rising spray of Victoria Falls.

Each suite includes a king-size bed, with an additional three-quarter bed positioned in a separate section of the room, making it well suited to small families.

For families of more than 3, the Classic Suite can interconnect with a Classic Twin Room via an interleading door. This adjoining room includes its own bathroom and private balcony, also offering views of the mist from Victoria Falls.`,
      image: "/images/Ilala-Lodge-Accommodation-Classic-Suite-04.jpg",
      heroImages: [
        "/images/Ilala-Lodge-Accommodation-Classic-Suite-04.jpg",
        "/images/Ilala-Lodge-Accommodation-Classic-Suite-06.jpg",
        "/images/Ilala-Lodge-Accommodation-Classic-Suite-05.jpg",
      ],
      floorplan: "/documents/floorplan-classic_suite.pdf",
      roomCount: 6,
      size: "75 m²",
      sleeps: 3,
      beds: "King + ¾",
      priceFrom: "$454 PPS / $568 PPPN",
      gallery: [
        "/images/Ilala-Lodge-Accommodation-Classic-Suite-06.jpg",
        "/images/Ilala-Lodge-Accommodation-Classic-Suite-04.jpg",
        "/images/Ilala-Lodge-Accommodation-Classic-Suite-05.jpg",
        "/images/Ilala-Lodge-Accommodation-Classic-Twin-Adjoined-01.jpg",
        "/images/Ilala-Lodge-Accommodation-Classic-Twin-Adjoined-02.jpg",
        "/images/Ilala-Lodge-Accommodation-Classic-Suite-02.jpg",
        "/images/Ilala-Lodge-Accommodation-Classic-Suite-01.jpg",
        "/images/Ilala-Lodge-Accommodation-Classic-Double-04.jpg",
      ],
      amenities: [
        "Complimentary Mini-Bar – replenished daily",
        "Air-conditioning",
        "Free Wi-Fi",
        "Complimentary Toiletries",
        "Satellite Television",
        "Tea and Coffee Facilities",
        "Hairdryers",
        "Writing Desk",
        "Mineral water replenished twice daily",
        "Laundry Service",
        "Overhead Fans",
        "Digital Safe",
        "Private Balcony Facing Victoria Falls",
        "Additional 3/4 bed",
        "Interconnecting room options available",
        "Large Bathtub",
        "Double Vanity Basins"
      ]
    },
    {
      slug: "deluxe-rooms",
      title: "Deluxe Rooms",
      shortDescription: "Set within the Deluxe Wing — refined teak accents and contemporary furnishings, with patios/balconies overlooking the gardens.",
      description: `Set within the Deluxe Wing, the Deluxe Rooms offer a more refined stay, combining rich teak accents with contemporary furnishings.

Twin Deluxe Rooms feature two three-quarter beds, while King Deluxe Rooms include a king-size bed. Each room has an en-suite bathroom with a walk-in shower and double vanities, providing added space and comfort.

Patio/Balconies overlook the hotel's lush gardens as they extend into the neighbouring National Park. From this vantage point, guests can enjoy regular wildlife sightings, along with early morning views of the mist rising from Victoria Falls.`,
      image: "/images/Ilala-Lodge-Accommodation-Deluxe-Double-01.jpg",
      heroImages: [
        "/images/Ilala-Lodge-Accommodation-Deluxe-Double-01.jpg",
        "/images/Ilala-Lodge-Accommodation-Deluxe-Twin-03.jpg",
        "/images/Ilala-Lodge-Accommodation-Deluxe-Double-02.jpg",
      ],
      floorplan: "/documents/floorplan-deluxe_room.pdf",
      roomCount: 24,
      size: "44 m²",
      sleeps: 2,
      beds: "Twin or King",
      priceFrom: "$355 PPS / $506 PPPN",
      gallery: [
        "/images/Ilala-Lodge-Accommodation-Deluxe-Twin-03.jpg",
        "/images/Ilala-Lodge-Accommodation-Deluxe-Double-01.jpg",
        "/images/Ilala-Lodge-Accommodation-Deluxe-Double-02.jpg",
        "/images/Ilala-Lodge-Accommodation-Deluxe-Twin-02.jpg",
        "/images/Ilala-Lodge-Accommodation-Deluxe-Double-04.jpg",
        "/images/Ilala-Lodge-Accommodation-Deluxe-Double-09.jpg",
        "/images/Ilala-Lodge-Accommodation-Deluxe-Double-10.jpg",
        "/images/Ilala-Lodge-Accommodation-Deluxe-Double-11.jpg",
      ],
      amenities: [
        "Mini-Bar (with Complimentary Initial Stocking)",
        "Air-conditioning",
        "Free Wi-Fi",
        "Complimentary Toiletries",
        "Satellite Television",
        "Tea and Coffee Facilities",
        "Hairdryers",
        "Writing Desk",
        "Mineral water replenished twice daily",
        "Laundry Service",
        "Overhead Fans",
        "Digital Safe",
        "Private Patio/Balcony",
        "Double Vanity Basins"
      ]
    },
    {
      slug: "executive-suites",
      title: "Executive Suites",
      shortDescription: "Spacious suites in the Deluxe Wing with a separate lounge, king-size bedroom, and a private balcony facing Victoria Falls.",
      description: `Located in the Deluxe Wing, the Executive Suites offer a spacious, elevated stay with a separate lounge and bedroom.

The bedroom features a king-size bed and an en-suite bathroom with a walk-in shower, separate bathtub, and his-and-hers basins. The adjoining lounge provides a comfortable, private space to relax, complemented by local artwork and décor.

A private balcony extends from the bedroom and wraps around to the lounge, offering views towards Victoria Falls. From here, guests can enjoy regular wildlife sightings and the surrounding natural setting.`,
      image: "/images/Ilala-Lodge-Accommodation-Executive-Suite-01.jpg",
      heroImages: [
        "/images/Ilala-Lodge-Accommodation-Executive-Suite-01.jpg",
        "/images/Ilala-Lodge-Accommodation-Executive-Suite-03.jpg",
        "/images/Ilala-Lodge-Accommodation-Executive-Suite-05.jpg",
      ],
      floorplan: "/documents/floorplan-executive_suite.pdf",
      roomCount: 4,
      size: "104 m²",
      sleeps: 2,
      beds: "King",
      priceFrom: "$536 PPS / $670 PPPN",
      gallery: [
        "/images/Ilala-Lodge-Accommodation-Executive-Suite-03.jpg",
        "/images/Ilala-Lodge-Accommodation-Executive-Suite-01.jpg",
        "/images/Ilala-Lodge-Accommodation-Executive-Suite-05.jpg",
        "/images/Ilala-Lodge-Accommodation-Executive-Suite-06.jpg",
        "/images/Ilala-Lodge-Accommodation-Executive-Suite-08.jpg",
        "/images/Ilala-Lodge-Accommodation-Executive-Suite-09.jpg",
        "/images/Ilala-Lodge-Accommodation-Executive-Suite-11.jpg",
        "/images/Ilala-Lodge-Accommodation-Executive-Suite-10.jpg",
      ],
      amenities: [
        "Complimentary Mini-Bar – replenished daily",
        "Air-conditioning",
        "Free Wi-Fi",
        "Complimentary Toiletries",
        "Satellite Television",
        "Tea and Coffee Facilities",
        "Hairdryers",
        "Writing Desk",
        "Mineral water replenished twice daily",
        "Laundry Service",
        "Overhead Fans",
        "Digital Safe",
        "Private Balcony Facing Victoria Falls",
        "Double Vanity Basins",
        "Large Bathtub",
        "Private Lounge"
      ]
    },
    {
      slug: "strathearn-suite",
      title: "Strathearn Suite",
      shortDescription: "Our most luxurious accommodation, named after founder Strathearn Brown — private lounge, kitchenette, and a heated spa bath on the balcony.",
      description: `The Strathearn Suite is Ilala Lodge Hotel's most luxurious accommodation, named after founder Strathearn Brown, who opened the hotel in 1989.

Designed with a contemporary, sophisticated finish, the suite offers a private lounge, kitchenette, and an en-suite bathroom with double vanity basins, walk-in shower, and bathtub. A private balcony features a spa bath, with views of the rising spray above Victoria Falls — an elevated setting for relaxation.

Guests enjoy added inclusions such as in-room continental breakfast, welcome sparkling wine, and a complimentary river cruise (subject to availability). Private in-room dining is also available on request.

Ideal for couples, the suite can also be configured for families through interleading doors to an Executive suite and Deluxe Room, creating a more spacious, connected layout.`,
      image: "/images/Ilala-Lodge-Accommodation-Strathearn-Suite-01.jpg",
      heroImages: [
        "/images/Ilala-Lodge-Accommodation-Strathearn-Suite-01.jpg",
        "/images/Ilala-Lodge-Accommodation-Strathearn-Suite-08.jpg",
        "/images/Ilala-Lodge-Accommodation-Strathearn-Suite-06.jpg",
      ],
      floorplan: "/documents/floorplan-strathearn_suite.pdf",
      roomCount: 1,
      size: "128 m²",
      sleeps: 4,
      beds: "King",
      priceFrom: "$771 PPS / $889 PPPN",
      gallery: [
        "/images/Ilala-Lodge-Accommodation-Strathearn-Suite-08.jpg",
        "/images/Ilala-Lodge-Accommodation-Strathearn-Suite-01.jpg",
        "/images/Ilala-Lodge-Accommodation-Strathearn-Suite-06.jpg",
        "/images/Ilala-Lodge-Accommodation-Strathearn-Suite-07.jpg",
        "/images/Ilala-Lodge-Accommodation-Strathearn-Suite-11.jpg",
        "/images/Ilala-Lodge-Accommodation-Strathearn-Suite-10.jpg",
        "/images/Ilala-Lodge-Accommodation-Strathearn-Suite-05.jpg",
        "/images/Ilala-Lodge-Accommodation-Strathearn-Suite-04.jpg",
        "/images/Ilala-Lodge-Accommodation-Strathearn-Suite-03.jpg",
        "/images/Ilala-Lodge-Accommodation-Strathearn-Suite-09.jpg",
        "/images/Ilala-Lodge-Accommodation-Strathearn-Suite-02.jpg",
      ],
      amenities: [
        "Complimentary Mini-Bar – replenished daily",
        "Air-conditioning",
        "Free Wi-Fi",
        "Complimentary Toiletries",
        "Satellite Television",
        "Tea and Coffee Facilities",
        "Hairdryers",
        "Writing Desk",
        "In-room Dining",
        "Mineral water replenished twice daily",
        "Laundry Service",
        "Overhead Fans",
        "Digital Safe",
        "Private Patio Facing Victoria Falls",
        "Double Vanity Basins",
        "Interconnecting room options available",
        "Large Bathtub",
        "Private Spacious Lounge",
        "Private Kitchen stocked with Snacks",
        "Heated Spa Bath on Balcony"
      ]
    }
  ]
};

// Load media manifest for image ID lookups
const MEDIA_MANIFEST_PATH = join(ROOT, 'media', 'manifest.json');
let mediaManifest = {};
if (existsSync(MEDIA_MANIFEST_PATH)) {
  mediaManifest = JSON.parse(readFileSync(MEDIA_MANIFEST_PATH, 'utf-8'));
}

// =============================================================================
// UTILITIES
// =============================================================================

function log(message, ...rest) {
  console.log(message, ...rest);
}

function logError(message, ...rest) {
  console.error('❌', message, ...rest);
}

function logSuccess(message, ...rest) {
  console.log('✅', message, ...rest);
}

function logWarning(message, ...rest) {
  console.log('⚠️', message, ...rest);
}

async function wpFetch(endpoint, options = {}) {
  const url = `${WP_URL}/wp-json${endpoint}`;
  const auth = Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64');

  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`WordPress API error: ${response.status} - ${text}`);
  }

  return response.json();
}

// Get attachment ID from media manifest
function getAttachmentId(imagePath) {
  const upload = mediaManifest.uploads?.[imagePath];
  if (upload?.attachmentId) {
    return upload.attachmentId;
  }
  return null;
}

// Get attachment IDs for an array of image paths
function getAttachmentIds(imagePaths) {
  return imagePaths
    .map(path => getAttachmentId(path))
    .filter(id => id !== null);
}

// =============================================================================
// MAIN LOGIC
// =============================================================================

async function getExistingRooms() {
  try {
    const rooms = await wpFetch('/wp/v2/room?per_page=100');
    return rooms;
  } catch (error) {
    logWarning('Could not fetch existing rooms:', error.message);
    return [];
  }
}

async function createOrUpdateRoom(room, existingRooms) {
  const existing = existingRooms.find(r => r.slug === room.slug);

  // Prepare ACF fields
  const acfFields = {
    short_description: room.shortDescription,
    full_description: room.description,
    room_count: room.roomCount,
    size: room.size,
    sleeps: room.sleeps,
    beds: room.beds,
    price_from: room.priceFrom,
    amenities: room.amenities.map(amenity => ({ amenity })),
  };

  // Add image IDs if available
  const galleryIds = getAttachmentIds(room.gallery);
  if (galleryIds.length > 0) {
    acfFields.gallery = galleryIds;
  }

  const heroIds = getAttachmentIds(room.heroImages);
  if (heroIds.length > 0) {
    acfFields.hero_images = heroIds;
  }

  // Note: floorplan PDFs need to be uploaded separately
  // For now, we'll skip the floorplan field

  log(`\n📝 Processing: ${room.title}`);
  log(`   Slug: ${room.slug}`);
  log(`   Gallery images: ${galleryIds.length}/${room.gallery.length}`);
  log(`   Hero images: ${heroIds.length}/${room.heroImages.length}`);
  log(`   Amenities: ${room.amenities.length}`);

  if (DRY_RUN) {
    log('   [DRY RUN] Would create/update room');
    return;
  }

  try {
    if (existing) {
      // Update existing room
      log(`   Updating existing room (ID: ${existing.id})...`);

      await wpFetch(`/wp/v2/room/${existing.id}`, {
        method: 'POST',
        body: JSON.stringify({
          title: room.title,
          slug: room.slug,
          status: 'publish',
        }),
      });

      // Update ACF fields
      await wpFetch(`/acf/v3/room/${existing.id}`, {
        method: 'POST',
        body: JSON.stringify({ fields: acfFields }),
      });

      logSuccess(`Updated: ${room.title}`);
    } else {
      // Create new room
      log(`   Creating new room...`);

      const newRoom = await wpFetch('/wp/v2/room', {
        method: 'POST',
        body: JSON.stringify({
          title: room.title,
          slug: room.slug,
          status: 'publish',
        }),
      });

      // Set ACF fields
      await wpFetch(`/acf/v3/room/${newRoom.id}`, {
        method: 'POST',
        body: JSON.stringify({ fields: acfFields }),
      });

      logSuccess(`Created: ${room.title} (ID: ${newRoom.id})`);
    }
  } catch (error) {
    logError(`Failed to process ${room.title}:`, error.message);
  }
}

async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║           Push Rooms to WordPress                          ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log();

  if (!WP_URL || !WP_USER || !WP_APP_PASSWORD) {
    logError('Missing WordPress credentials. Set WP_URL, WP_USER, WP_APP_PASSWORD in .env.local');
    process.exit(1);
  }

  log(`🌐 WordPress URL: ${WP_URL}`);
  log(`👤 User: ${WP_USER}`);
  if (DRY_RUN) {
    log('🔍 DRY RUN MODE - No changes will be made');
  }
  console.log();

  // Check media manifest
  const uploadCount = Object.keys(mediaManifest.uploads || {}).length;
  log(`📸 Media manifest: ${uploadCount} images tracked`);

  // Get existing rooms
  log('\n🔍 Fetching existing rooms from WordPress...');
  const existingRooms = await getExistingRooms();
  log(`   Found ${existingRooms.length} existing rooms`);

  // Process each room
  log(`\n📦 Processing ${accommodationData.rooms.length} rooms...`);

  for (const room of accommodationData.rooms) {
    await createOrUpdateRoom(room, existingRooms);
  }

  console.log();
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                        Complete!                           ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  if (!DRY_RUN) {
    log('\n💡 Next steps:');
    log('   1. Check rooms in WordPress admin');
    log('   2. Upload any missing images via wp:push:media if needed');
    log('   3. Manually upload floorplan PDFs if required');
  }
}

main().catch(error => {
  logError('Script failed:', error);
  process.exit(1);
});
