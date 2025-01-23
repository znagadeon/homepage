import { MenuItem, type Link } from './MenuItem';

import style from './Menu.module.scss';

export const Menu = ({links}: { links: Link[] }) => {
  return (
    <nav className={style.menu}>
      <ul>
        {links.map(link => (
          <li className={style['menu-item']} key={link.name}>
            <MenuItem link={link} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
