<template>
<div class="post">
	<h1 class="post__title">{{title}}</h1>
    <div class="post__tags">
		<span class="sr-only">tags</span>
        <tags :tags="tags"></tags>
	</div>
    <div class="post__published">
		<span class="sr-only">published</span>
		<time>{{ published }}</time>
	</div>
    <article class="post__article" v-html="html"></article>
    <comment class="post__comment" v-if="title" :title="title"></comment>
</div>
</template>

<script>
import format from 'date-fns/format';

import config from '@root/config.json';

import Tags from '@src/components/Tags.vue';
import Comment from '@src/components/Comment.vue';

import axios from 'axios';

export default {
	components: {
		Tags,
		Comment,
	},

	data() {
		return {
			title: '',
			tags: [],
			published: null,

			html: '',
		};
	},

	metaInfo() {
		const gravatar = `https://www.gravatar.com/avatar/${config.links.gravatar}`;
		const desc = this.html.replace(/(<([^>]+)>)/gi, '').slice(0, 55);

		return {
			title: `${this.title} - ${config.blogName}`,
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

	async created() {
		const title = location.pathname.slice(0, -('/index.html'.length));
		let post;
		if (IS_DEV) {
			post = (await axios.get(`/api${title}`)).data;
		} else {
			post = (await axios.get(`/api${title}.json`)).data;
		}

		this.title = post.meta.title;
		this.tags = post.meta.tags;
		this.published = format(new Date(post.meta.published), 'yyyy-MM-dd');

		this.html = post.content;
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
