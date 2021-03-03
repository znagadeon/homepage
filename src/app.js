const express = require('express');

const app = express();
const port = 1337;

const api = require('./routers/api');
app.use('/api', api);

const post = require('./routers/post');
app.use('/post', post);

app.get('/', (req, res) => {
	res.send('Hello world!');
	res.end();
});

app.listen(port, () => {
	console.log(`Listening ${port}...`);
});
