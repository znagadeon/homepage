<template>
  	<svg aria-hidden="true" class="feather-icon" v-html="icon" :width="size" :height="size"></svg>
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

<style scoped lang="scss">
.feather-icon {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
</style>
