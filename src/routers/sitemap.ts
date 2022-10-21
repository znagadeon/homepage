import { Router } from 'express';
import getPosts from '../lib/get-posts';
import getMeta from '../lib/get-meta';

import { ROOT } from '../consts';

import convert from 'xml-js';
import { format } from 'date-fns';

import { host } from '../../config';

const sitemap = Router();

const generateElement = ({ url, date, priority }: { url: string, date: Date, priority: number }) => {
  return {
    type: 'element',
    name: 'url',
    elements: [{
      type: 'element',
      name: 'loc',
      elements: [{ type: 'text', text: url }],
    }, {
      type: 'element',
      name: 'lastmod',
      elements: [{ type: 'text', text: format(date, 'yyyy-MM-dd') }],
    }, {
      type: 'element',
      name: 'changefreq',
      elements: [{ type: 'text', text: 'weekly' }],
    }, {
      type: 'element',
      name: 'priority',
      elements: [{ type: 'text', text: priority }],
    }],
  };
};

sitemap.get('/sitemap.xml', (req, res) => {
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
	const tags = Array.from(new Set(
		posts.map(post => post.meta.tags)
			.reduce((a, b) => [...a, ...b], []),
	));

  const now = new Date();

	res.set('content-type', 'Application/xml').end(convert.js2xml({
		elements: [{
			type: 'element',
			name: 'urlset',
			elements: [
				...posts.map(post => generateElement({
          url: `${host}${post.url}`,
          date: post.meta.published,
          priority: 0.7,
        })),
        ...tags.map(tag => generateElement({
          url: `${host}/tag/${tag}`,
          date: now,
          priority: 0.3,
        })),
        generateElement({
          url: host,
          date: now,
          priority: 0.3,
        }),
        generateElement({
          url: `${host}/archive`,
          date: now,
          priority: 0.1,
        }),
			],
			attributes: {
				xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
			},
		}],
		declaration: {
			attributes: {
				version: '1.0',
				encoding: 'utf-8',
			},
		},
	}));
});

export default sitemap;
