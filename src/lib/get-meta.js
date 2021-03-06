const fm = require('front-matter');
const fs = require('fs');

const { md2html } = require('../lib/md-converter');

module.exports = (path) => {
	const file = fs.readFileSync(path).toString();
	const meta = fm(file);

	return {
		meta: meta.attributes,
		content: md2html(meta.body),
	};
};
