<template>
<div ref="post"></div>
</template>

<script>
import { createRoot } from 'react-dom/client';
import { PostPage } from './Post';

import { fetchPost } from '@src/api';

export default {
  data() {
    return {
      post: {},
    };
  },

	computed: {
		title() {
			return this.$route.params.title;
		},
	},

  methods: {
    async loadPost(title) {
      this.post = await fetchPost(title);
    },
  },

  async mounted() {
    await this.loadPost(this.title);
    const root = createRoot(this.$refs.post);
    root.render(PostPage({
      post: this.post,
    }));
  },
};
</script>

<style></style>
