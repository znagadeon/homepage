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
		...mapState(['post']),
	},

	methods: {
		...mapActions(['loadPost']),
	},

	metaInfo() {
		const gravatar = `https://www.gravatar.com/avatar/${config.links.gravatar}`;
		const desc = this.post.content.replace(/(<([^>]+)>)/gi, '').slice(0, 55);

		return {
			title: `${this.post.meta.title} - ${config.blogName}`,
			meta: [
				{ name: 'author', content: config.name },
				{ name: 'description', content: desc },

				{ property: 'og:type', content: 'article' },
				{ property: 'og:url', content: location.href },
				{ property: 'og:title', content: this.title },
				{ property: 'og:description', content: desc },
				{ property: 'og:image', content: gravatar },

				{ name: 'twitter:card', content: 'summary' },
				{ name: 'twitter:site', content: `@${config.links.twitter}` },
				{ name: 'twitter:title', content: this.title },
				{ name: 'twitter:description', content: desc },
				{ name: 'twitter:image', content: gravatar },
			],
		};
	},

	async serverPrefetch() {
		await this.loadPost();
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
