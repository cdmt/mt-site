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
    ],
  },
};

export default nextConfig;
