const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'production',

  context: __dirname,
  entry: './src/entry-client.js',
  output: {
    publicPath: '/',
    path: `${__dirname}/dist`,
    filename: 'bundle-[chunkhash:10].min.js',
  },

  resolve: {
    alias: {
      '@src': `${__dirname}/src`,
      '@root': __dirname,
    },
    extensions: ['.js', '.ts', '.vue'],
  },

  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
    }, {
      test: /\.[tj]s$/,
      loader: 'babel-loader',
    }, {
      test: /\.pug$/,
      loader: 'pug-loader',
    }, {
      test: /\.s?css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'sass-loader',
      ],
    }, {
      test: /\.(svg|ttf|woff|woff2|eot)$/,
      loader: 'file-loader',
      options: {
        publicPath: './',
        name: '[name]-[contenthash:10].[ext]',
      },
    }],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style-[contenthash:10].min.css',
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
      IS_DEV: 'false',
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      templateParameters: {
        IS_DEV: false,
      },
      favicon: './favicon.ico',
      minify: {
        removeComments: false,
      },
    }),

    new SpeedMeasurePlugin(),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
  ],
};
