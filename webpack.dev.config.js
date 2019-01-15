const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  }
});