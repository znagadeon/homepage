<template>
<header class="header">
	<div class="header__title title">
		<h1 class="title__blog-name">
			<a href="/">{{ config.blogName }}</a>
		</h1>
		<div class="title__search search">
			<label>
				<span class="sr-only">Search</span>
				<input type="text" class="search__input" v-model="query" @keyup.enter="search">
			</label>
			<button @click="search" aria-label="Search">
				<icon name="search" size="20"></icon>
			</button>
		</div>
	</div>
	<section class="header__profile profile">
		<img :src="links.profileImage" :width="size/2" :height="size/2" alt="Profile image" class="profile__image">
		<h2 class="profile__title">{{ config.name }}</h2>
		<p class="profile__description">{{ config.description }}</p>
        <ul class="profile__links">
			<li>
				<a :href="links.github" target="_blank" rel="noopener" aria-label="GitHub">
					<icon name="github" size="20"></icon>
				</a>
			</li>
			<li>
				<a :href="links.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn">
					<icon name="linkedin" size="20"></icon>
				</a>
			</li>
			<li>
				<a :href="links.twitter" target="_blank" rel="noopener" aria-label="Twitter">
					<icon name="twitter" size="20"></icon>
				</a>
			</li>
			<li>
				<a :href="links.rss" target="_blank" rel="noopener" aria-label="RSS">
					<icon name="rss" size="20"></icon>
				</a>
			</li>
		</ul>
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

<script>
import {config} from '@src/config';

import Icon from './Icon.vue';

export default {
	components: {
		Icon,
	},

	data() {
		return {
			size: 300,
			config,
			query: '',
		};
	},

	computed: {
		links() {
			return {
				profileImage: `https://www.gravatar.com/avatar/${this.config.links.gravatar}?s=${this.size}`,
				github: `https://github.com/${config.links.github}`,
				linkedin: `https://linkedin.com/in/${config.links.linkedin}`,
				twitter: `https://twitter.com/${config.links.twitter}`,
				rss: config.links.rss,
				donation: config.links.donation,
			};
		},
	},

	methods: {
		async search() {
			if (!this.query) {
				alert('검색어를 입력하세요');
				return;
			}

			location.href = `/search/index.html?q=${this.query}`;
		},
	},

	created() {
		this.query = this.$route.query.q || '';
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

	&__links {
		@apply flex;
		@apply flex-row;
		@apply justify-center;
		@apply mt-5;

		li {
			@apply mr-4;

			&:last-child {
				@apply mr-0;
			}
		}
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
