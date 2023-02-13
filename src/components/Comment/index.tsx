import { comment } from '@root/config';
import { useEffect } from 'react';

import styles from './style.module.scss';

export const Comment = ({ title }: {title: string}) => {
  useEffect(() => {
    if (!title) return;

    const { repository, repoId, category, categoryId } = comment;

    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = 'https://giscus.app/client.js';
    script.dataset.repo = repository;
    script.dataset.repoId = repoId;
    script.dataset.category = category;
    script.dataset.categoryId = categoryId;
    script.dataset.mapping = 'specific';
    script.dataset.term = title;
    script.dataset.reactionEnabled = '1';
    script.dataset.emitMetadata = '0';
    script.dataset.theme = 'light';

    document.body.append(script);
  }, [title]);

  return (
    <div className={`giscus ${styles.giscus}`}></div>
  );
};
