import { execSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import axios from 'axios';
import pids from 'port-pid';
import { getMeta } from './src/lib/getMeta';
import { getPosts } from './src/lib/getPosts';
import { wait } from './src/utils/time';

const POST_ROOT = path.join(process.cwd(), 'posts');

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
  const { data } = await axios.get(url);
  const dir = path.dirname(filename);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filename, data);
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

  const posts = getPosts(POST_ROOT);
  const postNames = posts
    .filter((post) => !getMeta(post).meta.draft)
    .map((post) => post.match(/posts\/(.+)\/index.md$/)?.[1]);
  const tags = Array.from(
    new Set(
      posts
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
  await capture(host, `${dest}/index.html`);

  // posts
  await capture(`${host}/archive/index.html`, `${dest}/archive/index.html`);
  for (const post of postNames) {
    await capture(
      `${host}/post/${post}/index.html`,
      `${dest}/post/${post}/index.html`,
    );
  }
  for (const tag of tags) {
    await capture(
      `${host}/tag/${tag}/index.html`,
      `${dest}/tag/${tag}/index.html`,
    );
  }

  // search page
  await capture(`${host}/search/index.html`, `${dest}/search/index.html`);

  // sitemap, rss
  await capture(`${host}/sitemap.xml`, `${dest}/sitemap.xml`);
  await capture(`${host}/rss.xml`, `${dest}/rss.xml`);

  console.log('Build complete');

  server.kill();
  await kill(port);
  process.exit();
})();
