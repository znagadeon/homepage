import { Provider as JotaiProvider } from 'jotai';
import { hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider, createBrowserRouter } from 'react-router';
import { HydrationWrapper } from './components/HydrationWrapper';
import { routes } from './routes';

import '../styles/master.scss';

const app = document.getElementById('app');
if (app) {
  const initialState = new Map();

  hydrateRoot(
    app,
    <JotaiProvider>
      <HydrationWrapper serverState={initialState} />
      <HelmetProvider>
        <RouterProvider router={createBrowserRouter(routes)} />
      </HelmetProvider>
    </JotaiProvider>,
  );
}
