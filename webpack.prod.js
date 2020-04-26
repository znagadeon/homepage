const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const format = require('date-fns/format');

const { getContentFileInfos, loadPage } = require('./src/lib/builder');
const { renderPost } = require('./src/lib/renderer');

const fileInfos = getContentFileInfos('./contents');
const pages = fileInfos.pages.map(fileInfo => loadPage(fileInfo));
const posts = pages
    .filter(page => page.frontMatter.layout === 'post' && !page.frontMatter.draft)
    .map(post => ({
        ...post,
        frontMatter: {
            ...post.frontMatter,
            published: format(post.frontMatter.published, 'yyyy-MM-dd'),
        },
    }));

module.exports = merge(common, {
    mode: 'production',

    output: {
        filename: '[name]-[chunkhash:10].js',
    },

    module: {
        rules: [{
            test: /\.(svg|ttf|woff|woff2|eot)$/,
            loader: 'file-loader',
            options: {
                publicPath: './',
                name: '[name]-[contenthash:10].[ext]',
            },
        }],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash:10].css',
        }),

        ...posts.map(post => renderPost(post)),
        new HtmlWebpackPlugin({
            template: './layouts/index.pug',
            filename: 'index.html',
            chunks: ['bundle'],
        }),
    ],
});
