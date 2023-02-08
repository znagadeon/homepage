import { useEffect } from 'react';
import { Header } from '@src/components/Header';

import styles from './style.module.scss';
import { runGoogleAnalytics } from '@src/utils/googleAnalytics';

export const App = () => {
  useEffect(() => {
    runGoogleAnalytics();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <main></main>
    </div>
  );
};
