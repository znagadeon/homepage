<template>
<div class="container">
	<blog-header></blog-header>
    <main>
		<router-view></router-view>
	</main>
    <footer></footer>
</div>
<teleport to="head">
	<google-analytics></google-analytics>
</teleport>
</template>

<script>
import BlogHeader from './components/BlogHeader.vue';
import GoogleAnalytics from './components/GoogleAnalytics.vue';

export default {
	components: {
		BlogHeader,
		GoogleAnalytics,
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
