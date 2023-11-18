


import './src/config/env.mjs';





/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3020', 'betabridge.verustest.net'],
    },
  },
}

export default nextConfig