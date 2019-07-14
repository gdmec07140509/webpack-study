'use strict';

const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugin = [];

  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))

  Object.keys(entryFiles)
    .map((index) => {
      const entryFile = entryFiles[index];

      // C:/Users/82198/Desktop/webpack/webpack-01/src/search/index.js
      const match = entryFile.match(/src\/(.*)\/index\.js/)
      const pageName = match && match[1];
      // console.log('pageName', pageName)

      entry[pageName] = entryFile;
      htmlWebpackPlugin.push(
        new HtmlWebpackPlugin({
          template: path.join(__dirname, `src/${pageName}/index.html`),
          filename: `${pageName}.html`,
          chunks: [pageName],
          inject: true,
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false
          }
        }),
      )
    })
  console.log('entryFiles', entryFiles)

  return {
    entry,
    htmlWebpackPlugin
  }
}

const { entry, htmlWebpackPlugin } = setMPA();

module.exports = {
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
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
            loader: 'url-loader',
            options: {
              limit: 10240
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin()
  ].concat(htmlWebpackPlugin),
  devServer: {
    contentBase: './dist',
    hot: true
  },
  devtool: 'source-map'
}
