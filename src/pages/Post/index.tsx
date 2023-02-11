import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchPost } from '@src/api';

import { Comment } from '@src/components/Comment';
import { Tag } from '@src/components/Tag';
import { Post } from '@src/types/Post';
import { format } from 'date-fns';

import { comment, blogName, social, name, description, host } from '@root/config';
import { createCommonMeta, createOpengraphMeta, createTwitterMeta } from '@src/utils/meta';

import 'highlight.js/styles/atom-one-dark.css';
import 'katex/dist/katex.css';
import styles from './style.module.scss';
import rootStyles from '@src/style.module.scss';

export const PostPage = () => {
  const [post, setPost] = useState<Post>();
  const { title } = useParams<{ title: string }>();

  useEffect(() => {
    if (!title) return;

    fetchPost(title).then((data) => {
      setPost(data);

      const gravatar = `https://www.gravatar.com/avatar/${social.gravatar}`;
      const title = data.meta.title;
      const siteName = `${title} - ${blogName}`;
      const desc = data.content?.replace(/(<([^>]+)>)/gi, '').slice(0, 55);

      const common = createCommonMeta({
        title: siteName,
        author: name,
        description: description,
      });
      const opengraph = createOpengraphMeta({
        siteName,
        type: 'article',
        url: `${host}/post/${data.meta.title}/index.html`,
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
    });
  }, [title]);

  if (!post) return null;

  const published = format(post.meta.published, 'yyyy-MM-dd');
  const commitLog = `https://github.com/${comment.repository}/commits/develop/posts/${post.meta.title}`;

  return (
    <div className={styles.post}>
      <div className={styles.post__meta}>
        <h1 className={styles.post__title}>{post.meta.title}</h1>
        <div className={styles.post__tags}>
          <span className={rootStyles.srOnly}>tags</span>
          <Tag tags={post.meta.tags} />
        </div>
        <div className={styles.post__published}>
          <span className={rootStyles.srOnly}>published</span>
          <a target="_blank" href={commitLog}>
            <time>{published}</time>
          </a>
        </div>
      </div>
      <article className={styles.post__article} dangerouslySetInnerHTML={{ __html: post.content }}></article>
      <Comment title={post.meta.title} />
    </div>
  );
};
