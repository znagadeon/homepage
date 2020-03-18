const fs = require('fs');
const path = require('path');
const fm = require('front-matter');

const _getContentFileInfos = contentDir => {
    const root = fs.readdirSync(contentDir, { withFileTypes: true });
    let results = [];

    root.forEach(dirent => {
        if (dirent.isFile()) {
            if (!['.DS_Store'].some(v => dirent.name.includes(v))) {
                results.push(path.join(contentDir, dirent.name));
            }
        } else {
            results = [
                ...results,
                ..._getContentFileInfos(path.join(contentDir, dirent.name)),
            ];
        }
    });

    return results;
}

const _isPage = path => Boolean(path.match(/\.md$/));

module.exports = {
    getContentFileInfos: contentDir => {
        const results = _getContentFileInfos(contentDir);
        return {
            pages: results.filter(v => _isPage(v)).map(v => `./${v}`),
            assets: results.filter(v => !_isPage(v)).map(v => `./${v}`),
        };
    },

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

    copyAssets: (assets, src, dest) => {
        assets.forEach(assetPath => {
            const directories = assetPath.split('/')
                .map((_, i, arr) => arr.slice(0, i).join('/'));
            
            directories.forEach(directory=> {
                if (!directory || directory === '.' || directory === assetPath) return;

                const mkdirPath = path.join(dest, path.relative(src, directory));
                if (!fs.existsSync(mkdirPath)) {
                    fs.mkdirSync(mkdirPath);
                }
            });

            fs.copyFileSync(assetPath, path.join(dest, path.relative(src, assetPath)));
        });
    },
};
