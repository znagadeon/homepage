import { type HTMLAttributes, useMemo } from 'react';
import { config } from '../config';
import { getOrigin } from '../utils/getOrigin';
import style from './Menu.module.scss';

type Link = {
  name: string;
  url: string;
};

type Props = {
  links: Link[];
};

export const Menu = ({
  links,
  ...props
}: HTMLAttributes<HTMLDivElement> & Props) => {
  const parsedLinks = useMemo(() => {
    return links.map((link) => {
      const origin = getOrigin();
      const url = new URL(link.url, origin);

      return {
        ...link,
        isInnerLink: url.origin === origin,
      };
    });
  }, [links]);

  return (
    <nav {...props} className={`${style.menu} ${props.className}`}>
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
