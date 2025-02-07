import { getMeta } from '../lib/getMeta';
import { getPosts } from '../lib/getPosts';

const POST_ROOT = `${process.cwd()}/posts`;

export class PostRepository {
  getPostById(id: string) {
    const posts = getPosts(POST_ROOT);
    const found = posts.find((filename) => filename.includes(id));

    if (!found) throw new Error('Post not found');

    return this.getMeta(found);
  }

  getAllPosts() {
    const posts = getPosts(POST_ROOT);
    return posts
      .map((post) => this.getMeta(post))
      .filter((post) => !post.meta.draft)
      .sort((a, b) => {
        if (a.meta.updated < b.meta.updated) return 1;
        if (a.meta.updated > b.meta.updated) return -1;
        return 0;
      });
  }

  private getMeta(filename: string) {
    return {
      ...getMeta(filename),
      url: `/post/${filename.match(/posts\/(.+)\/index\.md$/)?.[1]}/index.html`,
    };
  }
}
