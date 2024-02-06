module.exports = {
  $schema: 'https://json.schemastore.org/eslintrc',
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'tailwindcss', '@tanstack/query'],
  extends: [
    'next/core-web-vitals',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:tailwindcss/recommended',
  ],
  rules: {
    '@next/next/no-html-link-for-pages': 'error',
    // "react/jsx-key": "off",
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],
    '@tanstack/query/exhaustive-deps': 'warn',
    '@tanstack/query/prefer-query-object-syntax': 'error',
    '@tanstack/query/stable-query-client': 'error',
    '@tanstack/query/no-deprecated-options': 'off',
  },
  settings: {
    tailwindcss: {
      callees: ['cn', 'classnames', 'clsx', 'ctl'],
      config: 'tailwind.config.js',
    },
    react: {
      version: 'detect',
    },
    next: {
      rootDir: ['./'],
    },
  },
}
