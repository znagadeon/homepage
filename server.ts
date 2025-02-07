import fs from 'node:fs/promises';
import path from 'node:path';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { getPosts } from './src/lib/getPosts';

import api from './src/routers/api';
import rss from './src/routers/rss';
import sitemap from './src/routers/sitemap';

const PORT = 1337;

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

  const prepareTemplate = async (url: string) => {
    if (isProduction) {
      const { render } = await import('./dist/server/entry-server.js');
      const _manifest = JSON.parse(
        (await fs.readFile('./dist/client/.vite/ssr-manifest.json')).toString(),
      );
      const { ssr, state, manifest } = await render(url, _manifest);

      const template = (
        await fs.readFile('./dist/client/index.html')
      ).toString();

      return { ssr, state, manifest, template };
    }

    const { render } = await vite.ssrLoadModule('./src/entry-server.ts');
    const { ssr, state, manifest } = await render(url);

    const rawHtml = (
      await fs.readFile(`${process.cwd()}/index.html`)
    ).toString();
    const template = await vite.transformIndexHtml(url, rawHtml);

    return { ssr, state, manifest, template };
  };

  app.get(/\/($|post|tag|search|archive)/, async (req, res) => {
    const { ssr, state, manifest, template } = await prepareTemplate(
      req.originalUrl,
    );

    const hydration = `<script>window.__INITIAL_STATE__ = ${JSON.stringify(state)}</script>`;
    const html = template
      .replace('<!--app-body-->', `${ssr}${hydration}`)
      .replace('<!--app-head-->', manifest.teleports.head ?? '');

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
