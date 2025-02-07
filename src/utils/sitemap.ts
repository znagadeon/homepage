import { type Element as XmlElement, js2xml } from 'xml-js';
import { formatDate } from './format';

type Frequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

type Entry = {
  url: string;
  modifiedAt?: Date;
  changeFrequency?: Frequency;
  priority?: number;
};

const createText = (text: string | number) => ({ type: 'text', text });

const createElement = (
  name: string,
  elements: (XmlElement | string | number)[],
  attributes?: Record<string, string | number>,
) => ({
  type: 'element',
  name,
  elements: elements.map((el) => {
    if (typeof el === 'number' || typeof el === 'string') {
      return createText(el);
    }

    return el;
  }),
  attributes,
});

export const createEntry = ({
  url,
  modifiedAt,
  changeFrequency,
  priority,
}: Entry) => {
  const elements = [createElement('loc', [url])];

  if (modifiedAt) {
    elements.push(createElement('lastmod', [formatDate(modifiedAt)]));
  }

  if (changeFrequency) {
    elements.push(createElement('changefreq', [changeFrequency]));
  }

  if (priority) {
    elements.push(createElement('priority', [priority]));
  }

  return {
    type: 'element',
    name: 'url',
    elements,
  };
};

export const createSitemap = (entries: Entry[]) =>
  js2xml({
    declaration: {
      attributes: {
        version: '1.0',
        encoding: 'utf-8',
      },
    },
    elements: [
      createElement(
        'urlset',
        entries.map((entry) => createEntry(entry)),
        {
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
        },
      ),
    ],
  });
