<template>
<posts :posts="posts">Recent Posts</posts>
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

	async serverPrefetch() {
		await this.loadPosts({
			length: 5,
		});

		const gravatar = `https://www.gravatar.com/avatar/${config.links.gravatar}`;
		this.$ssrContext.title = config.blogName;
		this.$ssrContext.meta = {
			author: config.name,
			description: config.description,

			opengraph: {
				type: 'website',
				url: config.host,
				title: config.blogName,
				description: config.description,
				image: gravatar,
			},

			twitter: {
				card: 'summary',
				site: `@${config.links.twitter}`,
				title: config.blogName,
				description: config.description,
				image: gravatar,
			},
		};
	},
};
</script>
