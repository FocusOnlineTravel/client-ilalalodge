<?php
/**
 * MU-Plugin: Check if current user is admin (for frontend edit links)
 *
 * Upload to: wp-content/mu-plugins/check-admin-endpoint.php
 *
 * This creates an endpoint that the frontend can call to check if the
 * user is logged into WordPress as an admin. Returns JSON with CORS headers
 * so the frontend domain can read the response.
 */

add_action('rest_api_init', function() {
    register_rest_route('ilala/v1', '/is-admin', array(
        'methods' => 'GET',
        'callback' => function() {
            $is_admin = current_user_can('edit_posts');

            return new WP_REST_Response(array(
                'is_admin' => $is_admin
            ), 200);
        },
        'permission_callback' => '__return_true',
    ));
});

// Add CORS headers for the frontend domain
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        $origin = get_http_origin();
        $allowed_origins = array(
            'https://www.ilalalodge.co.za',
            'https://ilalalodge.co.za',
            'http://localhost:3000',
            'http://localhost:3001',
        );

        if (in_array($origin, $allowed_origins)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Methods: GET, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type');
        }

        return $value;
    });
}, 15);
