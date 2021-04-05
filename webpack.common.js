const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	context: __dirname,

	resolve: {
		alias: {
			'@src': `${__dirname}/src`,
			'@root': __dirname,
		},
	},

	module: {
		rules: [{
			test: /\.vue$/,
			loader: 'vue-loader',
		}, {
			test: /\.js$/,
			loader: 'babel-loader',
		}, {
			test: /\.pug$/,
			loader: 'pug-loader',
		}, {
			test: /\.(svg|ttf|woff|woff2|eot)$/,
			loader: 'file-loader',
			options: {
				publicPath: './',
				name: '[name].[ext]',
			},
		}],
	},

	plugins: [
		new CleanWebpackPlugin(),
		new VueLoaderPlugin(),
	],
};
