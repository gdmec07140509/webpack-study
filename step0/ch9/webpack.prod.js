'use strict';

const path = require('path');
const MinCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: './src/search.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          MinCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MinCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      // {
      //   test: /\.(png|jpg|gif|jpeg)$/,
      //   use: 'file-loader'
      // },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8][ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8][ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MinCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    })
  ]
}
