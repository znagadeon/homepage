<template>
<div id="app" class="container">
	<blog-header></blog-header>
    <main>
		<components :is="type"></components>
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
import Search from './pages/Search.vue';

import { mapState } from 'vuex';

export default {
	components: {
		BlogHeader,

		Home, Tag, Archive, Post, Search,
	},

	computed: {
		...mapState(['type']),
	},
};
</script>

<style scoped lang="scss">
@import url("//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css");

.container {
	max-width: none;

	font-family: 'Spoqa Han Sans Neo', sans-serif;

	main {
		max-width: 1000px;
		min-height: 500px;
		@apply px-6;
		@apply mx-auto;
	}
}
</style>
