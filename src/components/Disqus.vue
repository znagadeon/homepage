<template lang="pug">
#disqus_thread.comment
</template>

<script>
import config from '@root/config.json';

export default {
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

    mounted() {
        if (!IS_DEV) {
            this.loadComment();
        }
    },
}
</script>
