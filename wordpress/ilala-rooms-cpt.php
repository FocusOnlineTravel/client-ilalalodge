<?php
/**
 * Plugin Name: Ilala Lodge - Room CPT
 * Description: Registers the Room custom post type for Ilala Lodge Hotel
 * Version: 1.0
 * Author: Focus Online
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Room Custom Post Type
 */
function ilala_register_room_cpt() {
    $labels = array(
        'name'                  => 'Rooms',
        'singular_name'         => 'Room',
        'menu_name'             => 'Rooms',
        'name_admin_bar'        => 'Room',
        'add_new'               => 'Add New',
        'add_new_item'          => 'Add New Room',
        'new_item'              => 'New Room',
        'edit_item'             => 'Edit Room',
        'view_item'             => 'View Room',
        'all_items'             => 'All Rooms',
        'search_items'          => 'Search Rooms',
        'not_found'             => 'No rooms found.',
        'not_found_in_trash'    => 'No rooms found in Trash.',
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'show_in_rest'       => true,  // Enable REST API
        'query_var'          => true,
        'rewrite'            => array('slug' => 'rooms'),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-bed',
        'supports'           => array('title', 'editor', 'thumbnail', 'custom-fields'),
    );

    register_post_type('room', $args);
}
add_action('init', 'ilala_register_room_cpt');

/**
 * Flush rewrite rules on activation
 */
function ilala_rooms_activate() {
    ilala_register_room_cpt();
    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'ilala_rooms_activate');

/**
 * Flush rewrite rules on deactivation
 */
function ilala_rooms_deactivate() {
    flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'ilala_rooms_deactivate');
