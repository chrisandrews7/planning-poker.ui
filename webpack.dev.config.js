var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.config');

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  }
});