import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import {createServer as createViteServer} from 'vite';
import {createRequire} from 'module';
const require = createRequire(import.meta.url);

const getPosts = require('./src/lib/get-posts');

import api from './src/routers/api';
import sitemap from './src/routers/sitemap';
import rss from './src/routers/rss';

const PORT = 1337;
global.ROOT = import.meta.dirname;

const isProduction = process.env.PHASE === 'production';

const createServer = async () => {
  const app = express();
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
      watch: {
        ignored: /public\//,
      },
    },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  getPosts(`${import.meta.dirname}/posts`)
    .map(filename => filename.match(/posts\/(.+)\/index\.md$/)[1])
    .forEach(title => {
      app.use(`/post/${title}/assets`, express.static(`${import.meta.dirname}/posts/${title}/assets`));
    });

  app.use('/api', api);

  app.get(/\/($|post|tag|search|archive)/, async (req, res) => {
    if (isProduction) {
      const { render } = require('./dist/server/entry-server.js');
      const _manifest = JSON.parse((await fs.readFile('./dist/client/.vite/ssr-manifest.json')).toString());
      const { ssr, state, manifest } = await render(req.originalUrl, _manifest);

      const template = (await fs.readFile('./dist/client/index.html')).toString();
      const hydration = `<script>window.__INITIAL_STATE__ = ${JSON.stringify(state)}</script>`;

      const html = template
        .replace('<!--app-body-->', `${ssr}${hydration}`)
        .replace('<!--app-head-->', manifest.teleports.head ?? '');

      res.contentType('text/html').status(200).end(html);
    } else {
      const { render } = await vite.ssrLoadModule('./src/entry-server.ts');
      const { ssr, state, manifest } = await render(req.originalUrl);

      const rawHtml = (await fs.readFile(`${import.meta.dirname}/index.html`)).toString();
      const template = await vite.transformIndexHtml(req.originalUrl, rawHtml);
      const hydration = `<script>window.__INITIAL_STATE__ = ${JSON.stringify(state)}</script>`;

      const html = template
        .replace('<!--app-body-->', `${ssr}${hydration}`)
        .replace('<!--app-head-->', manifest.teleports.head ?? '');

      res.contentType('text/html').status(200).end(html);
    }
  });

  app.use('/', express.static(path.join(import.meta.dirname, 'dist/client')));

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
