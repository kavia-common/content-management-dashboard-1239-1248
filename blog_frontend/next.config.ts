import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use standalone output to support dynamic routes and server features without requiring static params.
  output: "standalone",
};

export default nextConfig;
