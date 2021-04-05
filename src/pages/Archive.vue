<template>
<posts :posts="posts">Archive</posts>
</template>

<script>
import Posts from '@src/components/Posts.vue';

import { mapState, mapActions } from 'vuex';

import config from '@root/config.json';

export default {
	components: {
		Posts,
	},

	computed: {
		...mapState(['posts']),
	},

	methods: {
		...mapActions(['loadPosts']),
	},

	metaInfo() {
		const gravatar = `https://www.gravatar.com/avatar/${config.links.gravatar}`;

		return {
			title: `Archive - ${config.blogName}`,
			meta: [
				{ name: 'author', content: config.name },
				{ name: 'description', content: config.description },

				{ property: 'og:type', content: 'website' },
				{ property: 'og:url', content: config.host },
				{ property: 'og:title', content: config.blogName },
				{ property: 'og:description', content: config.description },
				{ property: 'og:image', content: gravatar },

				{ name: 'twitter:card', content: 'summary' },
				{ name: 'twitter:site', content: `@${config.links.twitter}` },
				{ name: 'twitter:title', content: config.blogName },
				{ name: 'twitter:description', content: config.description },
				{ name: 'twitter:image', content: gravatar },
			],
		};
	},

	async serverPrefetch() {
		await this.loadPosts();
	},
};
</script>
