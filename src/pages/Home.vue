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

import {config} from '@src/config';

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

	async serverPrefetch() {
		await this.loadPosts({
			length: 5,
		});

		const gravatar = `https://www.gravatar.com/avatar/${config.gravatar}`;
		this.setMeta({
			title: config.blogName,
			author: config.name,
			description: config.description,

			opengraph: {
				type: 'website',
				url: config.host,
				title: config.blogName,
				description: config.description,
				image: gravatar,
			},
		});
	},
};
</script>
