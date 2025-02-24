import type { PropsWithChildren } from 'react';
import type { Post } from './PostItem';
import { PostItem } from './PostItem';
import { SSROnly } from './SSROnly';

import style from './PostList.module.scss';

export const PostList = ({
  posts,
  children,
}: PropsWithChildren<{ posts: Post[] }>) => {
  return (
    <SSROnly>
      <article className={style.posts}>
        <h2 className={style.posts__title}>{children}</h2>
        <ol className={style.posts__list}>
          {posts.map((post) => (
            <PostItem key={post.url} post={post} />
          ))}
        </ol>
      </article>
    </SSROnly>
  );
};
