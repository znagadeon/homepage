import express from 'express';
import convert from 'xml-js';
import { config } from '../config';
import { getMeta } from '../lib/getMeta';
import { getPosts } from '../lib/getPosts';

const rss = new express.Router();

const wrapCData = (text) => `<![CDATA[${text}]]>`;

rss.get('/rss.xml', (req, res) => {
  const POST_PATH = `${process.cwd()}/posts/`;
  const posts = getPosts(POST_PATH)
    .map((filename) => ({
      ...getMeta(filename),
      url: `/post/${filename.slice(POST_PATH.length, -'/index.md'.length)}/index.html`,
    }))
    .filter((post) => !post.meta.draft)
    .sort((a, b) => {
      if (a.meta.updated < b.meta.updated) return 1;
      if (a.meta.updated > b.meta.updated) return -1;
      return 0;
    });

  res.set('content-type', 'Application/xml').end(
    convert.js2xml({
      elements: [
        {
          type: 'element',
          name: 'rss',
          attributes: {
            version: '2.0',
          },
          elements: [
            {
              type: 'element',
              name: 'channel',
              elements: [
                {
                  type: 'element',
                  name: 'title',
                  elements: [
                    { type: 'text', text: wrapCData(config.blogName) },
                  ],
                },
                {
                  type: 'element',
                  name: 'link',
                  elements: [{ type: 'text', text: config.host }],
                },
                {
                  type: 'element',
                  name: 'description',
                  elements: [
                    { type: 'text', text: wrapCData(config.description) },
                  ],
                },
                ...posts.map((post) => ({
                  type: 'element',
                  name: 'item',
                  elements: [
                    {
                      type: 'element',
                      name: 'title',
                      elements: [
                        { type: 'text', text: wrapCData(post.meta.title) },
                      ],
                    },
                    {
                      type: 'element',
                      name: 'link',
                      elements: [
                        { type: 'text', text: `${config.host}${post.url}` },
                      ],
                    },
                    {
                      type: 'element',
                      name: 'description',
                      elements: [
                        { type: 'text', text: wrapCData(post.content) },
                      ],
                    },
                    {
                      type: 'element',
                      name: 'author',
                      elements: [
                        { type: 'text', text: wrapCData(config.name) },
                      ],
                    },
                    {
                      type: 'element',
                      name: 'guid',
                      elements: [
                        { type: 'text', text: `${config.host}${post.url}` },
                      ],
                    },
                    {
                      type: 'element',
                      name: 'pubDate',
                      elements: [{ type: 'text', text: post.meta.updated }],
                    },
                  ],
                })),
              ],
            },
          ],
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

export default rss;
