const fs = require('fs');
const fm = require('front-matter');

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
        return {
            markdown: parsed.body,
            frontMatter: parsed.attributes,
        };
    },
};
