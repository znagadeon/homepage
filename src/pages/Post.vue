<template>
<div class="post">
	<div class="post__meta">
		<h1 class="post__title">{{post.meta?.title}}</h1>
		<div class="post__tags">
			<span class="sr-only">tags</span>
			<tags :tags="post.meta?.tags"></tags>
		</div>
		<div class="post__published">
			<span class="sr-only">published</span>
			<a target="_blank" :href="commitLog"><time>{{ post.meta?.published }}</time></a>
		</div>
	</div>
	<article class="post__article" v-html="post.content"></article>
	<comment class="post__comment" v-if="post.meta?.title" :title="post.meta?.title"></comment>
</div>
<teleport to="head">
	<page-meta :meta="meta"></page-meta>
</teleport>
</template>

<script>
import { comment, social, blogName, name, description, host } from '@root/config';

import Tags from '@src/components/Tags.vue';
import Comment from '@src/components/Comment.vue';
import PageMeta from '@src/components/PageMeta.vue';

import { mapActions, mapMutations, mapState } from 'vuex';

export default {
	components: {
		Tags,
		Comment,
		PageMeta,
	},

	computed: {
		...mapState(['post', 'meta']),
		title() {
			return this.$route.params.title;
		},
		commitLog() {
			return `https://github.com/${comment.repository}/commits/develop/posts/${this.title}`;
		},
	},

	methods: {
		...mapMutations(['setMeta']),
		...mapActions(['loadPost']),
	},

	async created() {
		await this.loadPost(this.title);

		const gravatar = `https://www.gravatar.com/avatar/${social.gravatar}`;
		const title = this.post.meta.title;
		const desc = this.post.content.replace(/(<([^>]+)>)/gi, '').slice(0, 55);
		this.setMeta({
			title: `${title} - ${blogName}`,
			author: name,
			description: description,

			opengraph: {
				type: 'article',
				url: `${host}/post/${this.title}/index.html`,
				title,
				description: desc,
				image: gravatar,
			},

			twitter: {
				card: 'summary',
				site: `@${social.twitter}`,
				title,
				description: desc,
				image: gravatar,
			},
		});
	},
};
</script>

<style lang="scss" scoped>
@import 'styles/markdown.scss';

.post {
	@apply mt-6;

	&__meta {
		@apply border-b;
		@apply border-gray-300;
		@apply pb-2;
		@apply mb-6;
	}

	&__published {
		@apply underline;
	}

	&__title {
		@apply text-3xl;
		@apply font-bold;
	}

	&__tags {
		@apply mt-1;
	}

	&__article {
		@apply mb-6;
	}

	:deep(.post__article) {
		@include markdown;
	}
}
</style>
