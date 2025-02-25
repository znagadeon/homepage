import axios from 'axios';

export const loadPosts = async ({
  limit,
  tag,
}: { limit?: number; tag?: string } = {}) => {
  if (import.meta.env.SSR) {
    const { PostRepository } = await import('../repositories/PostRepository');
    const repository = new PostRepository(`${process.cwd()}/posts`);
    return repository.getPosts({ limit, tag }).map((post) => {
      return {
        ...post,
        content: post.content
          .replace(/<pre class="hljs">.+?<\/pre>/g, '')
          .replace(/<.+?>/g, ''),
      };
    });
  }

  const response = await axios.get('/api/posts', {
    params: { length: limit, tag },
  });
  return response.data;
};
