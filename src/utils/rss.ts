import { formatDate } from './format';
import { createElement } from './xml';

export const wrapCData = (text: string) => `<![CDATA[${text}]]>`;

type Props = {
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
}: Props) => {
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
