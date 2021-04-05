const merge = require('webpack-merge');
const common = require('./webpack.common');

const nodeExternals = require('webpack-node-externals');

const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

module.exports = merge(common, {
	mode: 'production',
	target: 'node',

	entry: './src/entry-server.js',
	output: {
		libraryTarget: 'commonjs2',
        path: `${__dirname}/dist/server`,
	},

	devtool: 'source-map',

	module: {
		rules: [{
			test: /\.s?css$/,
			loader: 'null-loader',
		}],
	},

	externals: nodeExternals(),

	plugins: [
		new VueSSRServerPlugin(),
	],
});