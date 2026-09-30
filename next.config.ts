import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Originals in public/images are never modified: resizing and format conversion happen at request time.
    formats: ["image/avif", "image/webp"],
    // Only files under /images may be optimized; the ?v= query is the cache-busting version from src/lib/images.ts.
    localPatterns: [{ pathname: "/images/**" }],
  },
};

export default nextConfig;
