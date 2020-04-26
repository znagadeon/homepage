const fm = require('front-matter');

module.exports = function (content) {
    const metaInfo = fm(content).attributes;

    if (metaInfo.draft) {
        if (this.mode === 'development') {
            metaInfo.published = new Date();
        } else {
            return '';
        }
    }

    return `module.exports = ${JSON.stringify(metaInfo)};`;
};
