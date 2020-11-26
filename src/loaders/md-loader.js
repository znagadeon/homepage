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

	let images;
	if (this.resourceQuery.indexOf('with-html') > -1) {
		metaInfo.html = md2html(parsed.body);

		images = parsed.body
			.split('\n')
			.map((line) => line.match(/!\[.*\]\(([^\s]+).*\)/))
			.filter((match) => match)
			.map((match) => match[1]);
	}

	let requireStr = '';
	if (images && images.length) {
		requireStr = images
			.map((image) => `require('${image}');`)
			.reduce((a, b) => a + b, '');
	}

	return `${requireStr}module.exports = ${JSON.stringify(metaInfo)};`;
};
