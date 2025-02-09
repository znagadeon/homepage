import express from 'express';
import { config } from '../config';
import { PostRepository } from '../repositories/PostRepository';
import { createSitemap } from '../utils/sitemap';

const sitemap = new express.Router();

const POST_PATH = `${process.cwd()}/posts`;
const repository = new PostRepository(POST_PATH);

sitemap.get('/sitemap.xml', (req, res) => {
  const posts = repository.getAllPosts();
  const tags = Array.from(
    new Set(
      posts
        .map((post) => post.meta.tags)
        .reduce((acc, cur) => {
          if (!cur) return acc;
          return acc.concat(cur);
        }, []),
    ),
  );

  res.set('content-type', 'Application/xml').end(
    createSitemap([
      {
        url: config.host,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      ...posts.map((post) => ({
        url: `${config.host}${post.url}`,
        modifiedAt: post.meta.updated,
        changeFrequency: 'weekly',
        priority: 0.7,
      })),
      ...tags.map((tag) => ({
        url: `${config.host}/tag/${tag}`,
        changeFrequency: 'weekly',
        priority: 0.3,
      })),
      {
        url: `${config.host}/archive`,
        changeFrequency: 'weekly',
        priority: 0.1,
      },
    ]),
  );
});

export default sitemap;
