<template>
<li class="post">
	<a :href="post.url">
		<h3 class="post__title">{{ post.meta.title }}</h3>
		<p class="post__desc">{{ desc }}</p>
	</a>
	<dl class="post__meta-info">
		<dt class="sr-only">tags</dt>
		<dd class="post__tags">
      <div ref="tags"></div>
		</dd>
		<dt class="sr-only">published</dt>

		<dd class="post__published">
			<time>{{ formatPublished(post.meta.published) }}</time>
		</dd>
	</dl>
</li>
</template>

<script>
import { createRoot } from 'react-dom/client';
import { Tag } from './Tag';

import { onMounted, ref } from 'vue';

import { format } from 'date-fns';

const formatPublished = (datetime) => format(new Date(datetime), 'yyyy-MM-dd');

export default {
	props: {
		post: Object,
	},

	setup({ post }) {
		const maxLength = 100;
		const { content } = post;
		const desc = content.length > maxLength ? `${content.slice(0, maxLength)}...` : content;
    const tags = ref(null);

    onMounted(() => {
      const root = createRoot(tags.value);
      root.render(Tag({
        tags: post.meta.tags,
      }));
    });

		return { desc, formatPublished, tags };
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
