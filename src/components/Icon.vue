<template>
	<span aria-hidden="true" class="feather-icon" v-html="icon"></span>
</template>

<script>
import feather from 'feather-icons';

export default {
	props: ['name', 'size'],

	computed: {
		icon() {
			return feather.icons[this.name].toSvg({ width: this.size, height: this.size });
		},
	}
}
</script>

<style lang="scss" scoped>
.feather-icon {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
</style>
