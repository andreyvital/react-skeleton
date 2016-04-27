'use strict'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const __PRODUCTION__ = process.env.NODE_ENV === 'production'
const __DEV__        = ! __PRODUCTION__
const __PORT__       = 8005

module.exports = {
  devtool: __PRODUCTION__ ? 'source-map' : null,

  entry: './src/index',

  output: {
    path: './build',
    filename: __PRODUCTION__ ? '[name].min.js' : '[name].js',
    hash: true
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    })
  ],

  devServer: {
    port: __PORT__,
    contentBase: './build',
    filename: '[name].js'
  }
}
