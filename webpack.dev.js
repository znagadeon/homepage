const merge = require('webpack-merge');
const common = require('./webpack.common');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const config = require('./config.json');

module.exports = merge(common, {
	mode: 'development',

	entry: './src/entry-client.js',
	output: {
		publicPath: '/',
		path: `${__dirname}/dist/client`,
		filename: 'bundle.js',
	},

	devtool: 'inline-source-map',

	module: {
		rules: [{
			test: /\.s?css$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader',
				'sass-loader',
			],
		}],
	},

	plugins: [
		new VueSSRClientPlugin(),
		new MiniCssExtractPlugin({
			filename: 'style.css',
		}),
		new webpack.DefinePlugin({
			IS_DEV: 'true',
		}),
		new HtmlWebpackPlugin({
			template: './layouts/index.pug',
			filename: 'layout.html',
			templateParameters: {
				_config: config,
				IS_DEV: true,
			},
			cache: false,
			inject: false,
			favicon: './favicon.ico',
		}),

		new BundleAnalyzerPlugin({
			openAnalyzer: false,
		}),
	],
});
