import { Outlet } from 'react-router';
import { Header } from './components/Header';

export const App = () => {
  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
};
