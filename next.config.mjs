/** @type {import('next').NextConfig} */
import "dotenv/config";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.switchx.dev",
        pathname: "/api/mocks/images/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "*.imgur.com",
      },
      {
        protocol: "https",
        hostname: "pixijs.com",
        pathname: "/assets/**",
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  reactStrictMode: false,

  output: "standalone",

  experimental: {
    largePageDataBytes: 128 * 100000,
  },

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
          { key: "Access-Control-Allow-Headers", value: "*" },
        ],
      },
    ];
  },

  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.performance = {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
      };

      // Completely disable error overlay
      config.resolve = {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          "next/dist/compiled/react-dev-overlay": false,
        },
      };

      // Enable source maps in development only
      config.devtool = "source-map";
    }

    return config;
  },
};

export default nextConfig;
