const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const paths = require('./paths');

module.exports = merge(common, {
  mode: 'production',
  devtool: false,

  output: {
    path: paths.build,
    filename: 'js/[name].[contenthash].bundle.js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              importLoaders: 2,
              modules: false,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],

  },

  plugins: [
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
  ],

  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
    runtimeChunk: {
      name: 'runtime',
    },
  },
  
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
