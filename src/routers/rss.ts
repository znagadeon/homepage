import { Router } from 'express';
import getPosts from '../lib/get-posts';
import getMeta from '../lib/get-meta';

import { ROOT } from '../consts';

import convert from 'xml-js';

import { blogName, host, description, name } from '../../config';

const rss = Router();

const wrapCData = (text: string) => `<![CDATA[${text}]]>`;

rss.get('/rss.xml', (req, res) => {
  const POST_PATH = `${ROOT}/posts/`;
  const posts = getPosts(POST_PATH)
    .map(filename => ({
      ...getMeta(filename),
      url: `/post/${filename.slice(POST_PATH.length, -('/index.md'.length))}/index.html`,
    }))
    .filter(post => !post.meta.draft)
    .sort((a, b) => {
      if (a.meta.published < b.meta.published) return 1;
      if (a.meta.published > b.meta.published) return -1;
      return 0;
    });

  res.set('content-type', 'Application/xml').end(convert.js2xml({
    elements: [{
      type: 'element',
      name: 'rss',
      attributes: {
        version: '2.0',
      },
      elements: [{
        type: 'element',
        name: 'channel',
        elements: [{
          type: 'element',
          name: 'title',
          elements: [{ type: 'text', text: wrapCData(blogName) }],
        }, {
          type: 'element',
          name: 'link',
          elements: [{ type: 'text', text: host }],
        }, {
          type: 'element',
          name: 'description',
          elements: [{ type: 'text', text: wrapCData(description) }],
        }, ...posts.map(post => ({
          type: 'element',
          name: 'item',
          elements: [{
            type: 'element',
            name: 'title',
            elements: [{ type: 'text', text: wrapCData(post.meta.title) }],
          }, {
            type: 'element',
            name: 'link',
            elements: [{ type: 'text', text: `${host}${post.url}` }],
          }, {
            type: 'element',
            name: 'description',
            elements: [{ type: 'text', text: wrapCData(post.content) }],
          }, {
            type: 'element',
            name: 'author',
            elements: [{ type: 'text', text: wrapCData(name) }],
          }, {
            type: 'element',
            name: 'guid',
            elements: [{ type: 'text', text: `${host}${post.url}` }],
          }, {
            type: 'element',
            name: 'pubDate',
            elements: [{ type: 'text', text: post.meta.published }],
          }],
        }))],
      }],
    }],
    declaration: {
      attributes: {
        version: '1.0',
        encoding: 'utf-8',
      },
    },
  }));
});

export default rss;
