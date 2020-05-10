const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = ({ file, options, env }) => ({
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        purgecss({
            content: [
                './layouts/**/*.pug',
                './src/**/*.vue',
            ],
            whitelistPatternsChildren: [/hljs/],
        }),
    ],
});
