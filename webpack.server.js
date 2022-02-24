const merge = require('webpack-merge');
const common = require('./webpack.common');

const nodeExternals = require('webpack-node-externals');

module.exports = merge(common, {
	target: 'node',

	entry: './src/entry-server.js',
	output: {
		library: {
			type: 'commonjs2',
		},
		path: `${__dirname}/dist/server`,
		filename: 'run-server.js',
	},

	devtool: 'source-map',

	module: {
		rules: [{
			test: /\.s?css$/,
			loader: 'null-loader',
		}],
	},

	externals: nodeExternals(),
});
