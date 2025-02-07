import type { Element as XmlElement } from 'xml-js';

const createText = (text: string | number) => ({ type: 'text', text });

export const createElement = (
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
