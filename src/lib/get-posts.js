const fs = require('fs');
const path = require('path');

const getPosts = (contentDir) => {
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
				...getPosts(path.join(contentDir, dirent.name)),
			];
		}
	});

	return results;
};

const isPage = (path) => Boolean(path.match(/\.md$/));

module.exports = (contentDir) => getPosts(contentDir).filter(v => isPage(v));
