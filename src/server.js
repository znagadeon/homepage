const express = require('express');

global.ROOT = `${__dirname}/..`;
global.IS_DEV = process.argv[2] === 'dev';

const app = express();
const port = 1337;

const getPosts = require('./lib/get-posts');

getPosts(`${global.ROOT}/posts`)
	.map(filename => `${filename.slice(0, -'/index.md'.length)}/assets`)
	.forEach(path => {
		app.use(`/post/${path.slice(global.ROOT.length)}`, express.static(path));
	});

if (!global.IS_DEV) {
	app.use('/', express.static(`${global.ROOT}/dist/client`));
}

const api = require('./routers/api');
app.use('/api', api);

const post = require('./routers/post');
app.use('/', post);

const sitemap = require('./routers/sitemap');
app.use('/', sitemap);

const rss = require('./routers/rss');
app.use('/', rss);

app.get('/health', (req, res) => {
	res.status(200).end();
});

app.listen(port, () => {
	console.log(`Listening ${port}...`);
});
