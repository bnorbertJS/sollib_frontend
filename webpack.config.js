const path = require('path');

//const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve('public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  devServer: {
    port: 3000,
    proxy: {
      "/api": "http://[::1]:8000"
    }
  },
  //plugins: [new HtmlWebpackPlugin({template: './index.html'})]
};