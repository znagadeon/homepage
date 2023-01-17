import { Icon } from '../Icon';
import { social } from '@root/config';
import { FeatherIconNames } from 'feather-icons';
import type { HTMLAttributes } from 'react';

import styles from './style.module.scss';

type SocialLink = {
  name: string;
  href: string;
  icon: FeatherIconNames;
}

export const Social = ({ className }: HTMLAttributes<HTMLUListElement>) => {
  const links: SocialLink[] = [
    {
      name: 'GitHub',
      href: `https://github.com/${social.github}`,
      icon: 'github',
    },
    {
      name: 'LinkedIn',
      href: `https://linkedin.com/in/${social.linkedin}`,
      icon: 'linkedin',
    },
    {
      name: 'Twitter',
      href: `https://twitter.com/${social.twitter}`,
      icon: 'twitter',
    },
    {
      name: 'RSS',
      href: social.rss,
      icon: 'rss',
    },
    {
      name: 'Donation',
      href: social.donation,
      icon: 'dollar-sign',
    }
  ];

  return (
    <ul className={`${className} ${styles.social}`}>
      {links.map(({ name, href, icon }, i) => (
        <li key={i} className={styles.social__item}>
          <a href={href} target="_blank" rel="noopener" aria-label={name}>
            <Icon name={icon} size={20} />
          </a>
        </li>
      ))}
    </ul>
  );
};
