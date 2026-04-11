import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "moretype.fontdue.com",
      },
      {
        protocol: "https",
        hostname: "cdn.fontdue.com",
      },
      {
        protocol: "https",
        hostname: "store.moretype.co.uk",
      },
    ],
  },
};

export default nextConfig;
