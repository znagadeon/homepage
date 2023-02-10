import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Header } from '@src/components/Header';

import styles from './style.module.scss';
import { runGoogleAnalytics } from '@src/utils/googleAnalytics';
import { HomePage } from '@src/pages/Home';

const router = createBrowserRouter([
  {
    element: (
      <div className={styles.container}>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
]);

export const App = () => {
  useEffect(() => {
    runGoogleAnalytics();
  }, []);

  return (
    <RouterProvider router={router} />
  );
};
