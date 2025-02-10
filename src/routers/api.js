import express from 'express';
import { PostRepository } from '../repositories/PostRepository';

const api = new express.Router();

const POST_ROOT = `${process.cwd()}/posts`;
const repository = new PostRepository(POST_ROOT);

api.get('/posts', (req, res) => {
  const posts = repository
    .getPosts({ tag: req.query.tag, limit: req.query.length })
    .map((post) => {
      return {
        ...post,
        content: post.content
          .replace(/<pre class="hljs">.+?<\/pre>/g, '')
          .replace(/<.+?>/g, ''),
      };
    });

  res.send(posts);
});

api.get('/post/:title', (req, res) => {
  res.send(repository.getPostById(req.params.title));
});

export default api;
