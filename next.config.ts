import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["blog.viking-hvac.com"],
  },
};

export default nextConfig;
