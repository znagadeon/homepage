const fs = require('fs');
const path = require('path');

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
        return _getContentFileInfos(contentDir)
            .filter(v => _isPage(v)).map(v => `./${v}`);
    },
};
