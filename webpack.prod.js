const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./config.json');

module.exports = merge(common, {
	mode: 'production',

	output: {
		filename: '[name]-[chunkhash:10].js',
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
			filename: '[name]-[contenthash:10].css',
		}),
		new webpack.DefinePlugin({
			IS_DEV: 'false',
		}),
		new HtmlWebpackPlugin({
			template: './layouts/index.pug',
			filename: 'index.html',
			templateParameters: {
				_config: config,
				IS_DEV: false,
			},
			chunks: ['bundle'],
			favicon: './favicon.ico',
		}),
	],
});
