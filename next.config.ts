import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true,
              dimensions: false,
            },
          },
        ],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;