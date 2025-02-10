<template>
<div>
	<div class="giscus"></div>
	<component :is="'script'"
		src="https://giscus.app/client.js"
		:data-repo="config.giscus.repository"
		:data-repo-id="config.giscus.repoId"
		:data-category="config.giscus.category"
		:data-category-id="config.giscus.categoryId"
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
import {config} from '@src/config';

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

	:deep(.giscus-frame) {
		width: 100%;
	}
}
</style>
