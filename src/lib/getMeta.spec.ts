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
        content: '---\ntitle: test\ndraft: true\n---\n\n# test',
        mtime: datetime,
      }),
      'without-fm.md': mock.file({
        content: '# test\n\n ## test 2',
        mtime: datetime,
      }),
    });
  });

  it('returns meta info', () => {
    expect(getMeta('index.md')).toEqual({
      meta: {
        title: 'test',
        draft: true,
        updated: datetime,
      },
      content: md2html('# test'),
    });
  });

  it('Extract title if front matter does not exist', () => {
    expect(getMeta('without-fm.md')).toEqual({
      meta: {
        title: 'test',
        updated: datetime,
      },
      content: md2html('## test 2'),
    });
  });

  afterEach(() => {
    mock.restore();
  });
});
