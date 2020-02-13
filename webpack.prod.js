const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const format = require('date-fns/format');

const { getContentFileInfos, loadPage } = require('./src/lib/builder');
const { renderHome, renderPost } = require('./src/lib/renderer');

const fileInfos = getContentFileInfos('./contents');
const pages = fileInfos.map(fileInfo => loadPage(fileInfo));
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

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash:10].css',
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
