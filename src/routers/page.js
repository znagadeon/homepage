import express from 'express';
import fs from 'fs/promises';
import { renderToString } from 'vue/server-renderer';

const page = new express.Router();

import createApp from '../createApp';

const { app, store, router } = createApp();

page.get(/\/($|post|tag|search|archive)/, async (req, res) => {
	try {
		await router.push(req.originalUrl);
		await router.isReady();
		const ssr = await renderToString(app);
		const state = `<script>window.__INITIAL_STATE__ = ${JSON.stringify(store.state)}</script>`;
		const html = (await fs.readFile(`${global.ROOT}/dist/client/layout.html`)).toString();
		res.send(html.replace('<!--vue-ssr-outlet-->', `<div id="app">${ssr}</div>${state}`));
	} catch (e) {
		res.end();
	}
});

export default page;
