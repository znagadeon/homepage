const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

/**
 * TODO:
 *  - rss
 *  - search/category/tag page
 */
module.exports = {
    context: __dirname,
    entry: {
        bundle: './src/main.js',
    },

    output: {
        publicPath: '/',
        path: `${__dirname}/dist`,
    },

    resolve: {
        alias: {
            '@src': `${__dirname}/src`,
            '@root': __dirname,
        },
    },

    module: {
        rules: [{
            test: /\.md$/,
            loader: './src/loaders/md-loader.js',
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
    ],
}
