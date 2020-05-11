<template lang="pug">
.gcse-search
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
