<template>
<div class="container">
	<blog-header></blog-header>
    <main>
		<components :is="currentComponent"></components>
	</main>
    <footer></footer>
</div>
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
		if (location.pathname === '/' || location.pathname === '/index.html') {
			this.currentComponent = 'Home';
		} else if (/^\/archive/.test(location.pathname)) {
			this.currentComponent = 'Archive';
		} else if (/^\/tag\//.test(location.pathname)) {
			this.currentComponent = 'Tag';
		} else if (/^\/post\//.test(location.pathname)) {
			this.currentComponent = 'Post';
		}
	},
};
</script>
