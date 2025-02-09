import { execSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import axios from 'axios';
import pids from 'port-pid';
import { config } from './src/config';
import { getMeta } from './src/lib/getMeta';
import { getPosts } from './src/lib/getPosts';
import { PostRepository } from './src/repositories/PostRepository';
import { createRss } from './src/utils/rss';
import { createSitemap } from './src/utils/sitemap';
import { wait } from './src/utils/time';

const POST_ROOT = path.join(process.cwd(), 'posts');
const repository = new PostRepository(POST_ROOT);

const removeRecursively = (directory) => {
  const files = fs.readdirSync(directory, { withFileTypes: true });

  for (const file of files) {
    const filename = `${directory}/${file.name}`;
    if (file.isFile()) {
      fs.unlinkSync(filename);
    } else {
      removeRecursively(filename);
    }
  }

  fs.rmdirSync(directory);
};

const capture = async (url, filename) => {
  const dir = path.dirname(filename);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const { render } = await import('./dist/server/entry-server.js');
  const _manifest = JSON.parse(
    fs.readFileSync('./dist/client/.vite/ssr-manifest.json').toString(),
  );

  const { ssr, state, manifest } = await render(url, _manifest);

  const template = fs.readFileSync('./dist/client/index.html').toString();

  const hydration = `<script>window.__INITIAL_STATE__ = ${JSON.stringify(state)}</script>`;
  const html = template
    .replace('<!--app-body-->', `${ssr}${hydration}`)
    .replace('<!--app-head-->', manifest.teleports.head ?? '');

  fs.writeFileSync(filename, html);
  console.log(`Capture ${url} -> ${filename} complete`);
};

const copyRecursively = (src, dest) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src, { withFileTypes: true });

  for (const file of files) {
    const _src = `${src}/${file.name}`;
    const _dest = `${dest}/${file.name}`;

    if (file.isFile()) {
      fs.copyFile(_src, _dest, () => {
        console.log(`Copy ${_src} -> ${_dest} complete`);
      });
    } else {
      copyRecursively(_src, _dest);
    }
  }
};

const kill = async (port) => {
  const pid = await pids(port);

  for (const id of pid.all.reverse()) {
    execSync(`kill -9 ${id}`);
  }
};

const port = 1337;
const host = `http://localhost:${port}`;
const dest = './public';

(async () => {
  if (fs.existsSync(dest)) {
    removeRecursively(dest);
  }
  fs.mkdirSync(dest);
  console.log('Start build');

  await kill(port);
  const server = spawn('yarn', ['serve']);
  for (;;) {
    try {
      await axios.get(`${host}/health`);
      break;
    } catch {
      await wait(100);
    }
  }
  console.log('Server is running');

  const posts = repository.getAllPosts();
  const _posts = getPosts(POST_ROOT);
  const postNames = _posts
    .filter((post) => !getMeta(post).meta.draft)
    .map((post) => post.match(/posts\/(.+)\/index.md$/)?.[1]);
  const tags = Array.from(
    new Set(
      _posts
        .map((post) => getMeta(post).meta.tags)
        .reduce((acc, cur) => {
          if (!cur) return acc;
          return acc.concat(cur);
        }, []),
    ),
  );

  // static files & assets
  copyRecursively('./dist/client', dest);
  for (const post of postNames) {
    const src = path.join(POST_ROOT, post, 'assets');
    if (fs.existsSync(src)) {
      copyRecursively(src, `${dest}/post/${post}/assets`);
    }
  }

  // home
  await capture('/', `${dest}/index.html`);

  // posts
  await capture('/archive/index.html', `${dest}/archive/index.html`);
  for (const post of postNames) {
    await capture(
      `/post/${post}/index.html`,
      `${dest}/post/${post}/index.html`,
    );
  }
  for (const tag of tags) {
    await capture(`/tag/${tag}/index.html`, `${dest}/tag/${tag}/index.html`);
  }

  // search page
  await capture('/search/index.html', `${dest}/search/index.html`);

  // sitemap, rss
  fs.writeFileSync(
    `${dest}/sitemap.xml`,
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
  console.log('Sitemap creation complete');

  fs.writeFileSync(
    `${dest}/rss.xml`,
    createRss({
      title: config.blogName,
      link: config.host,
      description: config.description,
      items: posts.map((post) => ({
        title: post.meta.title,
        link: `${config.host}${post.url}`,
        description: post.content,
        author: config.name,
        published: post.meta.updated,
      })),
    }),
  );
  console.log('RSS creation complete');

  console.log('Build complete');

  server.kill();
  await kill(port);
  process.exit();
})();
