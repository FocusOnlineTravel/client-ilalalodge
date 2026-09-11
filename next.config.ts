import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend-ilalalodge.focusonlinetravel.co.za",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "cms.ilalalodge.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  async headers() {
    return [
      {
        // Cache static assets for 1 year
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|woff|woff2|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache fonts directory
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Old site structure redirects
      { source: '/the-cassia-restaurant', destination: '/dining', permanent: true },
      { source: '/the-hotel/rooms', destination: '/our-rooms', permanent: true },
      { source: '/the-hotel/facilities', destination: '/facilities', permanent: true },
      { source: '/the-hotel/rooms/classic-rooms', destination: '/our-rooms/classic-rooms', permanent: true },
      { source: '/the-hotel/specials', destination: '/special-offers', permanent: true },
      { source: '/the-hotel/rooms/deluxe-rooms', destination: '/our-rooms/deluxe-rooms', permanent: true },
      { source: '/the-hotel/rates', destination: '/rates', permanent: true },
      { source: '/the-hotel/rooms/classic-suites', destination: '/our-rooms/classic-suites', permanent: true },
      { source: '/the-hotel/rooms/executive-suites', destination: '/our-rooms/executive-suites', permanent: true },
      { source: '/the-hotel/rooms/strathearn-suite', destination: '/our-rooms/strathearn-suite', permanent: true },
      { source: '/the-hotel', destination: '/facilities', permanent: true },
      { source: '/the-lodge/rooms/standard-rooms', destination: '/our-rooms/classic-rooms', permanent: true },

      // Gallery redirects
      { source: '/gallery/the-rooms', destination: '/gallery', permanent: true },
      { source: '/gallery/the-surrounds', destination: '/gallery', permanent: true },
      { source: '/gallery/the-activities', destination: '/gallery', permanent: true },
      { source: '/gallery/cassia-restaurant', destination: '/gallery', permanent: true },
      { source: '/gallery/the-pool', destination: '/gallery', permanent: true },
      { source: '/gallery/poolside-bar', destination: '/gallery', permanent: true },
      { source: '/gallery/reception', destination: '/gallery', permanent: true },
      { source: '/videos', destination: '/gallery', permanent: true },

      // Info page redirects
      { source: '/plan-your-trip', destination: '/faqs', permanent: true },
      { source: '/about/ilala-frequently-asked-questions', destination: '/faqs', permanent: true },
      { source: '/guest-information', destination: '/faqs', permanent: true },
      { source: '/about', destination: '/our-story', permanent: true },
    ];
  },
};

export default nextConfig;
