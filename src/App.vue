<template lang="pug">
.container
    blog-header
    main
        router-view(:key="$route.fullPath")
    footer
</template>

<script>
import BlogHeader from './components/BlogHeader.vue';

export default {
	components: {
		BlogHeader,
	},

	mounted() {
		document.dispatchEvent(new Event('ready-to-prerender'));
	},
};
</script>
