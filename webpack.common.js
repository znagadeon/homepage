const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const formatISO = require('date-fns/formatISO');

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
        }, {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
            ],
        }],
    },

    plugins: [
        renderHome(
            pages.find(v => v.frontMatter.layout === 'home'),
            posts.slice().sort((a, b) => {
                if (a.published < b.published) return -1;
                if (a.published > b.published) return 1;
                return 0;
            }).slice(0, 5),
        ),
        ...posts.map(post => renderPost(post)),
        new CleanWebpackPlugin(),
    ],
}
