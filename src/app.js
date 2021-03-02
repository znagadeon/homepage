const express = require('express');

const app = express();
const port = 1337;

app.get('/', (req, res) => {
	res.send('Hello world!');
	res.end();
});

app.listen(port, () => {
	console.log(`Listening ${port}...`);
});
