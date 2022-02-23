<template>
<div class="gcse-searchresults-only"></div>
<component :is="script" :src="src" async></component>
</template>

<script>
import config from '@root/config.json';

export default {
	props: {
		query: String,
	},

	computed: {
		src() {
			return `https://cse.google.com/cse.js?cx=${config.googleSearch}`;
		},
	},

	serverPrefetch() {
		const gravatar = `https://www.gravatar.com/avatar/${config.links.gravatar}`;

		this.$ssrContext.title = `Search - ${config.blogName}`,
		this.$ssrContext.meta = {
			author: config.name,
			description: config.description,

			opengraph: {
				type: 'website',
				url: config.host,
				title: config.blogName,
				description: config.description,
				image: gravatar,
			},

			twitter: {
				card: 'summary',
				site: `@${config.links.twitter}`,
				title: config.blogName,
				description: config.description,
				image: gravatar,
			},
		};
	},

	mounted() {
		const script = document.createElement('script');
		script.setAttribute('async', true);
		script.setAttribute('src', `https://cse.google.com/cse.js?cx=${config.googleSearch}`);

		document.body.appendChild(script);
	},
}
</script>

<style>

</style>
