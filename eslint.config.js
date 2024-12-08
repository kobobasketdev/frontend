import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import stylictic from '@stylistic/eslint-plugin'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      "@stylistic": stylictic
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@stylistic/indent': ['error', 'tab'],
      '@stylistic/no-tabs': ['error', { allowIndentationTabs: true }],
      '@stylistic/jsx-indent': [2, 'tab'],
      '@stylistic/jsx-indent-props': [2, 'tab'],
      '@stylistic/semi': ["error", "always"],
      '@stylistic/object-curly-spacing': ["error", "always", { "arraysInObjects": true }]
    },
  },
)
