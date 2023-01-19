<template>
<header class="header">
	<div class="header__title title">
		<h1 class="title__blog-name">
			<a href="/">{{ blogName }}</a>
		</h1>
		<div class="title__search search">
			<label>
				<span class="sr-only">Search</span>
				<input type="text" class="search__input" v-model="query" @keyup.enter="search">
			</label>
			<button @click="search" aria-label="Search">
				<icon name="search" :size="20"></icon>
			</button>
		</div>
	</div>
  <div ref="profile"></div>
</header>
</template>

<script>
import { ref } from 'vue';
import { createRoot } from 'react-dom/client';
import { Profile } from './Profile';
import { blogName } from '@root/config';

import Icon from './Icon.vue';

export default {
	components: {
		Icon,
	},

	setup() {
		const query = ref('');

		const search = async () => {
			if (!query.value) {
				alert('검색어를 입력하세요');
				return;
			}

			location.href = `/search/index.html?q=${query.value}`;
		};

		return { query, blogName, search };
	},

	created() {
		this.query = this.$route.query.q || '';
	},

  mounted() {
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

.search {
  @media (max-width: 600px) {
    & {
      @apply hidden;
    }
  }
  @media (min-width: 600px) {
    & {
      @apply flex;
      @apply flex-row;
      @apply items-center;
    }
  }

  &__input {
    @apply border-0;
    @apply border-b;
    @apply border-gray-400;
    @apply w-40;
    @apply h-8;
    @apply mr-3;

    @apply bg-transparent;
  }

  &__submit {
    @apply p-2;
    @apply border-0;

    @apply bg-transparent;
  }
}
</style>
