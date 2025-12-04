import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // 모든 경로 허용
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src/styles')],
  },
}

export default nextConfig
