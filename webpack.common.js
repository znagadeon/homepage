const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackOnBuildPlugin = require('on-build-webpack');

const { getContentFileInfos, copyAssets } = require('./src/lib/builder');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

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
        // home: './src/home.js',
        // post: './src/post.js',
        bundle: './src/main.js',
    },

    output: {
        publicPath: '/',
        path: `${__dirname}/dist`,
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
        new WebpackOnBuildPlugin(_ => {
            const SRC = './contents', DEST = './dist';
            const { assets } = getContentFileInfos(SRC);
            copyAssets(assets, SRC, DEST);
        }),
        new VueLoaderPlugin(),
    ],
}
