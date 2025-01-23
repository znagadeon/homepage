import {describe, it, expect, afterEach} from 'vitest';

import {createRequire} from 'module';
const require = createRequire(import.meta.url);

const mock = require('mock-fs');

const getMeta = require('./get-meta.cjs');
const { md2html } = require('./md-converter.cjs');

describe('getMeta', () => {
  it('returns meta info', () => {
    mock({
      'index.md': '---\ntitle: test\ndraft: true\n---\n\n# test',
    });

    expect(getMeta('index.md')).toEqual({
      meta: {
        title: 'test',
        draft: true,
      },
      content: md2html('# test'),
    });
  });

  afterEach(() => {
    mock.restore();
  });
});
