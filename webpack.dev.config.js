var webpack = require('webpack');
var merge = require('webpack-merge');
var baseConfig = require('./webpack.config');

module.exports = merge(baseConfig, {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server'
  ],
  devServer: {
    contentBase: 'dist',
    hot: true,
    inline: true,
    historyApiFallback: true
  },
  devtool: 'inline-eval-cheap-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});