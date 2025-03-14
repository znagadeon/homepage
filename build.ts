import fs from 'node:fs';
import path from 'node:path';
import { config } from './src/config';
import { getMeta } from './src/lib/getMeta';
import { getPosts } from './src/lib/getPosts';
import { PostRepository } from './src/repositories/PostRepository';
import { createRss } from './src/utils/rss';
import { createSitemap } from './src/utils/sitemap';

const POST_ROOT = path.join(process.cwd(), 'posts');
const repository = new PostRepository(POST_ROOT);

const removeRecursively = (directory: string) => {
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

const capture = async (url: string, filename: string) => {
  const dir = path.dirname(filename);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const { render } = await import('./dist/server/entry-server.js');
  const { ssr, helmet } = await render(url);

  const template = fs.readFileSync('./dist/client/index.html').toString();

  const html = template
    .replace('<!--app-body-->', ssr)
    .replace(
      '<!--app-head-->',
      `${helmet.title.toString()}${helmet.meta.toString()}`,
    );

  fs.writeFileSync(filename, html);
  console.log(`Capture ${url} -> ${filename} complete`);
};

const copyRecursively = (src: string, dest: string) => {
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

const dest = './public';

(async () => {
  if (fs.existsSync(dest)) {
    removeRecursively(dest);
  }
  fs.mkdirSync(dest);
  console.log('Start build');

  const posts = repository.getPosts();
  const _posts = getPosts(POST_ROOT);
  const postNames = _posts
    .filter((post) => !getMeta(post).meta.draft)
    .map((post) => post.replace(/.+\/posts\/(.+)\/index.md$/, '$1'));
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
  await capture('/archive', `${dest}/archive/index.html`);
  for (const post of postNames) {
    await capture(`/post/${post}/`, `${dest}/post/${post}/index.html`);
  }
  for (const tag of tags) {
    await capture(`/tag/${tag}`, `${dest}/tag/${tag}/index.html`);
  }

  // search page
  await capture('/search', `${dest}/search/index.html`);

  // sitemap, rss
  fs.writeFileSync(
    `${dest}/sitemap.xml`,
    createSitemap([
      {
        url: config.host,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      ...posts.map(
        (post) =>
          ({
            url: `${config.host}${post.url}`,
            modifiedAt: post.meta.updated,
            changeFrequency: 'weekly',
            priority: 0.7,
          }) as const,
      ),
      ...tags.map(
        (tag) =>
          ({
            url: `${config.host}/tag/${tag}`,
            changeFrequency: 'weekly',
            priority: 0.3,
          }) as const,
      ),
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
        author: config.author,
        published: post.meta.updated,
      })),
    }),
  );
  console.log('RSS creation complete');

  console.log('Build complete');
})();
