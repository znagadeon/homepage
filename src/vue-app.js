import { createSSRApp } from 'vue';

import VueApp from './VueApp.vue';
import createRouter from './vue-router';
import createStore from './vueStore';

import '../styles/master.scss';

export default () => {
  const store = createStore();
  const router = createRouter();
  const app = createSSRApp(VueApp);

  app.use(store);
  app.use(router);

  return { app, store, router };
};
