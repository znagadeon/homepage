import { formatDate } from './format';
import { convert, createElement } from './xml';

export const wrapCData = (text: string) => `<![CDATA[${text}]]>`;

type Item = {
  title: string;
  link: string;
  description: string;
  author?: string;
  published?: Date;
};

export const createItem = ({
  title,
  link,
  description,
  author,
  published,
}: Item) => {
  const elements = [
    createElement('title', [wrapCData(title)]),
    createElement('link', [link]),
    createElement('description', [wrapCData(description)]),
  ];

  if (author) {
    elements.push(createElement('author', [wrapCData(author)]));
  }

  if (published) {
    elements.push(createElement('pubDate', [formatDate(published)]));
  }

  return createElement('item', elements);
};

type Rss = {
  title: string;
  link: string;
  description: string;
  items: Item[];
};

export const createRss = ({ title, link, description, items }: Rss) => {
  return convert([
    createElement(
      'rss',
      [
        createElement('channel', [
          createElement('title', [wrapCData(title)]),
          createElement('link', [link]),
          createElement('description', [wrapCData(description)]),
          ...items.map((item) => createItem(item)),
        ]),
      ],
      { version: '2.0' },
    ),
  ]);
};
