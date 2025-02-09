import express from 'express';
import { config } from '../config';
import { PostRepository } from '../repositories/PostRepository';
import { createRss } from '../utils/rss';

const rss = new express.Router();

const POST_PATH = `${process.cwd()}/posts`;
const repository = new PostRepository(POST_PATH);

rss.get('/rss.xml', (req, res) => {
  const posts = repository.getPosts();

  res.set('content-type', 'Application/xml').end(
    createRss({
      title: config.blogName,
      link: config.host,
      description: config.description,
      items: posts.map((post) => ({
        title: post.meta.title,
        link: `${config.host}${post.url}`,
        description: post.content,
        author: config.name,
        published: post.meta.updated,
      })),
    }),
  );
});

export default rss;
