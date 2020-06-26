<template>
    <div id="disqus_thread"></div>
</template>

<script>
export default {
    data() {
        return {
            host: 'https://znagadeon.dev',
            disqusLink: 'https://znagadeon.disqus.com/embed.js',
        };
    },

    mounted() {
        const disqus_config = function () {
            this.page.url = `${this.host}${location.pathname}`;
            this.page.identifier = location.pathname;
        };
        (() => {
            const d = document, s = d.createElement('script');
            s.src = this.disqusLink;
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();
    }
}
</script>
