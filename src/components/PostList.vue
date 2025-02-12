<template>
<div ref="postList"></div>
</template>

<script lang="jsx">
import { createRoot } from 'react-dom/client';
import { PostList } from './PostList';

export default {
	props: ['posts', 'title'],

  mounted() {
    const root = createRoot(this.$refs.postList);
    root.render(<PostList posts={this.posts}>{this.title}</PostList>)
  },
};
</script>
