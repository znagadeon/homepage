<template>
<div class="gcse-searchresults-only"></div>
<component :is="'script'" :src="src" async></component>
<teleport to="head">
	<page-meta :meta="meta"></page-meta>
</teleport>
</template>

<script>
import PageMeta from '@src/components/PageMeta.vue';

import { googleSearch, social, name, blogName, description, host } from '@root/config';

import { mapState, mapMutations } from 'vuex';

export default {
	components: {
		PageMeta,
	},

	props: {
		query: String,
	},

	computed: {
		...mapState(['meta']),
		src() {
			return `https://cse.google.com/cse.js?cx=${googleSearch}`;
		},
	},

	methods: {
		...mapMutations(['setMeta']),
	},

	created() {
		const gravatar = `https://www.gravatar.com/avatar/${social.gravatar}`;
		this.setMeta({
			title: `Search - ${blogName}`,
			author: name,
			description: description,

			opengraph: {
				type: 'website',
				url: host,
				title: blogName,
				description: description,
				image: gravatar,
			},

			twitter: {
				card: 'summary',
				site: `@${social.twitter}`,
				title: blogName,
				description: description,
				image: gravatar,
			},
		});
	},
}
</script>

<style>

</style>
