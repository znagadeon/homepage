import express from 'express';
import fs from 'fs/promises';

import { ROOT } from '../consts';

const page = new express.Router();

page.get(/\/($|post|tag|search|archive)/, async (req, res) => {
	const html = (await fs.readFile(`${ROOT}/dist/client/layout.html`)).toString();
	res.send(html);
});

export default page;
