<template lang="pug">
.container
    blog-header
    main
        recent-posts
    footer
</template>

<script>
import BlogHeader from './components/BlogHeader.vue';
import RecentPosts from './components/RecentPosts.vue';

export default {
    components: {
        BlogHeader, RecentPosts,
    },
}
</script>
