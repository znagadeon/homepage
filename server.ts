import express from 'express';
import {createServer as createViteServer} from 'vite';

const PORT = 1337;

const createServer = async () => {
  const app = express();
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
    },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.get('*', async (req, res) => {
    const { render } = await vite.ssrLoadModule('./src/entry-server.ts');
    const { ssr, state } = await render(req.originalUrl);

    res.status(200).send(ssr);
  });

  app.listen(PORT, () => {
    console.log(`Listening ${PORT}...`);
  });
};

createServer();
