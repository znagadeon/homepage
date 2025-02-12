<template>
<li class="post-item">
	<a :href="post.url">
		<h3 class="post-item__title">{{ post.meta.title }}</h3>
		<p class="post-item__desc">{{ desc }}</p>
  </a>
	<dl v-if="post.meta.tags?.length > 0" class="post-item__meta-info">
		<dt class="sr-only">tags</dt>
		<dd class="post-item__tags">
      <span ref="tags"></span>
		</dd>
	</dl>
</li>
</template>

<script lang="jsx">
import { createRoot } from 'react-dom/client';
import { TagList } from './TagList';

export default {
	props: ['post'],

	computed: {
		desc() {
			const maxLength = 100;
			const desc = this.post.content;

			return desc.length > maxLength ? `${desc.slice(0, maxLength)}...` : desc;
		},
	},

  mounted() {
    if (!this.$refs.tags) return;
    const tags = createRoot(this.$refs.tags);
    tags.render(<TagList tags={this.post.meta.tags || []} />)
  },
}
</script>

<style lang="scss" scoped>
.post-item {
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
}
</style>
