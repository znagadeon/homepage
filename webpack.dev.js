const merge = require('webpack-merge');
const common = require('./webpack.common');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const format = require('date-fns/format');

const { getContentFileInfos, loadPage } = require('./src/lib/builder');
const { renderPost } = require('./src/lib/renderer');

const fileInfos = getContentFileInfos('./contents');
const pages = fileInfos.pages.map(fileInfo => loadPage(fileInfo));
const posts = pages
    .filter(page => page.frontMatter.layout === 'post')
    .map(post => ({
        ...post,
        frontMatter: {
            ...post.frontMatter,
            published: format(post.frontMatter.published || new Date(), 'yyyy-MM-dd'),
        },
    }));

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
        }],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),

        ...posts.map(post => renderPost(post)),
    ],
});
