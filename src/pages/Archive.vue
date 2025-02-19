<template>
<div ref="posts"></div>
</template>

<script lang="jsx">
import { createRoot } from 'react-dom/client';
import { PostList } from '../components/PostList';

import { mapState, mapMutations, mapActions } from 'vuex';

export default {
	computed: {
		...mapState(['posts', 'meta']),
	},

	methods: {
		...mapMutations(['setMeta']),
		...mapActions(['loadPosts']),
	},

  mounted() {
    const root = createRoot(this.$refs.posts);
    root.render(<PostList posts={this.posts}>Archive</PostList>);
  },

	async serverPrefetch() {
		await this.loadPosts();
	},
};
</script>
