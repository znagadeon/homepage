<template>
<main>
  <router-view></router-view>
</main>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import url("//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css");

body {
	font-family: 'Spoqa Han Sans Neo', sans-serif;
}

main {
  max-width: 1000px;
  // TODO: Turn on when SSR migration is complete
  // min-height: 500px;
  @apply px-6;
  @apply mx-auto;
}
</style>
