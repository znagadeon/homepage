const merge = require('webpack-merge');
const common = require('./webpack.common');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackOnBuildPlugin = require('on-build-webpack');

const format = require('date-fns/format');

const { getContentFileInfos, copyAssets, loadPage } = require('./src/lib/builder');
const { renderHome, renderPost } = require('./src/lib/renderer');

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
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),

        renderHome(
            pages.find(v => v.frontMatter.layout === 'home'),
            posts.slice().sort((a, b) => {
                if (a.frontMatter.published < b.frontMatter.published) return 1;
                if (a.frontMatter.published > b.frontMatter.published) return -1;
                return 0;
            }).slice(0, 5),
        ),
        ...posts.map(post => renderPost(post)),
        new WebpackOnBuildPlugin(_ => {
            const SRC = './contents', DEST = './dist';
            const { assets } = getContentFileInfos(SRC);
            copyAssets(assets, SRC, DEST);
        }),
    ],
});
