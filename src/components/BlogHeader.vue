<template lang="pug">
header
    div.top
        h1.title
            a(href="/") {{ config.blogName }}
        a.search#search(href='javascript:alert(\'준비중\')')
            span.sr-only Search
    section.profile
        img(:src="links.profileImage" alt="Profile Image")
        h2 {{ config.name }}
        p {{ config.description }}
        ul.links
            li
                a.github-link(target='_blank' :href="links.github" rel="noopener")
                    span.sr-only GitHub
            li
                a.linkedin-link(target='_blank' :href="links.linkedin" rel="noopener")
                    span.sr-only LinkedIn
            li
                a.twitter-link(target='_blank' :href="links.twitter" rel="noopener")
                    span.sr-only Twitter
            li
                a.mail-link(target='_blank' :href="links.mail" rel="noopener")
                    span.sr-only Mail
    nav
        ul.menu
            li
                a(href='javascript:alert(\'준비중\')') Portfolio
            li
                a(href='javascript:alert(\'준비중\')') Dev
            li
                a(href='javascript:alert(\'준비중\')') Log
            li
                a(href='javascript:alert(\'준비중\')') Wiki
</template>

<script>
const config = require('../../config.json');

export default {
    data() {
        return {
            config,
        };
    },

    computed: {
        links() {
            return {
                profileImage: `https://www.gravatar.com/avatar/${this.config.links.gravatar}?s=150`,
                github: `https://github.com/${config.links.github}`,
                linkedin:`https://linkedin.com/in/${config.links.linkedin}`,
                twitter: `https://twitter.com/${config.links.twitter}`,
                mail: `mailto:${config.links.mail}`,
            };
        },
    },
}
</script>