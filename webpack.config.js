'use strict';

require('dotenv').config();

const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');
const CleanPlugin = require('webpack-clean-plugin');

let production = process.env.NODE_ENV === 'production';

let plugins = [
  new HtmlPlugin({template: `${__dirname}/app/index.html`}),
  new ExtractText('bundle-[hash].css'),
  new webpack.DefinePlugin({
    __API_URL__: JSON.stringify(process.env.API_URL),
  }),
];

let output = {
    path: `${__dirname}/build`,
    filename: 'bundle-[hash].js',
};

if(production){
  plugins = plugins.concat([
    new CleanPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false,
      },
    }),
  ])

  output.publicPath = 'https://d2tj2ugz5ikfhq.cloudfront.net'
}

module.exports = {
  plugins,
  output,
  devtool: 'eval',
  devServer: { historyApiFallback: true },
  entry: `${__dirname}/app/entry.js`,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractText.extract(['css-loader', 'sass-loader']),
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
      },
      {
        test: /\.svg$/,
        loader: 'url-loader',
      },
    ],
  },
};
