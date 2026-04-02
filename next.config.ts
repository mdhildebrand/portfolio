import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  webpack(config) {
    config.module.rules = config.module.rules.map((rule: any) => {
      if (rule.test?.toString().includes('svg')) {
        return { ...rule, exclude: /\.svg$/ };
      }
      return rule;
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;