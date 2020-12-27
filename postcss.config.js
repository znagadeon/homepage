const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = ({ _file, _options, _env }) => ({
	plugins: [
		require('tailwindcss'),
		require('autoprefixer'),
		purgecss({
			content: ['./layouts/**/*.pug', './src/**/*.vue'],
			whitelistPatternsChildren: [/article/],
		}),
	],
});
