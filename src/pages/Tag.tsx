import { useEffect, useState } from 'react';
import { PostList } from '@src/components/PostList';
import { Post } from '@src/types/Post';
import { fetchPosts } from '@src/api';
import { createCommonMeta, createOpengraphMeta, createTwitterMeta } from '@src/utils/meta';
import { social, blogName, name, description, host } from '@root/config';
import { useParams } from 'react-router-dom';

export const Tag = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { tag } = useParams<{ tag: string }>();

  useEffect(() => {
    fetchPosts({ tag }).then((data) => {
      setPosts(data);

      const gravatar = `https://www.gravatar.com/avatar/${social.gravatar}`;
      const siteName = `#${tag} - ${blogName}`;
      const common = createCommonMeta({
        title: siteName,
        author: name,
        description: description,
      });
      const opengraph = createOpengraphMeta({
        siteName,
        type: 'website',
        url: host,
        title: blogName,
        description: description,
        image: gravatar,
      });
      const twitter = createTwitterMeta({
        card: 'summary',
        site: `@${social.twitter}`,
        title: blogName,
        description: description,
        image: gravatar,
      });

      document.head.append(common, opengraph, twitter);
    });
  }, []);

  return (
    <PostList posts={posts} title={`#${tag}`} />
  );
};
