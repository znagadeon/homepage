const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PrerenderSPAPlugin = require('prerender-spa-plugin');
const SitemapPlugin = require('sitemap-webpack-plugin').default;

const path = require('path');

const config = require('./config.json');

const { getAllPosts, getAllMetas } = require('./src/lib/builder');

const posts = getAllPosts('./posts');
const metas = getAllMetas(posts);

const tags = Array.from(
	new Set(metas.map((meta) => meta.tags).reduce((a, b) => [...a, ...b], []))
);

const routes = [
	'/index.html',
	'/archive',
	...tags.map((tag) => `/tag/${tag}`),
	...posts.map((page) => page.replace(/posts\/(.+)\.md$/, '/post/$1.html')),
];

module.exports = merge(common, {
	mode: 'production',

	output: {
		filename: '[name]-[chunkhash:10].js',
	},

	module: {
		rules: [
			{
				test: /\.(svg|ttf|woff|woff2|eot)$/,
				loader: 'file-loader',
				options: {
					publicPath: './',
					name: '[name]-[contenthash:10].[ext]',
				},
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'file-loader',
				options: {
					publicPath: './',
					context: './posts',
					name: 'post/[path][name].[ext]',
				},
			},
		],
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

		new PrerenderSPAPlugin({
			staticDir: `${__dirname}/dist`,
			routes,
			postProcess(renderedRoute) {
				renderedRoute.route = renderedRoute.originalRoute;
				if (renderedRoute.route.endsWith('.html')) {
					renderedRoute.outputPath = path.join(
						__dirname,
						'dist',
						renderedRoute.route
					);
				}

				return renderedRoute;
			},

			renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
				renderAfterDocumentEvent: 'ready-to-prerender',
			}),
		}),

		new SitemapPlugin(config.host, routes),
	],
});
