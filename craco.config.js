/* craco.config.js */
const path = require('path');
const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = {
  webpack: {
    alias: {
      '@models': resolvePath('src/models'),
      '@stores': resolvePath('src/stores'),
    },
  },
};
