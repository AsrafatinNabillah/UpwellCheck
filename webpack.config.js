const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/UpwellCheck/'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/manifest.json', to: 'manifest.json'},
        { from: './src/icons/icon-192x192.png', to: 'icon-192x192.png' },
        { from: './src/icons/icon-512x512.png', to: 'icon-512x512.png' },
        { from: './src/ocean.png', to: 'ocean.png' },
        { from: './src/peta.jpg', to: 'peta.jpg' },
        { from: './src/sw.js', to: 'sw.js' },
        { from: './src/UpwellCheck.png', to: 'UpwellCheck.png' }
      ]
    }),
  ],
  devServer: {
    static: './dist',
    open: true,
  },
  mode: 'production',
};
