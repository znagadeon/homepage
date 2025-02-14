import { renderToString } from 'react-dom/server';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { renderToString as renderVue } from 'vue/server-renderer';
import { routes } from './routes';
import createVueApp from './vue-app';

// biome-ignore lint/suspicious/noExplicitAny:
export const render = async (url: string, manifest: any = {}) => {
  const { app, router: vueRouter, store } = createVueApp();

  await vueRouter.push(url);
  await vueRouter.isReady();

  const memoryRouter = createMemoryRouter(routes, {
    initialEntries: [url],
  });
  return {
    vueSsr: await renderVue(app, manifest),
    ssr: renderToString(<RouterProvider router={memoryRouter} />),
    manifest,
    state: store.state,
  };
};
