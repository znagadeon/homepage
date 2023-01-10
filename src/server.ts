import express from 'express';
import path from 'path';

import getPosts from './lib/get-posts';

import api from './routers/api';
import page from './routers/page';
import sitemap from './routers/sitemap';
import rss from './routers/rss';

import { ROOT } from './consts';

const app = express();
const port = 1337;

getPosts(`${ROOT}/posts`)
	.map(filename => {
		const match = filename.match(/posts\/(.+)\/index\.md$/);
		return match ? match[1] : '';
	})
	.forEach(title => {
		app.use(`/post/${title}/assets`, express.static(`${ROOT}/posts/${title}/assets`));
	});

app.use('/', express.static(path.join(ROOT, 'dist')));

app.use('/api', api);
app.use('/', page);
app.use('/', sitemap);
app.use('/', rss);

app.get('/health', (req, res) => {
	res.status(200).end('OK');
});

app.listen(port, () => {
	console.log(`Listening ${port}...`);
});
