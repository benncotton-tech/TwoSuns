import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    qualities: [75, 100],
  },
  async rewrites() {
    return [
      {
        source: "/films/bonde/short-poster.jpg",
        destination: "/films/bonde/poster.jpg",
      },
    ]
  },
}

export default nextConfig
