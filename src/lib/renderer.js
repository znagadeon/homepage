const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('../../config');

const { md2html } = require('./md-converter');

const path2url = path => path.replace(/contents\/(.+)\.md$/, '$1.html')

const renderPage = (templateName, meta, chunks, options) => {
    const pagePath = path2url(meta.frontMatter.path);
    const body = md2html(meta.markdown);

    return new HtmlWebpackPlugin({
        filename: pagePath,
        template: `./layouts/${templateName}.pug`,
        templateParameters() {
            return {
                _config: config,
                _body: body,
                ...meta.frontMatter,
                url: new URL(pagePath, config.host),
                description: body.replace(/(<([^>]+)>)/ig,"").slice(0, 55),
                _options: options,
            };
        },
        favicon: './favicon.ico',
        chunks,
    });
};

module.exports = {
    renderHome: (meta, _recentPosts) => {
        const recentPosts = _recentPosts.map(post => post.frontMatter)
            .map(v => ({
                ...v,
                url: path2url(v.path),
            }));
        return renderPage('home', meta, ['home'], { recentPosts });
    },
    renderPost: meta => {
        return renderPage('post', meta, ['post']);
    },
};
