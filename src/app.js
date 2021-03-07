const express = require('express');

global.ROOT = `${__dirname}/..`;

const app = express();
const port = 1337;

const getPosts = require('./lib/get-posts');

getPosts(`${global.ROOT}/posts`)
	.map(filename => `${filename.slice(0, -'/index.md'.length)}/assets`)
	.forEach(path => {
		app.use(`/post/${path.slice(global.ROOT.length)}`, express.static(path));
	});

const api = require('./routers/api');
app.use('/api', api);

const post = require('./routers/post');
app.use('/', post);

const sitemap = require('./routers/sitemap');
app.use('/', sitemap);

const rss = require('./routers/rss');
app.use('/', rss);

app.listen(port, () => {
	console.log(`Listening ${port}...`);
});
