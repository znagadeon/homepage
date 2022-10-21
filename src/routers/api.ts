import { Router, Request } from 'express';
import getPosts from '../lib/get-posts';
import getMeta from '../lib/get-meta';

import { ROOT } from '../consts';

const api = Router();

type Query = {
  tag?: string,
  length?: number,
};

api.get('/posts', (req: Request<{}, {}, {}, Query>, res) => {
	const posts = getPosts(`${ROOT}/posts`)
		.map(filename => {
			const match = filename.match(/posts\/(.+)\/index\.md$/) as RegExpMatchArray;

			return {
				...getMeta(filename),
				url: `/post/${match[1]}/index.html`,
			};
		}).filter(post => {
			if (post === null) return false;
			if (post.meta.draft) return false;
			if (req.query.tag && post.meta.tags.indexOf(req.query.tag) === -1) return false;

			return true;
		}).map(post => {
			return {
				...post,
				content: post?.content
					.replace(/<pre class="hljs">[\s\S]+?<\/pre>/g, '')
					.replace(/<.+?>/g, ''),
			};
		}).sort((a, b) => {
			if (a.meta.published < b.meta.published) return 1;
			if (a.meta.published > b.meta.published) return -1;
			return 0;
		});

	res.send(req.query.length ? posts.slice(0, req.query.length) : posts);
	res.end();
});

api.get('/post/:title', (req, res) => {
	const filename = getPosts(`${ROOT}/posts`)
		.find(v => v.indexOf(req.params.title) > -1);

	if (!filename) {
		res.status(404).end();
		return;
	}

	res.send(getMeta(filename));
	res.end();
});

export default api;
