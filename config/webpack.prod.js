const BrotliPlugin = require('brotli-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    main: ['./src/main.js'],
    cards: ['./src/pages/cards/cards.js']
  },
  mode: 'production',
  output: {
    filename: './js/[name]-bundle.[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'webpack-import-glob-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          'postcss-loader',
          'sass-loader',
          'webpack-import-glob-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attr: ['img:src']
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      {
        test: /\.(jpg|gif|png)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          spriteFilename: './images/sprite.svg',
          publicPath: '/'
        }
      }
    ]
  },
  plugins: [
    new SpriteLoaderPlugin(),
    new OptimizeCssAssetsPlugin(),
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './src/pages/cards/cards.pug',
      filename: 'pages/cards/cards.html',
      excludeChunks: ['main']
    }),
    new HTMLWebpackPlugin({
      template: './src/index.pug',
      filename: 'index.html',
      excludeChunks: ['cards']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new MinifyPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip'
    }),
    new BrotliPlugin()
  ]
};
