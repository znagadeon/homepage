import { format } from 'date-fns';
import { Tag } from '@src/components/Tag';
import { Post } from '@src/types/Post';

import styles from './PostItem.module.scss';

const MAX_LENGTH = 100;

export const PostItem = ({ post }: { post: Post }) => {
  const { meta, content, url } = post;
  const desc = content.length > MAX_LENGTH
    ? `${content.slice(0, MAX_LENGTH)}...`
    : content;

  const published = format(meta.published, 'yyyy-MM-dd');

  return (
    <li className={styles.post}>
      <a href={url}>
        <h3 className={styles.post__title}>{meta.title}</h3>
        <p className={styles.post__desc}>{desc}</p>
      </a>
      <dl className={styles.post__meta}>
        <dt className="sr-only">tags</dt>
        <dd className={styles.post__tags}>
          <Tag tags={meta.tags} />
        </dd>
        <dt className="sr-only">published</dt>
        <dd className={styles.post__published}>
          <time>{published}</time>
        </dd>
      </dl>
    </li>
  );
};
