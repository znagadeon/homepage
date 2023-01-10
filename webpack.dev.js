const merge = require('webpack-merge');
const common = require('./webpack.common');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(common, {
	mode: 'development',

	entry: './src/entry-client.js',
	output: {
		publicPath: '/',
		path: `${__dirname}/dist`,
		filename: 'bundle.js',
	},

	devtool: 'inline-source-map',

	module: {
		rules: [{
			test: /\.(svg|ttf|woff|woff2|eot)$/,
			loader: 'file-loader',
			options: {
				publicPath: './',
				name: '[name].[ext]',
			},
		}],
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style.css',
		}),
		new webpack.DefinePlugin({
			IS_DEV: 'true',
		}),
		new HtmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html',
			templateParameters: {
				IS_DEV: true,
			},
			cache: false,
			favicon: './favicon.ico',
		}),

		new BundleAnalyzerPlugin({
			analyzerMode: 'json',
		}),
	],
});
