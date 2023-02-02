<template>
<div class="container">
  <div ref="header"></div>
  <main>
    <router-view></router-view>
  </main>
</div>
</template>

<script>
import { createRoot } from 'react-dom/client';
import { Header } from '@src/components/Header';

import { runGoogleAnalytics } from '@src/utils/googleAnalytics';

export default {
  mounted() {
    const root = createRoot(this.$refs.header);
    root.render(Header());

    runGoogleAnalytics();
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
