<template>
<div class="post">
	<comment class="post__comment" v-if="post.meta?.title" :title="post.meta?.title"></comment>
</div>
</template>

<script lang="jsx">
import Comment from '@src/components/Comment.vue';

import { mapActions, mapState } from 'vuex';

export default {
	components: {
		Comment,
	},

	computed: {
		...mapState(['post']),
		title() {
			return this.$route.params.title;
		},
	},

	methods: {
		...mapActions(['loadPost']),
	},

	async serverPrefetch() {
		await this.loadPost(this.title);
	},
};
</script>
