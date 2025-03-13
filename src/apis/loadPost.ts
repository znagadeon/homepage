export const loadPost = async ({ title }: { title: string }) => {
  if (import.meta.env.SSR) {
    const { PostRepository } = await import('../repositories/PostRepository');
    const repository = new PostRepository(`${process.cwd()}/posts`);
    return repository.getPostById(title);
  }

  throw new Error('Impossible');
};
