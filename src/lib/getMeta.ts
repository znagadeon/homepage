import fs from 'node:fs';
import fm from 'front-matter';
import { getModifiedAt } from '../utils/getModifiedAt';
import { md2html } from './md2html';

export const getMeta = (path: string) => {
  const file = fs.readFileSync(path).toString();
  // biome-ignore lint/suspicious/noExplicitAny:
  const meta = fm<any>(file);

  return {
    meta: {
      ...meta.attributes,
      title: meta.body.match(/^# (.+)$/m)?.[1],
      updated: getModifiedAt(path),
    },
    content: md2html(meta.body.replace(/^# .+\n*/, '')),
  };
};
