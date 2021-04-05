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

import { mapState } from 'vuex';

export default {
	components: {
		BlogHeader,

		Home, Tag, Archive, Post,
	},

	computed: {
		...mapState(['type']),
	},
};
</script>
