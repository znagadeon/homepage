import { comment } from '@root/config';
import { HTMLAttributes } from 'react';

import styles from './style.module.scss';

export const Comment = ({ title, className }: HTMLAttributes<{ title: string }>) => {
  if (!title) return null;

  return (
    <>
      <div className={`${className} ${styles.giscus}`}></div>
      <script
        async
        src="https://giscus.app/client.js"
        data-repo={comment.repository}
        data-repo-id={comment.repoId}
        data-category={comment.category}
        data-category-id={comment.categoryId}
        data-mapping="specific"
        data-term={title}
        data-reaction-enabled="1"
        data-emit-metadata="0"
        data-theme="light"
        crossOrigin="anonymous"
      />
    </>
  );
};
