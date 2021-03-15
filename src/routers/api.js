const express = require('express');
const getPosts = require('../lib/get-posts');
const getMeta = require('../lib/get-meta');

const api = new express.Router();

api.get('/posts', (req, res) => {
	const posts = getPosts(`${global.ROOT}/posts`)
		.map(filename => ({
			...getMeta(filename),
			url: `/post/${filename.slice(global.ROOT.length, -('/index.md'.length))}`,
		})).filter(post => {
			if (post.meta.draft) return false;
			if (req.query.tag && post.meta.tags.indexOf(req.query.tag) === -1) return false;

			return true;
		}).sort((a, b) => {
			if (a.meta.published < b.meta.published) return 1;
			if (a.meta.published > b.meta.published) return -1;
			return 0;
		});

	res.send(req.query.length ? posts.slice(0, req.query.length) : posts);
	res.end();
});

api.get('/post/:title', (req, res) => {
	const filename = getPosts(`${global.ROOT}/posts`)
		.find(v => v.indexOf(req.params.title) > -1);
	res.send(getMeta(filename));
	res.end();
});

module.exports = api;
