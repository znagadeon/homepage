import { useMemo } from 'react';
import style from './Menu.module.scss';

type Link = {
  name: string;
  url: string;
};

type Props = {
  links: Link[];
};

export const Menu = ({ links }: Props) => {
  const parsedLinks = useMemo(() => {
    return links.map((link) => {
      const url = new URL(link.url, location.origin);

      return {
        ...link,
        isInnerLink: url.origin === location.origin,
      };
    });
  }, [links]);

  return (
    <nav className={style.menu}>
      <ul>
        {parsedLinks.map(({ isInnerLink, name, url }) => (
          <li key={name} className={style['menu__menu-item']}>
            <a
              href={url}
              {...(isInnerLink ? {} : { target: '_blank', rel: 'noreferrer' })}
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
