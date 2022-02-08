const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const config = require('./config.json');

module.exports = merge(common, {
	mode: 'production',

	entry: './src/entry-client.js',
	output: {
		publicPath: '/',
		path: `${__dirname}/dist/client`,
		filename: 'bundle-[chunkhash:10].min.js',
	},

	module: {
		rules: [{
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
		new VueSSRClientPlugin(),
		new MiniCssExtractPlugin({
			filename: 'style-[contenthash:10].min.css',
		}),
		new webpack.DefinePlugin({
			IS_DEV: 'false',
		}),
		new HtmlWebpackPlugin({
			template: './layouts/index.pug',
			filename: 'layout.html',
			templateParameters: {
				_config: config,
				IS_DEV: false,
			},
			inject: false,
			favicon: './favicon.ico',
			minify: {
				removeComments: false,
			},
		}),

		new SpeedMeasurePlugin(),
	],
});
