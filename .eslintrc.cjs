module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['vue', 'react'],
  rules: {
    'no-unused-vars': ['error', {'vars': 'all', 'args': 'after-used', 'argsIgnorePattern': '^_'}],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/react-in-jsx-scope': 'off',

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
