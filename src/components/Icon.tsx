import { type FeatherIconNames, icons } from 'feather-icons';

import style from './Icon.module.scss';

type Props = {
  name: FeatherIconNames;
  size: number;
};

export const Icon = ({ name, size }: Props) => {
  const icon = icons[name].toSvg({
    width: size,
    height: size,
  });

  return (
    <span
      aria-hidden="true"
      className={style['feather-icon']}
      // biome-ignore lint/security/noDangerouslySetInnerHtml:
      dangerouslySetInnerHTML={{ __html: icon }}
    />
  );
};
