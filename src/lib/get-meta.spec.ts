import { describe, it, afterEach, expect } from 'vitest';
import mock from 'mock-fs';

import getMeta from './get-meta';
import { md2html } from './md-converter';

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
