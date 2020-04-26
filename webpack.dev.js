const merge = require('webpack-merge');
const common = require('./webpack.common');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./config.json');

module.exports = merge(common, {
    mode: 'development',

    output: {
        filename: '[name].js',
    },

    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        port: 1337,
        open: true,
    },

    module: {
        rules: [{
            test: /\.(svg|ttf|woff|woff2|eot)$/,
            loader: 'file-loader',
            options: {
                publicPath: './',
                name: '[name].[ext]',
            },
        }, {
            test: /\.(png|jpg)/,
            loader: 'file-loader',
            options: {
                publicPath: './',
                name: '[folder]/[name].[ext]',
            }
        }],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new webpack.DefinePlugin({
            IS_DEV: 'true',
        }),
        new HtmlWebpackPlugin({
            template: './layouts/index.pug',
            filename: 'index.html',
            templateParameters: {
                _config: config,
                IS_DEV: true,
            },
            chunks: ['bundle'],
            favicon: './favicon.ico',
        }),
    ],
});
