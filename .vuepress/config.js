const format = require('date-fns/format');

const gravatar = 'https://www.gravatar.com/avartar/c1db11b57685a2fc71655a869cdac430'

module.exports = {
    title: '지나가던 개발자',
    head: [
        ['meta', { charset: 'utf-8' }],
        ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
        ['meta', { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge' }],

        ['meta', { name: 'author', content: 'Kim Songhyun' }],

        ['meta', { name: 'og:image', content: gravatar }],

        ['meta', { name: 'twitter:card', content: 'summary' }],
        ['meta', { name: 'twitter:site', content: '@znagadeon' }],
        ['meta', { name: 'twitter:image', content: gravatar }],
    ],

    port: 1337,

    markdown: {
        lineNumbers: true
    },

    themeConfig: {
        nav: [
            { text: 'Blog', link: '/blog/' },
            { text: 'Wiki', link: '/wiki/' },
        ],
        sidebar: {
            '/blog/': [{
                title: 'Categories',
                collapsable: false,
                sidebarDepth: 6,
                children: [{
                    title: 'Dev',
                    collapsable: false,
                    children: [
                        '/blog/dev/test-fs',
                        '/blog/dev/line-number-with-highlight-js/',
                        '/blog/dev/netlify-large-media/',
                    ],
                }, {
                    title: 'Log',
                    collapsable: false,
                    children: [
                        '/blog/log/remote-work/',
                    ],
                }],
            }],

            '/': 'auto',
        },

        prevLinks: false,
        nextLinks: false,
    },

    plugins: [
        ['@vuepress/last-updated', {
            transformer(timestamp, lang) {
                return format(timestamp, 'yyyy-MM-dd HH:mm:ss');
            },
        }],
        ['@vuepress/google-analytics', {
            ga: 'UA-121480188-1',
        }],
    ],
};
