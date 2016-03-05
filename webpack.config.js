var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: ['babel-polyfill', './src/server'],
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js'
  },
  module: {
      loaders: [
        {
          test: /(\.js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /(\.jsx|\.js)$/,
          loader: "eslint-loader",
          exclude: /node_modules/
        }
      ]
  },
  devServer: {
    contentBase: './app/build'
  },
  devtool: 'sourcemap',
  externals: nodeModules
};
