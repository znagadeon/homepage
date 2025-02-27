import { config } from '../config';

import style from './Header.module.scss';

export const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.title}>
        <h1 className={style['title__blog-name']}>
          <a href="/">{config.blogName}</a>
        </h1>
      </div>
    </header>
  );
};
