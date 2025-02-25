import { useAtomValue } from 'jotai';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { Comment } from '../components/Comment';
import { TagList } from '../components/TagList';
import { config } from '../config';
import { postAtom } from '../stores';
import { formatDate } from '../utils/format';

import style from './Post.module.scss';

export const Post = () => {
  const { title } = useParams();
  const post = useAtomValue(postAtom);
  const commitLog = `https://github.com/${config.history.org}/${config.history.repo}/commits/develop/posts/${title}`;
  const gravatar = `https://www.gravatar.com/avatar/${config.gravatar}`;
  const desc = post.content
    .replace(/(<([^>]+)>)/gi, '')
    .slice(0, 55)
    .trim();

  if (!post) return null;

  return (
    <>
      <Helmet>
        <title>
          {post.meta.title} - {config.blogName}
        </title>
        <meta name="author" content={config.author} />
        <meta name="description" content={config.description} />

        <meta property="og:site_name" content={config.blogName} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${config.host}/post/${title}`} />
        <meta property="og:title" content={post.meta.title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={gravatar} />
      </Helmet>
      <div className={style.post}>
        <div className={style.post__meta}>
          <h1 className={style.post__title}>{post.meta.title}</h1>
          <div className={style.post__tags}>
            <span className="sr-only">tags</span>
            <TagList tags={post.meta.tags || []} />
          </div>
          <div className={style.post__updated}>
            <span>Last Updated: </span>
            <a target="_blank" rel="noreferrer" href={commitLog}>
              <time>{formatDate(new Date(post.meta.updated))}</time>
            </a>
          </div>
        </div>
        <article
          className={style.post__article}
          // biome-ignore lint/security/noDangerouslySetInnerHtml:
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
      <Comment title={post.meta.title} />
    </>
  );
};
