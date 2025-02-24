import style from './PostItem.module.scss';
import { TagList } from './TagList';

export type Post = {
  meta: {
    title: string;
    tags?: string[];
    updated: Date;
  };
  content: string;
  url: string;
};

const MAX_LENGTH = 100;

export const PostItem = ({ post }: { post: Post }) => {
  const desc =
    post.content.length > MAX_LENGTH
      ? `${post.content.slice(0, MAX_LENGTH)}...`
      : post.content;

  return (
    <li className={style['post-item']}>
      <a href={post.url}>
        <h3 className={style['post-item__title']}>{post.meta.title}</h3>
        <p className={style['post-item__desc']}>{desc}</p>
      </a>
      {post.meta.tags && post.meta.tags.length > 0 && (
        <dl className={style['post-item__meta-info']}>
          <dt className="sr-only">tags</dt>
          <dd className={style['post-item__tags']}>
            <TagList tags={post.meta.tags} />
          </dd>
        </dl>
      )}
    </li>
  );
};
