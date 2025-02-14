import { hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import {routes} from './routes';
import createApp from './vue-app';

const { app: vueApp, store, router: vueRouter } = createApp();

vueRouter.isReady().then(() => {
  if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
  }
  vueApp.mount('#vue-app');
});

const app = document.getElementById('app');
if (app) {
  hydrateRoot(app, (
    <RouterProvider router={createBrowserRouter(routes)} />
  ));
}
