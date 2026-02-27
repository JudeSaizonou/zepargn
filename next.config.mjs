const generatedBuildId = String(Date.now());
const isProduction = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      }
    ]
  },
  env: {
    NEXT_PUBLIC_BUILD_ID: process.env.NEXT_PUBLIC_BUILD_ID ?? generatedBuildId,
    NEXT_PUBLIC_SHOW_BUILD_BADGE: process.env.NEXT_PUBLIC_SHOW_BUILD_BADGE ?? (isProduction ? "1" : "0"),
    NEXT_PUBLIC_DEBUG_LAYOUT: process.env.NEXT_PUBLIC_DEBUG_LAYOUT ?? "0"
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }

    return config;
  }
};

export default nextConfig;
