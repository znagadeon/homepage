import { Icon } from '@src/components/Icon';
import { HTMLAttributes, KeyboardEventHandler, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './style.module.scss';
import rootStyles from '@src/style.module.scss';

export const Search = ({ className }: HTMLAttributes<Record<string, never>>) => {
  const [query, setQuery] = useState('');
  const [searchParams] = useSearchParams();

  const onChange = (q: string) => {
    setQuery(q);
  };

  const search = () => {
    if (!query) {
      alert('검색어를 입력하세요');
      return;
    }

    location.href = `/search/index.html?q=${query}`;
  };

  const searchUsingKeyboard: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== 'Enter') return;
    search();
  };

  useEffect(() => {
    const initialQuery = searchParams.get('q');
    if (!initialQuery) return;

    setQuery(initialQuery);
  }, []);

  return (
    <div className={`${className} ${styles.search}`}>
      <label>
        <span className={rootStyles.srOnly}>Search</span>
        <input type="text" className={styles.search__input} value={query} onChange={e => onChange(e.target.value)} onKeyUp={searchUsingKeyboard} />
      </label>
      <button onClick={search} aria-label="Search">
        <Icon name="search" size={20} />
      </button>
    </div>
  );
};
