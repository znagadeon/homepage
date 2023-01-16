import type { FeatherIconNames } from 'feather-icons';
import { icons } from 'feather-icons';

import styles from './style.module.scss';

export const Icon = ({ name, size }: { name: FeatherIconNames; size: number }) => {
  const icon = icons[name].toSvg({ width: size, height: size });

  return (
    <span
      aria-hidden="true"
      className={styles.featherIcon}
      dangerouslySetInnerHTML={{ __html: icon }}
    />
  );
};
