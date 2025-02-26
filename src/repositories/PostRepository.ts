import { getMeta } from '../lib/getMeta';
import { getPosts } from '../lib/getPosts';

export class PostRepository {
  constructor(private root: string) {}

  getPostById(id: string) {
    const posts = getPosts(this.root);
    const found = posts.find((filename) => filename.includes(id.slice(0, -1)));

    if (!found) throw new Error('Post not found');

    return this.getMeta(found);
  }

  getPosts({ limit, tag }: { limit?: number; tag?: string } = {}) {
    const posts = getPosts(this.root)
      .map((post) => this.getMeta(post))
      .filter((post) => {
        if (post.meta.draft) return false;
        if (!tag) return true;
        return post.meta.tags?.includes(tag);
      })
      .sort((a, b) => {
        if (a.meta.updated < b.meta.updated) return 1;
        if (a.meta.updated > b.meta.updated) return -1;
        return 0;
      });

    if (typeof limit !== 'number') return posts;
    return posts.slice(0, limit);
  }

  private getMeta(filename: string) {
    return {
      ...getMeta(filename),
      url: `/post/${filename.match(/posts\/(.+?)(?:\/index\.md|\.md)$/)?.[1]}/`,
    };
  }
}
