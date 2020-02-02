const HtmlWebpackPlugin = require('html-webpack-plugin');
const marked = require('marked');

const config = require('../../config');

module.exports = {
    renderPage: (templateName, meta, chunks) => {
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
    },
};
