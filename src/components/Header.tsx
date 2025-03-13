import { config } from '../config';

import style from './Header.module.scss';

export const Header = () => {
  return (
    <header className={style.header}>
      <h1 className={style['header__blog-name']}>
        <a href="/">{config.blogName}</a>
      </h1>
    </header>
  );
};
