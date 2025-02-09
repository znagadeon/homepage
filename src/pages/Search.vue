<template>
<div class="gcse-searchresults-only"></div>
<component :is="'script'" :src="src" async></component>
<teleport to="head">
	<page-meta :meta="meta"></page-meta>
</teleport>
</template>

<script>
import PageMeta from '@src/components/PageMeta.vue';

import {config} from '@src/config';

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
			return `https://cse.google.com/cse.js?cx=${config.googleSearch}`;
		},
	},

	methods: {
		...mapMutations(['setMeta']),
	},

	serverPrefetch() {
		const gravatar = `https://www.gravatar.com/avatar/${config.gravatar}`;
		this.setMeta({
			title: `Search - ${config.blogName}`,
			author: config.name,
			description: config.description,

			opengraph: {
				type: 'website',
				url: config.host,
				title: config.blogName,
				description: config.description,
				image: gravatar,
			},
		});
	},
}
</script>

<style>

</style>
