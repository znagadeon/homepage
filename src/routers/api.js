const express = require('express');
const getPosts = require('../lib/get-posts');
const getMeta = require('../lib/get-meta');

const api = new express.Router();

api.get('/posts', (req, res) => {
	res.send(getPosts(`${global.ROOT}/posts`));
	res.end();
});

api.get('/post/:title', (req, res) => {
	const filename = getPosts(`${global.ROOT}/posts`)
		.find(v => v.indexOf(req.params.title));
	res.send(getMeta(filename));
	res.end();
});

module.exports = api;
