<template lang="pug">
article.recent-posts
    slot
    ol.posts
        li.post(v-for="post in posts")
            router-link(:to="post.url")
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
export default {
    props: ['posts'],
}
</script>
