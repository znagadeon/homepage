module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'no-unused-vars': ['error', {'vars': 'all', 'args': 'after-used', 'argsIgnorePattern': '^_'}],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
  overrides: [
    {
      files: [
        '*.js',
        '*.vue',
      ],
      rules: {
        '@typescript-eslint/no-require-imports': 'warn',
        indent: ['warn', 2],
      },
    }
  ],
  globals: {
    'IS_DEV': true,
  },
};
