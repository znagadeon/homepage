const HtmlWebpackPlugin = require('html-webpack-plugin');
const marked = require('marked');

const config = require('../../config');

const urlReplaceRegEx = /contents\/(.+)\.md$/;

const renderPage = (templateName, meta, chunks, options) => {
    return new HtmlWebpackPlugin({
        filename: meta.frontMatter.path.replace(urlReplaceRegEx, '$1.html'),
        template: `./layouts/${templateName}.pug`,
        templateParameters() {
            return {
                _config: config,
                _body: marked(meta.markdown),
                ...meta.frontMatter,
                _options: options,
            };
        },
        chunks,
    });
};

module.exports = {
    renderHome: (meta, _recentPosts) => {
        const recentPosts = _recentPosts.map(post => post.frontMatter)
            .map(v => ({
                ...v,
                url: new URL(v.path.replace(urlReplaceRegEx, '$1.html'), config.host),
            }));
        return renderPage('home', meta, [], { recentPosts });
    },
};
