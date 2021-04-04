<template>
<article class="posts">
	<h2 class="posts__title"><slot></slot></h2>
	<ol class="posts__list">
		<li class="post" :key="post.url" v-for="post in posts">
			<a :href="post.url + '/index.html'">
				<h3 class="post__title">{{ post.meta.title }}</h3>
			</a>
			<dl class="post__meta-info">
				<dt class="sr-only">tags</dt>
				<dd class="post__tags">
					<tags :tags="post.meta.tags"></tags>
				</dd>
				<dt class="sr-only">published</dt>

				<dd class="post__published">
					<time>{{ formatPublished(post.meta.published) }}</time>
				</dd>
			</dl>
		</li>
	</ol>
</article>
</template>

<script>
import Tags from './Tags.vue';

import format from 'date-fns/format';

export default {
	props: ['posts'],
	components: { Tags },

	methods: {
		formatPublished(datetime) {
			return format(new Date(datetime), 'yyyy-MM-dd');
		},
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
	}

	&__list {
		@apply flex;
		@apply flex-col;
		@apply mt-1;
	}
}

.post {
	@apply w-full;
	@apply py-3;
	@apply border-b;

	&:last-child {
		@apply border-b-0;
	}

	&__title {
		@apply text-xl;
	}

	&__meta-info {
		@apply flex;
		@apply flex-row;
	}

	&__tags {
		@apply mr-3;
	}
}
</style>
