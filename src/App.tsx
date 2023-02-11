import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Header } from '@src/components/Header';

import styles from './style.module.scss';
import { runGoogleAnalytics } from '@src/utils/googleAnalytics';
import { HomePage } from '@src/pages/Home';
import { PostPage } from '@src/pages/Post';

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
      {
        path: '/post/:title/index.html',
        element: <PostPage />,
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
