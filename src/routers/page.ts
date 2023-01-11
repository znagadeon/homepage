import express from 'express';
import { createServer as createViteServer } from 'vite';

export const createPageRouter = async () => {
  const page = express.Router();
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  page.use(vite.middlewares);

  return page;
};
