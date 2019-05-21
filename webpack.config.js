



const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');





module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',

  },
  module: {
    rules: [

      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/scss'),
        use: [
          'style-loader',
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
        use: ['pug-loader']
      },
      {
        test: /\.js$/,
        use: 'webpack-import-glob-loader'
    }

    ]
  },
  plugins: [

    // new CopyWebpackPlugin([
    //   {
    //     from: './src/img',
    //     to: './img'
    //   // },
    // //   {
    // //     from: './src/css',
    // //     to: './css'
    //   }

    // ]),

    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.pug',
      filename: 'index.html'

    }),
  ]
};
