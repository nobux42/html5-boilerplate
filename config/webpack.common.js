const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PrettierPlugin = require('prettier-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const paths = require('./paths');

module.exports = {
  entry: [paths.src + '/index.js'],

  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      favicon: paths.src + '/images/favicon.png',
      template: paths.src + '/index.html', // template file
      filename: 'index.html', // output file
    }),
    new HtmlWebpackPlugin({
      template: paths.src + '/detail.html',
      filename: 'detail.html',
    }),
    new ESLintPlugin({
      files: ['.', 'src', 'config'],
      formatter: 'table',
    }),
    new PrettierPlugin(),
  ],

  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.js$/, use: ['babel-loader'] },
      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
    },
  },
};
