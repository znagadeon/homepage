module.exports = {
    title: '지나가던 개발자',

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
};
