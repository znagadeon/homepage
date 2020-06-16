<template lang="pug">
posts(:posts="posts")
    h2 {{ `#${$route.params.tag}` }}
</template>

<script>
import format from 'date-fns/format';

import Posts from './Posts.vue';

const context = require.context('@root/contents/posts', true, /\.md$/);

import config from '@root/config.json';

export default {
    components: {
        Posts,
    },

    data() {
        return {
            posts: [],
        };
    },

    metaInfo() {
        const gravatar = `https://www.gravatar.com/avatar/${config.links.gravatar}`;

        return {
            title: `#${this.$route.params.tag} - ${config.blogName}`,
            meta: [
                { name: 'author', content: config.name },
                { name: 'description', content: config.description },

                { property: 'og:type', content: 'website' },
                { property: 'og:url', content: config.host },
                { property: 'og:title', content: config.blogName },
                { property: 'og:description', content: config.description },
                { property: 'og:image', content: gravatar },

                { name: 'twitter:card', content: 'summary' },
                { name: 'twitter:site', content: `@${config.links.twitter}` },
                { name: 'twitter:title', content: config.blogName },
                { name: 'twitter:description', content: config.description },
                { name: 'twitter:image', content: gravatar },
            ],
        };
    },

    created() {
        const posts = context.keys().map(path => {
            const meta = context(path);

            return {
                ...meta,
                published: format(new Date(meta.published || null), 'yyyy-MM-dd'),
                url: path.replace(/\.\/(.+)\.md$/, '/post/$1.html'),
            };
        }).filter(post => post.tags.indexOf(this.$route.params.tag) > -1);

        this.posts = posts.sort((a, b) => {
            if (a.published < b.published) return 1;
            if (a.published > b.published) return -1;
            return 0;
        });
    },
}
</script>

<style>

</style>
