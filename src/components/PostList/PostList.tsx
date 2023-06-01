import { PostItem } from './PostItem';
import { Post } from '@src/types/Post';

import styles from './PostList.module.scss';

export const PostList = ({ posts, title }: { posts: Post[], title: string }) => {
  return (
    <article className={styles.posts}>
      <h2 className={styles.posts__title}>{title}</h2>
      <ol className={styles.posts__list}>
        {posts?.map((post, i) => (
          <PostItem post={post} key={i} />
        ))}
      </ol>
    </article>
  );
};
