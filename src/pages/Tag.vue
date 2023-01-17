<template>
<post-list :posts="posts">#{{tag}}</post-list>
<teleport to="head">
	<page-meta :meta="meta"></page-meta>
</teleport>
</template>

<script>
import PostList from '@src/components/PostList.vue';
import PageMeta from '@src/components/PageMeta.vue';

import { mapState, mapMutations, mapActions } from 'vuex';

import { blogName, name, description, host, social } from '@root/config';

export default {
	components: {
		PostList,
		PageMeta,
	},

	computed: {
		...mapState(['posts', 'meta']),

		tag() {
			return this.$route.params.tag;
		},
	},

	methods: {
		...mapMutations(['setMeta']),
		...mapActions(['loadPosts']),
	},

	async created() {
		await this.loadPosts({
			tag: this.tag,
		});

		const gravatar = `https://www.gravatar.com/avatar/${social.gravatar}`;
		this.setMeta({
			title: `#${this.tag} - ${blogName}`,
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
};
</script>

<style></style>
