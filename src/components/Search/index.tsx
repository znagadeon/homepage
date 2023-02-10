import { Icon } from '@src/components/Icon';
import { HTMLAttributes, KeyboardEventHandler } from 'react';

import styles from './style.module.scss';
import rootStyles from '@src/style.module.scss';

export const Search = ({ className }: HTMLAttributes<Record<string, never>>) => {
  const search = () => {
    const input = document.getElementById('searchInput') as HTMLInputElement;

    if (!input.value) {
      alert('검색어를 입력하세요');
      return;
    }

    location.href = `/search/index.html?q=${input.value}`;
  };

  const searchUsingKeyboard: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== 'Enter') return;
    search();
  };

  // TODO: useEffect url query

  return (
    <div className={`${className} ${styles.search}`}>
      <label>
        <span className={rootStyles.srOnly}>Search</span>
        {/* FIXME: onChange */}
        <input id="searchInput" type="text" className={styles.search__input} v-model="query" onKeyUp={searchUsingKeyboard} />
      </label>
      <button onClick={search} aria-label="Search">
        <Icon name="search" size={20} />
      </button>
    </div>
  );
};
