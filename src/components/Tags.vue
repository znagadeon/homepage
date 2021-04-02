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
		tags: {
			type: Array,
		},
	},
};
</script>

<style lang="scss" scoped>
.tags {
	@apply flex;
	@apply flex-row;

	&__tag {
		@apply text-blue-700;
		@apply mr-2;

		&:last-child {
			@apply mr-0;
		}
	}
}
</style>
