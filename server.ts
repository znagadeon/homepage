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

  app.get('*', (req, res) => {
    res.status(200).send('test');
  });

  app.listen(PORT, () => {
    console.log(`Listening ${PORT}...`);
  });
};

createServer();
