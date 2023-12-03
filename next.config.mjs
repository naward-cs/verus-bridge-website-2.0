import './src/config/env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {protocol: 'https', hostname: 'static.coinpaprika.com'},
      {protocol: 'https', hostname: 'assets.coingecko.com'},
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3020', 'betabridge.verustest.net'],
    },
  },
}

export default nextConfig
