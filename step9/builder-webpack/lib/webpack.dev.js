const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const path = require('path');

const webpack = require('webpack')

const devConfig = {
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
  },
  mode: 'development',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: '../dist',
    hot: true,
    stats: 'errors-only'
  },
  devtool: 'source-map'
}

module.exports = merge(baseConfig, devConfig)
