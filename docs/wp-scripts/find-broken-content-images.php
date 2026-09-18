<?php
/**
 * Find broken images in blog post content
 *
 * Upload to WordPress root and visit:
 * https://your-site.com/find-broken-content-images.php
 *
 * DELETE THIS FILE AFTER USE!
 */

require_once('wp-load.php');

if (!current_user_can('manage_options')) {
    die('Admin access required. Please log in first.');
}

header('Content-Type: text/plain');

echo "=== SCANNING POST CONTENT FOR BROKEN IMAGES ===\n\n";

$posts = get_posts(array(
    'post_type' => 'post',
    'post_status' => 'publish',
    'posts_per_page' => -1,
));

$broken_images = array();
$checked = 0;

foreach ($posts as $post) {
    // Find all image URLs in content
    preg_match_all('/<img[^>]+src=["\']([^"\']+)["\']/', $post->post_content, $matches);

    if (!empty($matches[1])) {
        foreach ($matches[1] as $img_url) {
            $checked++;

            // Skip external images
            if (strpos($img_url, 'ilalalodge') === false && strpos($img_url, home_url()) === false) {
                continue;
            }

            // Check if image exists
            $headers = @get_headers($img_url);
            $exists = $headers && strpos($headers[0], '200') !== false;

            if (!$exists) {
                $broken_images[] = array(
                    'post_id' => $post->ID,
                    'post_title' => $post->post_title,
                    'image_url' => $img_url,
                );
                echo "BROKEN: {$img_url}\n";
                echo "  Post: {$post->post_title} (ID: {$post->ID})\n";
                echo "  Edit: " . admin_url("post.php?post={$post->ID}&action=edit") . "\n\n";
            }
        }
    }
}

echo "\n=== SUMMARY ===\n";
echo "Posts scanned: " . count($posts) . "\n";
echo "Images checked: {$checked}\n";
echo "Broken images: " . count($broken_images) . "\n";

if (!empty($broken_images)) {
    echo "\n=== BROKEN IMAGE URLs (for download) ===\n";
    $unique_urls = array_unique(array_column($broken_images, 'image_url'));
    foreach ($unique_urls as $url) {
        echo $url . "\n";
    }
}

echo "\n\nDELETE THIS FILE WHEN DONE!\n";
