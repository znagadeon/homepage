module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
		'jest/globals': true,
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/essential',
	],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['vue', 'jest'],
	rules: {
		'no-unused-vars': ['error', {'vars': 'all', 'args': 'after-used', 'argsIgnorePattern': '^_'}],
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
	},
	globals: {
		'IS_DEV': true,
	},
};
