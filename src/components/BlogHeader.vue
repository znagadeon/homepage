<template>
<header class="header">
	<div class="header__title title">
		<h1 class="title__blog-name">
			<a href="/">{{ config.blogName }}</a>
		</h1>
    <div class="title__search" ref="search"></div>
	</div>
	<section class="header__profile profile">
		<img :src="profileImage" :width="size/2" :height="size/2" alt="Profile image" class="profile__image">
		<h2 class="profile__title">{{ config.name }}</h2>
		<p class="profile__description">{{ config.description }}</p>
    <div ref="social" class="profile__social"></div>
        <nav class="profile__menu menu">
			<ul>
				<li class="menu__menu-item">
					<a href="https://wiki.znagadeon.dev" target="_blank" rel="noopener">Wiki</a>
				</li>
				<li class="menu__menu-item">
					<a href="/archive">Archive</a>
				</li>
			</ul>
		</nav>
	</section>
</header>
</template>

<script lang="jsx">
import {createRoot} from 'react-dom/client';
import { Social } from './Social';
import { Search } from './Search';

import {config} from '@src/config';

export default {
	data() {
		return {
			size: 300,
			config,
		};
	},

	computed: {
    profileImage() {
      return `https://www.gravatar.com/avatar/${this.config.gravatar}?s=${this.size}`;
    },
	},

  mounted() {
    const social = createRoot(this.$refs.social);
    const socialLinks = this.config.social;
    social.render(<Social links={socialLinks} />)

    const search = createRoot(this.$refs.search);
    search.render(<Search />);
  },
};
</script>

<style lang="scss" scoped>
.header {
	@apply pb-6;
	@apply mb-3;
	@apply border-gray-300;
	@apply border-b;

	&__profile {
		@apply pt-20;
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

.profile {
	@apply relative;
	@apply w-full;

	&__image {
		@apply mt-10;
		@apply rounded-full;
		@apply mx-auto;
	}

	&__title {
		@apply mt-5;
		@apply text-2xl;
		@apply text-center;
		@apply font-bold;
	}

	&__description {
		width: 66%;
		@apply mx-auto;
		@apply text-center;
		@apply font-light;
	}

  &__social {
    @apply mt-5;
  }

	&__menu {
		@apply mt-1;
	}
}

.menu {
	ul {
		@apply flex;
		@apply flex-row;
		@apply justify-center;
	}

	&__menu-item {
		@apply mr-5;
		@apply text-lg;

		&:last-child {
			@apply mr-0;
		}
	}
}
</style>
