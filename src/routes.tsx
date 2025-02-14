import { App } from './App';

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <span className="sr-only">Home</span> },
      { path: '*', element: <span className="sr-only">Not Found</span> },
    ],
  },
];
