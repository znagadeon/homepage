<template>
<div>
	<div class="giscus"></div>
	<component :is="'script'"
		src="https://giscus.app/client.js"
		:data-repo="config.comment.repository"
		:data-repo-id="config.comment.repoId"
		:data-category="config.comment.category"
		:data-category-id="config.comment.categoryId"
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
import config from '@root/config.json';

export default {
	props: {
		title: String,
	},

	data() {
		return {
			config,
		};
	},
};
</script>

<style lang="scss" scoped>
.giscus {
	@apply mb-4;
}
</style>
