import express from 'express';
import { getMeta } from '../lib/getMeta';
import { getPosts } from '../lib/getPosts';
import { PostRepository } from '../repositories/PostRepository';

const api = new express.Router();

const POST_PATH = `${process.cwd()}/posts`;

api.get('/posts', (req, res) => {
  const posts = getPosts(POST_PATH)
    .map((filename) => ({
      ...getMeta(filename),
      url: `/post/${filename.match(/posts\/(.+)\/index\.md$/)[1]}/index.html`,
    }))
    .filter((post) => {
      if (post.meta.draft) return false;
      if (req.query.tag && post.meta.tags?.indexOf(req.query.tag) === -1)
        return false;

      return true;
    })
    .map((post) => {
      return {
        ...post,
        content: post.content
          .replace(/<pre class="hljs">.+?<\/pre>/g, '')
          .replace(/<.+?>/g, ''),
      };
    })
    .sort((a, b) => {
      if (a.meta.updated < b.meta.updated) return 1;
      if (a.meta.updated > b.meta.updated) return -1;
      return 0;
    });

  res.send(req.query.length ? posts.slice(0, req.query.length) : posts);
  res.end();
});

api.get('/post/:title', (req, res) => {
  const repository = new PostRepository();
  res.send(repository.getPostById(req.params.title));
});

export default api;
