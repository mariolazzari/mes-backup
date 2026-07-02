import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enables the creation of a standalone folder which includes
  // only the necessary files for a production deployment.
  output: "standalone",

  // Good practice for production stability
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
