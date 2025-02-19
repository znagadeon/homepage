<template>
  <title v-if="meta.title">{{ meta.title }}</title>

  <meta v-if="meta.author" name="author" :content="meta.author">
  <meta v-if="meta.description" name="description" :content="meta.description">

  <meta v-if="meta.title" property="og:site_name" :content="meta.title">
  <meta v-if="meta.opengraph.type" property="og:type" :content="meta.opengraph.type">
  <meta v-if="meta.opengraph.url" property="og:url" :content="meta.opengraph.url">
  <meta v-if="meta.opengraph.title" property="og:title" :content="meta.opengraph.title">
  <meta v-if="meta.opengraph.description" property="og:description" :content="meta.opengraph.description">
  <meta v-if="meta.opengraph.image" property="og:image" :content="meta.opengraph.image">
</template>

<script>
export default {
	props: ['meta'],
}
</script>
