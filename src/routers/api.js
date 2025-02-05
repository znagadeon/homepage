import express from 'express';
import { getMeta } from '../lib/getMeta';
import { getPosts } from '../lib/getPosts';

const api = new express.Router();

api.get('/posts', (req, res) => {
  const posts = getPosts(`${process.cwd()}/posts`)
    .map((filename) => ({
      ...getMeta(filename),
      url: `/post/${filename.match(/posts\/(.+)\/index\.md$/)[1]}/index.html`,
    }))
    .filter((post) => {
      if (post.meta.draft) return false;
      if (req.query.tag && post.meta.tags.indexOf(req.query.tag) === -1)
        return false;

      return true;
    })
    .map((post) => {
      return {
        ...post,
        content: post.content
          .replace(/<pre class="hljs">[\s\S]+?<\/pre>/g, '')
          .replace(/<.+?>/g, ''),
      };
    })
    .sort((a, b) => {
      if (a.meta.published < b.meta.published) return 1;
      if (a.meta.published > b.meta.published) return -1;
      return 0;
    });

  res.send(req.query.length ? posts.slice(0, req.query.length) : posts);
  res.end();
});

api.get('/post/:title', (req, res) => {
  const filename = getPosts(`${process.cwd()}/posts`).find(
    (v) => v.indexOf(req.params.title) > -1,
  );
  res.send(getMeta(filename));
  res.end();
});

export default api;
