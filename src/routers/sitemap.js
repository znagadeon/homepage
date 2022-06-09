import express from 'express';
import getPosts from '../lib/get-posts';
import getMeta from '../lib/get-meta';

import convert from 'xml-js';
import { format } from 'date-fns';

const config = require('../../config.json');

const sitemap = new express.Router();

sitemap.get('/sitemap.xml', (req, res) => {
	const posts = getPosts(`${global.ROOT}/posts`)
		.map(filename => ({
			...getMeta(filename),
			url: `/post/${filename.slice(global.ROOT.length, -('/index.md'.length))}/index.html`,
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

	res.set('content-type', 'Application/xml').end(convert.js2xml({
		elements: [{
			type: 'element',
			name: 'urlset',
			elements: [
				...posts.map(post => ({
					type: 'element',
					name: 'url',
					elements: [{
						type: 'element',
						name: 'loc',
						elements: [{ type: 'text', text: `${config.host}${post.url}` }],
					}, {
						type: 'element',
						name: 'lastmod',
						elements: [{ type: 'text', text: format(post.meta.published, 'yyyy-MM-dd') }],
					}, {
						type: 'element',
						name: 'changefreq',
						elements: [{ type: 'text', text: 'weekly' }],
					}, {
						type: 'element',
						name: 'priority',
						elements: [{ type: 'text', text: 0.7 }],
					}],
				})), ...tags.map(tag => ({
					type: 'element',
					name: 'url',
					elements: [{
						type: 'element',
						name: 'loc',
						elements: [{ type: 'text', text: `${config.host}/tag/${tag}` }],
					}, {
						type: 'element',
						name: 'lastmod',
						elements: [{ type: 'text', text: format(new Date(), 'yyyy-MM-dd') }],
					}, {
						type: 'element',
						name: 'changefreq',
						elements: [{ type: 'text', text: 'weekly' }],
					}, {
						type: 'element',
						name: 'priority',
						elements: [{ type: 'text', text: 0.3 }],
					}],
				})), {
					type: 'element',
					name: 'url',
					elements: [{
						type: 'element',
						name: 'loc',
						elements: [{ type: 'text', text: config.host }],
					}, {
						type: 'element',
						name: 'lastmod',
						elements: [{ type: 'text', text: format(new Date(), 'yyyy-MM-dd') }],
					}, {
						type: 'element',
						name: 'changefreq',
						elements: [{ type: 'text', text: 'weekly' }],
					}, {
						type: 'element',
						name: 'priority',
						elements: [{ type: 'text', text: 0.9 }],
					}],
				}, {
					type: 'element',
					name: 'url',
					elements: [{
						type: 'element',
						name: 'loc',
						elements: [{ type: 'text', text: `${config.host}/archive` }],
					}, {
						type: 'element',
						name: 'lastmod',
						elements: [{ type: 'text', text: format(new Date(), 'yyyy-MM-dd') }],
					}, {
						type: 'element',
						name: 'changefreq',
						elements: [{ type: 'text', text: 'weekly' }],
					}, {
						type: 'element',
						name: 'priority',
						elements: [{ type: 'text', text: 0.1 }],
					}],
				},
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
