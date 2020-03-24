const path = require('path');

module.exports = {
  webpack(config, { isServer }) {

    // Suppress warnings
    if (!isServer) {
      const serverSideModules = ['lib/composePassport']
      serverSideModules.forEach(rel => {
        config.resolve.alias[path.join(__dirname, rel)] = 'empty'
      })
    }

    return config;
  },
};
