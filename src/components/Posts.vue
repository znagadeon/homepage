<template lang="pug">
article.posts
    h2.posts__title
        slot
    ol.posts__list
        li.post(v-for="post in posts")
            a(:href="post.url + '/index.html'")
                h3.post__title {{ post.meta.title }}
            dl.post__meta-info
                dt.sr-only tags
                dd.post__tags
                    tags(:tags="post.meta.tags")
                dt.sr-only published
                dd.post__published
                    time {{ formatPublished(post.meta.published) }}
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
