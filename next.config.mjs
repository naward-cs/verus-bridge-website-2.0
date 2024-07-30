;
// import MillionCompiler from '@million/lint'

import './src/config/env.mjs';





/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {protocol: 'https', hostname: 'static.coinpaprika.com'},
      {protocol: 'https', hostname: 'assets.coingecko.com'},
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'localhost:3020',
        'betabridge.verustest.net',
      ],
    },
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
}
//Attempt to use million lint
// const millionConfig = {
//   auto: true,
// }

// export default million.next(nextConfig, millionConfig)
export default nextConfig

// export default MillionCompiler.next({
//   rsc: true, // if used in the app router mode
// })(nextConfig)