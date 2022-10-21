import fm from 'front-matter';
import fs from 'fs';

import { md2html } from './md-converter';

export default (path: string) => {
	const body = fs.readFileSync(path).toString();
	const meta = fm(body);

	return {
		meta: meta.attributes,
		content: md2html(meta.body),
	};
};
