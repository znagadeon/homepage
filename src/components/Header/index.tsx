import { blogName } from '@root/config';
import { Search } from '@src/components/Search';
import { Profile } from '@src/components/Profile';

import styles from './style.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.header__title} ${styles.title}`}>
        <h1 className={styles['title__blog-name']}>
          <a href="/">{blogName}</a>
        </h1>
        <Search className={styles.title__search} />
      </div>
      <Profile className={styles.header__profile} />
    </header>
  );
};
