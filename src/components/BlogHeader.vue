<template>
<header class="header">
	<div class="header__title title">
		<h1 class="title__blog-name">
			<a href="/">{{ blogName }}</a>
		</h1>
    <div ref="search"></div>
	</div>
  <div ref="profile"></div>
</header>
</template>

<script>
import { createRoot } from 'react-dom/client';
import { Search } from './Search';
import { Profile } from './Profile';
import { blogName } from '@root/config';

export default {
  data() {
    return {
      blogName,
    }
  },

  mounted() {
    const searchRoot = createRoot(this.$refs.search);
    searchRoot.render(Search({
      className: 'title__search',
    }));

    const profileRoot = createRoot(this.$refs.profile);
    profileRoot.render(Profile({
      className: 'header__profile',
    }));
  },
};
</script>

<style lang="scss">
.header {
  @apply pb-6;
  @apply mb-3;
  @apply border-gray-300;
  @apply border-b;

  &__profile {
    @apply pt-28;
  }
}

.title {
  @apply fixed;
  @apply flex;
  @apply flex-row;
  @apply items-center;
  @apply justify-between;
  @apply w-screen;
  @apply h-20;
  @apply p-6;
  @apply z-10;
  background-color: rgba(255, 255, 255, 0.75);
  @apply shadow-lg;
  @apply leading-tight;
  @apply align-middle;

  &__blog-name {
    @apply text-2xl;
    @apply font-bold;
  }
}
</style>
