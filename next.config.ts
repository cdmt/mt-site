import type { NextConfig } from "next";
import { withFontdue } from "fontdue-js/next/config";

const nextConfig = {
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
} satisfies NextConfig;

export default withFontdue(nextConfig);
