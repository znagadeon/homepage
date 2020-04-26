const fm = require('front-matter');
const { md2html } = require('../lib/md-converter');

module.exports = function (content) {
    const parsed = fm(content);
    const metaInfo = parsed.attributes;

    if (metaInfo.draft) {
        if (this.mode === 'development') {
            metaInfo.published = new Date();
        } else {
            return '';
        }
    }

    if (this.resourceQuery.indexOf('with-html') > -1) {
        metaInfo.html = md2html(parsed.body);
    }

    return `module.exports = ${JSON.stringify(metaInfo)};`;
};
