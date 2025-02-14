import { App } from './App';
import { Archive } from './pages/Archive';
import { Home } from './pages/Home';
import { Post } from './pages/Post';
import { Search } from './pages/Search';
import { Tag } from './pages/Tag';

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home /> },
      { path: 'post/:title', element: <Post /> },
      { path: 'archive', element: <Archive /> },
      { path: 'tag/:tag', element: <Tag /> },
      { path: 'search', element: <Search /> },

      { path: 'index.html', element: <Home /> },
      { path: 'post/:title/index.html', element: <Post /> },
      { path: 'archive/index.html', element: <Archive /> },
      { path: 'tag/:tag/index.html', element: <Tag /> },
      { path: 'search/index.html', element: <Search /> },
    ],
  },
];
