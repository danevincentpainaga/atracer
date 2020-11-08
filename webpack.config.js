const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

module.exports = {
  mode: 'development',
  // entry: './src/app/app.js',
  entry: {
    vendor: './src/app/vendor.js',
    main: './src/app/app.js',
  },
  // output: {
  //   filename: 'bundle.js',
  //   path: path.resolve(__dirname, 'dist')
  // },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
    ], 
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    // new MiniCssExtractPlugin({
    //   filename: '[name].css',
    // }),
  ]
};