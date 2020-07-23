const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
  entry: {
    main: [
      '@babel/runtime/regenerator',
      'webpack-hot-middleware/client?reload=true',
      './src/main.js'
    ],
    cards: [
      '@babel/runtime/regenerator',
      '@babel/register',
      'webpack-hot-middleware/client?reload=true',
      './src/pages/cards/cards.js'
    ]
  },
  mode: 'development',
  output: {
    filename: './js/[name]-bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: 'dist',
    overlay: true,
    hot: true
  },
  devtool: 'source-map',
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
          'sass-loader',
          'webpack-import-glob-loader'
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
        test: /\.ttf$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
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
    new webpack.HotModuleReplacementPlugin(),
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
      filename: 'css/[name].css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new SpriteLoaderPlugin()
  ]
};
