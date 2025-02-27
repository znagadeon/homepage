import { Outlet } from 'react-router';
import { Header } from './components/Header';

import style from '../styles/App.module.scss';
import { Sidebar } from './components/Sidebar';

export const App = () => {
  return (
    <div className={style.container}>
      <Header />
      <div className={style.body}>
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
