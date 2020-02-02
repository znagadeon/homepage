const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const formatISO = require('date-fns/formatISO');

const { getContentFileInfos, loadPage } = require('./src/lib/builder');
const { renderPage } = require('./src/lib/renderer');

const fileInfos = getContentFileInfos('./contents');
const pages = fileInfos.map(fileInfo => loadPage(fileInfo));
const posts = pages
    .filter(page => page.frontMatter.layout === 'post' && !page.frontMatter.draft)
    .map(post => ({
        ...post,
        frontMatter: {
            ...post.frontMatter,
            published: formatISO(post.frontMatter.published, { representation: 'date' }),
        },
    }));

/**
 * TODO:
 *  - copy attachment
 *  - sitemap
 *  - rss
 *  - search/category/tag page
 *  - url replace
 *  - opengraph
 */
module.exports = {
    context: __dirname,
    entry: {
        bundle: './src/index.js',
    },
    output: {
        path: `${__dirname}/dist`,
        filename: '[name]-[chunkhash:10].js',
    },

    module: {
        rules: [{
            test: /\.pug$/,
            loader: 'pug-loader',
        }],
    },

    plugins: [
        renderPage('home', pages.find(v => v.frontMatter.layout === 'home'), []),
        ...posts.map(post => renderPage('post', post), []),
        new CleanWebpackPlugin(),
    ],
}
