import { type KeyboardEventHandler, useEffect, useState } from 'react';
import { Icon } from './Icon';

import style from './Search.module.scss';

export const Search = () => {
  const [query, setQuery] = useState('');

  const search = () => {
    if (!query) {
      alert('검색어를 입력하세요');
      return;
    }

    location.href = `/search/index.html?q=${query}`;
  };

  const onKeyup: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== 'enter') return;
    search();
  };

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    setQuery(search.get('q') || '');
  }, []);

  return (
    <div className={style.search}>
      <label>
        <span className="sr-only">Search</span>
        <input
          type="search"
          className={style.search__input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={onKeyup}
        />
      </label>
      <button className={style.search__submit} type="button" onClick={search}>
        <Icon name="search" size={20} />
        <span className="sr-only">Search</span>
      </button>
    </div>
  );
};
