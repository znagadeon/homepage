import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Header } from '@src/components/Header';

import styles from './style.module.scss';
import { runGoogleAnalytics } from '@src/utils/googleAnalytics';
import { HomePage } from '@src/pages/Home';
import { PostPage } from '@src/pages/Post';
import { Archive } from '@src/pages/Archive';
import { Tag } from './pages/Tag';
import { Search } from './pages/Search';

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
      {
        path: '/archive/index.html',
        element: <Archive />,
      },
      {
        path: '/tag/:tag/index.html',
        element: <Tag />,
      },
      {
        path: '/search/index.html',
        element: <Search />,
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
