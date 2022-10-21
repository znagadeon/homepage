<template>
<li class="post">
	<a :href="post.url">
		<h3 class="post__title">{{ post.meta.title }}</h3>
		<p class="post__desc">{{ desc }}</p>
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
</template>

<script>
import Tags from './Tags.vue';

import { format } from 'date-fns';

const formatPublished = (datetime) => format(new Date(datetime), 'yyyy-MM-dd');

export default {
	components: { Tags },

	props: {
		post: Object,
	},

	setup({ post }) {
		const maxLength = 100;
		const { content } = post;
		const desc = content.length > maxLength ? `${content.slice(0, maxLength)}...` : content;

		return { desc, formatPublished };
	},
}
</script>

<style lang="scss" scoped>
.post {
	@apply w-full;
	@apply py-4;
	@apply border-b;

	&:last-child {
		@apply border-b-0;
	}

	&__title {
		@apply text-xl;
	}

	&__desc {
		@apply pt-1;
		@apply font-light;
	}

	&__meta-info {
		@apply flex;
		@apply flex-row;
		@apply pt-1;
	}

	&__tags {
		@apply mr-3;
	}

	&__published {
		min-width: 91px;
	}
}
</style>
