<?php
/**
 * Plugin Name: Headless WordPress Setup
 * Description: Custom post types, REST API enhancements, CORS, and ACF configuration for headless WordPress
 * Version: 1.0.0
 * Author: Ilala Lodge
 */

defined('ABSPATH') || exit;

// =============================================================================
// CONSTANTS
// =============================================================================

define('ILALA_FRONTEND_URL', defined('WP_ENVIRONMENT_TYPE') && WP_ENVIRONMENT_TYPE === 'local'
    ? 'http://localhost:3000'
    : 'https://www.ilalalodge.com');

// =============================================================================
// CORS HEADERS
// =============================================================================

add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        $origin = get_http_origin();
        $allowed_origins = [
            ILALA_FRONTEND_URL,
            'http://localhost:3000',
            'http://localhost:3001',
        ];

        if (in_array($origin, $allowed_origins, true)) {
            header('Access-Control-Allow-Origin: ' . esc_url_raw($origin));
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
        }

        return $value;
    });
}, 15);

// Handle preflight requests
add_action('init', function () {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        $origin = get_http_origin();
        $allowed_origins = [
            ILALA_FRONTEND_URL,
            'http://localhost:3000',
            'http://localhost:3001',
        ];

        if (in_array($origin, $allowed_origins, true)) {
            header('Access-Control-Allow-Origin: ' . esc_url_raw($origin));
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
            header('Access-Control-Max-Age: 86400');
            exit;
        }
    }
});

// =============================================================================
// CUSTOM POST TYPES
// =============================================================================

add_action('init', function () {
    // Rooms CPT
    register_post_type('room', [
        'labels' => [
            'name'          => 'Rooms',
            'singular_name' => 'Room',
            'add_new'       => 'Add New Room',
            'add_new_item'  => 'Add New Room',
            'edit_item'     => 'Edit Room',
            'all_items'     => 'All Rooms',
            'search_items'  => 'Search Rooms',
            'not_found'     => 'No rooms found',
        ],
        'public'            => true,
        'publicly_queryable'=> true,
        'show_ui'           => true,
        'show_in_menu'      => true,
        'show_in_rest'      => true,
        'rest_base'         => 'rooms',
        'menu_icon'         => 'dashicons-admin-home',
        'supports'          => ['title', 'thumbnail', 'custom-fields'],
        'has_archive'       => false,
        'rewrite'           => ['slug' => 'our-rooms'],
    ]);

    // Experiences/Activities CPT (optional - for structured activity data)
    register_post_type('experience', [
        'labels' => [
            'name'          => 'Experiences',
            'singular_name' => 'Experience',
            'add_new'       => 'Add New Experience',
            'add_new_item'  => 'Add New Experience',
            'edit_item'     => 'Edit Experience',
            'all_items'     => 'All Experiences',
            'search_items'  => 'Search Experiences',
            'not_found'     => 'No experiences found',
        ],
        'public'            => true,
        'publicly_queryable'=> true,
        'show_ui'           => true,
        'show_in_menu'      => true,
        'show_in_rest'      => true,
        'rest_base'         => 'experiences',
        'menu_icon'         => 'dashicons-location-alt',
        'supports'          => ['title', 'thumbnail', 'excerpt', 'custom-fields'],
        'has_archive'       => false,
        'rewrite'           => ['slug' => 'experiences'],
    ]);

    // Special Offers CPT
    register_post_type('offer', [
        'labels' => [
            'name'          => 'Special Offers',
            'singular_name' => 'Special Offer',
            'add_new'       => 'Add New Offer',
            'add_new_item'  => 'Add New Special Offer',
            'edit_item'     => 'Edit Special Offer',
            'all_items'     => 'All Special Offers',
            'search_items'  => 'Search Special Offers',
            'not_found'     => 'No special offers found',
        ],
        'public'            => true,
        'publicly_queryable'=> true,
        'show_ui'           => true,
        'show_in_menu'      => true,
        'show_in_rest'      => true,
        'rest_base'         => 'offers',
        'menu_icon'         => 'dashicons-tickets-alt',
        'supports'          => ['title', 'thumbnail', 'excerpt', 'custom-fields'],
        'has_archive'       => false,
        'rewrite'           => ['slug' => 'special-offers'],
    ]);
});

// =============================================================================
// ACF OPTIONS PAGE
// =============================================================================

add_action('acf/init', function () {
    if (function_exists('acf_add_options_page')) {
        acf_add_options_page([
            'page_title'  => 'Site Options',
            'menu_title'  => 'Site Options',
            'menu_slug'   => 'site-options',
            'capability'  => 'edit_posts',
            'redirect'    => false,
            'icon_url'    => 'dashicons-admin-settings',
            'position'    => 2,
            'show_in_rest' => true,
        ]);
    }
});

// =============================================================================
// REST API: EXPOSE ACF OPTIONS
// =============================================================================

add_action('rest_api_init', function () {
    // GET options
    register_rest_route('ilala/v1', '/options', [
        'methods'             => 'GET',
        'callback'            => 'ilala_get_options',
        'permission_callback' => '__return_true',
    ]);

    // POST options (for updates)
    register_rest_route('ilala/v1', '/options', [
        'methods'             => 'POST',
        'callback'            => 'ilala_update_options',
        'permission_callback' => function () {
            return current_user_can('manage_options');
        },
    ]);
});

function ilala_get_options() {
    if (!function_exists('get_fields')) {
        return new WP_Error('acf_not_active', 'ACF is not active', ['status' => 500]);
    }

    $options = get_fields('options');

    // Return empty object if no options set yet
    if (!$options) {
        return new WP_REST_Response([
            'site_name' => get_bloginfo('name'),
            'header'    => [],
            'footer'    => [],
            'contact'   => [],
            'social'    => [],
        ], 200);
    }

    // Resolve image IDs to full image data
    $options = ilala_resolve_images_recursive($options);

    return new WP_REST_Response($options, 200);
}

function ilala_update_options($request) {
    if (!function_exists('update_field')) {
        return new WP_Error('acf_not_active', 'ACF is not active', ['status' => 500]);
    }

    $params = $request->get_json_params();

    if (empty($params)) {
        return new WP_Error('no_data', 'No data provided', ['status' => 400]);
    }

    $updated = [];

    foreach ($params as $field_name => $value) {
        $result = update_field($field_name, $value, 'options');
        if ($result) {
            $updated[] = $field_name;
        }
    }

    return new WP_REST_Response([
        'success' => true,
        'updated' => $updated,
    ], 200);
}

// =============================================================================
// REST API: RESOLVE IMAGE IDS TO FULL DATA
// =============================================================================

/**
 * Field names whose value is an attachment ID and should be resolved to full
 * image data. Anything else (e.g. sharing_price: 190) is left as a number even
 * if the value coincidentally matches an existing attachment ID.
 */
function ilala_image_field_keys() {
    return [
        'image', 'images', 'icon', 'thumbnail', 'photo', 'photos',
        'gallery', 'gallery_images', 'carousel_images', 'hero_image',
        'featured_image', 'background_image', 'og_image', 'video_poster',
        // Gallery page category fields (see components/sections/Gallery.tsx).
        'rooms_gallery', 'dining_gallery', 'pool_bar_gallery',
        'conferencing_gallery', 'wildlife_gallery', 'hotel_grounds_gallery',
        // Homepage bespoke image arrays.
        'dining_images', 'wildlife_images',
        'hero_background_image', 'intro_image', 'room_image',
        'activity_icon', 'cta_banner_image',
    ];
}

/**
 * Recursively resolve ACF image IDs to full image data. Only touches values
 * under whitelisted keys, or numeric-indexed items inside a whitelisted parent
 * (e.g. items in a gallery array).
 */
function ilala_resolve_images_recursive($data, $parent_key = null) {
    if (!is_array($data)) {
        return $data;
    }

    $image_keys = ilala_image_field_keys();

    foreach ($data as $key => $value) {
        // Determine whether the CURRENT key indicates image content. For a
        // list-style parent (e.g. gallery_images: [123, 124]) the child items
        // have numeric indexes but inherit the parent's semantic.
        $key_is_image = in_array($key, $image_keys, true) ||
            (is_int($key) && in_array($parent_key, $image_keys, true));

        if (is_numeric($value) && $value > 0 && $key_is_image) {
            $attachment = get_post($value);
            if ($attachment && $attachment->post_type === 'attachment') {
                $data[$key] = ilala_get_image_data($value);
            }
        } elseif (is_array($value)) {
            $data[$key] = ilala_resolve_images_recursive($value, $key);
        }
    }

    return $data;
}

/**
 * Get full image data from attachment ID
 */
function ilala_get_image_data($attachment_id) {
    if (!$attachment_id) {
        return null;
    }

    $attachment = get_post($attachment_id);
    if (!$attachment || $attachment->post_type !== 'attachment') {
        return null;
    }

    $image_src = wp_get_attachment_image_src($attachment_id, 'full');
    if (!$image_src) {
        return null;
    }

    return [
        'id'      => $attachment_id,
        'url'     => $image_src[0],
        'width'   => $image_src[1],
        'height'  => $image_src[2],
        'alt'     => get_post_meta($attachment_id, '_wp_attachment_image_alt', true) ?: $attachment->post_title,
        'title'   => $attachment->post_title,
        'caption' => $attachment->post_excerpt,
        'sizes'   => [
            'thumbnail' => wp_get_attachment_image_src($attachment_id, 'thumbnail')[0] ?? null,
            'medium'    => wp_get_attachment_image_src($attachment_id, 'medium')[0] ?? null,
            'large'     => wp_get_attachment_image_src($attachment_id, 'large')[0] ?? null,
            'full'      => $image_src[0],
        ],
    ];
}

// =============================================================================
// REST API: ADD RESOLVED IMAGES TO POSTS
// =============================================================================

add_action('rest_api_init', function () {
    // Add resolved ACF fields to pages
    register_rest_field(['page', 'room', 'experience', 'offer', 'post'], 'acf_resolved', [
        'get_callback' => function ($post) {
            if (!function_exists('get_fields')) {
                return null;
            }

            $fields = get_fields($post['id']);
            if (!$fields) {
                return null;
            }

            return ilala_resolve_images_recursive($fields);
        },
        'schema' => [
            'description' => 'Resolved ACF fields with full image data',
            'type'        => 'object',
        ],
    ]);

    // Add SEO fields
    register_rest_field(['page', 'room', 'experience', 'offer', 'post'], 'seo', [
        'get_callback' => function ($post) {
            if (!function_exists('get_field')) {
                return null;
            }

            $seo_title = get_field('seo_title', $post['id']);
            $seo_description = get_field('seo_description', $post['id']);
            $og_image_id = get_field('og_image', $post['id']);

            return [
                'title'       => $seo_title ?: get_the_title($post['id']),
                'description' => $seo_description ?: '',
                'og_image'    => $og_image_id ? ilala_get_image_data($og_image_id) : null,
            ];
        },
        'schema' => [
            'description' => 'SEO meta fields',
            'type'        => 'object',
        ],
    ]);

    // Add featured image resolved
    register_rest_field(['page', 'room', 'experience', 'offer', 'post'], 'featured_image_resolved', [
        'get_callback' => function ($post) {
            $thumbnail_id = get_post_thumbnail_id($post['id']);
            if (!$thumbnail_id) {
                return null;
            }
            return ilala_get_image_data($thumbnail_id);
        },
        'schema' => [
            'description' => 'Resolved featured image data',
            'type'        => 'object',
        ],
    ]);
});

// =============================================================================
// REST API: PAGES BY SLUG ENDPOINT
// =============================================================================

add_action('rest_api_init', function () {
    register_rest_route('ilala/v1', '/page/(?P<slug>.+)', [
        'methods'             => 'GET',
        'callback'            => 'ilala_get_page_by_slug',
        'permission_callback' => '__return_true',
        'args'                => [
            'slug' => [
                'required'          => true,
                'validate_callback' => function ($param) {
                    return is_string($param);
                },
            ],
        ],
    ]);
});

function ilala_get_page_by_slug($request) {
    $slug = $request['slug'];

    // Handle nested slugs by getting the last part
    $slug_parts = explode('/', $slug);
    $page_slug = end($slug_parts);

    $args = [
        'name'        => $page_slug,
        'post_type'   => 'page',
        'post_status' => 'publish',
        'numberposts' => 1,
    ];

    $pages = get_posts($args);

    if (empty($pages)) {
        return new WP_REST_Response(['error' => 'Page not found'], 404);
    }

    $page = $pages[0];

    // Get ACF fields
    $acf_fields = function_exists('get_fields') ? get_fields($page->ID) : [];
    $acf_resolved = ilala_resolve_images_recursive($acf_fields);

    // Get SEO
    $seo_title = function_exists('get_field') ? get_field('seo_title', $page->ID) : '';
    $seo_description = function_exists('get_field') ? get_field('seo_description', $page->ID) : '';
    $og_image_id = function_exists('get_field') ? get_field('og_image', $page->ID) : null;

    return new WP_REST_Response([
        'id'            => $page->ID,
        'title'         => $page->post_title,
        'slug'          => $page->post_name,
        'status'        => $page->post_status,
        'seo'           => [
            'title'       => $seo_title ?: $page->post_title,
            'description' => $seo_description ?: '',
            'og_image'    => $og_image_id ? ilala_get_image_data($og_image_id) : null,
        ],
        'page_sections' => $acf_resolved['page_sections'] ?? [],
        'acf'           => $acf_resolved,
    ], 200);
}

// =============================================================================
// REST API: ALL PAGES ENDPOINT (FOR SSG)
// =============================================================================

add_action('rest_api_init', function () {
    register_rest_route('ilala/v1', '/pages', [
        'methods'             => 'GET',
        'callback'            => 'ilala_get_all_pages',
        'permission_callback' => '__return_true',
    ]);
});

function ilala_get_all_pages() {
    $pages = get_posts([
        'post_type'   => 'page',
        'post_status' => 'publish',
        'numberposts' => -1,
    ]);

    $result = [];

    foreach ($pages as $page) {
        // Get parent slug for nested pages
        $ancestors = get_post_ancestors($page->ID);
        $slug_parts = [$page->post_name];

        foreach ($ancestors as $ancestor_id) {
            $ancestor = get_post($ancestor_id);
            array_unshift($slug_parts, $ancestor->post_name);
        }

        $full_slug = implode('/', $slug_parts);

        $result[] = [
            'id'    => $page->ID,
            'title' => $page->post_title,
            'slug'  => $full_slug,
        ];
    }

    return new WP_REST_Response($result, 200);
}

// =============================================================================
// GRAVITY FORMS REST API
// =============================================================================

// Enable Gravity Forms REST API
add_filter('gform_api_enabled', '__return_true');

// Allow anonymous form submissions via REST
add_filter('gform_rest_api_form_settings_permissions', function ($permissions, $form_id) {
    return ['public'];
}, 10, 2);

// =============================================================================
// DISABLE FRONTEND (OPTIONAL - FOR PURE HEADLESS)
// =============================================================================

// Uncomment the following to redirect all frontend requests to the Next.js frontend
/*
add_action('template_redirect', function () {
    if (!is_admin() && !wp_doing_ajax() && !defined('REST_REQUEST')) {
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        wp_redirect(ILALA_FRONTEND_URL . $path, 301);
        exit;
    }
});
*/

// =============================================================================
// PREVIEW LINKS
// =============================================================================

add_filter('preview_post_link', function ($preview_link, $post) {
    if ($post->post_type === 'page') {
        $slug = $post->post_name;
        return ILALA_FRONTEND_URL . '/api/preview?slug=' . urlencode($slug) . '&secret=' . wp_create_nonce('wp_rest');
    }
    return $preview_link;
}, 10, 2);

// =============================================================================
// ON-DEMAND REVALIDATION
// =============================================================================

/**
 * Trigger Next.js revalidation when content is saved
 */
add_action('save_post', function ($post_id, $post, $update) {
    // Skip autosaves and revisions
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (wp_is_post_revision($post_id)) return;
    if ($post->post_status !== 'publish') return;

    // Only trigger for pages and supported post types
    $supported_types = ['page', 'room', 'experience', 'offer'];
    if (!in_array($post->post_type, $supported_types, true)) return;

    // Get revalidation secret from wp-config.php or environment
    $secret = defined('ILALA_REVALIDATION_SECRET')
        ? ILALA_REVALIDATION_SECRET
        : getenv('REVALIDATION_SECRET');

    if (!$secret) {
        error_log('[Ilala] ILALA_REVALIDATION_SECRET not configured, skipping revalidation');
        return;
    }

    // Build the slug (handle nested pages)
    $slug = $post->post_name;
    $ancestors = get_post_ancestors($post_id);
    foreach (array_reverse($ancestors) as $ancestor_id) {
        $ancestor = get_post($ancestor_id);
        $slug = $ancestor->post_name . '/' . $slug;
    }

    // Trigger revalidation asynchronously
    $revalidation_url = ILALA_FRONTEND_URL . '/api/revalidate';

    $response = wp_remote_post($revalidation_url, [
        'timeout'   => 5,
        'blocking'  => false, // Non-blocking request
        'headers'   => [
            'Authorization' => 'Bearer ' . $secret,
            'Content-Type'  => 'application/json',
        ],
        'body'      => wp_json_encode([
            'slug' => $slug,
            'type' => 'page',
        ]),
    ]);

    if (is_wp_error($response)) {
        error_log('[Ilala] Revalidation failed for ' . $slug . ': ' . $response->get_error_message());
    }
}, 10, 3);

/**
 * Trigger revalidation when ACF options are saved
 */
add_action('acf/save_post', function ($post_id) {
    if ($post_id !== 'options') return;

    $secret = defined('ILALA_REVALIDATION_SECRET')
        ? ILALA_REVALIDATION_SECRET
        : getenv('REVALIDATION_SECRET');

    if (!$secret) return;

    $revalidation_url = ILALA_FRONTEND_URL . '/api/revalidate';

    wp_remote_post($revalidation_url, [
        'timeout'   => 5,
        'blocking'  => false,
        'headers'   => [
            'Authorization' => 'Bearer ' . $secret,
            'Content-Type'  => 'application/json',
        ],
        'body'      => wp_json_encode([
            'type' => 'options',
        ]),
    ]);
});

// =============================================================================
// CLEAN UP HEAD
// =============================================================================

// Remove unnecessary head elements for headless setup
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wp_shortlink_wp_head');
