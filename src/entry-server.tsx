import { Provider as JotaiProvider } from 'jotai';
import { renderToString } from 'react-dom/server';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { renderToString as renderVue } from 'vue/server-renderer';
import { HydrationWrapper } from './components/HydrationWrapper';
import { dehydrate } from './hydration';
import { routes } from './routes';
import createVueApp from './vue-app';

// biome-ignore lint/suspicious/noExplicitAny:
export const render = async (url: string, manifest: any = {}) => {
  const { app, router: vueRouter, store: vueStore } = createVueApp();

  await vueRouter.push(url);
  await vueRouter.isReady();

  const state = await dehydrate(url);

  const context = {} as { helmet: HelmetServerState };
  const memoryRouter = createMemoryRouter(routes, {
    initialEntries: [url],
  });

  return {
    vueSsr: await renderVue(app, manifest),
    ssr: renderToString(
      <JotaiProvider>
        <HydrationWrapper serverState={state} />
        <HelmetProvider context={context}>
          <RouterProvider router={memoryRouter} />
        </HelmetProvider>
      </JotaiProvider>,
    ),
    manifest,
    helmet: context.helmet,
    vueState: vueStore.state,
  };
};
