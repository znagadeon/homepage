const fs = require('fs');
const path = require('path');
const fm = require('front-matter');

const _getContentFileInfos = contentDir => {
    const root = fs.readdirSync(contentDir, { withFileTypes: true });
    let results = [];

    root.forEach(dirent => {
        if (dirent.isFile())
            results.push(path.join(contentDir, dirent.name));
        else {
            results = [
                ...results,
                ..._getContentFileInfos(path.join(contentDir, dirent.name))
            ];
        }
    });

    return results;
}

module.exports = {
    getContentFileInfos: contentDir => _getContentFileInfos(contentDir).map(v => `./${v}`),

    loadPage: path => {
        const str = fs.readFileSync(path).toString();
        const parsed = fm(str);

        if (!parsed.attributes.layout) {
            throw new Error('File does not have layout info');
        }

        return {
            markdown: parsed.body,
            frontMatter: {
                ...parsed.attributes,
                path,
            },
        };
    },
};
