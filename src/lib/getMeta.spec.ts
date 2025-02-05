import mock from 'mock-fs';
import { afterEach, describe, expect, it } from 'vitest';

import { getMeta } from './getMeta';

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { md2html } = require('./md-converter.cjs');

describe('getMeta', () => {
  it('returns meta info', () => {
    const datetime = new Date();
    mock({
      'index.md': mock.file({
        content: '---\ntitle: test\ndraft: true\n---\n\n# test',
        mtime: datetime,
      }),
    });

    expect(getMeta('index.md')).toEqual({
      meta: {
        title: 'test',
        draft: true,
        published: datetime,
      },
      content: md2html('# test'),
    });
  });

  afterEach(() => {
    mock.restore();
  });
});
