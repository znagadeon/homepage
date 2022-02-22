import express from 'express';

const page = new express.Router();

// const { createBundleRenderer } = require('vue-server-renderer');
// const bundle = require('../../dist/server/vue-ssr-server-bundle.json');
// const clientManifest = require('../../dist/client/vue-ssr-client-manifest.json');

// const renderer = createBundleRenderer(bundle, {
// 	template: fs.readFileSync(`${global.ROOT}/dist/client/layout.html`).toString(),
// 	clientManifest,
// 	inject: false,
// });

page.get(/\/($|post|tag|search|archive)/, async (req, res) => {
	res.sendFile(`${global.ROOT}/dist/client/layout.html`);
});

export default page;
