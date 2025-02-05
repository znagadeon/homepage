import { describe, expect, it } from 'vitest';
import { createEntry } from './sitemap';

describe('createEntry', () => {
  it('returns sitemap entry object', () => {
    expect(
      createEntry({
        url: 'test',
        modifiedAt: new Date(2025, 0, 1),
        changeFrequency: 'always',
        priority: 1,
      }),
    ).toEqual({
      type: 'element',
      name: 'url',
      elements: [
        {
          type: 'element',
          name: 'loc',
          elements: [{ type: 'text', text: 'test' }],
          attributes: {},
        },
        {
          type: 'element',
          name: 'lastmod',
          elements: [{ type: 'text', text: '2025-01-01' }],
          attributes: {},
        },
        {
          type: 'element',
          name: 'changefreq',
          elements: [{ type: 'text', text: 'always' }],
          attributes: {},
        },
        {
          type: 'element',
          name: 'priority',
          elements: [{ type: 'text', text: 1 }],
          attributes: {},
        },
      ],
    });
  });

  it('can return value when optional values do not exist', () => {
    expect(
      createEntry({
        url: 'test',
      }),
    ).toEqual({
      type: 'element',
      name: 'url',
      elements: [
        {
          type: 'element',
          name: 'loc',
          elements: [{ type: 'text', text: 'test' }],
          attributes: {},
        },
      ],
    });
  });
});
