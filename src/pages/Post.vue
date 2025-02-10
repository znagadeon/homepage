<template>
<div class="post">
	<div class="post__meta">
		<h1 class="post__title">{{post.meta?.title}}</h1>
		<div class="post__tags">
			<span class="sr-only">tags</span>
      <span ref="tags"></span>
		</div>
		<div class="post__updated">
			<span>Last Updated: </span>
			<a target="_blank" :href="commitLog"><time>{{ post.meta?.updated }}</time></a>
		</div>
	</div>
	<article class="post__article" v-html="post.content"></article>
	<comment class="post__comment" v-if="post.meta?.title" :title="post.meta?.title"></comment>
</div>
<teleport to="head">
	<page-meta :meta="meta"></page-meta>
</teleport>
</template>

<script lang="jsx">
import {config} from '@src/config';

import { createRoot } from 'react-dom/client';
import { TagList } from '../components/TagList';

import Comment from '@src/components/Comment.vue';
import PageMeta from '@src/components/PageMeta.vue';

import { mapActions, mapMutations, mapState } from 'vuex';

export default {
	components: {
		Comment,
		PageMeta,
	},

	computed: {
		...mapState(['post', 'meta']),
		title() {
			return this.$route.params.title;
		},
		commitLog() {
			return `https://github.com/${config.history.org}/${config.history.repo}/commits/develop/posts/${this.title}`;
		},
	},

	methods: {
		...mapMutations(['setMeta']),
		...mapActions(['loadPost']),
	},

	async serverPrefetch() {
		await this.loadPost(this.title);

		const gravatar = `https://www.gravatar.com/avatar/${config.gravatar}`;
		const title = this.post.meta.title;
		const desc = this.post.content.replace(/(<([^>]+)>)/gi, '').slice(0, 55);
		this.setMeta({
			title: `${title} - ${config.blogName}`,
			author: config.author,
			description: config.description,

			opengraph: {
				type: 'article',
				url: `${config.host}/post/${this.title}/index.html`,
				title,
				description: desc,
				image: gravatar,
			},
		});
	},

  mounted() {
    const tags = createRoot(this.$refs.tags);
    tags.render(<TagList tags={this.post.meta?.tags || []} />)
  },
};
</script>

<style lang="scss">
@import 'highlight.js/styles/atom-one-dark.css';
@import 'katex/dist/katex.css';

@mixin list {
	@apply ml-6;
	@apply mt-3;
}

@mixin code {
	@apply inline-block;
	@apply whitespace-pre;

	font-family: 'Roboto Mono', monospace;

	span {
		font-family: 'Roboto Mono', monospace;
	}
}

.post {
	@apply mt-6;

	&__meta {
		@apply border-b;
		@apply border-gray-300;
		@apply pb-2;
		@apply mb-6;
	}

	&__updated a {
		@apply underline;
	}

	&__title {
		@apply text-3xl;
		@apply font-bold;
	}

	&__tags {
		@apply mt-1;
	}

	&__article {
		@apply mb-6;

    line-height: 1.6;
    vertical-align: middle;

    h1 {
      @apply text-2xl;
      @apply font-bold;
      @apply mt-8;
    }

    h2 {
      @apply text-xl;
      @apply font-bold;
      @apply mt-6;
    }

    h3 {
      @apply text-xl;
      @apply mt-4;
    }

    h4 {
      @apply mt-3;
      @apply font-bold;
    }

    p {
      @apply mt-4;
    }

    ol {
      @include list;
      @apply list-decimal;
    }

    ul {
      @include list;
      @apply list-disc;
    }

    li {
      @apply pt-2;

      &:first-child {
        @apply pt-0;
      }
    }

    a {
      @apply text-blue-400;
      @apply underline;

      &:active {
        @apply text-blue-800;
      }
    }

    del {
      @apply text-gray-500;
    }

    hr {
      @apply mt-5;
    }

    figure {
      @apply text-center;
      @apply mx-auto;
      @apply my-4;

      @media (max-width: 600px) {
        max-width: 350px;
      }
      @media (min-width: 600px) {
        max-width: 800px;
      }

      img {
        @apply mx-auto;
        @apply rounded-lg;
        @apply shadow;
      }

      figcaption {
        @apply text-gray-700;
        @apply pt-2;
        @apply text-sm;
      }
    }

    .short-code {
      @apply px-1;
      @apply rounded;
      @apply bg-gray-200;
      @apply text-blue-500;
    }

    .hljs {
      @apply w-full;
      @apply px-0;
      @apply py-3;
      @apply mt-2;
      @apply rounded-lg;
      @apply whitespace-nowrap;
      @apply break-all;

      div {
        @apply flex;

        &.highlighted {
          @apply bg-gray-900;
        }

        .line-number {
          @include code;
          @apply px-3;
          @apply mr-3;
          @apply border-r;
          @apply border-gray-700;
          @apply text-right;

          user-select: none;
        }
        .code {
          @include code;
          @apply flex-1;
        }
      }
    }

    blockquote {
      @apply relative;
      @apply m-0;
      @apply mb-6;

      @apply text-gray-800;

      &:before {
        content: '';
        @apply absolute;

        @apply inline-block;
        @apply w-3;
        @apply h-full;

        @apply bg-gray-300;
      }

      & > * {
        @apply ml-6;
      }
    }

    table {
      margin: 30px auto;

      border-collapse: collapse;

      thead {
        @apply font-bold;
        @apply bg-blue-200;
      }

      tr:not(:last-child) {
        border-bottom: 1px solid;
        @apply border-gray-300;
      }

      th, td {
        @apply py-1;
        @apply px-3;
      }

      td:nth-child(2n) {
        @apply bg-blue-100;
      }
    }
  }
}
</style>
