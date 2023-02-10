import { useEffect, useState } from 'react';
import { PostList } from '@src/components/PostList';
import { Post } from '@src/types/Post';
import { fetchPosts } from '@src/api';
import { createCommonMeta, createOpengraphMeta, createTwitterMeta } from '@src/utils/meta';
import { social, blogName, name, description, host } from '@root/config';

export const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts({ length: 5 }).then((data) => {
      setPosts(data);

      const gravatar = `https://www.gravatar.com/avatar/${social.gravatar}`;

      const common = createCommonMeta({
        title: blogName,
        author: name,
        description: description,
      });
      const opengraph = createOpengraphMeta({
        siteName: blogName,
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
    <PostList posts={posts} title="Recent Posts" />
  );
};
