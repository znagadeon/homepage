module.exports = {
	tabWidth: 4,
	useTabs: true,
	semi: true,
	singleQuote: true,
	quoteProps: 'as-needed',
	trailingComma: 'es5',
	bracketSpacing: true,
	arrowParens: 'always',
	proseWrap: 'never',
	vueIndentScriptAndStyle: false,
	endOfLine: 'lf',

	overrides: [
		{
			files: ['*.json', '*.babelrc', '*.yml', '*.yaml'],
			options: {
				useTabs: false,
				tabWidth: 2,
				bracketSpacing: false,
			},
		},
	],
};
