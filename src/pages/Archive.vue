<template>
<div ref="postList"></div>
</template>

<script>
import { createRoot } from 'react-dom/client';
import { PostList } from '@src/components/PostList';

import { mapState, mapActions } from 'vuex';

import { createCommonMeta, createOpengraphMeta, createTwitterMeta } from '@src/utils/meta';
import { social, blogName, name, description, host } from '@root/config';

export default {
	computed: {
		...mapState(['posts', 'meta']),
	},

	methods: {
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

    const gravatar = `https://www.gravatar.com/avatar/${social.gravatar}`;
    const siteName = `Archive - ${blogName}`;
    const common = createCommonMeta({
      title: siteName,
      author: name,
      description: description,
    });
    const opengraph = createOpengraphMeta({
      siteName,
      type: 'website',
      url: host,
      title: blogName,
      description: description,
      image: gravatar,
    });
    const twitter = createTwitterMeta({
      card: 'summary',
      site: `@${social.twitter}`,
      title: blogName,
      description: description,
      image: gravatar,
    });

    document.head.append(common, opengraph, twitter);
  },

	async created() {
		await this.loadPosts();
	},
};
</script>
