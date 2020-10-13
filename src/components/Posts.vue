<template lang="pug">
article.recent-posts
    slot
    ol.posts
        li.post(v-for="post in posts")
            router-link(:to="post.url")
                h3 {{ post.title }}
            dl.meta
                dt.sr-only tags
                dd
                    tags(:tags="post.tags")
                dt.sr-only published
                dd.published
                    time {{ formatPublished(post.published) }}
</template>

<script>
import Tags from './Tags.vue';

import format from 'date-fns/format';

export default {
    props: ['posts'],
    components: { Tags },

    methods: {
        formatPublished(datetime) {
            return format(datetime, 'yyyy-MM-dd');
        },
    },
}
</script>
