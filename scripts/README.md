# Scripts

This directory contains build and deployment scripts for the Ilala Lodge website.

## Scripts

### `generate-acf.mjs`

Generates the ACF field group export file from TypeScript types.

```bash
npm run generate:acf
# or
node scripts/generate-acf.mjs
```

Output: `wordpress/acf-export.json`

### `push-to-wordpress.mjs`

Pushes content from local JSON files to WordPress via REST API.

```bash
# Dry run (preview changes without making them)
npm run wp:push:dry

# Upload media only
npm run wp:push:media

# Push a single page
node scripts/push-to-wordpress.mjs --only=home

# Full push
npm run wp:push

# Force re-upload all media
node scripts/push-to-wordpress.mjs --force

# Verbose output
node scripts/push-to-wordpress.mjs --verbose
```

#### Options

| Flag | Description |
|------|-------------|
| `--dry-run` | Print payloads without making changes |
| `--only=<slug>` | Only process a specific page slug |
| `--media-only` | Only upload media files |
| `--force` | Force re-upload even if unchanged |
| `--verbose` | Show detailed output |

#### Environment Variables

Set these in `.env.local`:

```env
WP_URL=https://cms.ilalalodge.com
WP_USER=your-username
WP_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx
```

#### Files Created

- `media/manifest.json` - Tracks uploaded media (local path → attachment ID mapping)
- `wordpress/id-map.json` - Tracks page slugs → WordPress post IDs

### `schemas.mjs`

Zod validation schemas derived from `types/sections.ts`. Used by the push script for validation.

## Workflow

1. **First time setup:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your WordPress credentials
   ```

2. **Generate ACF schema:**
   ```bash
   npm run generate:acf
   ```

3. **Test with dry run:**
   ```bash
   npm run wp:push:dry
   ```

4. **Test single page:**
   ```bash
   node scripts/push-to-wordpress.mjs --only=home
   # Check in wp-admin that it looks correct
   ```

5. **Full push:**
   ```bash
   npm run wp:push
   ```

## Media Handling

The push script handles media intelligently:

1. Extracts all local image paths from JSON files
2. Hashes each file to detect changes
3. Checks `media/manifest.json` for existing uploads
4. Only uploads new or changed files
5. Records attachment IDs in the manifest
6. Replaces local paths with attachment IDs in page data

The manifest is committed to git so re-runs don't duplicate media.

## Idempotency

The script is designed to be idempotent:

- Running twice in a row produces zero changes on the second run
- Media is deduplicated by file hash
- Pages are updated if they exist, created if they don't
- All changes are logged with created/updated/skipped counts
