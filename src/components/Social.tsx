import { type HTMLAttributes, useMemo } from 'react';
import { getOrigin } from '../utils/getOrigin';
import { Icon } from './Icon';

import style from './Social.module.scss';

type Props = {
  links: string[];
};

export const Social = ({
  links,
  ...props
}: HTMLAttributes<HTMLUListElement> & Props) => {
  const parsedLinks = useMemo(() => {
    return links.map((link) => {
      const url = new URL(link, getOrigin());

      if (url.pathname.includes('rss.xml')) {
        return {
          link,
          name: '/rss.xml',
          icon: 'rss',
        } as const;
      }

      const name = link.split('/').at(-1);

      switch (url.origin) {
        case 'https://github.com':
          return {
            link,
            name,
            icon: 'github',
          } as const;
        case 'https://linkedin.com':
          return {
            link,
            name,
            icon: 'linkedin',
          } as const;
        case 'https://twitter.com':
          return {
            link,
            name,
            icon: 'twitter',
          } as const;
        default:
          throw new Error('Not Implemented');
      }
    });
  }, [links]);

  return (
    <ul {...props} className={`${style.social} ${props.className}`}>
      {parsedLinks.map(({ link, name, icon }) => (
        <li key={link}>
          <a href={link} target="_blank" rel="noreferrer">
            <Icon name={icon} size={20} />
            <span className={style.social__text}>{name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};
