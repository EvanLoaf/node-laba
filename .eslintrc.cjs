module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	root: true,
	extends: ['prettier', 'plugin:prettier/recommended', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	plugins: ['prettier', '@typescript-eslint'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'prettier/prettier': 'error',
		'arrow-body-style': 'off',
		'prefer-arrow-callback': 'off',
	},
	overrides: [
		{
			files: ['*.js', '*.ts'],
			extends: ['plugin:prettier/recommended', 'prettier'],
			plugins: ['prettier'],
			rules: {
				'prettier/prettier': [
					'error',
					{
						tabWidth: 2,
						useTabs: true,
						semi: true,
						singleQuote: true,
						quoteProps: 'as-needed',
						trailingComma: 'es5',
						bracketSpacing: true,
						bracketSameLine: true,
						arrowParens: 'avoid',
						printWidth: 140,
					},
				],
				'arrow-body-style': 'off',
				'prefer-arrow-callback': 'off',
				quotes: [
					'error',
					'single',
					{
						avoidEscape: true,
						allowTemplateLiterals: false,
					},
				],
				'no-confusing-arrow': ['error', { allowParens: false, onlyOneSimpleParam: true }],
			},
		},
	],
};