const express = require('express');

global.ROOT = `${__dirname}/..`;
global.IS_DEV = process.argv[2] === 'dev';

const app = express();
const port = 1337;

const api = require('./routers/api');
app.use('/api', api);

const post = require('./routers/post');
app.use('/', post);

app.listen(port, () => {
	console.log(`Listening ${port}...`);
});
