const express = require('express');
const fs = require('fs');

const post = new express.Router();

const { createBundleRenderer } = require('vue-server-renderer');
const bundle = require('../../dist/server/vue-ssr-server-bundle.json');
const clientManifest = require('../../dist/client/vue-ssr-client-manifest.json');

const renderer = createBundleRenderer(bundle, {
	template: fs.readFileSync(`${global.ROOT}/dist/client/layout.html`).toString(),
	clientManifest,
	inject: false,
});

post.get('/', (req, res) => {
	res.redirect(301, '/index.html');
});
post.get('/index.html', async (req, res) => {
	res.send(await renderer.renderToString({
		type: 'Home',
	}));
});

post.get('/post/:title', (req, res) => {
	res.redirect(301, `/post/${req.params.title}/index.html`);
});
post.get('/post/:title/index.html', async (req, res) => {
	res.send(await renderer.renderToString({
		type: 'Post',
		title: req.params.title,
	}));
});

post.get('/archive', (req, res) => {
	res.redirect(301, '/archive/index.html');
});
post.get('/archive/index.html', async (req, res) => {
	res.send(await renderer.renderToString({
		type: 'Archive',
	}));
});

post.get('/tag/:tag', (req, res) => {
	res.redirect(301, `/tag/${req.params.tag}/index.html`);
});
post.get('/tag/:tag/index.html', async (req, res) => {
	res.send(await renderer.renderToString({
		type: 'Tag',
		tag: req.params.tag,
	}));
});

post.get('/search/index.html', async (req, res) => {
	res.send(await renderer.renderToString({
		type: 'Search',
		query: req.query.q,
	}));
});

module.exports = post;
