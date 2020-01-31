const fs = require('fs');

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
};
