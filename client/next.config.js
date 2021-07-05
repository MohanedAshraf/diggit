module.exports = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    domains: ['www.gravatar.com' , 'localhost']
  },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      });
  
      return config;
    }
  
};