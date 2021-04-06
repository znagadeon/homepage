<template>
<div class="post">
	<h1 class="post__title">{{post.meta.title}}</h1>
	<div class="post__tags">
		<span class="sr-only">tags</span>
		<tags :tags="post.meta.tags"></tags>
	</div>
	<div class="post__published">
		<span class="sr-only">published</span>
		<time>{{ post.meta.published }}</time>
	</div>
	<article class="post__article" v-html="post.content"></article>
	<comment class="post__comment" v-if="post.meta.title" :title="post.meta.title"></comment>
</div>
</template>

<script>
import config from '@root/config.json';

import Tags from '@src/components/Tags.vue';
import Comment from '@src/components/Comment.vue';

import { mapActions, mapState } from 'vuex';

export default {
	components: {
		Tags,
		Comment,
	},

	computed: {
		...mapState(['post', 'title']),
	},

	methods: {
		...mapActions(['loadPost']),
	},

	async serverPrefetch() {
		await this.loadPost();

		const gravatar = `https://www.gravatar.com/avatar/${config.links.gravatar}`;
		const title = this.post.meta.title;
		const desc = this.post.content.replace(/(<([^>]+)>)/gi, '').slice(0, 55);
		this.$ssrContext.title = `${this.post.meta.title} - ${config.blogName}`,
		this.$ssrContext.meta = {
			author: config.name,
			description: config.description,

			opengraph: {
				type: 'article',
				url: `${config.host}/post/${this.title}/index.html`,
				title,
				description: desc,
				image: gravatar,
			},

			twitter: {
				card: 'summary',
				site: `@${config.links.twitter}`,
				title,
				description: desc,
				image: gravatar,
			},
		};
	},
};
</script>

<style lang="scss" scoped>
@import 'styles/markdown.scss';

.post {
	&__title {
		@apply text-4xl;
	}

	&__tags {
		@apply mt-2;
	}

	&__published {
		@apply border-b;
		@apply border-gray-300;
		@apply pb-2;
		@apply mb-6;
	}

	&__article {
		@apply mb-6;

		::v-deep {
			@include markdown;
		}
	}
}
</style>
