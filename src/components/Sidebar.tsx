import { config } from '../config';
import { Menu } from './Menu';
import { Social } from './Social';

import { Search } from './Search';
import style from './Sidebar.module.scss';

const SIZE = 300;

export const Sidebar = () => {
  const profileImage = `https://www.gravatar.com/avatar/${config.gravatar}?s=${SIZE}`;

  return (
    <section className={style.sidebar}>
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
        <Search />
      </section>
    </section>
  );
};
