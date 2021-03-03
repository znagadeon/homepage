const context = require.context('@root/posts?with-html', true, /\.md$/);

export const sortByPublished = (a, b) => {
	if (a.published < b.published) return 1;
	if (a.published > b.published) return -1;
	return 0;
};

export const loadPosts = () => {
	return context.keys().map((path) => {
		const meta = context(path);

		return {
			...meta,
			published: new Date(meta.published || null),
			url: path.replace(/\.\/(.+?)(\/index)?\.md$/, '/post/$1'),
		};
	});
};

export const loadPost = (path) => {
	const data = context(path);

	return {
		title: data.title,
		tags: data.tags,
		published: new Date(data.published || null),
		html: data.html,
	};
};
