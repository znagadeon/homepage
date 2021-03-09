const fs = require('fs');
const { spawn, spawnSync } = require('child_process');
const axios = require('axios');
const path = require('path');

const getPosts = require('./src/lib/get-posts');
const getMeta = require('./src/lib/get-meta');

const removeRecursively = (directory) => {
	const files = fs.readdirSync(directory, { withFileTypes: true });
	files.forEach(file => {
		const filename = `${directory}/${file.name}`;
		file.isFile() ? fs.unlinkSync(filename) : removeRecursively(filename);
	});

	fs.rmdirSync(directory);
};

const delay = async (timeout) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, timeout);
	});
};

const capture = async (url, filename) => {
	const { data } = await axios.get(url);
	const dir = path.dirname(filename);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
	fs.writeFile(filename, data, (err) => {
		if (err) throw err;
		console.log(`Capture ${url} -> ${filename} complete`);
	});
};

const copyRecursively = (src, dest) => {
	if (!fs.existsSync(dest)) {
		fs.mkdirSync(dest, { recursive: true });
	}

	const files = fs.readdirSync(src, { withFileTypes: true });
	files.forEach(file => {
		const _src = `${src}/${file.name}`;
		const _dest = `${dest}/${file.name}`;

		file.isFile()
			? fs.copyFile(_src, _dest, () => {
				console.log(`Copy ${_src} -> ${_dest} complete`);
			})
			: copyRecursively(_src, _dest);
	});
};

const host = 'http://localhost:1337';
const dest = './public';

(async () => {
	if (fs.existsSync(dest)) {
		removeRecursively(dest);
	}
	fs.mkdirSync(dest);
	console.log('Start build');

	spawnSync('npm', ['run', 'build:static']);
	console.log('Webpack build complete');

	const server = spawn('npm', ['run', 'serve']);
	await delay(500);
	console.log('Server is running');

	const postsPath = './posts';
	const posts = getPosts(postsPath);
	const postNames = posts.map(post => post.replace(/^posts\/(.+)\/index.md$/, '$1'));
	const tags = Array.from(new Set(posts.map(post => getMeta(post).meta.tags).reduce((a, b) => [...a, ...b], [])));

	// static files & assets
	copyRecursively('./dist', dest);
	postNames.forEach((post) => {
		const src = `${postsPath}/${post}/assets`;
		if (fs.existsSync(src)) {
			copyRecursively(src, `${dest}/post/${post}/assets`);
		}
	});

	await Promise.all([
		// home
		capture(host, `${dest}/index.html`),

		// posts
		capture(`${host}/archive`, `${dest}/archive/index.html`),
		...postNames.map(post => {
			return capture(`${host}/post/${post}`, `${dest}/post/${post}/index.html`);
		}),
		...tags.map(tag => {
			return capture(`${host}/tag/${tag}`, `${dest}/tag/${tag}/index.html`);
		}),

		// sitemap, rss
		capture(`${host}/sitemap.xml`, `${dest}/sitemap.xml`),
		capture(`${host}/rss.xml`, `${dest}/rss.xml`),
	]);

	server.kill();
})();
