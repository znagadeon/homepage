import { formatDate } from './format';
import { convert, createElement } from './xml';

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
  convert([
    createElement(
      'urlset',
      entries.map((entry) => createEntry(entry)),
      {
        xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
      },
    ),
  ]);
