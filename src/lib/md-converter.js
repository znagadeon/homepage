const marked = require('marked');

const { link, image, code, codespan } = require('./convert-rules');

const renderer = new marked.Renderer();
renderer.link = link;
renderer.image = image;
renderer.code = code;
renderer.codespan = codespan;

marked.setOptions({ renderer });

module.exports = {
    md2html: markdown => marked(markdown),
};
