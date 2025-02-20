import { hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Provider as JotaiProvider } from 'jotai';
import {routes} from './routes';
import { Hydrate } from './components/Hydrate';
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
  const initialState = window.__JOTAI_STATE__ || new Map();

  hydrateRoot(app, (
    <JotaiProvider>
      <Hydrate serverState={initialState} />
      <HelmetProvider>
        <RouterProvider router={createBrowserRouter(routes)} />
      </HelmetProvider>
    </JotaiProvider>
  ));
}
