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
                    ul.tags
                        tag(v-for="tag in post.tags" :name="tag")
                dt.sr-only published
                dd.published
                    time {{ formatPublished(post.published) }}
</template>

<script>
import Tag from './Tag.vue';

import format from 'date-fns/format';

export default {
    props: ['posts'],
    components: { Tag },

    methods: {
        formatPublished(datetime) {
            return format(datetime, 'yyyy-MM-dd');
        },
    },
}
</script>
