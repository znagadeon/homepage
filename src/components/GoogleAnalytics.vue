<template>
	<component :is="'script'" v-if="!isDev"
		:src="`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalytics}`"
		async
	></component>
</template>

<script>
import config from '@root/config';

export default {
	props: {
		title: String,
	},

	data() {
		return {
			isDev: true,
			config,
		};
	},

	mounted() {
		this.isDev = IS_DEV;
		if (IS_DEV) return;

		window.dataLayer = window.dataLayer || [];
		const gtag = () => {
			window.dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', this.config.googleAnalytics);
	},
};
</script>
