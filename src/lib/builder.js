const fs = require('fs');
const fm = require('front-matter');
const marked = require('marked');
const pug = require('pug');

module.exports = {
    getContentFileInfos: contentDir => {
        return fs.readdirSync(contentDir)
            .map(path => {
                const isSimplePage = /\.md$/.test(path);
                return {
                    title: isSimplePage ? path.replace(/(.+)\.md$/, '$1') : path,
                    path: isSimplePage ? path : `${path}/index.md`,
                    isSimplePage,
                };
            });
    },

    loadPage: path => {
        const str = fs.readFileSync(path).toString();
        const parsed = fm(str);

        if (!parsed.attributes.layout) {
            throw new Error('File does not have layout info');
        }

        return {
            markdown: parsed.body,
            frontMatter: parsed.attributes,
        };
    },

    md2html: markdown => marked(markdown),

    compileTemplate: (templateName, layoutDir) => pug.compileFile(`${layoutDir}/${templateName}.pug`),
};
