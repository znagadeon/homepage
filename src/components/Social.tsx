import type { FeatherIconNames } from 'feather-icons';
import { type HTMLAttributes, useMemo } from 'react';
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
      const url = new URL(link, location.origin);

      if (url.pathname.includes('rss.xml')) {
        return {
          link,
          name: 'RSS',
          icon: 'rss' as FeatherIconNames,
        };
      }

      switch (url.origin) {
        case 'https://github.com':
          return {
            link,
            name: 'GitHub',
            icon: 'github' as FeatherIconNames,
          };
        case 'https://linkedin.com':
          return {
            link,
            name: 'LinkedIn',
            icon: 'linkedin' as FeatherIconNames,
          };
        case 'https://twitter.com':
          return {
            link,
            name: 'Twitter',
            icon: 'twitter' as FeatherIconNames,
          };
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
            <span className="sr-only">{name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};
