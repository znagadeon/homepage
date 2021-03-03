const express = require('express');

const post = new express.Router();

const webpack = require("webpack");
const compiler = webpack(require("../../webpack.dev.js"));
const middleware = require("webpack-dev-middleware");
const path = require('path');

post.use('/', middleware(compiler));

const getHtml = (filename) => {
	if (global.IS_DEV) {
		return compiler.outputFileSystem.readFileSync(path.join(compiler.outputPath, filename));
	}
};

post.get('/', (req, res) => {
	res.set('content-type', 'text/html').end(getHtml('index.html'));
});

post.get('/post/:title', (req, res) => {
	res.set('content-type', 'text/html').end(getHtml(`index.html`));
});

post.get('/archive', (req, res) => {
	res.set('content-type', 'text/html').end(getHtml('index.html'));
});

post.get('/tag/:tag', (req, res) => {
	res.set('content-type', 'text/html').end(getHtml('index.html'));
});

module.exports = post;
