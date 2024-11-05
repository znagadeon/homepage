import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import {createServer as createViteServer} from 'vite';
import getPosts from './src/lib/get-posts';

import api from './src/routers/api';
import sitemap from './src/routers/sitemap';
import rss from './src/routers/rss';

const PORT = 1337;
global.ROOT = __dirname;

const createServer = async () => {
  const app = express();
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
    },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  getPosts(`${__dirname}/posts`)
    .map(filename => filename.match(/posts\/(.+)\/index\.md$/)[1])
    .forEach(title => {
      app.use(`/post/${title}/assets`, express.static(`${__dirname}/posts/${title}/assets`));
    });

  app.use('/api', api);

  app.get(/\/($|post|tag|search|archive)/, async (req, res) => {
    const { render } = await vite.ssrLoadModule('./src/entry-server.ts');
    const { ssr, state } = await render(req.originalUrl);

    const hydration = `<script>window.__INITIAL_STATE__ = ${JSON.stringify(state)}</script>`;

    const html = (await fs.readFile(`${__dirname}/dist/client/layout.html`)).toString();
    res.status(200).send(html.replace('<!--vue-ssr-outlet-->', `<div id="app">${ssr}</div>${hydration}`));
  });

  app.use('/', express.static(path.join(__dirname, 'dist/client')));

  app.use('/', sitemap);
  app.use('/', rss);

  app.get('/health', (req, res) => {
    res.status(200).end('OK');
  });

  app.listen(PORT, () => {
    console.log(`Listening ${PORT}...`);
  });
};

createServer();