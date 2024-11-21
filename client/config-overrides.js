const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    'public': path.resolve(__dirname, 'frontend/public'),
    'src': path.resolve(__dirname, 'frontend/src')
  })
);
