const fs = require('fs');
const path = require('path');

const fm = require('front-matter');

const _getAllPosts = (contentDir) => {
	const root = fs.readdirSync(contentDir, { withFileTypes: true });
	let results = [];

	root.forEach((dirent) => {
		if (dirent.isFile()) {
			if (!['.DS_Store'].some((v) => dirent.name.includes(v))) {
				results.push(path.join(contentDir, dirent.name));
			}
		} else {
			results = [
				...results,
				..._getAllPosts(path.join(contentDir, dirent.name)),
			];
		}
	});

	return results;
};

const _isPage = (path) => Boolean(path.match(/\.md$/));

const getAllPosts = (contentDir) => {
	return _getAllPosts(contentDir).filter((v) => _isPage(v));
};

module.exports = {
	getAllPosts,
	getAllMetas: (paths) => {
		return paths
			.map((path) => {
				const content = fs.readFileSync(path).toString();
				return fm(content).attributes;
			})
			.filter((meta) => !meta.draft);
	},
};
