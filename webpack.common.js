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
			test: /\.[tj]s$/,
			loader: 'babel-loader',
		}, {
			test: /\.pug$/,
			loader: 'pug-loader',
		}],
	},

	plugins: [
		new CleanWebpackPlugin(),
		new VueLoaderPlugin(),
	],
};
