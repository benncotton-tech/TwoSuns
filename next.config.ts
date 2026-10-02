import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // Original poster/still/merch JPEGs. Default optimizer (q=75, small srcset)
    // made the Work slate look soft.
    unoptimized: true,
  },
}

export default nextConfig
