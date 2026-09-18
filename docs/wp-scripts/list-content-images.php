<?php
/**
 * List all images in blog post content (FAST - no HTTP checks)
 *
 * Upload to WordPress root and visit:
 * https://your-site.com/list-content-images.php
 *
 * DELETE THIS FILE AFTER USE!
 */

require_once('wp-load.php');

if (!current_user_can('manage_options')) {
    die('Admin access required. Please log in first.');
}

header('Content-Type: text/html; charset=utf-8');

echo "<h1>Images in Post Content</h1>";
echo "<style>body{font-family:monospace;font-size:13px;} img{max-width:150px;height:auto;border:1px solid #ccc;} .broken{background:#fee;} .ok{background:#efe;} td{padding:5px;vertical-align:top;border-bottom:1px solid #ddd;}</style>";

$posts = get_posts(array(
    'post_type' => 'post',
    'post_status' => 'publish',
    'posts_per_page' => -1,
));

$all_images = array();
$upload_dir = wp_upload_dir();
$upload_basedir = $upload_dir['basedir'];
$upload_baseurl = $upload_dir['baseurl'];

echo "<table border='0' cellspacing='0'>";
echo "<tr><th>Post</th><th>Image</th><th>Preview</th><th>Local File?</th></tr>";

foreach ($posts as $post) {
    preg_match_all('/<img[^>]+src=["\']([^"\']+)["\']/', $post->post_content, $matches);

    if (!empty($matches[1])) {
        foreach ($matches[1] as $img_url) {
            // Convert URL to local path
            $local_path = str_replace($upload_baseurl, $upload_basedir, $img_url);
            $file_exists = file_exists($local_path);
            $class = $file_exists ? 'ok' : 'broken';

            echo "<tr class='{$class}'>";
            echo "<td><a href='" . admin_url("post.php?post={$post->ID}&action=edit") . "' target='_blank'>{$post->post_title}</a></td>";
            echo "<td style='max-width:400px;word-break:break-all;'>{$img_url}</td>";
            echo "<td><img src='{$img_url}' onerror=\"this.style.display='none'\"></td>";
            echo "<td>" . ($file_exists ? "YES" : "<strong>NO</strong>") . "</td>";
            echo "</tr>";

            if (!$file_exists) {
                $all_images[] = $img_url;
            }
        }
    }
}

echo "</table>";

$unique_missing = array_unique($all_images);

if (!empty($unique_missing)) {
    echo "<h2>Missing Images (" . count($unique_missing) . ")</h2>";
    echo "<textarea style='width:100%;height:300px;'>";
    foreach ($unique_missing as $url) {
        echo $url . "\n";
    }
    echo "</textarea>";
}

echo "<p><strong>DELETE THIS FILE WHEN DONE!</strong></p>";
