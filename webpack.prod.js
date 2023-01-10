const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',

	entry: './src/entry-client.js',
	output: {
		publicPath: '/',
		path: `${__dirname}/dist`,
		filename: 'bundle-[chunkhash:10].min.js',
	},

	module: {
		rules: [{
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
	],
});
