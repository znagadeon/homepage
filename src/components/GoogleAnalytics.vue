<template>
	<component :is="'script'" v-if="!isDev"
		:src="`https://www.googletagmanager.com/gtag/js?id=${googleAnalytics}`"
		async
	></component>
</template>

<script>
import { reactive } from 'vue';
import { googleAnalytics } from '@root/config';

export default {
	setup() {
		const isDev = reactive(true);
		return { isDev, googleAnalytics };
	},

	mounted() {
		this.isDev = IS_DEV;
		if (this.isDev) return;

		window.dataLayer = window.dataLayer || [];
		const gtag = () => {
			window.dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', this.googleAnalytics);
	},
};
</script>
