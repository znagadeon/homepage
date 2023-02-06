<template>
<div class="gcse-searchresults-only"></div>
<component :is="'script'" :src="src" async></component>
</template>

<script>
import { createCommonMeta, createOpengraphMeta, createTwitterMeta } from '@src/utils/meta';
import { googleSearch, social, name, blogName, description, host } from '@root/config';

export default {
	props: {
		query: String,
	},

	computed: {
		src() {
			return `https://cse.google.com/cse.js?cx=${googleSearch}`;
		},
	},

	mounted() {
    const gravatar = `https://www.gravatar.com/avatar/${social.gravatar}`;
    const siteName = `Search - ${blogName}`;
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
}
</script>

<style>

</style>
