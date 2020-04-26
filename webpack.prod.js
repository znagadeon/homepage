const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');

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

        new PrerenderSPAPlugin({
            staticDir: `${__dirname}/dist`,
            routes: ['/'],
            postProcess (renderedRoute) {
                renderedRoute.route = renderedRoute.originalRoute;
                if (renderedRoute.route.endsWith('.html')) {
                    renderedRoute.outputPath = path.join(__dirname, 'dist', renderedRoute.route);
                }

                return renderedRoute;
            },
            renderAfterDocumentEvent: 'ready-to-prerender',
        }),
    ],
});
