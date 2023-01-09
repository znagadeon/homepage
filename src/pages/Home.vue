<template>
<post-list :posts="posts">Recent Posts</post-list>
<teleport to="head">
	<page-meta :meta="meta"></page-meta>
</teleport>
</template>

<script>
import PostList from '@src/components/PostList.vue';
import PageMeta from '@src/components/PageMeta.vue';

import { mapState, mapMutations, mapActions } from 'vuex';

import { links, blogName, name, description, host } from '@root/config';

export default {
	components: {
		PostList,
		PageMeta,
	},

	computed: {
		...mapState(['posts', 'meta']),
	},

	methods: {
		...mapMutations(['setMeta']),
		...mapActions(['loadPosts']),
	},

	async created() {
		await this.loadPosts({
			length: 5,
		});

		const gravatar = `https://www.gravatar.com/avatar/${links.gravatar}`;
		this.setMeta({
			title: blogName,
			author: name,
			description: description,

			opengraph: {
				type: 'website',
				url: host,
				title: blogName,
				description: description,
				image: gravatar,
			},

			twitter: {
				card: 'summary',
				site: `@${links.twitter}`,
				title: blogName,
				description: description,
				image: gravatar,
			},
		});
	},
};
</script>
