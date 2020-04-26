const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackOnBuildPlugin = require('on-build-webpack');

const { getContentFileInfos, copyAssets } = require('./src/lib/builder');

/**
 * TODO:
 *  - sitemap
 *  - rss
 *  - search/category/tag page
 *  - url replace
 */
module.exports = {
    context: __dirname,
    entry: {
        post: './src/post.js',
        bundle: './src/main.js',
    },

    output: {
        publicPath: '/',
        path: `${__dirname}/dist`,
    },

    resolve: {
        alias: {
            '@root': __dirname,
        },
    },

    module: {
        rules: [{
            test: /\.md$/,
            loader: './src/loaders/meta-loader.js',
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
        }, {
            test: /\.pug$/,
            oneOf: [{
                resourceQuery: /^\?vue/,
                use: ['pug-plain-loader']
            }, {
                use: ['pug-loader']
            }],
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
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),

        new HtmlWebpackPlugin({
            template: './layouts/index.pug',
            filename: 'index.html',
            chunks: ['bundle'],
        }),

        new WebpackOnBuildPlugin(_ => {
            const SRC = './contents', DEST = './dist';
            const { assets } = getContentFileInfos(SRC);
            copyAssets(assets, SRC, DEST);
        }),
    ],
}
