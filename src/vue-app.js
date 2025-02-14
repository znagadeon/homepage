import { createSSRApp } from 'vue';

import VueApp from './VueApp.vue';
import createStore from './store';
import createRouter from './vue-router';

import '../styles/master.scss';

export default () => {
  const store = createStore();
  const router = createRouter();
  const app = createSSRApp(VueApp);

  app.use(store);
  app.use(router);

  return { app, store, router };
};
