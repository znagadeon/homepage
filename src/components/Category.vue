<template lang="pug">
posts(:posts="posts")
    h2 /{{ $route.params.category }}
</template>

<script>
import Posts from './Posts.vue';

import { loadPosts, sortByPublished } from '@src/post-manager.js';

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
            title: `/${this.$route.params.category} - ${config.blogName}`,
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
        this.posts = loadPosts()
            .filter(post => post.category === this.$route.params.category)
            .sort(sortByPublished);
    },
}
</script>

<style>

</style>
