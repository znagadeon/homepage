// import createApp from './app';

// export default (context) => {
// 	return new Promise((resolve) => {
// 		const { app, store, router } = createApp();

// 		router.push(context.url);

// 		router.onReady(() => {
// 			context.rendered = () => {
// 				context.state = store.state;
// 			};

// 			resolve(app);
// 		});
// 	});
// }

import express from 'express';
import path from 'path';

import getPosts from './lib/get-posts';

import api from './routers/api';
import page from './routers/page';
import sitemap from './routers/sitemap';
import rss from './routers/rss';

const app = express();
const port = 1337;

global.ROOT = path.join(__dirname, '../..');

getPosts(`${global.ROOT}/posts`)
	.map(filename => filename.match(/posts\/(.+)\/index\.md$/)[1])
	.forEach(title => {
		app.use(`/post/${title}/assets`, express.static(`${global.ROOT}/posts/${title}/assets`));
	});

app.use('/', express.static(path.join(global.ROOT, 'dist/client')));

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
