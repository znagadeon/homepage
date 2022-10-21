<template>
<ul class="tags">
	<li class="tags__tag" v-for="tag in tags" :key="tag">
		<a :href="`/tag/${tag}`">#{{tag}}</a>
	</li>
</ul>
</template>

<script>
export default {
	props: {
		tags: Array,
	},
};
</script>

<style lang="scss" scoped>
.tags {
	@apply inline-block;

	&__tag {
		@apply inline-block;
		@apply mr-2;
		@apply text-blue-800;

		&:last-child {
			@apply mr-0;
		}
	}
}
</style>
