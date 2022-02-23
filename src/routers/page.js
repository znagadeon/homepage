import express from 'express';
import { renderToString } from 'vue/server-renderer';

const page = new express.Router();

import createApp from '../app';

const { app, router } = createApp();

// router.push(context.url);

// router.onReady(() => {
// 	context.rendered = () => {
// 		context.state = store.state;
// 	};

// 	resolve(app);
// });

page.get(/\/($|post|tag|search|archive)/, async (req, res) => {
	try {
		await router.push(req.originalUrl);
		await router.isReady();
		res.send(await renderToString(app));
	} catch (e) {
		res.end();
	}
});

export default page;
