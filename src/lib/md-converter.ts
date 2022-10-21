import { marked } from 'marked';
import katex from 'katex';

import { link, image, code, codespan } from './convert-rules';

const renderer = new marked.Renderer();
renderer.link = link;
renderer.image = image;
renderer.code = code;
renderer.codespan = codespan;

marked.setOptions({ renderer });

export const md2html = (markdown: string) => {
  const katexParsed = markdown.replace(/\\\(([^$\n]+?)\\\)/g,
    (match, capture) => {
      try {
        return katex.renderToString(capture);
      } catch (e) {
        return match;
      }
    });
  return marked.parse(katexParsed);
};
