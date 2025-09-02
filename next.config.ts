
import { config } from 'dotenv';
config({ path: '.env.local' });

import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // This is to allow the Next.js dev server to accept requests from the
    // Firebase Studio development environment.
    allowedDevOrigins: [
      'https://*.cluster-ulqnojp5endvgve6krhe7klaws.cloudworkstations.dev',
    ],
  },
};

export default nextConfig;
