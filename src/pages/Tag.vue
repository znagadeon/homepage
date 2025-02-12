<template>
<div ref="posts"></div>
<teleport to="head">
	<page-meta :meta="meta"></page-meta>
</teleport>
</template>

<script lang="jsx">
import PageMeta from '@src/components/PageMeta.vue';
import { createRoot } from 'react-dom/client';
import { PostList } from '../components/PostList';

import { mapState, mapMutations, mapActions } from 'vuex';

import {config} from '@src/config';

export default {
	components: {
		PageMeta,
	},

	computed: {
		...mapState(['posts', 'meta']),

		tag() {
			return this.$route.params.tag;
		},
	},

	methods: {
		...mapMutations(['setMeta']),
		...mapActions(['loadPosts']),
	},

  mounted() {
    const root = createRoot(this.$refs.posts);
    root.render(<PostList posts={this.posts}>#{this.tag}</PostList>);
  },

	async serverPrefetch() {
		await this.loadPosts({
			tag: this.tag,
		});

		const gravatar = `https://www.gravatar.com/avatar/${config.gravatar}`;
		this.setMeta({
			title: `#${this.tag} - ${config.blogName}`,
			author: config.author,
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

<style></style>
