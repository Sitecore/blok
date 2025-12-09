import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/beta",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
