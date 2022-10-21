import hljs from 'highlight.js';

export const link = (href: string, title: string, text: string) =>
  `<a href="${href}" title="${title}" rel="noopener" target="_blank">${text}</a>`;
export const image = (href: string, title: string, text: string) =>
  `<figure><img src="${href}" alt="${text}"><figcaption aria-hidden="true">${text}</figcaption></figure>`;

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);
const getHighlightLines = (str: string) => {
  return str
    .split(',')
    .map((v) => {
      const [_start, _end] = v.split('-');
      if (_end) {
        const start = parseInt(_start.trim());
        const end = parseInt(_end.trim());
        return range(start, end);
      } else {
        return [parseInt(_start.trim())];
      }
    })
    .reduce((a, b) => [...a, ...b], []);
};
const padder = (length: number) => (num: number) => num.toString().padStart(length, ' ');
const highlightCode = (code: string, highlightLines: number[]) => {
  const splittedCode = code.split('\n');

  const lineNumberPadding = splittedCode.length.toString().length;
  const padNumber = padder(lineNumberPadding);

  return splittedCode
    .map((v, i) => {
      if (highlightLines.includes(i + 1)) {
        return `<div class="highlighted"><code class="line-number">${padNumber(
          i + 1
        )}</code><code class="code">${v}</code></div>`;
      } else {
        return `<div><code class="line-number">${padNumber(
          i + 1
        )}</code><code class="code">${v}</code></div>`;
      }
    })
    .join('\n');
};

export const code = (code: string, infostring = 'plaintext') => {
  const [lang, highlightLineStr] = infostring.split(':');

  const highlightLines = highlightLineStr
    ? getHighlightLines(highlightLineStr)
    : [];

  const convertedCode = hljs.highlight(code.trim(), {
    language: lang || 'plaintext',
  }).value;

  return `<pre class="hljs">${highlightCode(
    convertedCode,
    highlightLines
  )}</pre>`;
};

export const codespan = (code: string) => `<code class="short-code">${code}</code>`;

