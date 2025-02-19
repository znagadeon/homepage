import { renderToString } from 'react-dom/server';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
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
  const context = {} as { helmet: HelmetServerState };
  return {
    vueSsr: await renderVue(app, manifest),
    ssr: renderToString(
      <HelmetProvider context={context}>
        <RouterProvider router={memoryRouter} />
      </HelmetProvider>,
    ),
    manifest,
    helmet: context.helmet,
    state: store.state,
  };
};
