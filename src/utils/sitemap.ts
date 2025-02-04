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

const createElement = (name: string, elements: XmlElement[]) => ({
  type: 'element',
  name,
  elements,
});

export const createEntry = ({
  url,
  modifiedAt,
  changeFrequency,
  priority,
}: Entry) => {
  const elements = [
    createElement('loc', [createText(url)]),
    modifiedAt &&
      createElement('lastmod', [createText(formatDate(modifiedAt))]),
    changeFrequency &&
      createElement('changefreq', [createText(changeFrequency)]),
    priority && createElement('priority', [createText(priority)]),
  ];

  return {
    type: 'element',
    name: 'url',
    elements: elements.filter(Boolean),
  };
};
