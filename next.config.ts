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
};

export default nextConfig;
