<template>
<div class="utterances"></div>
</template>

<script>
import config from '@root/config.json';

export default {
	props: {
		title: String,
	},

	created() {
		const script = document.createElement('script');
		script.setAttribute('src', 'https://utteranc.es/client.js');
		script.setAttribute('repo', config.repository);
		script.setAttribute('issue-term', this.title);
		script.setAttribute('label', 'comment');
		script.setAttribute('theme', 'github-light');
		script.setAttribute('crossorigin', 'anonymous');
		script.setAttribute('async', true);

		document.body.appendChild(script);
	},
};
</script>
