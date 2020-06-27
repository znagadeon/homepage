const context = require.context('@root/contents/posts', true, /\.md$/);

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
