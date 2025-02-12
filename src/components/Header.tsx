import { config } from '../config';
import { Search } from './Search';

import style from './Header.module.scss';
import { Menu } from './Menu';
import { Social } from './Social';

const SIZE = 300;

export const Header = () => {
  const profileImage = `https://www.gravatar.com/avatar/${config.gravatar}?s=${SIZE}`;

  return (
    <header className={style.header}>
      <div className={style.title}>
        <h1 className={style['title__blog-name']}>
          <a href="/">{config.blogName}</a>
        </h1>
        <Search className="title__search" />
      </div>
      <section className={`${style.header__profile} ${style.profile}`}>
        <img
          src={profileImage}
          width={SIZE / 2}
          height={SIZE / 2}
          alt="Profile"
          className={style.profile__image}
        />
        <h2 className={style.profile__author}>{config.author}</h2>
        <p className={style.profile__description}>{config.description}</p>
        <Social className={style.profile__social} links={config.social} />
        <Menu className={style.profile__menu} links={config.menu} />
      </section>
    </header>
  );
};
