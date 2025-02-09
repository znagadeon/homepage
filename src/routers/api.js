import express from 'express';
import { PostRepository } from '../repositories/PostRepository';

const api = new express.Router();

const POST_ROOT = `${process.cwd()}/posts`;
const repository = new PostRepository(POST_ROOT);

api.get('/posts', (req, res) => {
  const posts = repository
    .getPosts()
    .filter((post) => {
      if (!req.query.tag) return true;
      if (post.meta.tags?.indexOf(req.query.tag) === -1) return false;

      return true;
    })
    .map((post) => {
      return {
        ...post,
        content: post.content
          .replace(/<pre class="hljs">.+?<\/pre>/g, '')
          .replace(/<.+?>/g, ''),
      };
    });

  res.send(req.query.length ? posts.slice(0, req.query.length) : posts);
  res.end();
});

api.get('/post/:title', (req, res) => {
  res.send(repository.getPostById(req.params.title));
});

export default api;
