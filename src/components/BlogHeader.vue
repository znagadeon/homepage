<template lang="pug">
header.header
    div.header__title.title
        h1.title__blog-name
            router-link(to="/") {{ config.blogName }}
    section.header__profile.profile
        img.profile__image(:src="links.profileImage" alt="Profile Image")
        h2.profile__title {{ config.name }}
        p.profile__description {{ config.description }}
        ul.profile__links
            li
                a.profile__link.profile__link--github(target='_blank' :href="links.github" rel="noopener")
                    span.sr-only GitHub
            li
                a.profile__link.profile__link--linkedin(target='_blank' :href="links.linkedin" rel="noopener")
                    span.sr-only LinkedIn
            li
                a.profile__link.profile__link--twitter(target='_blank' :href="links.twitter" rel="noopener")
                    span.sr-only Twitter
            li
                a.profile__link.profile__link--rss(target='_blank' :href="links.rss" rel="noopener")
                    span.sr-only RSS
        nav.profile__menu.menu
            ul
                li.menu__menu-item(v-for="menu in menus")
                    router-link(:to="menu.link") {{ menu.name }}
</template>

<script>
import config from '@root/config.json';

export default {
    data() {
        return {
            config,
            menus: [
                { name: 'Dev', link: '/tag/dev' },
                { name: 'Log', link: '/tag/log' },
                { name: 'Archive', link: '/archive' },
            ],
        };
    },

    computed: {
        links() {
            return {
                profileImage: `https://www.gravatar.com/avatar/${this.config.links.gravatar}?s=150`,
                github: `https://github.com/${config.links.github}`,
                linkedin:`https://linkedin.com/in/${config.links.linkedin}`,
                twitter: `https://twitter.com/${config.links.twitter}`,
                rss: config.links.rss,
            };
        },
    },
}
</script>

<style lang="scss" scoped>
$fa-font-path: "~@fortawesome/fontawesome-free/webfonts";
@import '~@fortawesome/fontawesome-free/scss/fontawesome.scss';

@import '~@fortawesome/fontawesome-free/scss/solid.scss';
@import '~@fortawesome/fontawesome-free/scss/brands.scss';

.header {
    @apply pb-6;
    @apply mb-3;
    @apply border-gray-300;
    @apply border-b;

    &__profile {
        @apply pt-20;
    }
}

.title {
    @apply fixed;
    @apply w-screen;
    @apply h-20;
    @apply p-6;
    @apply z-10;
    @apply bg-white;
    @apply opacity-75;
    @apply shadow-lg;
    @apply leading-tight;
    @apply align-middle;

    &__blog-name {
        @apply text-2xl;
        @apply font-bold;
    }
}

.profile {
    @apply relative;
    @apply w-full;

    &__image {
        @apply mt-10;
        @apply rounded-full;
        @apply mx-auto;
    }

    &__title {
        @apply mt-5;
        @apply text-2xl;
        @apply text-center;
    }

    &__description {
        @apply w-2/3;
        @apply mx-auto;
        @apply text-center;
    }

    &__links {
        @apply flex;
        @apply flex-row;
        @apply justify-center;
        @apply mt-3;

        li {
            @apply mr-6;

            &:last-child {
                @apply mr-0;
            }
        }
    }

    &__link {
        @extend %fa-icon;
        @extend .fa-lg;

        &--github {
            @extend .fab;
            &:before {
                content: fa-content($fa-var-github);
            }
        }

        &--linkedin {
            @extend .fab;
            &:before {
                content: fa-content($fa-var-linkedin-in);
            }
        }

        &--twitter {
            @extend .fab;
            &:before {
                content: fa-content($fa-var-twitter);
            }
        }

        &--rss {
            @extend .fas;
            &:before {
                content: fa-content($fa-var-rss);
            }
        }
    }

    &__menu {
        @apply mt-3;
    }
}

.menu {
    ul {
        @apply flex;
        @apply flex-row;
        @apply justify-center;
    }

    &__menu-item {
        @apply mr-6;
        @apply text-xl;

        &:last-child {
            @apply mr-0;
        }
    }
}
</style>
