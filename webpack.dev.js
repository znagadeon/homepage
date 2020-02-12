const merge = require('webpack-merge');
const common = require('./webpack.common');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const formatISO = require('date-fns/formatISO');

const { getContentFileInfos, loadPage } = require('./src/lib/builder');
const { renderHome, renderPost } = require('./src/lib/renderer');

const fileInfos = getContentFileInfos('./contents');
const pages = fileInfos.map(fileInfo => loadPage(fileInfo));
const posts = pages
    .filter(page => page.frontMatter.layout === 'post')
    .map(post => ({
        ...post,
        frontMatter: {
            ...post.frontMatter,
            published: formatISO(new Date(), { representation: 'date' }),
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
                if (a.published < b.published) return -1;
                if (a.published > b.published) return 1;
                return 0;
            }).slice(0, 5),
        ),
        ...posts.map(post => renderPost(post)),
    ],
});
