import {describe, it, expect, afterEach} from 'vitest';
import mock from 'mock-fs';

import { getPosts } from './getPosts';

describe('getPosts', () => {
  it('returns page info list and assets', () => {
    mock({
      contents: {
        'simple-page.md': '',
        'complex-page': {
          assets: {
            'asset-1.png': '',
            'asset-2.png': '',
          },
          'index.md': '',
        },
      },
    });

    const expectedPages = [
      'contents/simple-page.md',
      'contents/complex-page/index.md',
    ];
    const pages = getPosts('./contents');

    expect(pages).toEqual(expect.arrayContaining(expectedPages));
    expect(expectedPages).toEqual(expect.arrayContaining(pages));
  });

  it('ignores unnecessary files', () => {
    mock({
      '.DS_Store': '',
    });

    const pages = getPosts('./');
    expect(pages).toHaveLength(0);
  });

  afterEach(() => {
    mock.restore();
  });
});
