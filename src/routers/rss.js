import express from 'express';
import convert from 'xml-js';
import { config } from '../config';
import { PostRepository } from '../repositories/PostRepository';

const rss = new express.Router();

const wrapCData = (text) => `<![CDATA[${text}]]>`;

const POST_PATH = `${process.cwd()}/posts`;
const repository = new PostRepository(POST_PATH);

rss.get('/rss.xml', (req, res) => {
  const posts = repository.getAllPosts();

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
