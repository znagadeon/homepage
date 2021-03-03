const express = require('express');

global.ROOT = `${__dirname}/..`;

const app = express();
const port = 1337;

app.set('view engine', 'pug');

const api = require('./routers/api');
app.use('/api', api);

const post = require('./routers/post');
app.use('/post', post);

app.get('/', (req, res) => {
	res.render('../layouts/index', { IS_DEV: true });
});

app.listen(port, () => {
	console.log(`Listening ${port}...`);
});
