<template>
	<span aria-hidden="true" class="feather-icon" v-html="icon"></span>
</template>

<script>
import feather from 'feather-icons';

export default {
	props: {
		name: String,
		size: Number,
	},

	setup({ name, size }) {
		const icon = feather.icons[name]
			.toSvg({ width: size, height: size });

		return { icon };
	}
}
</script>

<style scoped lang="scss">
.feather-icon {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
</style>
