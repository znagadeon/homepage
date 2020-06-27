const context = require.context('@root/contents/posts', true, /\.md$/);

export const sortByPublished = (a, b) => {
    if (a.published < b.published) return 1;
    if (a.published > b.published) return -1;
    return 0;
};

export const loadPosts = () => {
    return context.keys().map(path => {
        const meta = context(path);

        return {
            ...meta,
            published: new Date(meta.published || null),
            url: path.replace(/\.\/(.+)\.md$/, '/post/$1.html'),
        };
    });
};
