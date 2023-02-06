import { createApp } from 'vue';

import App from './App.vue';
import createRouter from './router';

import '../styles/master.scss';

export default () => {
  const router = createRouter();
  const app = createApp(App);

  app.use(router);

  return { app, router };
};
