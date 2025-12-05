import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src/styles')],
  },
  experimental: {
    optimizePackageImports: [],
  },
}

export default nextConfig
