<template lang="pug">
article.recent-posts
    h2 Recent Posts
    ol.posts
        li.post(v-for="post in posts")
            a(:href="post.url")
                h3 {{ post.title }}
                dl.meta
                    dt.sr-only category
                    dd.category {{ `/${post.category}` }}
                    dt.sr-only tags
                    dd
                        ul.tags
                            li.tag(v-for="tag in post.tags") {{ `#${tag}` }}
                    dt.sr-only published
                    dd.published
                        time {{ post.published }}
</template>

<script>
import { format } from 'date-fns';

const context = require.context('../../contents/', true, /\.md$/);

export default {
    data() {
        return {
            posts: [],
        };
    },

    created() {
        const posts = context.keys().filter(path => path !== './index.md').map(path => {
            const meta = context(path);

            return {
                ...meta,
                published: format(new Date(meta.published), 'yyyy-MM-dd'),
                url: path.replace(/\.md$/, '.html'),
            };
        });

        this.posts = posts.sort((a, b) => {
            if (a.published < b.published) return 1;
            if (a.published > b.published) return -1;
            return 0;
        });
    },
}
</script>
