<template>
<div class="container">
  <div ref="header"></div>
  <main>
    <router-view></router-view>
  </main>
  <footer></footer>
</div>
</template>

<script lang="jsx">
import {createRoot} from 'react-dom/client';
import { Header } from './components/Header';

export default {
  mounted() {
    const header = createRoot(this.$refs.header);
    header.render(<Header />);
  },
};
</script>

<style lang="scss" scoped>
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
