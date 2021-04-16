<template>
<post-list :posts="posts">Recent Posts</post-list>
</template>

<script>
import PostList from '@src/components/PostList.vue';

import { mapState, mapActions } from 'vuex';

import config from '@root/config.json';

export default {
	components: {
		PostList,
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
