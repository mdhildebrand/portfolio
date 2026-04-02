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
    // Find and fully remove any existing SVG rules
    config.module.rules = config.module.rules.filter((rule: any) => {
      if (rule.test?.toString().includes('svg')) return false;
      if (rule.oneOf) {
        rule.oneOf = rule.oneOf.filter((r: any) => !r.test?.toString().includes('svg'));
      }
      return true;
    });

    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
