<template lang="pug">
.container
    blog-header
    main
        components(:is="currentComponent")
    footer
</template>

<script>
import BlogHeader from './components/BlogHeader.vue';

import Home from './pages/Home.vue';
import Tag from './pages/Tag.vue';
import Archive from './pages/Archive.vue';
import Post from './pages/Post.vue';

export default {
	components: {
		BlogHeader,

		Home, Tag, Archive, Post,
	},

	data() {
		return {
			currentComponent: '',
		};
	},

	mounted() {
		if (location.pathname === '/') {
			this.currentComponent = 'Home';
		} else if (location.pathname === '/archive') {
			this.currentComponent = 'Archive';
		} else if (/^\/tag\//.test(location.pathname)) {
			this.currentComponent = 'Tag';
		} else if (/^\/post\//.test(location.pathname)) {
			this.currentComponent = 'Post';
		}

		document.dispatchEvent(new Event('ready-to-prerender'));
	},
};
</script>
