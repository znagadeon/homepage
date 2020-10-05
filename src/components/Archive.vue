<template lang="pug">
fragment
    posts(:posts="posts")
        h2 Archive
</template>

<script>
import Vue from 'vue';
import { Plugin } from 'vue-fragment';

Vue.use(Plugin);

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
            title: `Archive - ${config.blogName}`,
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
        this.posts = loadPosts().sort(sortByPublished);
    },
}
</script>
