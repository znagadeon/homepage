<template>
<li class="post-item">
	<a :href="post.url">
		<h3 class="post-item__title">{{ post.meta.title }}</h3>
		<p class="post-item__desc">{{ desc }}</p>
	</a>
	<dl class="post-item__meta-info">
		<dt class="sr-only">tags</dt>
		<dd class="post-item__tags">
			<tags :tags="post.meta.tags"></tags>
		</dd>
	</dl>
</li>
</template>

<script>
import Tags from './Tags.vue';

export default {
	components: { Tags },

	props: ['post'],

	computed: {
		desc() {
			const maxLength = 100;
			const desc = this.post.content;

			return desc.length > maxLength ? `${desc.slice(0, maxLength)}...` : desc;
		},
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
