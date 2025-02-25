import { hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Provider as JotaiProvider } from 'jotai';
import {routes} from './routes';
import { HydrationWrapper } from './components/HydrationWrapper';

import '../styles/master.scss';

const app = document.getElementById('app');
if (app) {
  const initialState = window.__JOTAI_STATE__ || new Map();

  hydrateRoot(app, (
    <JotaiProvider>
      <HydrationWrapper serverState={initialState} />
      <HelmetProvider>
        <RouterProvider router={createBrowserRouter(routes)} />
      </HelmetProvider>
    </JotaiProvider>
  ));
}
