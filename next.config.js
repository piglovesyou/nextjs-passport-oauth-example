module.exports = {
  webpack(config, { isServer }) {

    // Suppress warnings
    if (!isServer) {
      config.node = {
        fs: 'empty',
        net: 'empty',
      };
    }

    return config;
  },
};
