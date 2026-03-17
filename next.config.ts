import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "moretype.fontdue.com",
      },
    ],
  },
};

export default nextConfig;
