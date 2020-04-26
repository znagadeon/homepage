<template lang="pug">
.container
    blog-header
    main
        home
    footer
</template>

<script>
import BlogHeader from './components/BlogHeader.vue';
import Home from './components/Home.vue';

export default {
    components: {
        BlogHeader, Home,
    },

    mounted() {
        document.dispatchEvent(new Event('ready to prerender'));
    },
}
</script>
