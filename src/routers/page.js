const express = require('express');
const fs = require('fs');

const page = new express.Router();

const { createBundleRenderer } = require('vue-server-renderer');
const bundle = require('../../dist/server/vue-ssr-server-bundle.json');
const clientManifest = require('../../dist/client/vue-ssr-client-manifest.json');

const renderer = createBundleRenderer(bundle, {
	template: fs.readFileSync(`${global.ROOT}/dist/client/layout.html`).toString(),
	clientManifest,
	inject: false,
});

page.get(/\/($|post|tag|archive)/, async (req, res) => {
	try {
		res.send(await renderer.renderToString({
			url: req.url,
		}));
	} catch (e) {
		// metainfo loading fails while post redirection
		res.end();
	}
});

module.exports = page;
