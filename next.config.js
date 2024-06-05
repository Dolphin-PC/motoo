/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  reactStrictMode: false,
  webpack(config, { isServer }) {
    // svg file import config
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    config.module.rules.push({
      test: /\.test\.ts$/,
      loader: "ignore-loader",
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    };

    // 빌드시 오류 발생, 클라이언트 라이브러리 종속중 어딘가 fs를 사용하는 듯
    config.resolve.fallback = { fs: false };

    return config;
  },

  async rewrites() {
    return [
      {
        source: "/uapi/:path*",
        destination: `${process.env.NEXT_PUBLIC_VTS_URL}/uapi/:path*`, // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
