<template lang="pug">
.article
    div.category
        span.sr-only category
        span /{{category}}
    h1.title {{title}}
    div.published
        span.sr-only published
        time {{ published }}
    article(v-html="html")
    div
        span.sr-only tags
        ul.tags
            li.tag(v-for="tag in tags") \#{{tag}}
        #disqus_thread.comment
</template>

<script>
import { format } from 'date-fns';

import config from '@root/config.json';

export default {
    data() {
        return {
            title: '',
            category: '',
            tags: [],
            published: null,

            html: '',
        };
    },

    metaInfo() {
        const gravatar = `https://www.gravatar.com/avatar/${config.links.gravatar}`;
        const desc = this.html.replace(/(<([^>]+)>)/ig,"").slice(0, 55);

        return {
            title: `${this.title} - ${config.blogName}`,
            meta: [
                { name: 'author', content: config.name },
                { name: 'description', content: desc },

                { property: 'og:type', content: 'article' },
                { property: 'og:url', content: location.href },
                { property: 'og:title', content: this.title },
                { property: 'og:description', content: desc },
                { property: 'og:image', content: gravatar },

                { name: 'twitter:card', content: 'summary' },
                { name: 'twitter:site', content: `@${config.links.twitter}` },
                { name: 'twitter:title', content: this.title },
                { name: 'twitter:description', content: desc },
                { name: 'twitter:image', content: gravatar },
            ],
        };
    },

    methods: {
        loadComment() {
            const disqus_config = function () {
                this.page.url = `${config.host}${location.pathname}`;
                this.page.identifier = location.pathname;
            };
            (function() {
                const d = document, s = d.createElement('script');
                s.src = config.links.disqus;
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
            })();
        },
    },

    created() {
        const context = require.context('../../contents?with-html', true, /\.md$/);
        const data = context(`.${this.$route.path.replace(/\.html$/, '.md')}`);

        this.title = data.title;
        this.category = data.category;
        this.tags = data.tags;
        this.published = format(new Date(data.published || null), 'yyyy-MM-dd');

        this.html = data.html;

        if (!IS_DEV) {
            this.loadComment();
        }
    },
}
</script>
