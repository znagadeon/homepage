const express = require('express');
const getPosts = require('../lib/get-posts');
const getMeta = require('../lib/get-meta');

const convert = require('xml-js');

const config = require('../../config.json');

const rss = new express.Router();

const wrapCData = text => `<![CDATA[${text}]]>`;

rss.get('/rss.xml', (req, res) => {
	const posts = getPosts(`${global.ROOT}/posts`)
		.map(filename => ({
			...getMeta(filename),
			url: `/post/${filename.slice(global.ROOT.length, -('/index.md'.length))}`,
		}))
		.filter(post => !post.meta.draft)
		.sort((a, b) => {
			if (a.meta.published < b.meta.published) return 1;
			if (a.meta.published > b.meta.published) return -1;
			return 0;
		}).slice(0, 10);

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
					elements: [{ type: 'text', text: wrapCData(config.blogName) }],
				}, {
					type: 'element',
					name: 'link',
					elements: [{ type: 'text', text: config.host }],
				}, {
					type: 'element',
					name: 'description',
					elements: [{ type: 'text', text: wrapCData(config.description) }],
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
						elements: [{ type: 'text', text: `${config.host}${post.url}` }],
					}, {
						type: 'element',
						name: 'description',
						elements: [{ type: 'text', text: wrapCData(post.content) }],
					}, {
						type: 'element',
						name: 'author',
						elements: [{ type: 'text', text: wrapCData(config.name) }],
					}, {
						type: 'element',
						name: 'guid',
						elements: [{ type: 'text', text: `${config.host}${post.url}` }],
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

module.exports = rss;
