import fs from 'node:fs';
import fm from 'front-matter';

import { createRequire } from 'node:module';
import { getModifiedAt } from '../utils/getModifiedAt';
const require = createRequire(import.meta.url);
const { md2html } = require('./md-converter.cjs');

export const getMeta = (path: string) => {
  const file = fs.readFileSync(path).toString();
  // biome-ignore lint/suspicious/noExplicitAny:
  const meta = fm<any>(file);

  if (!meta.attributes.title) {
    return {
      meta: {
        ...meta.attributes,
        title: meta.body.match(/^# (.+)$/m)?.[1],
        updated: getModifiedAt(path),
      },
      content: md2html(meta.body.replace(/^# .+\n*/, '')),
    };
  }

  return {
    meta: {
      ...meta.attributes,
      updated: getModifiedAt(path),
    },
    content: md2html(meta.body),
  };
};
