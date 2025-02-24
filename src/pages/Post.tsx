import { useAtomValue } from 'jotai';
import { useParams } from 'react-router';
import { SSROnly } from '../components/SSROnly';
import { TagList } from '../components/TagList';
import { config } from '../config';
import { postAtom } from '../stores';
import { formatDate } from '../utils/format';

export const Post = () => {
  const { title } = useParams();
  const post = useAtomValue(postAtom);
  const commitLog = `https://github.com/${config.history.org}/${config.history.repo}/commits/develop/posts/${title}`;

  return (
    <div className="post">
      <SSROnly>
        <div className="post__meta">
          <h1 className="post__title">{post.meta?.title}</h1>
          <div className="post__tags">
            <span className="sr-only">tags</span>
            <TagList tags={post.meta?.tags || []} />
          </div>
          <div className="post__updated">
            <span>Last Updated: </span>
            <a target="_blank" rel="noreferrer" href={commitLog}>
              <time>{formatDate(post.meta?.updated)}</time>
            </a>
          </div>
        </div>
        <article
          className="post__article"
          // biome-ignore lint/security/noDangerouslySetInnerHtml:
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </SSROnly>
    </div>
  );
};
