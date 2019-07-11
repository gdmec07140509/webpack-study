'use strict';

const glob = require('glob');
const path = require('path');
const MinCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

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
          chunks: ['vendors', pageName, 'commons'],
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
    filename: '[name]_[chunkhash:8].js',
  },
  mode: 'production',
  module: {
    rules: [{
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
        'less-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              require('autoprefixer')({
                overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
              })
            ]
          }
        },
        {
          loader: 'px2rem-loader',
          options: {
            remUnit: 75,
            remPrecision: 8
          }
        }
      ]
    },
    // {
    //   test: /\.(png|jpg|gif|jpeg)$/,
    //   use: 'file-loader'
    // },
    {
      test: /\.(png|jpg|gif|jpeg)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name]_[hash:8][ext]'
        }
      }]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name]_[hash:8][ext]'
        }
      }]
    }
    ]
  },
  plugins: [
    new MinCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new CleanWebpackPlugin(),
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: 'react',
    //       entry: 'http://11.url.cn/now/lib/16.2.0/react.min.js',
    //       global: 'React'
    //     },{
    //       module: 'react-dom',
    //       entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
    //       global: 'ReactDOM'
    //     },
    //   ],
    // })
  ].concat(htmlWebpackPlugin),
  // 把react react-dom提取出来
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /(react|react-dom)/,
  //         name: 'vendors',
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // },
  // 提取公共文件
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  }
  // devtool:'inline-source-map'
}
