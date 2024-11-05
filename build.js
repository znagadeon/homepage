import { wait } from './src/utils/time';
import fs from 'fs';
import pids from 'port-pid';
import { spawn, spawnSync, execSync } from 'child_process';
import axios from 'axios';
import path from 'path';

import getPosts from './src/lib/get-posts';
import getMeta from './src/lib/get-meta';

const removeRecursively = (directory) => {
  const files = fs.readdirSync(directory, { withFileTypes: true });
  files.forEach(file => {
    const filename = `${directory}/${file.name}`;
    if (file.isFile()) {
      fs.unlinkSync(filename);
    } else {
      removeRecursively(filename);
    }
  });

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
  files.forEach(file => {
    const _src = `${src}/${file.name}`;
    const _dest = `${dest}/${file.name}`;

    if (file.isFile()) {
      fs.copyFile(_src, _dest, () => {
        console.log(`Copy ${_src} -> ${_dest} complete`);
      });
    } else {
      copyRecursively(_src, _dest);
    }
  });
};

const kill = async port => {
  const pid = await pids(port);

  if (pid.tcp.length) {
    execSync(`kill -9 ${pid.tcp[0]}`);
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

  spawnSync('yarn build:client');
  console.log('Client build complete');

  spawnSync('yarn build:server');
  console.log('Server build complete');

  await kill(port);
  const server = spawn('yarn', ['serve']);
  for(;;) {
    try {
      await axios.get(`${host}/health`);
      break;
    } catch {
      await wait(100);
    }
  }
  console.log('Server is running');

  const postsPath = './posts';
  const posts = getPosts(postsPath);
  const postNames = posts
    .filter(post => !getMeta(post).meta.draft)
    .map(post => post.replace(/^posts\/(.+)\/index.md$/, '$1'));
  const tags = Array.from(new Set(posts.map(post => getMeta(post).meta.tags).reduce((a, b) => [...a, ...b], [])));

  // static files & assets
  copyRecursively('./dist/client', dest);
  postNames.forEach((post) => {
    const src = `${postsPath}/${post}/assets`;
    if (fs.existsSync(src)) {
      copyRecursively(src, `${dest}/post/${post}/assets`);
    }
  });

  // home
  await capture(host, `${dest}/index.html`);

  // posts
  await capture(`${host}/archive/index.html`, `${dest}/archive/index.html`);
  for (let post of postNames) {
    await capture(`${host}/post/${post}/index.html`, `${dest}/post/${post}/index.html`);
  }
  for (let tag of tags) {
    await capture(`${host}/tag/${tag}/index.html`, `${dest}/tag/${tag}/index.html`);
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
