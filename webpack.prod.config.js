var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.config');

module.exports = merge(baseConfig, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'vendor.js',
      minChunks: function(module) {
        if (module.resource && (/^.*\css|less$/).test(module.resource)) {
          return false;
        }
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    })
  ]
});