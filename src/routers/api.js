const express = require('express');

const api = new express.Router();
api.get('/posts', (req, res) => {
	res.send([]);
	res.end();
});
api.get('/:title', (req, res) => {
	res.send({});
	res.end();
});

module.exports = api;
