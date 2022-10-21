<template>
<article class="posts">
	<h2 class="posts__title"><slot></slot></h2>
	<ol class="posts__list">
		<post-item v-for="post in posts" :post="post" :key="post.url"></post-item>
	</ol>
</article>
</template>

<script>
import PostItem from './PostItem.vue';

export default {
	components: {
		PostItem,
	},

	props: {
		posts: Array,
	},
};
</script>

<style lang="scss" scoped>
.posts {
	@apply max-w-6xl;
	@apply mx-auto;
	@apply mb-6;

	&__title {
		@apply mt-8;
		@apply text-2xl;
		@apply font-bold;
	}

	&__list {
		@apply flex;
		@apply flex-col;
		@apply mt-1;
	}
}
</style>
