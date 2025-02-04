import express from 'express';
import convert from 'xml-js';
import { config } from '../config';
import { getMeta } from '../lib/getMeta';
import { getPosts } from '../lib/getPosts';
import { createEntry } from '../utils/sitemap';

const sitemap = new express.Router();

sitemap.get('/sitemap.xml', (req, res) => {
  const POST_PATH = `${global.ROOT}/posts/`;
  const posts = getPosts(POST_PATH)
    .map((filename) => ({
      ...getMeta(filename),
      url: `/post/${filename.slice(POST_PATH.length, -'/index.md'.length)}/index.html`,
    }))
    .filter((post) => !post.meta.draft)
    .sort((a, b) => {
      if (a.meta.published < b.meta.published) return 1;
      if (a.meta.published > b.meta.published) return -1;
      return 0;
    });
  const tags = Array.from(
    new Set(
      posts.map((post) => post.meta.tags).reduce((a, b) => [...a, ...b], []),
    ),
  );

  res.set('content-type', 'Application/xml').end(
    convert.js2xml({
      elements: [
        {
          type: 'element',
          name: 'urlset',
          elements: [
            createEntry({
              url: config.host,
              changeFrequency: 'weekly',
              priority: 0.9,
            }),
            ...posts.map((post) =>
              createEntry({
                url: `${config.host}${post.url}`,
                modifiedAt: post.meta.published,
                changeFrequency: 'weekly',
                priority: 0.7,
              }),
            ),
            ...tags.map((tag) =>
              createEntry({
                url: `${config.host}/tag/${tag}`,
                changeFrequency: 'weekly',
                priority: 0.3,
              }),
            ),
            createEntry({
              url: `${config.host}/archive`,
              changeFrequency: 'weekly',
              priority: 0.1,
            }),
          ],
          attributes: {
            xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
          },
        },
      ],
      declaration: {
        attributes: {
          version: '1.0',
          encoding: 'utf-8',
        },
      },
    }),
  );
});

export default sitemap;
