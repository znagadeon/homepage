<template>
<div class="giscus"></div>
</template>

<script>
import config from '@root/config.json';

export default {
	props: {
		title: String,
	},

	mounted() {
		const script = document.createElement('script');
		script.setAttribute('src', 'https://giscus.app/client.js');

		script.dataset.repo = config.comment.repository;
		script.dataset.repoId = config.comment.repoId;
		script.dataset.category = config.comment.category;
		script.dataset.categoryId = config.comment.categoryId;
		script.dataset.dataMapping = 'specific';
		script.dataset.term = this.title;
		script.dataset.reactionEnabled = '1';
		script.dataset.emitMetadata = '0';
		script.dataset.theme = 'light';

		script.setAttribute('crossorigin', 'anonymous');
		script.setAttribute('async', true);

		document.body.appendChild(script);
	},
};
</script>

<style lang="scss" scoped>
.giscus {
	@apply mb-4;
}
</style>
