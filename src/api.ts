import axios from 'axios';
import { Post } from './types/Post';

export const fetchPost = async (title: string): Promise<Post> => {
  const { data } = await axios.get(`/api/post/${title}`);

  return {
    content: data.content,
    url: `/post/${title}/index.html`,
    meta: {
      ...data.meta,
      published: new Date(data.meta.published),
    },
  };
};
