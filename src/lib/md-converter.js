const marked = require('marked');
const katex = require('katex');

const { link, image, code, codespan } = require('./convert-rules');

const renderer = new marked.Renderer();
renderer.link = link;
renderer.image = image;
renderer.code = code;
renderer.codespan = codespan;

marked.setOptions({ renderer });

module.exports = {
	md2html: (markdown) => {
		const katexParsed = markdown.replace(/\${1,2}([^$\n]+?)\${1,2}/g,
			(match, capture) => {
				try {
					return katex.renderToString(capture);
				} catch (e) {
					return match;
				}
			});
		return marked(katexParsed);
	},
};
