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
		const katexParsed = markdown.replace(
			/\\\(([^$\n]+?)\\\)/g,
			(match, capture) => {
				return katex.renderToString(capture);
			}
		);
		return marked(katexParsed);
	},
};
