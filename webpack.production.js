// webpack v4
// A quick description of how rules usually work:
// {
//     test: /\.YOUR_FILE_EXTENSION$/,
//     exclude: /SOMETHING THAT IS THAT EXTENSION BUT SHOULD NOT BE PROCESSED/,
//     use: {
//       loader: "loader for your file extension  or a group of loaders"
//     }
// }
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const WebpackMd5Hash = require('webpack-md5-hash');
module.exports = {
  mode: "production",
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].[chunkhash].js'
  },
	module: {
    rules: [
      {
        test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: [
        {loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
      }},
      'webpack-import-glob-loader'
      ]
  },
    // {
    //   test: /\.(png|jpg|gif)$/,
    //   use: [
    //     {
    //       loader: 'file-loader',
    //       options: {name: 'img/[name].[ext]'}
    //     }]},
    {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/scss'),
        use:  [
        MiniCssExtractPlugin.loader,
         {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            url: false
          }
        },
        //  {
        //   loader: 'resolve-url-loader'
        //  },
        'postcss-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            sourceMapContents: false
          }
        },
        'webpack-import-glob-loader'
        ],

      },
      {
        test: /\.pug$/,
        use: ['pug-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist', {} ),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.[contenthash].css',

    }),

    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.pug',
      filename: 'index.html'

    }),

    new WebpackMd5Hash(),
    // new CopyWebpackPlugin([
    //   {
    //     from: './src/img',
    //     to: './img'
    //   },
    //   {
    //     from: './src/fonts',
    //     to: './fonts'
    //   }

    // ]),
  ]
};
