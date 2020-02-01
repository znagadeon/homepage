const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const marked = require('marked');
const formatISO = require('date-fns/formatISO');

const config = require('./config');

const { getContentFileInfos, loadPage } = require('./src/lib/builder');

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

const generatePlugin = (templateName, meta, chunks) => {
    return new HtmlWebpackPlugin({
        filename: meta.frontMatter.path.replace(/contents\/(.+)\.md$/, '$1.html'),
        template: `./layouts/${templateName}.pug`,
        templateParameters() {
            return {
                _config: config,
                _body: marked(meta.markdown),
                ...meta.frontMatter,
            };
        },
        chunks,
    });
};

/**
 * TODO:
 *  - copy attachment
 *  - sitemap
 *  - rss
 *  - search/category/tag page
 *  - url replace
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
        generatePlugin('home', pages.find(v => v.frontMatter.layout === 'home'), []),
        ...posts.map(post => generatePlugin('post', post), []),
        new CleanWebpackPlugin(),
    ],
}
