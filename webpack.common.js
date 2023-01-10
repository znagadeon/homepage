const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
	context: __dirname,

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
		}],
	},

	plugins: [
		new webpack.DefinePlugin({
			__VUE_OPTIONS_API__: 'true',
			__VUE_PROD_DEVTOOLS__: 'false',
		}),
		new CleanWebpackPlugin(),
		new VueLoaderPlugin(),
	],
};
