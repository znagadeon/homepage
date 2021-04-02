<template>
<posts :posts="posts">#{{tag}}</posts>
</template>

<script>
import Posts from '@src/components/Posts.vue';

import axios from 'axios';

import config from '@root/config.json';

export default {
	components: {
		Posts,
	},

	data() {
		return {
			tag: '',
			posts: [],
		};
	},

	metaInfo() {
		const gravatar = `https://www.gravatar.com/avatar/${config.links.gravatar}`;

		return {
			title: `#${this.tag} - ${config.blogName}`,
			meta: [
				{ name: 'author', content: config.name },
				{ name: 'description', content: config.description },

				{ property: 'og:type', content: 'website' },
				{ property: 'og:url', content: config.host },
				{ property: 'og:title', content: config.blogName },
				{ property: 'og:description', content: config.description },
				{ property: 'og:image', content: gravatar },

				{ name: 'twitter:card', content: 'summary' },
				{ name: 'twitter:site', content: `@${config.links.twitter}` },
				{ name: 'twitter:title', content: config.blogName },
				{ name: 'twitter:description', content: config.description },
				{ name: 'twitter:image', content: gravatar },
			],
		};
	},

	async created() {
		this.tag = location.pathname.split('/')[2];

		if (IS_DEV) {
			this.posts = (await axios.get('/api/posts', {
				params: {
					tag: this.tag,
				},
			})).data;
		} else {
			this.posts = (await axios.get(`/api/tag/${this.tag}.json`)).data;
		}
	},
};
</script>

<style></style>
