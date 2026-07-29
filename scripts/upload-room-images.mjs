/**
 * Upload Room Images to WordPress
 *
 * Uploads all Ilala-Lodge-Accommodation-* images to WordPress media library
 *
 * Usage:
 *   node scripts/upload-room-images.mjs
 *   node scripts/upload-room-images.mjs --dry-run
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';
import { config } from 'dotenv';

config({ path: '.env.local' });

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const WP_URL = process.env.WP_URL || process.env.WORDPRESS_API_URL;
const WP_USER = process.env.WP_USER || process.env.WORDPRESS_AUTH_USER;
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD || process.env.WORDPRESS_AUTH_PASSWORD;

const IMAGES_DIR = join(ROOT, 'public', 'images');
const MEDIA_MANIFEST = join(ROOT, 'media', 'manifest.json');
const DRY_RUN = process.argv.includes('--dry-run');

// Load existing manifest
let manifest = { uploads: {} };
if (existsSync(MEDIA_MANIFEST)) {
  manifest = JSON.parse(readFileSync(MEDIA_MANIFEST, 'utf-8'));
}

function getFileHash(filePath) {
  const content = readFileSync(filePath);
  return createHash('md5').update(content).digest('hex').slice(0, 16);
}

async function uploadImage(filePath, fileName) {
  const imageKey = `/images/${fileName}`;

  // Check if already uploaded
  if (manifest.uploads[imageKey]) {
    return { skipped: true, id: manifest.uploads[imageKey].attachmentId };
  }

  const fileContent = readFileSync(filePath);
  const hash = getFileHash(filePath);

  const url = `${WP_URL}/wp-json/wp/v2/media`;
  const auth = Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Type': 'image/jpeg',
    },
    body: fileContent,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Upload failed: ${response.status} - ${text}`);
  }

  const media = await response.json();

  // Update manifest
  manifest.uploads[imageKey] = {
    attachmentId: media.id,
    hash: hash,
    wpUrl: media.source_url,
    uploadedAt: new Date().toISOString(),
  };

  return { skipped: false, id: media.id, url: media.source_url };
}

async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║           Upload Room Images to WordPress                  ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  if (!WP_URL || !WP_USER || !WP_APP_PASSWORD) {
    console.error('❌ Missing WordPress credentials');
    process.exit(1);
  }

  console.log(`🌐 WordPress: ${WP_URL}`);
  if (DRY_RUN) console.log('🔍 DRY RUN MODE\n');

  // Find all room images
  const allFiles = readdirSync(IMAGES_DIR);
  const roomImages = allFiles.filter(f =>
    f.startsWith('Ilala-Lodge-Accommodation-') &&
    (f.endsWith('.jpg') || f.endsWith('.JPG') || f.endsWith('.jpeg') || f.endsWith('.png'))
  );

  console.log(`📸 Found ${roomImages.length} room images\n`);

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const fileName of roomImages) {
    const filePath = join(IMAGES_DIR, fileName);
    const imageKey = `/images/${fileName}`;

    if (manifest.uploads[imageKey]) {
      console.log(`⏭️  Skipped (exists): ${fileName}`);
      skipped++;
      continue;
    }

    if (DRY_RUN) {
      console.log(`📤 Would upload: ${fileName}`);
      continue;
    }

    try {
      console.log(`📤 Uploading: ${fileName}...`);
      const result = await uploadImage(filePath, fileName);
      console.log(`   ✅ ID: ${result.id}`);
      uploaded++;
    } catch (error) {
      console.error(`   ❌ Failed: ${error.message}`);
      failed++;
    }
  }

  // Save updated manifest
  if (!DRY_RUN && uploaded > 0) {
    writeFileSync(MEDIA_MANIFEST, JSON.stringify(manifest, null, 2));
    console.log(`\n💾 Manifest updated`);
  }

  console.log(`\n📊 Summary: ${uploaded} uploaded, ${skipped} skipped, ${failed} failed`);
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                        Complete!                           ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
}

main().catch(console.error);
