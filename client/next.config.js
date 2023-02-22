module.exports = {
  ignoreDuringBuilds: true,
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    domains: ["www.gravatar.com", process.env.APP_DOMAIN],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
