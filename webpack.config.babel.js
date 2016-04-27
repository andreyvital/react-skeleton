import webpack from 'webpack'
import yargs from 'yargs'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const {optimizeMinimize} = yargs.alias('p', 'optimize-minimize').argv
const nodeEnv            = optimizeMinimize ? 'production' : 'development'

const __PORT__ = 8005

export default {
  devtool: optimizeMinimize ? 'source-map' : null,

  entry: './src/index',

  output: {
    path: './build',
    filename: optimizeMinimize ? '[name].min.js' : '[name].js',
    hash: true
  },

  module: {
    loaders: [
      {test: /\.js/, loader: 'babel', exclude: /node_modules/}
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {'NODE_ENV': JSON.stringify(nodeEnv)}
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
