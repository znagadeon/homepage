<template>
<div ref="post"></div>
</template>

<script>
import { createRoot } from 'react-dom/client';
import { PostItem } from './PostList/PostItem';

export default {
	props: {
		post: Object,
	},

  mounted() {
    const root = createRoot(this.$refs.post);
    root.render(PostItem({
      post: {
        ...this.post,
        meta: {
          ...this.post.meta,
          published: new Date(this.post.meta.published),
        },
      },
    }));
  },
}
</script>

<style></style>
