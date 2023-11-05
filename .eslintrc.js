module.exports = {
	root: true,
	extends: ['@kbotdev/eslint-config'],
	parserOptions: {
		project: './tsconfig.eslint.json',
		tsconfigRootDir: __dirname
	},
	rules: {
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off'
	}
};
