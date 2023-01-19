import { HTMLAttributes } from 'react';
import { Social } from '@src/components/Social';
import { Menu } from '@src/components/Menu';

import { social, name, description } from '@root/config';

import styles from './style.module.scss';

export const Profile = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const profileSize = 300;
  const profileImage = `https://www.gravatar.com/avatar/${social.gravatar}?s=${profileSize}`;

  return (
    <section className={`${className} ${styles.profile}`}>
      <img
        src={profileImage}
        width={profileSize/2}
        height={profileSize/2}
        alt="Profile image"
        className={styles.profile__image}
      />
      <h2 className={styles.profile__title}>{name}</h2>
      <p className={styles.profile__description}>{description}</p>
      <Social className={styles.profile__social} />
      <Menu className={styles.profile__menu} />
    </section>
  );
};
