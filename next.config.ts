import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    dangerouslyAllowSVG: true,
    disableStaticImages: true,
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  webpack(config, { isServer }) {
    console.log('webpack config running, isServer:', isServer);
    console.log('SVG rules:', JSON.stringify(
      config.module.rules.filter((rule: any) => 
        rule.test?.toString().includes('svg')
      ), null, 2
    ));
    
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;