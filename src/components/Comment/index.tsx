import { comment } from '@root/config';
import { useScript } from '@src/hooks/useScript';

import styles from './style.module.scss';

export const Comment = ({ title }: {title: string}) => {
  if (!title) return null;

  const { repository, repoId, category, categoryId } = comment;

  useScript({
    appendTo: 'body',
    src: 'https://giscus.app/client.js',
    async: true,
    crossOrigin: 'anonymous',
    dataset: {
      repo: repository,
      repoId, category, categoryId,
      mapping: 'specific',
      term: title,
      reactionEnabled: '1',
      emitMetadata: '0',
      theme: 'light',
    },
  });

  return (
    <div className={`giscus ${styles.giscus}`}></div>
  );
};
