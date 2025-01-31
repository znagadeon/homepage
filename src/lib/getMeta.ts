import fs from 'fs';
import fm from 'front-matter';

import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const { md2html } = require('./md-converter.cjs');

export const getMeta = (path: string) => {
  const file = fs.readFileSync(path).toString();
  const meta = fm(file);

  return {
    meta: meta.attributes,
    content: md2html(meta.body),
  };
};
