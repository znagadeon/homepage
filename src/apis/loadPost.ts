import axios from 'axios';

export const loadPost = async ({ title }: { title: string }) => {
  if (import.meta.env.SSR) {
    const { PostRepository } = await import('../repositories/PostRepository');
    const repository = new PostRepository(`${process.cwd()}/posts`);
    return repository.getPostById(title);
  }

  const { data } = await axios.get(`/api/post/${title}`);

  return {
    content: data.content,
    meta: {
      ...data.meta,
      updated: new Date(data.meta.updated),
    },
  };
};
