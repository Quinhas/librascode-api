module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['plugin:@typescript-eslint/recommended', 'airbnb-base', 'prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['**/tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'prettier'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'alphabetize': { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
      },
    ],
    'no-useless-constructor': 'off',
    'no-empty-function': ['error', { allow: ['constructors'] }],
  },
};
