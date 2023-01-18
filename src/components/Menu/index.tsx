import { HTMLAttributes } from 'react';

import styles from './style.module.scss';

type Menu = {
  name: string;
  href: string;
}

const MenuItem = (menu: Menu) => {
  const isExternal = /^https?:\/\//.test(menu.href);

  return (
    <li className={styles.menu__item}>
      <a
        href={menu.href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener' : undefined}
      >
        {menu.name}
      </a>
    </li>
  );
};

export const Menu = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const menus: Menu[] = [
    {
      name: 'Wiki',
      href: 'https://wiki.znagadeon.dev',
    },
    {
      name: 'Archive',
      href: '/archive',
    },
  ];

  return (
    <nav className={`${className} ${styles.menu}`}>
      <ul>
        {menus.map(({ name, href }, i) => (
          <MenuItem key={i} name={ name } href={href} />
        ))}
      </ul>
    </nav>
  );
};
