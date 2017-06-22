var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');

module.exports = {
  entry: './assets/index.js',

  output: {
    filename: 'index.js',
    path: path.resolve('./vendor'),
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'}) },
      { test: /\.svg$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }
    ]
  },

  plugins: [
    new ExtractTextPlugin({filename: 'style.css', allChunks: true })
  ]
};
