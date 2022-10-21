import { describe, it, afterEach, expect } from 'vitest';
import mock from 'mock-fs';

import { formatISO, startOfSecond } from 'date-fns';

import getMeta from './get-meta';
import { md2html } from './md-converter';

describe('getMeta', () => {
  it('returns meta info', () => {
    const now = startOfSecond(new Date());

    mock({
      'index.md': `---\ntitle: test\ndraft: true\npublished: ${formatISO(now)}\n---\n\n# test`,
    });

    expect(getMeta('index.md')).toEqual({
      meta: {
        title: 'test',
        draft: true,
        published: now,
      },
      content: md2html('# test'),
    });
  });

  afterEach(() => {
    mock.restore();
  });
});
