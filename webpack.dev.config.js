var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.config');

module.exports = merge(baseConfig, {
  mode: 'development',
  // module: {
  //   rules: [
  //     {
  //       test: /\.js|jsx$/,
  //       exclude: /node_modules/,
  //       use: {
  //         loader: 'babel-loader'
  //       }
  //     }
  //   ]
  // },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  }
});