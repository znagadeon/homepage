import { Outlet } from 'react-router';
import { Header } from './components/Header';

import '../styles/App.scss';

export const App = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};
