<template>
	<title>{{ meta.title }}</title>

	<meta name="author" :content="meta.author">
	<meta name="description" :content="meta.description">

	<meta property="og:site_name" :content="meta.title">
	<meta property="og:type" :content="meta.opengraph.type">
	<meta property="og:url" :content="meta.opengraph.url">
	<meta property="og:title" :content="meta.opengraph.title">
	<meta property="og:description" :content="meta.opengraph.description">
	<meta property="og:image" :content="meta.opengraph.image">

	<meta name="twitter:card" :content="meta.twitter.card">
	<meta name="twitter:site" :content="meta.twitter.site">
	<meta name="twitter:title" :content="meta.twitter.title">
	<meta name="twitter:description" :content="meta.twitter.description">
	<meta name="twitter:image" :content="meta.twitter.image">
</template>

<script>
export default {
	props: ['meta'],
}
</script>
