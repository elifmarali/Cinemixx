import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["mui-file-input"],
  images: {
    domains: ["image.tmdb.org"],
  },
};

export default nextConfig;
