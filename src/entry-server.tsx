import { Provider as JotaiProvider } from 'jotai';
import { renderToString } from 'react-dom/server';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { HydrationWrapper } from './components/HydrationWrapper';
import { dehydrate } from './hydration';
import { routes } from './routes';

export const render = async (url: string) => {
  const state = await dehydrate(url);

  const context = {} as { helmet: HelmetServerState };
  const memoryRouter = createMemoryRouter(routes, {
    initialEntries: [url],
  });

  return {
    ssr: renderToString(
      <JotaiProvider>
        <HydrationWrapper serverState={state} />
        <HelmetProvider context={context}>
          <RouterProvider router={memoryRouter} />
        </HelmetProvider>
      </JotaiProvider>,
    ),
    state,
    helmet: context.helmet,
  };
};
