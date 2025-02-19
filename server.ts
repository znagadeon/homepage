import fs from 'node:fs/promises';
import path from 'node:path';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { getPosts } from './src/lib/getPosts';

import api from './src/routers/api';
import rss from './src/routers/rss';
import sitemap from './src/routers/sitemap';

const PORT = 1337;

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

  const titles = getPosts(`${process.cwd()}/posts`).map(
    (filename) => filename.match(/posts\/(.+)\/index\.md$/)?.[1],
  );

  for (const title of titles) {
    app.use(
      `/post/${title}/assets`,
      express.static(`${process.cwd()}/posts/${title}/assets`),
    );
  }

  app.use('/api', api);

  app.get(/\/($|post(?!\/assets)|tag|search|archive)/, async (req, res) => {
    const url = req.originalUrl;

    const { render } = await vite.ssrLoadModule('./src/entry-server.tsx');
    const { vueSsr, ssr, state, helmet, manifest } = await render(url);

    const rawHtml = (
      await fs.readFile(`${process.cwd()}/index.html`)
    ).toString();
    const template = await vite.transformIndexHtml(url, rawHtml);

    const hydration = `<script>window.__INITIAL_STATE__ = ${JSON.stringify(state)}</script>`;
    const html = template
      .replace('<!--vue-body-->', `${vueSsr}${hydration}`)
      .replace(
        '<!--app-head-->',
        `${helmet.title.toString()}${helmet.meta.toString()}`,
      )
      .replace('<!--app-body-->', ssr)
      .replace('<!--vue-head-->', manifest.teleports?.head ?? '');

    res.contentType('text/html').status(200).end(html);
  });

  app.use('/', express.static(path.join(process.cwd(), 'dist/client')));

  app.use('/', sitemap);
  app.use('/', rss);

  app.get('/health', (req, res) => {
    res.status(200).end('OK');
  });

  app.listen(PORT, () => {
    const link = `http://localhost:${PORT}`;
    const clickable = `\x1b]8;;${link}\x1b\\${link}\x1b]8;;\x1b\\`;
    console.log(`Listening ${clickable}...`);
  });
};

createServer();
