import mock from 'mock-fs';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { getMeta } from './getMeta';

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { md2html } = require('./md-converter.cjs');

describe('getMeta', () => {
  const datetime = new Date();

  beforeEach(() => {
    mock({
      'index.md': mock.file({
        content: '---\ndraft: true\n---\n\n# test\n\n ## test 2',
        mtime: datetime,
      }),
    });
  });

  it('returns meta info', () => {
    expect(getMeta('index.md')).toEqual({
      meta: {
        title: 'test',
        updated: datetime,
        draft: true,
      },
      content: md2html('## test 2'),
    });
  });

  afterEach(() => {
    mock.restore();
  });
});
