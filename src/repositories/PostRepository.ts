import { getMeta } from '../lib/getMeta';
import { getPosts } from '../lib/getPosts';

const POST_ROOT = `${process.cwd()}/posts`;

export class PostRepository {
  getPostById(id: string) {
    const posts = getPosts(POST_ROOT);
    const found = posts.find((filename) => filename.includes(id));

    if (!found) throw new Error('Post not found');

    return {
      ...getMeta(found),
      url: `/post/${found.match(/posts\/(.+)\/index\.md$/)?.[1]}/index.html`,
    };
  }
}
