import { type HTMLAttributes, useMemo } from 'react';
import {config} from '../config';

export type Link = {
  name: string;
  path: string;
};

const LOCAL_HOST = 'http://localhost:1337';

export const MenuItem = ({ link }: { link: Link }) => {
  const isInnerLink = useMemo(() => {
    const url = new URL(link.path, location.origin);

    return [LOCAL_HOST, config.host].includes(url.origin);
  }, [link.path]);

  const attr = isInnerLink
    ? {}
    : { target: '_blank', rel: 'noreferrer' } as HTMLAttributes<HTMLAnchorElement>;

  return (
    <a href={link.path} {...attr}>
      {link.name}
    </a>
  );
};
