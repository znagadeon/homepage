<template>
<post-list :posts="posts">#{{tag}}</post-list>
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

		tag() {
			return this.$route.params.tag;
		},
	},

	methods: {
		...mapActions(['loadPosts']),
	},

	async serverPrefetch() {
		await this.loadPosts({
			tag: this.tag,
		});

		// const gravatar = `https://www.gravatar.com/avatar/${config.links.gravatar}`;
		// this.$ssrContext.title = `#${this.tag} - ${config.blogName}`,
		// this.$ssrContext.meta = {
		// 	author: config.name,
		// 	description: config.description,

		// 	opengraph: {
		// 		type: 'website',
		// 		url: config.host,
		// 		title: config.blogName,
		// 		description: config.description,
		// 		image: gravatar,
		// 	},

		// 	twitter: {
		// 		card: 'summary',
		// 		site: `@${config.links.twitter}`,
		// 		title: config.blogName,
		// 		description: config.description,
		// 		image: gravatar,
		// 	},
		// };
	}
};
</script>

<style></style>
