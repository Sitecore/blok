import type { NextConfig } from "next"
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./registry/**/*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

}

const withMDX = createMDX({
  // You can add remark/rehype plugins here if needed
});

export default withMDX(nextConfig);
