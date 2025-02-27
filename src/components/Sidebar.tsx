import { config } from '../config';
import { Menu } from './Menu';
import { Social } from './Social';

import { Search } from './Search';
import style from './Sidebar.module.scss';

const SIZE = 200;

export const Sidebar = () => {
  const profileImage = `https://www.gravatar.com/avatar/${config.gravatar}?s=${SIZE}`;

  return (
    <section className={style.sidebar}>
      <section className={style.profile}>
        <img
          src={profileImage}
          width={SIZE / 2}
          height={SIZE / 2}
          alt="Profile"
          className={style.profile__image}
        />
        <div className={style.profile__info}>
          <h2 className={style.profile__author}>{config.author}</h2>
          <Social className={style.profile__social} links={config.social} />
          <Menu className={style.profile__menu} links={config.menu} />
        </div>
      </section>
      <Search className={style.sidebar__search} />
    </section>
  );
};
