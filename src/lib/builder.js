const fs = require('fs');
const fm = require('front-matter');
const marked = require('marked');
const pug = require('pug');

const _getContentFileInfos = contentDir => {
    const root = fs.readdirSync(contentDir, { withFileTypes: true });
    let results = [];

    root.forEach(dirent => {
        if (dirent.isFile())
            results.push(`${contentDir}/${dirent.name}`);
        else {
            results = [...results, ..._getContentFileInfos(`${contentDir}/${dirent.name}`)];
        }
    });

    return results;
}

module.exports = {
    getContentFileInfos: contentDir => _getContentFileInfos(contentDir)
        .map(path => `.${path.slice(contentDir.length)}`),

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

    saveHtml: (destDir, path, content) => {
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir);
        }

        const dirList = path.split('/').slice(0, -1);
        for (let i=0; i<dirList.length; i++) {
            const dir = `${destDir}/${dirList.slice(0, i+1).join('/')}`;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
        }

        fs.writeFileSync(`${destDir}/${path}`, content);
    },
};
