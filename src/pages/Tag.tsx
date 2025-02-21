import { useAtomValue } from 'jotai';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { PostList } from '../components/PostList';
import { config } from '../config';
import { postsAtom } from '../stores';

export const Tag = () => {
  const { tag } = useParams();

  const title = `#${tag} - ${config.blogName}`;
  const gravatar = `https://www.gravatar.com/avatar/${config.gravatar}`;
  const posts = useAtomValue(postsAtom);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="author" content={config.author} />
        <meta name="description" content={config.description} />

        <meta property="og:site_name" content={config.blogName} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${config.host}/tag/${tag}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={config.description} />
        <meta property="og:image" content={gravatar} />
      </Helmet>
      <PostList posts={posts}>#{tag}</PostList>
    </>
  );
};
