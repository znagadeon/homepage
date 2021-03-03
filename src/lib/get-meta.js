const fm = require('front-matter');
const fs = require('fs');

module.exports = (path) => {
	const file = fs.readFileSync(path).toString();
	const meta = fm(file);

	return {
		meta: meta.attributes,
		content: meta.body,
	};
};
