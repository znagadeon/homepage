<template lang="pug">
  li.tag
    router-link(:to="`/tag/${name}`") {{ `#${name}` }}
</template>

<script>
export default {
    props: ['name'],
}
</script>
