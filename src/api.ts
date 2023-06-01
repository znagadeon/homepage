import axios from 'axios';
import { Post } from './types/Post';

type Param = {
  length?: number;
  tag?: string;
};

export const fetchPosts = async (params?: Param) => {
  return (await axios.get<Post[]>('/api/posts', { params })).data
    .map(post => ({
      ...post,
      meta: {
        ...post.meta,
        published: new Date(post.meta.published),
      },
    }));
};

export const fetchPost = async (title: string) => {
  const { data } = await axios.get<Post>(`/api/post/${title}`);

  return {
    content: data.content,
    url: `/post/${title}/index.html`,
    meta: {
      ...data.meta,
      published: new Date(data.meta.published),
    },
  };
};
