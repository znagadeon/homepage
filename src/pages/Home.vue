<template>
<div ref="postList"></div>
</template>

<script>
import { createRoot } from 'react-dom/client';
import { PostList } from '@src/components/PostList';

import { fetchPosts } from '@src/api';

import { createCommonMeta, createOpengraphMeta, createTwitterMeta } from '@src/utils/meta';
import { social, blogName, name, description, host } from '@root/config';

export default {
  data() {
    return {
      posts: [],
    };
  },

	methods: {
    async loadPosts(params) {
      this.posts = await fetchPosts(params);
    },
	},

  mounted() {
    const root = createRoot(this.$refs.postList);

    root.render(PostList({
      posts: this.posts,
      title: 'Recent Posts',
    }));

    const gravatar = `https://www.gravatar.com/avatar/${social.gravatar}`;

    const common = createCommonMeta({
      title: blogName,
      author: name,
      description: description,
    });
    const opengraph = createOpengraphMeta({
      siteName: blogName,
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
		await this.loadPosts({
			length: 5,
		});
	},
};
</script>
