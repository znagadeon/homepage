import { Comment } from '@src/components/Comment';
import { Tag } from '@src/components/Tag';
import { Post } from '@src/types/Post';
import { format } from 'date-fns';

import { comment, blogName, social, name, description, host } from '@root/config';
import { createCommonMeta, createOpengraphMeta, createTwitterMeta } from '@src/utils/meta';

import styles from './style.module.scss';

// FIXME: optional
export const PostPage = ({ post }: { post?: Post }) => {
  if (!post || !post.meta) return null;

  // FIXME: optional
  const published = format(post.meta.published, 'yyyy-MM-dd');
  const commitLog = `https://github.com/${comment.repository}/commits/develop/posts/${post.meta.title}`;

  // FIXME: useEffect
  const onLoad = () => {
    const gravatar = `https://www.gravatar.com/avatar/${social.gravatar}`;
    const title = post.meta.title;
    const siteName = `${title} - ${blogName}`;
    const desc = post.content?.replace(/(<([^>]+)>)/gi, '').slice(0, 55);

    const common = createCommonMeta({
      title: siteName,
      author: name,
      description: description,
    });
    const opengraph = createOpengraphMeta({
      siteName,
      type: 'article',
      url: `${host}/post/${post.meta.title}/index.html`,
      title,
      description: desc,
      image: gravatar,
    });
    const twitter = createTwitterMeta({
      card: 'summary',
      site: `@${social.twitter}`,
      title,
      description: desc,
      image: gravatar,
    });

    document.head.append(common, opengraph, twitter);
  };

  return (
    <div className={styles.post} onLoad={onLoad}>
      <div className={styles.post__meta}>
        <h1 className={styles.post__title}>{post.meta.title}</h1>
        <div className={styles.post__tags}>
          <span className="sr-only">tags</span>
          <Tag tags={post.meta.tags} />
        </div>
        <div className={styles.post__published}>
          <span className="sr-only">published</span>
          <a target="_blank" href={commitLog}>
            <time>{published}</time>
          </a>
        </div>
      </div>
      <article className={styles.post__article} dangerouslySetInnerHTML={{__html: post.content}}></article>
      <Comment title={post.meta.title} />
    </div>
  );
};
