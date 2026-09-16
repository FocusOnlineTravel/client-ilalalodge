# WordPress Blog Migration Guide

Guide for transferring blog posts with media between WordPress sites.

---

## Overview

Standard WordPress export/import often fails to transfer media properly. This guide uses a targeted approach:

1. Extract list of images used by posts
2. Batch download those specific images
3. Upload to new server
4. Import posts via standard WordPress export
5. Search/replace URLs

---

## Prerequisites

- FTP/SFTP access to both servers
- Admin access to both WordPress sites
- ACF plugin installed on new site (if using ACF fields)

---

## Step 1: Import ACF Field Groups (if applicable)

If the old site uses ACF fields (e.g., BANNER for hero images):

1. Export ACF field group JSON from old site (ACF → Tools → Export)
2. Import into new site (ACF → Tools → Import)

Do this **before** importing posts.

---

## Step 2: Extract Image URLs from Old Site

Create this file on the old site:

**File:** `/wp-content/mu-plugins/export-images.php`

```php
<?php
add_action('init', function() {
    if (!isset($_GET['export_blog_images'])) return;
    if (!current_user_can('manage_options')) {
        wp_die('Not authorized');
    }

    global $wpdb;

    $images = [];

    // Get all published posts
    $posts = $wpdb->get_results("
        SELECT ID, post_content
        FROM {$wpdb->posts}
        WHERE post_type = 'post'
        AND post_status = 'publish'
    ");

    // 1. Banner/ACF images (adjust meta_key pattern as needed)
    $banner_ids = $wpdb->get_col("
        SELECT DISTINCT meta_value
        FROM {$wpdb->postmeta} pm
        JOIN {$wpdb->posts} p ON p.ID = pm.post_id
        WHERE p.post_type = 'post'
        AND p.post_status = 'publish'
        AND pm.meta_key LIKE 'banner_slides_%_banner_image'
        AND meta_value != ''
    ");

    foreach ($banner_ids as $attachment_id) {
        if ($attachment_id) {
            $url = wp_get_attachment_url($attachment_id);
            if ($url) $images[] = $url;
        }
    }

    // 2. Images from post content
    foreach ($posts as $post) {
        preg_match_all('/https?:\/\/[^\s"\'<>]+\.(?:jpg|jpeg|png|gif|webp)/i', $post->post_content, $matches);
        if (!empty($matches[0])) {
            $images = array_merge($images, $matches[0]);
        }
    }

    // Remove duplicates and sort
    $images = array_unique($images);
    sort($images);

    header('Content-Type: text/plain');
    echo "# Total images: " . count($images) . "\n\n";
    foreach ($images as $url) {
        echo $url . "\n";
    }
    exit;
}, 1);
```

Visit: `https://old-site.com/?export_blog_images=1` (must be logged in as admin)

Save the output as `images.txt` on your desktop.

---

## Step 3: Batch Download Images (Windows PowerShell)

Open PowerShell and run:

```powershell
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = { $true }
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$urls = Get-Content "$env:USERPROFILE\Desktop\images.txt" | Where-Object { $_ -match "^http" }
foreach ($url in $urls) {
    # IMPORTANT: Update this URL to match your old site
    $path = $url -replace "https?://old-site\.com/wp-content/uploads/", ""
    $localPath = "$env:USERPROFILE\Desktop\uploads\$path"
    $folder = Split-Path $localPath -Parent
    if (!(Test-Path $folder)) { New-Item -ItemType Directory -Path $folder -Force }
    Write-Host "Downloading: $path"
    try {
        Invoke-WebRequest -Uri $url -OutFile $localPath -UseBasicParsing
    } catch {
        Write-Host "Failed: $url" -ForegroundColor Red
    }
}
Write-Host "Done! Downloaded to Desktop\uploads\"
```

**Important:** Update the `-replace` pattern to match your old site's URL.

---

## Step 4: Upload Images to New Server

Via FTP/SFTP:

1. Connect to new site
2. Navigate to `/wp-content/uploads/`
3. Upload the contents of `Desktop\uploads\` (merge with existing folders)

The folder structure (e.g., `2024/09/image.jpg`) will be preserved.

---

## Step 5: Export Posts from Old Site

1. Go to **Tools → Export**
2. Select **Posts**
3. Download the export file (.xml)

---

## Step 6: Import Posts to New Site

1. Go to **Tools → Import**
2. Install WordPress Importer if prompted
3. Upload the export file
4. Assign authors as needed
5. **Do NOT check** "Download and import file attachments" (we already have them)

---

## Step 7: Search/Replace URLs

Install "Better Search Replace" plugin on the new site.

1. Go to **Tools → Better Search Replace**
2. Search for: `https://old-site.com` (the old site URL)
3. Replace with: `https://new-site.com` (the new site URL)
4. Select tables: `wp_posts`, `wp_postmeta`
5. Run as **dry run** first to verify
6. Run for real

---

## Step 8: Cleanup

1. Delete `/wp-content/mu-plugins/export-images.php` from old site
2. Delete `images.txt` and `uploads` folder from desktop
3. Verify posts display correctly on new site

---

## Troubleshooting

### SSL/TLS Errors during download
The PowerShell script includes SSL bypass. Make sure URLs use correct protocol (http vs https).

### Images not displaying after import
- Check the search/replace was successful
- Verify images exist in `/wp-content/uploads/` with correct folder structure
- Check for mixed http/https URLs

### ACF data not showing
- Ensure ACF field group was imported before posts
- Field group keys must match between old and new site

---

## Optional: Copy ACF Images to Featured Image

If the old site used ACF for hero images and you want to migrate them to WordPress Featured Image, run this script after import (via Code Snippets plugin or functions.php):

```php
// Run once then remove
add_action('init', function() {
    if (!isset($_GET['migrate_banner_to_featured']) || !current_user_can('manage_options')) return;

    $posts = get_posts([
        'post_type' => 'post',
        'posts_per_page' => -1,
        'post_status' => 'publish'
    ]);

    $count = 0;
    foreach ($posts as $post) {
        // Skip if already has featured image
        if (has_post_thumbnail($post->ID)) continue;

        // Get first banner slide image
        $banner_slides = get_field('banner_slides', $post->ID);
        if (!empty($banner_slides[0]['banner_image'])) {
            $image_id = $banner_slides[0]['banner_image'];
            set_post_thumbnail($post->ID, $image_id);
            $count++;
        }
    }

    wp_die("Migrated $count posts to use Featured Image.");
});
```

Visit: `https://new-site.com/?migrate_banner_to_featured=1`

---

## Notes

- This process works for any post type - adjust the queries as needed
- For very large migrations (500+ posts), consider batching the image download
- Always test with a few posts first before doing the full migration
