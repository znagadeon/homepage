<template lang="pug">
.gcse-searchresults-only
</template>

<script>
import config from '@root/config.json';

export default {
     metaInfo() {
        return {
            title: `검색 - ${config.blogName}`,
            meta: [
                { name: "robots", content: "noindex" },
            ],
        };
    },
}
</script>
