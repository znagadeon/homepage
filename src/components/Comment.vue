<template>
<div>
	<div class="giscus"></div>
	<component :is="'script'"
		src="https://giscus.app/client.js"
		:data-repo="comment.repository"
		:data-repo-id="comment.repoId"
		:data-category="comment.category"
		:data-category-id="comment.categoryId"
		data-mapping="specific"
		:data-term="title"
		data-reaction-enabled="1"
		data-emit-metadata="0"
		data-theme="light"
		crossorigin="anonymous"
		async
	></component>
</div>
</template>

<script>
import { comment } from '@root/config';

export default {
	props: {
		title: String,
	},

	setup({ title }) {
		return { title, comment };
	},
};
</script>

<style lang="scss" scoped>
.giscus {
	@apply mb-4;

	:deep(.giscus-frame) {
		width: 100%;
	}
}
</style>
