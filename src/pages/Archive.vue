<template>
<div ref="postList"></div>
<teleport to="head">
	<page-meta :meta="meta"></page-meta>
</teleport>
</template>

<script>
import { createRoot } from 'react-dom/client';
import { PostList } from '@src/components/PostList';

import PageMeta from '@src/components/PageMeta.vue';

import { mapState, mapMutations, mapActions } from 'vuex';

import { social, blogName, name, description, host } from '@root/config';

export default {
	components: {
		PageMeta,
	},

	computed: {
		...mapState(['posts', 'meta']),
	},

	methods: {
		...mapMutations(['setMeta']),
		...mapActions(['loadPosts']),
	},

  mounted() {
    const root = createRoot(this.$refs.postList);
    root.render(PostList({
      posts: this.posts.map(post => ({
        ...post,
        meta: {
          ...post.meta,
          published: new Date(post.meta.published),
        },
      })),
      title: 'Archive',
    }));
  },

	async created() {
		await this.loadPosts();

		const gravatar = `https://www.gravatar.com/avatar/${social.gravatar}`;
		this.setMeta({
			title: `Archive - ${blogName}`,
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
