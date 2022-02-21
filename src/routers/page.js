const express = require('express');
// const fs = require('fs');

const page = new express.Router();

// const { createBundleRenderer } = require('vue-server-renderer');
// const bundle = require('../../dist/server/vue-ssr-server-bundle.json');
// const clientManifest = require('../../dist/client/vue-ssr-client-manifest.json');

// const renderer = createBundleRenderer(bundle, {
// 	template: fs.readFileSync(`${global.ROOT}/dist/client/layout.html`).toString(),
// 	clientManifest,
// 	inject: false,
// });

const middleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const compiler = webpack(require('../../webpack.dev'));
const path = `${compiler.outputPath}/layout.html`;

page.use(middleware(compiler));

page.get(/\/($|post|tag|search|archive)/, async (req, res) => {
	compiler.outputFileSystem.readFile(path, (err, result) => {
		if (err) {
			res.end();
			return;
		}
		res.set('Content-Type', 'text/html').end(result);
	});
});

module.exports = page;
