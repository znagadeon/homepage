import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const { marked } = require('marked');
const katex = require('katex');

const { link, image, code, codespan } = require('./convert-rules.cjs');

const renderer = new marked.Renderer();
renderer.link = link;
renderer.image = image;
renderer.code = code;
renderer.codespan = codespan;

marked.setOptions({ renderer });

export const md2html = (markdown: string) => {
  const katexParsed = markdown.replace(
    /\\\(([^$\n]+?)\\\)/g,
    (match, capture) => {
      try {
        return katex.renderToString(capture);
      } catch (e) {
        return match;
      }
    },
  );
  return marked.parse(katexParsed);
};
