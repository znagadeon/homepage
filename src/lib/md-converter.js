const marked = require('marked');

const hljs = require('highlight.js');

const range = (start, end) => Array.from({ length: end-start + 1 }, (_, i) => start + i);
const getHighlightLines = str => {
    return str.split(',')
        .map(v => {
            const [_start, _end] = v.split('-');
            if (_end) {
                const start = parseInt(_start.trim());
                const end = parseInt(_end.trim());
                return range(start, end);
            } else {
                return [parseInt(_start.trim())];
            }
        }).reduce((a, b) => [...a, ...b], []);
}
const padder = length => num => num.toString().padStart(length, ' ');
const highlightCode = (code, highlightLines) => {
    const splittedCode = code.split('\n');
    
    const lineNumberPadding = splittedCode.length.toString().length;
    const padNumber = padder(lineNumberPadding);

    return splittedCode.map((v, i) => {
        if (highlightLines.includes(i + 1)) {
            return `<div class="highlighted"><code class="line-number">${padNumber(i+1)}</code><code class="code">${v}</code></div>`;
        } else {
            return `<div><code class="line-number">${padNumber(i+1)}</code><code class="code">${v}</code></div>`;
        }
    }).join('\n');
}

const convertCode = (code, infostring = 'plaintext') => {
    const [lang, highlightLineStr] = infostring.split(':');

    const highlightLines = highlightLineStr ? getHighlightLines(highlightLineStr) : [];

    const convertedCode = hljs.highlight(lang || 'plaintext', code.trim()).value;

    return `<pre class="hljs">${highlightCode(convertedCode, highlightLines)}</pre>`;
};

const renderer = new marked.Renderer();
renderer.code = convertCode;
renderer.link = (href, title, text) => `<a href="${href}" class="fa fa-link" title="${title}" target="_blank">${text}</a>`;
renderer.codespan = code => `<code class="short-code">${code}</code>`;

marked.setOptions({ renderer });

module.exports = {
    md2html: markdown => marked(markdown),
};
