<template lang="pug">
    div {{ $route.path }}
</template>

<script>
export default {
    created() {
        const context = require.context('../../contents?with-html', true, /\.md$/);
        const data = context(`.${this.$route.path.replace(/\.html$/, '.md')}`);
    }
}
</script>
