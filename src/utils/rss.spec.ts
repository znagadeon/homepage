import { describe, expect, it } from 'vitest';
import { formatDate } from './format';
import { createItem, wrapCData } from './rss';

describe('createItem', () => {
  it('returns RSS link item', () => {
    const title = 'title';
    const link = 'https://example.com';
    const description = 'test rss item';
    const author = 'John Doe';
    const published = new Date();

    expect(
      createItem({
        title,
        link,
        description,
        author,
        published,
      }),
    ).toEqual({
      type: 'element',
      name: 'item',
      elements: [
        {
          type: 'element',
          name: 'title',
          elements: [{ type: 'text', text: wrapCData(title) }],
        },
        {
          type: 'element',
          name: 'link',
          elements: [{ type: 'text', text: link }],
        },
        {
          type: 'element',
          name: 'description',
          elements: [{ type: 'text', text: wrapCData(description) }],
        },
        {
          type: 'element',
          name: 'author',
          elements: [{ type: 'text', text: wrapCData(author) }],
        },
        {
          type: 'element',
          name: 'pubDate',
          elements: [{ type: 'text', text: formatDate(published) }],
        },
      ],
    });
  });
});
