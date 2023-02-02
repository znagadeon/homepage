<template>
<div class="container">
  <div ref="header"></div>
  <main>
    <router-view></router-view>
  </main>
</div>
<teleport to="head">
	<google-analytics></google-analytics>
</teleport>
</template>

<script>
import { createRoot } from 'react-dom/client';
import { Header } from '@src/components/Header';

import GoogleAnalytics from './components/GoogleAnalytics.vue';

export default {
	components: {
		GoogleAnalytics,
	},

  mounted() {
    const root = createRoot(this.$refs.header);
    root.render(Header());
  },
};
</script>

<style scoped lang="scss">
@import url("//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css");

.container {
	max-width: none;

	font-family: 'Spoqa Han Sans Neo', sans-serif;

	main {
		max-width: 1000px;
		min-height: 500px;
		@apply px-6;
		@apply mx-auto;
	}
}
</style>
